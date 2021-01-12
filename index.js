const web3 = require('./web3')
const Tx = require("ethereumjs-tx").Transaction

const USDTtoken = require('./USDTtoken')

async function createUSDTSignTransaction(from, privateKey, to, amount) {
    // Use BigNumber
    let decimals = web3.utils.toBN(18);
    amount = web3.utils.toBN(parseInt(amount, 10))
    // calculate ERC20 token amount
    let value = '0x' + amount.mul(web3.utils.toBN(10).pow(decimals)).toString('hex');
    var count = await web3.eth.getTransactionCount(from);
    var data = USDTtoken.methods.transfer(to, value)
    let gasPrice = web3.utils.toHex(web3.utils.toWei('50', 'gwei'))
    // var gasLimit = data.estimateGas()*110%
    const gasLimit = 100000
    // console.log('gasLimit: '+gasLimit)

    var rawTransaction = {
        "from": from,
        "nonce": web3.utils.toHex(count),
        "gasPrice": web3.utils.toHex(gasPrice),
        "gasLimit": web3.utils.toHex(gasLimit),
        "to": process.env[`${process.env.MODE}_USDT_TOKEN_ADDRESS`],
        "value": web3.utils.toHex(0),
        "data": data.encodeABI(),
        "chainId": process.env[`${process.env.MODE}_CHAIN_ID`]
    };
    // var privKey = new Buffer(config.get("privateKey"), 'hex');
    var privKey = Buffer.from(privateKey, 'hex');
    var tx = new Tx(rawTransaction, { 'chain': process.env[`${process.env.MODE}_CHAIN_NAME`] });

    tx.sign(privKey);
    var serializedTx = tx.serialize();
    let transaction = '0x' + serializedTx.toString('hex')
    return transaction
}

async function performUSDTTransaction(from, privateKey, to, amount) {
    try {
        const usdtTranaction = await createUSDTSignTransaction(from, privateKey, to, amount)
        return await performTransaction(usdtTranaction)
    } catch (error) {
        console.log(error)
    }
}

async function performTransaction(transaction) {
    try {
        // console.log('call perform transaction')
        const receipt = await web3.eth.sendSignedTransaction(transaction)
        // console.log(`performTransaction receipt = ${JSON.stringify(receipt)}`)

        if (receipt.status) {
            return receipt
        }
        return null
    } catch (error) {
        console.log(error)
        return null
    }
}

async function test() {
    const account = '0xE473F05c620b717D82ca8C25394e66F990A78cf5'
    const privateKey = '147eac298c46e2e75d79cb2aabc8602c741a63063e176b52b31466bf88dca52d'
    const to = '0x380A4d1B3Ec1abb149A056ea32CD40BEc7D218Eb'
    const amount = 10
    const data = await performUSDTTransaction(account, privateKey, to, amount)
    console.log(data)
}

test()