import { Elysia } from "elysia";
import WalletController from "./controllers";
import { IContract, SupportedChains } from "./interfaces";
import {
  hardcodedERC20TokensForUserWalletAddress,
  SupportedContracts,
} from "./utils";

const app = new Elysia()
  .get("/", () => {
    return {
      message: "Elsia API",
      uptime: process.uptime(),
    };
  })
  .get(
    "/get-erc-20-token-balance",
    async ({
      query: { address, network },
    }: {
      query: { address: string; network: "mainnet" };
    }) =>
      await WalletController.getERC20Balances(
        address,
        hardcodedERC20TokensForUserWalletAddress,
        network
      )
  )
  .post(
    "/send-erc-20-tokens",
    async ({
      body: { recipientAddress, chain, amount },
    }: {
      body: {
        recipientAddress: string;
        chain: SupportedChains;
        amount: number;
      };
    }) => {
      if (!recipientAddress) {
        return {
          status: 400,
          error: "Receipient address should be provided",
        };
      }

      if (!chain) {
        return {
          status: 400,
          error: "Supported chain should be provided",
        };
      }

      if (amount <= 0) {
        return {
          status: 400,
          error: "Amount of tokens to send should be provided",
        };
      }
      const { address, rpcUrl }: IContract = SupportedContracts.find(
        (c) => c.network === chain
      )!;

      if (!address) {
        return {
          status: 400,
          error: "Please provide supported chain.",
        };
      }

      const txHash = await WalletController.sendERC20Tokens(
        recipientAddress,
        address,
        amount,
        rpcUrl
      );

      return {
        status: 200,
        txHash,
      };
    }
  )
  .listen(process.env.PORT);

console.log(
  `🦊 Server is running at ${app.server?.hostname}:${app.server?.port}`
);
