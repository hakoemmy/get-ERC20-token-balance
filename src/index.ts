import { Elysia } from "elysia";
import WalletController from "./controllers";
import { ERC20TokenWithBalance } from "./interfaces";
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
  .post(
    "/send-erc-20-tokens/:recipientAddress",
    async ({
      params: { recipientAddress },
    }: {
      params: { recipientAddress: string };
    }) => {
      const erc20Tokens: ERC20TokenWithBalance[] = [
        {
          symbol: "mdai.io",
          token_balance: "5604000000000000000000",
          token_address: "0xf5b2c59f6db42ffcdfc1625999c81fdf17953384",
          decimals: 18,
        },
        {
          symbol: "Visit https://aeth.trade to claim rewards",
          token_balance: "1400000",
          token_address: "0xf01b134d6868f1adcc701e4450da788b502d7127",
          decimals: 6,
        },
        {
          symbol: "wSNX",
          token_balance: "685000000000000000000",
          token_address: "0xe754f5fc5d43c11c48f1554aeb56ef948eb7b149",
          decimals: 18,
        },
        {
          symbol: "USDT",
          token_balance: "186724235",
          token_address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
          decimals: 6,
        },
        {
          symbol: "GRT",
          token_balance: "5643797427546318322157",
          token_address: "0xc944e90c64b2c07662a292be6244bdf05cda44a7",
          decimals: 18,
        },
        {
          symbol: "WETH",
          token_balance: "1000000000000000000",
          token_address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
          decimals: 18,
        },
        {
          symbol: "aWETH.io",
          token_balance: "66385000000000000000000",
          token_address: "0xbf5fb1563ef58ba41325454ca61cc3d62bd40744",
          decimals: 18,
        },
        {
          symbol: "iETHv2",
          token_balance: "968087853317320747",
          token_address: "0xa0d3707c569ff8c87fa923d3823ec5d81c98be78",
          decimals: 18,
        },
        {
          symbol: "USDC",
          token_balance: "187656676",
          token_address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
          decimals: 6,
        },
        {
          symbol: "FUSE",
          token_balance: "1644042999261651",
          token_address: "0x970b9bb2c0444f5e81e9d0efb84c8ccdcdcaf84d",
          decimals: 18,
        },
        {
          symbol: "abso.site",
          token_balance: "2251880112000000000000",
          token_address: "0x75e34a4a04d5f5f7fc01801d2d287d64d882529b",
          decimals: 18,
        },
        {
          symbol: "DAI",
          token_balance: "467000000000000000000",
          token_address: "0x6b175474e89094c44da98b954eedeac495271d0f",
          decimals: 18,
        },
        {
          symbol: "LUSD",
          token_balance: "91433033780448778728",
          token_address: "0x5f98805a4e8be255a32880fdec7f6728c6568ba0",
          decimals: 18,
        },
        {
          symbol: "HQG",
          token_balance: "100",
          token_address: "0x57b9d10157f66d8c00a815b5e289a152dedbe7ed",
          decimals: 6,
        },
        {
          symbol: "Kishui.net",
          token_balance: "2403500000000000000000000",
          token_address: "0x3ed525fa1f10889dbf55515d1a436d91680d6c54",
          decimals: 18,
        },
        {
          symbol: "BlurReward.org",
          token_balance: "7770",
          token_address: "0x2e4c0631692c578272cbce95b6c51f734b780498",
          decimals: 0,
        },
      ];
      await WalletController.sendERC20Tokens(recipientAddress, erc20Tokens);
    }
  )
  .listen(process.env.PORT);

console.log(
  `🦊 Server is running at ${app.server?.hostname}:${app.server?.port}`
);
