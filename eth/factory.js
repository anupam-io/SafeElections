// Preconfigured instance of the contract
import web3 from './web3';
import compiledContract from './build/Factory.json';

const factory = new web3.eth.Contract(
    compiledContract.abi,
    '0xa7720C51402CD81014609c4B08fd615BD043Ea5E'
);

export default factory;