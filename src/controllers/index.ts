import { ethers } from "ethers";
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
      const provider = new ethers.JsonRpcProvider(rpcEndpoint);

      const balancePromises = erc20Tokens.map(async (token) => {
        const erc20Contract = new ethers.Contract(
          token.token_address,
          ["function balanceOf(address) view returns (uint256)"],
          provider
        );
        const balance = await erc20Contract.balanceOf(userAddress);
        return {
          symbol: token.symbol,
          token_balance: balance.toString(),
          eth_value: formatTokenBalanceToETH(balance, token.decimals),
        };
      });

      const balances = await Promise.all(balancePromises);
      return balances;
    } catch (error) {
      console.error("Error fetching token balances:", error);
    }
  }
}
