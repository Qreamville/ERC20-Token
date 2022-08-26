import { ethers, run } from "hardhat";

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
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
