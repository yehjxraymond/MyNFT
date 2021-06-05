const { expect } = require("chai");

describe("Robot", function () {
  it("Should have the correct URI for the minted tokens", async function () {
    // Load accounts
    const [deployer, recipient1] = await ethers.getSigners();

    // Deploy the Robot contract
    const Robots = await ethers.getContractFactory("Robots");
    const robots = await Robots.deploy(
      "Robots",
      "RBT",
      "ipfs://ipfs/QmSuhju6wr5GRUU1xxgruy7xyzkajTysMDsCgEu588vnbg/metadata/"
    );

    // Wait for the Robot contract to be deployed
    await robots.deployed();

    // Mint the first robot to self
    await robots.mint(recipient1.address);

    // Check that token is minted correctly to the recipient
    const ownerOfFirstToken = await robots.ownerOf(0);
    expect(ownerOfFirstToken).to.equal(recipient1.address);

    // Check that the url of the token is correct
    const urlOfFirstToken = await robots.tokenURI(0);
    expect(urlOfFirstToken).to.equal("ipfs://ipfs/QmSuhju6wr5GRUU1xxgruy7xyzkajTysMDsCgEu588vnbg/metadata/0");
  });
});
