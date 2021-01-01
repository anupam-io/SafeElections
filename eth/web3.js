import Web3 from 'web3';

let web3;

if(typeof window !== 'undefined' && typeof window.web3 !== 'undefined'){
    // in the browser and metamask is running
    // getting web3 instance from metamask
    window.web3.currentProvider.enable();
    web3 = new Web3(window.web3.currentProvider);
} else {
    // metamask not available
    const provider = new Web3.providers
        .HttpProvider('https://kovan.infura.io/v3/19b85f951b5a4440923fa8f61eb27245');
    web3 = new Web3(provider);
};

export default web3;

