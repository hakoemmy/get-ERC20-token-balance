export interface ERC20Token {
  token_address: string;
  symbol: string;
  decimals: number;
}

export enum SupportedChains {
  Ethereum = "Ethereum",
  Polygon = "Polygon",
  Optimism = "Optimism",
  Arbitrum = "Arbitrum",
  Binance_Smart_Chain = "Binance_Smart_Chain",
  Base = "Base",
  Fantom = "Fantom",
  Avalanche_C_Chain = "Avalanche_C_Chain",
  Polygon_zkEVM = "Polygon_zkEVM",
  Aurora = "Aurora",
  Gnosis = "Gnosis",
}
export interface IContract {
  network: SupportedChains;
  address: string;
  rpcUrl: string
}

interface ITransactionParams {
  id: string; // id for actions, e.g. 0 = CALL, 1 = MIXED (call and delegatecall), 20 = FLASHLOAN_CALL, 21 = FLASHLOAN_MIXED. Default value of 0 will work for all most common use-cases.
  salt: string; // salt to customize non-sequential nonce (if `avoNonce` is set to -1), we recommend at least to send `Date.now()`
  source: string; // source address for referral system
  actions: ITransactionAction[]; // actions to execute
  metadata: string; // generic additional metadata
  avoNonce: string; // sequential avoNonce as current value on the smart wallet contract or set to `-1`to use a non-sequential nonce
}

export interface ITransactionAction {
  target: string; // the target address to execute the action on
  data: string; // the calldata to be passed to the call for each target
  value: string; // the msg.value to be passed to the call for each target. set to 0 if none
  operation: string; // type of operation to execute: 0 -> .call; 1 -> .delegateCall, 2 -> flashloan (via .call)
}

interface ITransactionForwardParams {
  gas: string; // minimum amount of gas that the relayer (AvoForwarder) is expected to send along for successful execution
  gasPrice: string; // UNUSED: maximum gas price at which the signature is valid and can be executed. Not implemented yet.
  validAfter: string; // time in seconds after which the signature is valid and can be executed
  validUntil: string; // time in seconds until which the signature is valid and can be executed
  value: string; // UNUSED: msg.value that broadcaster should send along. Not implemented yet.
}

export interface ITransactionPayload {
  params: ITransactionParams;
  forwardParams: ITransactionForwardParams;
}
