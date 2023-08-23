# Test Hardhat Project

Try running some of the following tasks:

```shell
npx hardhat node
```
open other cmd 

```shell
npx hardhat test --network hardhat
```

<h3>Test results (Vulnerability Report):</h3>

<b>Vulnerability 1: Unintended Transfer of Ether</b>

In the joinPonzi function, there's a loop that transfers 1 ether to each affiliate's address using the call function. If an affiliate's address is a contract with a fallback function that performs unexpected actions, it could lead to unintended transfers of Ether.

Description: If an affiliate's contract has a malicious fallback function, it could exploit the Ether transfer in the loop, leading to unintended loss of Ether.

PoC: Create a malicious contract with a fallback function that performs unintended actions. When this contract is added as an affiliate and the joinPonzi function is called, the malicious contract's fallback function is triggered, causing unintended transfers. Here's an example of a malicious contract:


<b>Vulnerability 2: Lack of Withdrawal Pattern</b>

In the joinPonzi function, there's a loop that calls the fallback function of each affiliate address to transfer 1 ether. If an affiliate's fallback function reverts or encounters an out-of-gas situation, the entire joinPonzi function could revert, blocking new registrations and denying access to legitimate users.

Description: An issue with a fallback function in one of the affiliates' addresses can cause the entire joinPonzi function to revert, leading to a situation where legitimate users can't join the contract.
