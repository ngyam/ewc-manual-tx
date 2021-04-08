require('dotenv').config()
const Web3 = require('web3')
const web3 = new Web3('https://rpc.energyweb.org')

// private key here without 0x. this is just an example
const PRIVATE_KEY ='b1617f6a3cb22b25e1c1b980304f28494c486e688d6065210360e5ed1cf7c28a'

web3.eth.accounts.wallet.add(PRIVATE_KEY)

// if you have something for the data field, just copy it here and uncomment
// e.g. const data = '0x232a2c1d000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000c'
const data = undefined

// address from private key given
const fromAddress = web3.eth.accounts.wallet[0].address

// recipient can be changed if wanted, with 0x
const toAddress = fromAddress

// if you want to send some EWT, you can change this, otherwise leave it 0
const value = web3.utils.toWei('0', 'ether')

// gasPrice, you can change the number
const gasPrice = web3.utils.toWei('0.001', 'gwei')

// gas, the remainder is refunded, 1 mill by default just to be safe
const gas = web3.utils.toWei('1000000', 'wei')

const main = async () => {
    
    // set nonce
    // if you want, you can change it manually to a certain number
    const nonce = await web3.eth.getTransactionCount(fromAddress)
    
    console.log('Nonce before:', nonce)
    
    console.log('Sending transaction...')

    const tx = await web3.eth.sendTransaction({
        from: fromAddress,
        to: toAddress,
        data: data,
        nonce: nonce,
        gas: gas,
        gasPrice: gasPrice,
        value: value
    })

    console.log('Success!')
    console.log(tx)
    console.log('Nonce after:', await web3.eth.getTransactionCount(fromAddress))
}

main()
