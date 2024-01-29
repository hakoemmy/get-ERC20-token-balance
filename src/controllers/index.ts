import { ethers } from "ethers";
import {
  Multicall,
  ContractCallResults,
  ContractCallContext,
} from "ethereum-multicall";
import { ERC20Token } from "../interfaces";
import { formatTokenBalanceToETH } from "../utils";

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
          };
        }
      );

      return balances;
    } catch (error) {
      console.error("Error fetching token balances:", error);
    }
  }
}
