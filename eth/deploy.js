const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

const compiledContract = require('./build/Factory.json');

// Can be used to generate many accounts, Has public and private keys, Sensitive information
const seedPhrase = 'tube odor target consider time veteran derive umbrella cherry inflict hat twelve';
// KOVAN TESTING FROM IFNURA: Endpint for performing the transaction on a specific network
const infuraEndpoint = 'https://kovan.infura.io/v3/19b85f951b5a4440923fa8f61eb27245';

// Setting up the provider
const provider = new HDWalletProvider(seedPhrase, infuraEndpoint);

// Connecting web3 through provider
const web3 = new Web3(provider);

const minGas = '5000000';


const deploy = async()=>{
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account ', accounts[0]);

    const res = await new web3.eth.Contract(compiledContract.abi)
		.deploy({ data: compiledContract.evm.bytecode.object })
		.send({ from: accounts[0], gas: minGas });
    
    console.log(res.options.address);

    return process.exit(1);
};

deploy();


// Deployed address, give and take: '0x6883A7b9B6E8e6b1Da8bD6561F37BF2Da80D43fF'
// Deployed address, simple storage: '0x079D9850ec6c3b527f4056610166c25504b0C7B3'
// Deployed address, factory contract: '0xa7720C51402CD81014609c4B08fd615BD043Ea5E'