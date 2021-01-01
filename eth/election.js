// Preconfigured instance of the contract
import web3 from './web3';
import compiledContract from './build/Election.json';

export default async function election (address){
    return await new web3.eth.Contract(
        compiledContract.abi,
        address
    );

}