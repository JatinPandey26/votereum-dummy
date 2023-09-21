const hre = require("hardhat");

async function main() {

  const user = await hre.ethers.getContractFactory("Users");
  const contract = await user.deploy();

  console.log("User contract deployed to:", await contract.getAddress());

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
