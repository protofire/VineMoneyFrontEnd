const abi = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "_id",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_NICR",
          "type": "uint256"
        }
      ],
      "name": "NodeAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "_id",
          "type": "address"
        }
      ],
      "name": "NodeRemoved",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_id",
          "type": "address"
        }
      ],
      "name": "contains",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "data",
      "outputs": [
        {
          "internalType": "address",
          "name": "head",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "tail",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "size",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_NICR",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_prevId",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_nextId",
          "type": "address"
        }
      ],
      "name": "findInsertPosition",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getFirst",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getLast",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_id",
          "type": "address"
        }
      ],
      "name": "getNext",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_id",
          "type": "address"
        }
      ],
      "name": "getPrev",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getSize",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_id",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_NICR",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_prevId",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_nextId",
          "type": "address"
        }
      ],
      "name": "insert",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "isEmpty",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_id",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_newNICR",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_prevId",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_nextId",
          "type": "address"
        }
      ],
      "name": "reInsert",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_id",
          "type": "address"
        }
      ],
      "name": "remove",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_troveManagerAddress",
          "type": "address"
        }
      ],
      "name": "setAddresses",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "troveManager",
      "outputs": [
        {
          "internalType": "contract ITroveManager",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_NICR",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_prevId",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_nextId",
          "type": "address"
        }
      ],
      "name": "validInsertPosition",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]

export default abi;