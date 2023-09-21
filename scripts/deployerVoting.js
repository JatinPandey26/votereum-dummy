const hre = require("hardhat");

async function main() {

    const voting = await hre.ethers.getContractFactory("ContestDeployer");
    const contract = await voting.deploy();

    console.log("ContestDeployer contract deployed to:", await contract.getAddress());

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
