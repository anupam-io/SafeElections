// Preconfigured instance of the contract
import web3 from './web3';
import compiledContract from './build/Factory.json';

const factory = new web3.eth.Contract(
    compiledContract.abi,
    '0xfa0aB3c15a62D3CBAD22c8024B118f9cd9cB9CD7'
);

export default factory;