export const TimeLockContractAddress =
  "0x8212E61A88A2559293808480D07C5e9910986b17";

export const TimeLockContractABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "ipfsHash",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "submitter",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "deryptedSecret",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "encryptedSecret",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "publicKey",
        type: "string",
      },
    ],
    name: "NewDecrypted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "ipfsHash",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "secretShare",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "holder",
        type: "address",
      },
    ],
    name: "NewEncrypted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "ipfsHash",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "shareIndex",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "NewHigherBid",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "ipfsHash",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "fileName",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "biddingTime",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "unlockTime",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "reward",
        type: "uint256",
      },
    ],
    name: "NewTimeLock",
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
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "ipfsHash",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string[]",
        name: "shares",
        type: "string[]",
      },
    ],
    name: "ReadyToRebuildKey",
    type: "event",
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
    constant: true,
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
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
        internalType: "bool",
        name: "_paused",
        type: "bool",
      },
    ],
    name: "modifyPauseState",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_ipfsHash",
        type: "string",
      },
      {
        internalType: "string",
        name: "_fileName",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_totalShares",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_minimumNumberOfShares",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_unlockTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_biddingTime",
        type: "uint256",
      },
    ],
    name: "timeLockNewFile",
    outputs: [],
    stateMutability: "payable",
    type: "function",
    payable: true,
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_ipfsHash",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_shareIndex",
        type: "uint256",
      },
    ],
    name: "bidCollateral",
    outputs: [],
    stateMutability: "payable",
    type: "function",
    payable: true,
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_ipfsHash",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_shareIndex",
        type: "uint256",
      },
    ],
    name: "getCollateral",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_ipfsHash",
        type: "string",
      },
    ],
    name: "getBidders",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "ipfsHash",
        type: "string",
      },
      {
        internalType: "string",
        name: "secretShare",
        type: "string",
      },
      {
        internalType: "bytes32",
        name: "keccakCheck",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "holder",
        type: "address",
      },
    ],
    name: "submitEncrypted",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "ipfsHash",
        type: "string",
      },
      {
        internalType: "string[]",
        name: "secretShares",
        type: "string[]",
      },
      {
        internalType: "bytes32[]",
        name: "keccakChecks",
        type: "bytes32[]",
      },
    ],
    name: "submitEncryptedSecrets",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_publicKey",
        type: "string",
      },
    ],
    name: "submitPublicKey",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_shareHolder",
        type: "address",
      },
    ],
    name: "getPublicKey",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "ipfsHash",
        type: "string",
      },
    ],
    name: "getSecret",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "ipfsHash",
        type: "string",
      },
      {
        internalType: "string",
        name: "secret",
        type: "string",
      },
    ],
    name: "submitDecrypted",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "ipfsHash",
        type: "string",
      },
      {
        internalType: "string",
        name: "decryptedSecret",
        type: "string",
      },
    ],
    name: "reportCheater",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "ipfsHash",
        type: "string",
      },
    ],
    name: "getDecryptedSecrets",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "ipfsHash",
        type: "string",
      },
    ],
    name: "getIpfsDecryptedSecrets",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "validSubmitted",
            type: "uint256",
          },
          {
            components: [
              {
                internalType: "string",
                name: "secret",
                type: "string",
              },
              {
                internalType: "address payable",
                name: "submitter",
                type: "address",
              },
            ],
            internalType: "struct TimeLock.DecryptedSecret[]",
            name: "secrets",
            type: "tuple[]",
          },
        ],
        internalType: "struct TimeLock.DecryptedSecrets",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "receiver",
        type: "address",
      },
    ],
    name: "withdrawFunds",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
