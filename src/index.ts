import { Elysia } from "elysia";
import WalletController from "./controllers";
import { hardcodedERC20TokensForUserWalletAddress } from "./utils";

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
  .listen(process.env.PORT);

console.log(
  `🦊 Server is running at ${app.server?.hostname}:${app.server?.port}`
);
