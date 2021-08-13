// SPDX-License-Identifier: MIT
pragma solidity ^0.7.6;

contract IntegerUnderflow {
    mapping(address => uint) private _userBalances;

    function deposit(uint _amount, uint _serviceFee) private {
        uint total = _amount - _serviceFee; // If total is less than zero its value will be set to the maximum value (2^256)
        _userBalances[msg.sender] += total;
    }

    function getBalance(address _address) external view returns (uint) {
        return _userBalances[_address];
    }

    receive() external payable {
        deposit(msg.value, 1000000);
    }
}