export const avoForwarderV1ABI = [
  {
    inputs: [
      {
        internalType: "contract IAvoFactory",
        name: "avoFactory_",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "AvoForwarder__InvalidParams",
    type: "error",
  },
  {
    inputs: [],
    name: "AvoForwarder__LegacyVersionNotDeployed",
    type: "error",
  },
  {
    inputs: [],
    name: "AvoForwarder__Unauthorized",
    type: "error",
  },
  {
    inputs: [],
    name: "AvoForwarder__Unsupported",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "auth",
        type: "address",
      },
      {
        indexed: true,
        internalType: "bool",
        name: "status",
        type: "bool",
      },
    ],
    name: "AuthUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "broadcaster",
        type: "address",
      },
      {
        indexed: true,
        internalType: "bool",
        name: "status",
        type: "bool",
      },
    ],
    name: "BroadcasterUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "avocadoOwner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint32",
        name: "index",
        type: "uint32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "avocadoAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "source",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "metadata",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "string",
        name: "reason",
        type: "string",
      },
    ],
    name: "ExecuteFailed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "avocadoOwner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint32",
        name: "index",
        type: "uint32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "avocadoAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "source",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "metadata",
        type: "bytes",
      },
    ],
    name: "Executed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "avoFactory",
    outputs: [
      {
        internalType: "contract IAvoFactory",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner_",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "index_",
        type: "uint32",
      },
    ],
    name: "avoNonce",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "avocadoBytecode",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner_",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "index_",
        type: "uint32",
      },
    ],
    name: "avocadoVersion",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner_",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "index_",
        type: "uint32",
      },
    ],
    name: "avocadoVersionName",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner_",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "index_",
        type: "uint32",
      },
    ],
    name: "computeAvocado",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from_",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "index_",
        type: "uint32",
      },
      {
        components: [
          {
            components: [
              {
                internalType: "address",
                name: "target",
                type: "address",
              },
              {
                internalType: "bytes",
                name: "data",
                type: "bytes",
              },
              {
                internalType: "uint256",
                name: "value",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "operation",
                type: "uint256",
              },
            ],
            internalType: "struct AvocadoMultisigStructs.Action[]",
            name: "actions",
            type: "tuple[]",
          },
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "int256",
            name: "avoNonce",
            type: "int256",
          },
          {
            internalType: "bytes32",
            name: "salt",
            type: "bytes32",
          },
          {
            internalType: "address",
            name: "source",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "metadata",
            type: "bytes",
          },
        ],
        internalType: "struct AvocadoMultisigStructs.CastParams",
        name: "params_",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "gas",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "gasPrice",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "validAfter",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "validUntil",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        internalType: "struct AvocadoMultisigStructs.CastForwardParams",
        name: "forwardParams_",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "bytes",
            name: "signature",
            type: "bytes",
          },
          {
            internalType: "address",
            name: "signer",
            type: "address",
          },
        ],
        internalType: "struct AvocadoMultisigStructs.SignatureParams[]",
        name: "signaturesParams_",
        type: "tuple[]",
      },
    ],
    name: "executeV1",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner_",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "allowedBroadcasters_",
        type: "address[]",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "auth_",
        type: "address",
      },
    ],
    name: "isAuth",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "broadcaster_",
        type: "address",
      },
    ],
    name: "isBroadcaster",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from_",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "index_",
        type: "uint32",
      },
      {
        components: [
          {
            components: [
              {
                internalType: "address",
                name: "target",
                type: "address",
              },
              {
                internalType: "bytes",
                name: "data",
                type: "bytes",
              },
              {
                internalType: "uint256",
                name: "value",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "operation",
                type: "uint256",
              },
            ],
            internalType: "struct AvocadoMultisigStructs.Action[]",
            name: "actions",
            type: "tuple[]",
          },
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "int256",
            name: "avoNonce",
            type: "int256",
          },
          {
            internalType: "bytes32",
            name: "salt",
            type: "bytes32",
          },
          {
            internalType: "address",
            name: "source",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "metadata",
            type: "bytes",
          },
        ],
        internalType: "struct AvocadoMultisigStructs.CastParams",
        name: "params_",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "gas",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "gasPrice",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "validAfter",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "validUntil",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        internalType: "struct AvocadoMultisigStructs.CastForwardParams",
        name: "forwardParams_",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "bytes",
            name: "signature",
            type: "bytes",
          },
          {
            internalType: "address",
            name: "signer",
            type: "address",
          },
        ],
        internalType: "struct AvocadoMultisigStructs.SignatureParams[]",
        name: "signaturesParams_",
        type: "tuple[]",
      },
    ],
    name: "simulateV1",
    outputs: [
      {
        internalType: "uint256",
        name: "castGasUsed_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deploymentGasUsed_",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isDeployed_",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "success_",
        type: "bool",
      },
      {
        internalType: "string",
        name: "revertReason_",
        type: "string",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "addr",
            type: "address",
          },
          {
            internalType: "bool",
            name: "value",
            type: "bool",
          },
        ],
        internalType: "struct AvoForwarderStructs.AddressBool[]",
        name: "authsStatus_",
        type: "tuple[]",
      },
    ],
    name: "updateAuths",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "addr",
            type: "address",
          },
          {
            internalType: "bool",
            name: "value",
            type: "bool",
          },
        ],
        internalType: "struct AvoForwarderStructs.AddressBool[]",
        name: "broadcastersStatus_",
        type: "tuple[]",
      },
    ],
    name: "updateBroadcasters",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from_",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "index_",
        type: "uint32",
      },
      {
        components: [
          {
            components: [
              {
                internalType: "address",
                name: "target",
                type: "address",
              },
              {
                internalType: "bytes",
                name: "data",
                type: "bytes",
              },
              {
                internalType: "uint256",
                name: "value",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "operation",
                type: "uint256",
              },
            ],
            internalType: "struct AvocadoMultisigStructs.Action[]",
            name: "actions",
            type: "tuple[]",
          },
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "int256",
            name: "avoNonce",
            type: "int256",
          },
          {
            internalType: "bytes32",
            name: "salt",
            type: "bytes32",
          },
          {
            internalType: "address",
            name: "source",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "metadata",
            type: "bytes",
          },
        ],
        internalType: "struct AvocadoMultisigStructs.CastParams",
        name: "params_",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "gas",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "gasPrice",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "validAfter",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "validUntil",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        internalType: "struct AvocadoMultisigStructs.CastForwardParams",
        name: "forwardParams_",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "bytes",
            name: "signature",
            type: "bytes",
          },
          {
            internalType: "address",
            name: "signer",
            type: "address",
          },
        ],
        internalType: "struct AvocadoMultisigStructs.SignatureParams[]",
        name: "signaturesParams_",
        type: "tuple[]",
      },
    ],
    name: "verifyV1",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];
