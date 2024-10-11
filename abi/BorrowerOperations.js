const abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_bitCore",
        type: "address",
      },
      {
        internalType: "address",
        name: "_debtTokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_factory",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_minNetDebt",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_gasCompensation",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
    ],
    name: "AddressEmptyCode",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "AddressInsufficientBalance",
    type: "error",
  },
  {
    inputs: [],
    name: "FailedInnerCall",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "SafeERC20FailedOperation",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "borrower",
        type: "address",
      },
      {
        indexed: false,
        internalType: "contract IERC20",
        name: "collateralToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "BorrowingFeePaid",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "contract ITroveManager",
        name: "troveManager",
        type: "address",
      },
      {
        indexed: false,
        internalType: "contract IERC20",
        name: "collateralToken",
        type: "address",
      },
    ],
    name: "CollateralConfigured",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "caller",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "delegate",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isApproved",
        type: "bool",
      },
    ],
    name: "DelegateApprovalSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "contract ITroveManager",
        name: "troveManager",
        type: "address",
      },
    ],
    name: "TroveManagerRemoved",
    type: "event",
  },
  {
    inputs: [],
    name: "CCR",
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
    name: "DEBT_GAS_COMPENSATION",
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
    name: "DECIMAL_PRECISION",
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
    name: "PERCENT_DIVISOR",
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
    name: "ROSE",
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
        internalType: "contract ITroveManager",
        name: "troveManager",
        type: "address",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_collateralAmount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_upperHint",
        type: "address",
      },
      {
        internalType: "address",
        name: "_lowerHint",
        type: "address",
      },
    ],
    name: "addColl",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ITroveManager",
        name: "troveManager",
        type: "address",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_maxFeePercentage",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_collDeposit",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_collWithdrawal",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_debtChange",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_isDebtIncrease",
        type: "bool",
      },
      {
        internalType: "address",
        name: "_upperHint",
        type: "address",
      },
      {
        internalType: "address",
        name: "_lowerHint",
        type: "address",
      },
    ],
    name: "adjustTrove",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "bit_CORE",
    outputs: [
      {
        internalType: "contract IBitCore",
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
        internalType: "uint256",
        name: "TCR",
        type: "uint256",
      },
    ],
    name: "checkRecoveryMode",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ITroveManager",
        name: "troveManager",
        type: "address",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "closeTrove",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ITroveManager",
        name: "troveManager",
        type: "address",
      },
      {
        internalType: "contract IERC20",
        name: "collateralToken",
        type: "address",
      },
    ],
    name: "configureCollateral",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "debtToken",
    outputs: [
      {
        internalType: "contract IDebtToken",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "factory",
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
    name: "fetchBalances",
    outputs: [
      {
        components: [
          {
            internalType: "uint256[]",
            name: "collaterals",
            type: "uint256[]",
          },
          {
            internalType: "uint256[]",
            name: "debts",
            type: "uint256[]",
          },
          {
            internalType: "uint256[]",
            name: "prices",
            type: "uint256[]",
          },
        ],
        internalType: "struct BorrowerOperations.SystemBalances",
        name: "balances",
        type: "tuple",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_debt",
        type: "uint256",
      },
    ],
    name: "getCompositeDebt",
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
    name: "getGlobalSystemBalances",
    outputs: [
      {
        internalType: "uint256",
        name: "totalPricedCollateral",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalDebt",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getTCR",
    outputs: [
      {
        internalType: "uint256",
        name: "globalTotalCollateralRatio",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "guardian",
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
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "caller",
        type: "address",
      },
    ],
    name: "isApprovedDelegate",
    outputs: [
      {
        internalType: "bool",
        name: "isApproved",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "minNetDebt",
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
    inputs: [
      {
        internalType: "contract ITroveManager",
        name: "troveManager",
        type: "address",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_maxFeePercentage",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_collateralAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_debtAmount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_upperHint",
        type: "address",
      },
      {
        internalType: "address",
        name: "_lowerHint",
        type: "address",
      },
    ],
    name: "openTrove",
    outputs: [],
    stateMutability: "payable",
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
    inputs: [
      {
        internalType: "contract ITroveManager",
        name: "troveManager",
        type: "address",
      },
    ],
    name: "removeTroveManager",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ITroveManager",
        name: "troveManager",
        type: "address",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_debtAmount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_upperHint",
        type: "address",
      },
      {
        internalType: "address",
        name: "_lowerHint",
        type: "address",
      },
    ],
    name: "repayDebt",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "sendRose",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_delegate",
        type: "address",
      },
      {
        internalType: "bool",
        name: "_isApproved",
        type: "bool",
      },
    ],
    name: "setDelegateApproval",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_minNetDebt",
        type: "uint256",
      },
    ],
    name: "setMinNetDebt",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ITroveManager",
        name: "",
        type: "address",
      },
    ],
    name: "troveManagersData",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "collateralToken",
        type: "address",
      },
      {
        internalType: "uint16",
        name: "index",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ITroveManager",
        name: "troveManager",
        type: "address",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_collWithdrawal",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_upperHint",
        type: "address",
      },
      {
        internalType: "address",
        name: "_lowerHint",
        type: "address",
      },
    ],
    name: "withdrawColl",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ITroveManager",
        name: "troveManager",
        type: "address",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_maxFeePercentage",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_debtAmount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_upperHint",
        type: "address",
      },
      {
        internalType: "address",
        name: "_lowerHint",
        type: "address",
      },
    ],
    name: "withdrawDebt",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
export default abi;
