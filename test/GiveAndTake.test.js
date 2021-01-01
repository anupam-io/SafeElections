const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledContract = require(__dirname + '/../' + '/eth/build/GiveAndTake.json');

// console.log(compiledContract.abi);
// console.log(compiledContract.evm.bytecode);

let accounts;
let contract;
const minGas = '1000000';


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
		.deploy({ data: compiledContract.evm.bytecode.object })
		.send({ from: accounts[0], gas: minGas });

});

describe('\'GiveAndTake\' contract: ', () => {
	// Write all tests here
	it('allows users to send & withdraw money.', async () => {
		// Description for each test

		for (var i = 0; i < 10; i++) {
			await contract.methods.give()
				.send({
					from: accounts[i],
					value: toWei('10'),
					gas: minGas
				});
		}

		// console.log(
		// 	'Current contract balance: ',
		// 	toEth(await contract.methods.getBalance().call())
		// );

		await contract.methods.take(toWei('69'))
			.send({
				from: accounts[0],
				gas: minGas
			});

		// console.log(
		// 	'Current contract balance: ',
		// 	toEth(await contract.methods.getBalance().call())
		// );
		// console.log(
		// 	'Current user 1 balance: ',
		// 	toEth(await web3.eth.getBalance(accounts[0]))
		// );
	});
});
