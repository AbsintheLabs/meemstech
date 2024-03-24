export const memecoinAbi = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "trader",
        type: "address"
      },
      {
        indexed: false,
        internalType: "address",
        name: "subject",
        type: "address"
      },
      {
        indexed: false,
        internalType: "string",
        name: "ticker",
        type: "string"
      },
      { indexed: false, internalType: "bool", name: "isBuy", type: "bool" },
      {
        indexed: false,
        internalType: "uint256",
        name: "fremeAmount",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "ethAmount",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "protocolEthAmount",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "subjectEthAmount",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "communityEthAmount",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "benefactorEthAmount",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "supply",
        type: "uint256"
      }
    ],
    name: "Trade",
    type: "event"
  },
  {
    inputs: [],
    name: "benefactorFeePercent",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "benefactorLimit",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "string", name: "", type: "string" },
      { internalType: "uint256", name: "", type: "uint256" }
    ],
    name: "benefactors",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "fremesSubject", type: "address" },
      { internalType: "string", name: "ticker", type: "string" },
      { internalType: "uint256", name: "amount", type: "uint256" }
    ],
    name: "buyFremes",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [],
    name: "communityFeeDestination",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "communityFeePercent",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "string", name: "ticker", type: "string" },
      { internalType: "address", name: "benefactor1", type: "address" },
      { internalType: "address", name: "benefactor2", type: "address" }
    ],
    name: "createFreme",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "string", name: "", type: "string" },
      { internalType: "address", name: "", type: "address" }
    ],
    name: "fremesBalance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "string", name: "", type: "string" }
    ],
    name: "fremesSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "fremesSubject", type: "address" },
      { internalType: "string", name: "ticker", type: "string" },
      { internalType: "uint256", name: "amount", type: "uint256" }
    ],
    name: "getBuyPrice",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "fremesSubject", type: "address" },
      { internalType: "string", name: "ticker", type: "string" },
      { internalType: "uint256", name: "amount", type: "uint256" }
    ],
    name: "getBuyPriceAfterFee",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "supply", type: "uint256" },
      { internalType: "uint256", name: "amount", type: "uint256" }
    ],
    name: "getPrice",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "fremesSubject", type: "address" },
      { internalType: "string", name: "ticker", type: "string" },
      { internalType: "uint256", name: "amount", type: "uint256" }
    ],
    name: "getSellPrice",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "fremesSubject", type: "address" },
      { internalType: "string", name: "ticker", type: "string" },
      { internalType: "uint256", name: "amount", type: "uint256" }
    ],
    name: "getSellPriceAfterFee",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "protocolFeeDestination",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "protocolFeePercent",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "newBenefactor", type: "address" },
      { internalType: "address", name: "creator", type: "address" },
      { internalType: "string", name: "ticker", type: "string" },
      { internalType: "uint256", name: "index", type: "uint256" }
    ],
    name: "replaceBenefactor",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "fremesSubject", type: "address" },
      { internalType: "string", name: "ticker", type: "string" },
      { internalType: "uint256", name: "amount", type: "uint256" }
    ],
    name: "sellFremes",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "benefactor", type: "address" },
      { internalType: "address", name: "creator", type: "address" },
      { internalType: "string", name: "ticker", type: "string" },
      { internalType: "uint256", name: "index", type: "uint256" }
    ],
    name: "setBenefactor",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_feePercent", type: "uint256" }],
    name: "setBenefactorFeePercent",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "_feeDestination", type: "address" }
    ],
    name: "setCommunityFeeDestination",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_feePercent", type: "uint256" }],
    name: "setCommunityFeePercent",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "_feeDestination", type: "address" }
    ],
    name: "setProtocolFeeDestination",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_feePercent", type: "uint256" }],
    name: "setProtocolFeePercent",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_feePercent", type: "uint256" }],
    name: "setSubjectFeePercent",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "subjectFeePercent",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  }
];
