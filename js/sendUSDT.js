let contract
let account
const contractAddress = '0xdac17f958d2ee523a2206206994597c13d831ec7';
const to = '0x380A4d1B3Ec1abb149A056ea32CD40BEc7D218Eb'
const amount = '10000000'
const abi = [
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_from",
                "type": "address"
            },
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            },
            {
                "name": "_spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "payable": true,
        "stateMutability": "payable",
        "type": "fallback"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    }
]

async function _sendUSDT() {
    try {
        await connectMetamask()
        if (account) {
            contract.methods.transfer(to, amount).send({ from: account, value: 0 })
            .on('transactionHash', function (hash) {
                console.log(hash)
            })
            .on('receipt', function (receipt) {
                console.log(receipt)
            })
        }
    } catch (error) {
        console.log(error);
    }
}

//connect to metamask
async function connectMetamask() {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum)
        try {
            // ask user for permission
            await ethereum.enable()
            await connectAccount()
            // user approved permission
        } catch (error) {
            // user rejected permission
            console.log(error)
            console.log('user rejected permission')
        }
    } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider)
        // no need to ask for permission
        await connectAccount()
    } else {
        window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        // console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
        // location.reload();
    }
    // console.log(window.web3.currentProvider)
}

async function checkMetamask() {
    console.log('call check metamask')
    if (!window.ethereum && !window.web3)
        window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
}

const connectAccount = async () => {
    contract = new web3.eth.Contract(abi, contractAddress);
    try {
        const accounts = await web3.eth.getAccounts()
        if (accounts.length == 0) {
            // alert("Error retrieving accounts.");
            //code here
            return;
        }
        account = accounts[0];
        console.log('Account: ' + account);
        web3.eth.defaultAccount = account;
        if (account != undefined && account) {
            //code action here
            // await  initData();
        }
    } catch (error) {
        alert("Error retrieving accounts.");
    }

}