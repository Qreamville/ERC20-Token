import { ethers, run, network } from "hardhat";

const verify = async (contractAddress: string, args: any[]) => {
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e: any) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified!");
    } else {
      console.log(e);
    }
  }
};

async function main() {
  const Qream = await ethers.getContractFactory("Qream");
  const qream = await Qream.deploy();
  await qream.deployed();
  await verify(qream.address, []);
  console.log(`deployed to ${qream.address}`);
  // Interacting with erc-20
  await qream.mint("0xF0ccc8B440Bf013a37ef722530B1e4727a785CfA", 60);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
