export const types = {
  Cast: [
    { name: "params", type: "CastParams" },
    { name: "forwardParams", type: "CastForwardParams" },
  ],
  CastParams: [
    { name: "actions", type: "Action[]" },
    { name: "id", type: "uint256" },
    { name: "avoNonce", type: "int256" },
    { name: "salt", type: "bytes32" },
    { name: "source", type: "address" },
    { name: "metadata", type: "bytes" },
  ],
  Action: [
    { name: "target", type: "address" },
    { name: "data", type: "bytes" },
    { name: "value", type: "uint256" },
    { name: "operation", type: "uint256" },
  ],
  CastForwardParams: [
    { name: "gas", type: "uint256" },
    { name: "gasPrice", type: "uint256" },
    { name: "validAfter", type: "uint256" },
    { name: "validUntil", type: "uint256" },
    { name: "value", type: "uint256" },
  ],
};
