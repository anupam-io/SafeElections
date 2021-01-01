var assert = require('assert');
var ganache = require('ganache-cli');
var Web3 = require('web3');
var web3 = new Web3(ganache.provider());


const compiledContract = require(__dirname + '/../eth/build/Factory.json');

// console.log(compiledContract.abi);
// console.log(compiledContract.evm.bytecode);

let accounts;
let contract;
const minGas = '5000000';


function toEth(inWei) {
	return web3.utils.fromWei(inWei, 'ether');
};
function toWei(inEth) {
	return web3.utils.toWei(inEth, 'ether');
};


beforeEach(async () => {

	// Initialization conditions
	accounts = await web3.eth.getAccounts();
	contract = await new web3.eth.Contract(compiledContract.abi)
		.deploy({
			data: compiledContract.evm.bytecode.object,
		}).send({ from: accounts[0], gas: minGas });
});

describe('\'SafeElection\' contract: ', () => {
	// Write all tests here
	it('allows organizer to create new instance of election.', async () => {
		// Description for each test
		await contract.methods.createElection(["cand1", "cand2"], "demo")
		.send({
			from: accounts[0],
			gas: minGas
		});
		
	});
});