// Preconfigured instance of the contract
import web3 from './web3';
import compiledContract from './build/Factory.json';

const factory = new web3.eth.Contract(
    compiledContract.abi,
    '0x7DA8BB2B098D651634d877b91B3dcaFBbA484E6f'
);

export default factory;