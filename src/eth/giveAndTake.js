// Preconfigured instance of the contract
import web3 from './web3';
import compiledContract from './build/GiveAndTake.json';

const giveAndTake = new web3.eth.Contract(
    compiledContract.abi,
    '0x6883A7b9B6E8e6b1Da8bD6561F37BF2Da80D43fF'
);

console.log('hi');

export default giveAndTake;