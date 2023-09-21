// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ContestDeployer {
    struct Contest {
        string title;
        address[] participants;
        address[] requestParticipants;
        address[] voters;
        uint totalVotes;
        address[] hasVoted;
        uint[] participantsVotes;
        bool isContestStarted;
    }

    Contest[] public contests;
    address[] public owners;

    constructor() payable {
        owners.push(msg.sender);
    }

    modifier onlyOwner() {
        bool isContractOwner = false;
        for (uint i = 0; i < owners.length; i++) {
            if (owners[i] == msg.sender) {
                isContractOwner = true;
                break;
            }
        }
        require(isContractOwner, "You are not allowed to perform this action");
        _;
    }

    function createContest(string memory title, address[] memory participants) public onlyOwner payable {
        contests.push(Contest(title, participants,new address[](0), new address[](0), 0, new address[](0), new uint[](participants.length), false));
    }

    function isOwner() public view returns (bool){
        bool isContractOwner = false;
        for (uint i = 0; i < owners.length; i++) {
            if (owners[i] == msg.sender) {
                isContractOwner = true;
                break;
            }
        }

        return isContractOwner;
    }

    function startContest(uint contestIdx) public onlyOwner {
        require(contestIdx < contests.length, "Invalid contest index");
        contests[contestIdx].isContestStarted = true;
    }

    function vote(uint contestIdx, address participant) public {
        require(contestIdx < contests.length, "Invalid contest index");
        Contest storage contest = contests[contestIdx];
        require(contest.isContestStarted, "Contest not started yet!!!");
        address sender = msg.sender;

        // Check if the sender has already voted
        for (uint i = 0; i < contest.hasVoted.length; i++) {
            require(contest.hasVoted[i] != sender, "You have already voted");
        }

        bool isParticipant = false;

        for (uint i = 0; i < contest.participants.length; i++) {
            if (participant == contest.participants[i]) {
                isParticipant = true;
                contest.participantsVotes[i] += 1; // Increment the vote count for the participant at index i
                contest.voters.push(sender);
                contest.hasVoted.push(sender);
                contest.totalVotes += 1;
                break;
            }
        }

        require(isParticipant, "Participant does not exist in this contest");
    }

    function addToOwners(address newOwner) public onlyOwner {
        // Check if the new owner is not already in the owners array
        for (uint i = 0; i < owners.length; i++) {
            require(owners[i] != newOwner, "Owner already exists");
        }
        owners.push(newOwner);
    }

    function addParticipant(uint contestIdx , address participant) public {
        require(contestIdx < contests.length, "Invalid contest index");

        Contest storage contest = contests[contestIdx];
        for(uint i =0 ; i < contest.participants.length ; i++){
            if(contest.participants[i] == participant) revert("already present");
        }
        contest.participants.push(participant);
    }

    function addRequestParticipant(uint contestIdx , address participant) public {
        require(contestIdx < contests.length, "Invalid contest index");

        Contest storage contest = contests[contestIdx];
        for(uint i =0 ; i < contest.requestParticipants.length ; i++){
            if(contest.requestParticipants[i] == participant) revert("already present request");
        }
        contest.requestParticipants.push(participant);
    }

    function getAllContests() public view returns (Contest[] memory){
        return contests;
    }
}
