import { ethers } from "ethers";
import {
  Multicall,
  ContractCallResults,
  ContractCallContext,
} from "ethereum-multicall";
import {
  ERC20Token,
  ITransactionAction,
  ITransactionPayload,
} from "../interfaces";
import {
  formatTokenBalanceToETH,
  avoForwarderV1ABI,
  avocadoV1ABI,
  types,
} from "../utils";

export default class WalletController {
  public static async getERC20Balances(
    userAddress: string,
    erc20Tokens: ERC20Token[],
    network: "mainnet"
  ) {
    try {
      if (network !== "mainnet") {
        return {
          status: 400,
          error: "Network Not supported",
        };
      }

      if (!userAddress) {
        return {
          status: 400,
          error: "Wallet address not provided",
        };
      }

      const rpcEndpoint = `https://${network}.infura.io/v3/${process.env.INFURA_API_KEY}`;

      const provider = new ethers.providers.JsonRpcProvider(rpcEndpoint);

      const multicall = new Multicall({
        ethersProvider: provider,
        tryAggregate: true,
      });

      // Application Binary Interface (ABI)
      const ABI = ["function balanceOf(address) view returns (uint256)"];

      //  Group all available erc 20 tokens request into a single call
      const callRequests: ContractCallContext<ERC20Token>[] = erc20Tokens.map(
        (token) => {
          return {
            reference: token.symbol,
            contractAddress: token.token_address,
            abi: ABI,
            calls: [
              {
                reference: "balanceOf",
                methodName: "balanceOf",
                methodParameters: [userAddress],
              },
            ],
            context: token,
          };
        }
      );

      const multicallResult: ContractCallResults = await multicall.call(
        callRequests
      );

      const balances = Object.entries(multicallResult.results).map(
        ([key, result]) => {
          const token = result.originalContractCallContext.context;
          const balance = ethers.utils.defaultAbiCoder.decode(
            ["uint256"],
            result.callsReturnContext[0].returnValues
          )[0];
          return {
            symbol: token.symbol,
            token_balance: balance.toString(),
            eth_value: formatTokenBalanceToETH(balance, token.decimals),
            token_address: token.token_address,
            decimals: token.decimals,
          };
        }
      );

      return balances;
    } catch (error) {
      console.error("Error fetching token balances:", error);
    }
  }

  public static async sendERC20Tokens(
    recipientAddress: string,
    usdcAddress: string,
    amount: number,
    rpcUrl: string
  ) {
    try {
      const senderAddress = `${process.env.SENDER_EOA}`; // sender EOA, ex: Metamask wallet address etc
      const transferABI = [
        "function transfer(address to, uint amount) returns (bool)",
      ];

      const avoForwarderAddress = "0x46978CD477A496028A18c02F07ab7F35EDBa5A54"; // available on 10+ networks
      const avocadoRPCChainId = "634";
      const avocadoProvider = new ethers.providers.JsonRpcProvider(
        "https://rpc.avocado.instadapp.io"
      );
      // can use any other RPC on the network you want to interact with:
      const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
      const chainId = (await provider.getNetwork()).chainId; // e.g. when executing later on Polygon

      // sets up AvoForwarder contract (main interaction point) on e.g. Polygon
      const forwarder = new ethers.Contract(
        avoForwarderAddress,
        avoForwarderV1ABI,
        provider
      );

      const index = "0";

      const avocadoAddress = await forwarder.computeAvocado(
        senderAddress,
        index
      );

      // sets up Avocado
      const avocado = new ethers.Contract(
        avocadoAddress,
        avocadoV1ABI,
        provider
      );

      const isDeployed = (await provider.getCode(avocadoAddress)) !== "0x";

      let domainName, domainVersion; // domain separator name & version required for building signatures

      if (isDeployed) {
        // if avocado is deployed, can read values directly from there
        [domainName, domainVersion] = await Promise.all([
          avocado.DOMAIN_SEPARATOR_NAME(),
          avocado.DOMAIN_SEPARATOR_VERSION(),
        ]);
      } else {
        // if avocado is not deployed yet, AvoForwarder will resolve to the default values set when deploying the Avocado
        [domainName, domainVersion] = await Promise.all([
          forwarder.avocadoVersionName(senderAddress, index),
          forwarder.avocadoVersion(senderAddress, index),
        ]);
      }

      const nonce = isDeployed ? await avocado.avoNonce() : "0";
      const amountWithDecimals = ethers.utils.parseUnits(amount.toString(), 6);

      const usdcInterface = new ethers.utils.Interface(transferABI);

      const calldata = usdcInterface.encodeFunctionData("transfer", [
        recipientAddress,
        amountWithDecimals,
      ]);

      const action: ITransactionAction = {
        target: usdcAddress,
        data: calldata,
        value: "0",
        operation: "0",
      };

      // transaction with action to transfer USDC
      const txPayload: ITransactionPayload = {
        params: {
          actions: [action],
          id: "0",
          avoNonce: nonce.toString(), // setting nonce to previously obtained value for sequential avoNonce
          salt: ethers.utils.defaultAbiCoder.encode(["uint256"], [Date.now()]),
          source: "0x000000000000000000000000000000000000Cad0", // could set source here for referral system
          metadata: "0x",
        },

        forwardParams: {
          gas: "0",
          gasPrice: "0",
          validAfter: "0",
          validUntil: "0",
          value: "0",
        },
      };

      const domain = {
        name: domainName, // see previous steps
        version: domainVersion, // see previous steps
        chainId: avocadoRPCChainId,
        verifyingContract: avocadoAddress, // see previous steps
        salt: ethers.utils.solidityKeccak256(["uint256"], [chainId]), // salt is set to actual chain id where execution happens
      };

      // Private Key of sendar address to authorize transfer, in this case metamask address
      const wallet = new ethers.Wallet(
        `${process.env.PRIVATE_KEY}`,
        avocadoProvider
      );

      // Sign the transaction payload
      const signature = await wallet._signTypedData(domain, types, txPayload);

      const txHash = await avocadoProvider.send("txn_broadcast", [
        {
          signatures: [
            {
              signature, // signature as built in previous step
              signer: senderAddress, // signer address that signed the signature
            },
          ],
          message: txPayload, // transaction payload as built in previous step
          owner: senderAddress, // avocado owner EOA address
          safe: avocadoAddress, // avocado address
          index,
          targetChainId: chainId,
          executionSignature: undefined, // not required for Avocado personal
        },
      ]);

      return txHash;
    } catch (error) {
      console.error("Error transferring ERC20 tokens::", error);
    }
  }
}
