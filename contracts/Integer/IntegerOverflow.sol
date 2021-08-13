// SPDX-License-Identifier: MIT
pragma solidity ^0.7.6;

contract IntegerOverflow {
    mapping(address => uint) private _userBalances;

    function pay(uint _cost, uint _tip, address payable _to) external {
        uint total = _cost + _tip; // If total reaches the maximum value (2^256) its value will be set to zero
        require(_userBalances[msg.sender] >= total, "Insufficient balance");
        _userBalances[msg.sender] -= total;
        _userBalances[_to] += total;
    }

    function getBalance(address _address) external view returns (uint) {
        return _userBalances[_address];
    }

    receive() external payable {
        _userBalances[msg.sender] = msg.value;
    }
}