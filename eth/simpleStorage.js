// Preconfigured instance of the contract
import web3 from './web3';
import compiledContract from './build/SimpleStorage.json';

const simpleStorage = new web3.eth.Contract(
    compiledContract.abi,
    '0x079D9850ec6c3b527f4056610166c25504b0C7B3'
);

export default simpleStorage;