import { IContract, SupportedChains } from "../interfaces";

export const SupportedContracts: IContract[] = [
  {
    network: SupportedChains.Ethereum,
    address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    rpcUrl: "https://eth.drpc.org",
  },
  {
    network: SupportedChains.Polygon,
    address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    rpcUrl: "https://polygon-rpc.com",
  },
  {
    network: SupportedChains.Optimism,
    address: "0x7f5c764cbc14f9669b88837ca1490cca17c31607",
    rpcUrl: "https://mainnet.optimism.io",
  },
  {
    network: SupportedChains.Arbitrum,
    address: "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8",
    rpcUrl: "https://arb1.arbitrum.io/rpc",
  },
  {
    network: SupportedChains.Binance_Smart_Chain,
    address: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
    rpcUrl: "https://bsc-dataseed.binance.org",
  },
  {
    network: SupportedChains.Base,
    address: "0xd9aaec86b65d86f6a7b5b1b0c42ffa531710b6ca",
    rpcUrl: "https://mainnet.base.org",
  },
  {
    network: SupportedChains.Fantom,
    address: "0x04068da6c83afcfa0e13ba15a6696662335d5b75",
    rpcUrl: "https://rpc.ftm.tools",
  },
  {
    network: SupportedChains.Avalanche_C_Chain,
    address: "0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e",
    rpcUrl: "https://api.avax.network/ext/bc/C/rpc",
  },
  {
    network: SupportedChains.Polygon_zkEVM,
    address: "0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035",
    rpcUrl: "https://zkevm-rpc.com",
  },
  {
    network: SupportedChains.Aurora,
    address: "0xB12BFcA5A55806AaF64E99521918A4bf0fC40802",
    rpcUrl: "https://mainnet.aurora.dev",
  },
  {
    network: SupportedChains.Gnosis,
    address: "0xddafbb505ad214d7b80b1f830fccc89b60fb7a83",
    rpcUrl: "https://rpc.gnosischain.com",
  },
];
