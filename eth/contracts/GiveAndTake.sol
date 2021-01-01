// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;


contract GiveAndTake {
    function getBalance() public view returns (uint){
        return address(this).balance;
    }
    
    function give() public payable{}

    function take(uint x) public{
        require(x<address(this).balance);        
        payable(msg.sender).transfer(x);
    }
}