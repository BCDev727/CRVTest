// MaliciousContract.sol
pragma solidity ^0.8.0;

contract MaliciousContract {
    fallback() external payable {
        // Perform malicious action, e.g., drain Ether
        payable(msg.sender).transfer(address(this).balance);
    }
}