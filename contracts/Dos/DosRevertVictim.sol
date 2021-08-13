// SPDX-License-Identifier: MIT
pragma solidity ^0.7.6;

contract DosRevertVictim {
    address payable currentLeader;
    uint highestBid;

    function bid() external payable {
        require(msg.value > highestBid);
        require(address(this).send(msg.value));
        require(currentLeader.send(highestBid)); // Refund the old leader. If it fails it will revert and the leader will stay forever
        currentLeader = msg.sender;
        highestBid = msg.value;
    }

    function getCurrentLeader() external view returns(address) {
        return currentLeader;
    }

    receive() external payable {}
}