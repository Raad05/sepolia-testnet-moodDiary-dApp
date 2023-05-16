// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract moodDiary {
    // This is the contract's body, here you'll specify the logic for this contract.
    string mood;

    function setMood(string memory _mood) public {
    mood = _mood;
    }

    function getMood() public view returns (string memory) {
        return mood;
    }
}