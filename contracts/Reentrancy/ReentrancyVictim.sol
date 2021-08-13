// SPDX-License-Identifier: MIT
pragma solidity ^0.7.6;

contract ReentrancyVictim {
    mapping(address => uint) private _userBalances;
    
    function withdraw() external payable {
        uint amount = _userBalances[msg.sender];
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Failed to send Ether");
        _userBalances[msg.sender] = 0; // Insecure to update _userBalances here
    }

    receive() external payable {
        _userBalances[msg.sender] = msg.value;
    }
}