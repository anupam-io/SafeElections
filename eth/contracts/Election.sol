// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract Factory{
    address[] public deployedElections;

    function createElection(string[] memory candList, string memory description) public { 
        address cont = address(new Election(msg.sender, candList, description));
        
        deployedElections.push(cont);
    }

    function getDeployedElections() public view returns (address[] memory) {
        return deployedElections;
    }
}

contract Election {
    address public ORGANIZER;
    string[] public candList;
    
    mapping(string => uint) totalVotes;
    mapping(address => bool) hasVoted;
    
    bool public votingStatus = false;
    string public description;

    string winner;

    constructor(address _org, string[] memory initList, string memory _description) {
        require(initList.length > 0);
        description = _description;
        ORGANIZER = _org;
        candList = initList;
        for(uint i = 0; i<initList.length; i++){
            totalVotes[initList[i]] = 0;
        }
        winner = "";
        votingStatus = true;
    }
    
    function vote(uint i) public {
        require(votingStatus);
        require(!hasVoted[msg.sender]);

        hasVoted[msg.sender] = true;
        totalVotes[candList[i]]++;
    }
    
    function endVoting() public{
        require(votingStatus);
        require(msg.sender == ORGANIZER);

        for(uint i = 0; i<candList.length; i++){
            if(totalVotes[candList[i]] > totalVotes[winner]){
                winner = candList[i];
            }
        }
        votingStatus = false;
        ORGANIZER = address(0);
    }
    
    function winnerCand() public view returns (string memory){
        require(!votingStatus);
        return winner;
    }

    function giveCandList() public view returns (string[] memory) {
        return candList;
    }
}