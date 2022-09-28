// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from 'hardhat';
import * as dotenv from 'dotenv';

let rewardPerBlock: string;
dotenv.config();

if (!process.env.REWARD_PER_BLOCK) {
  throw new Error('Please set your rewardPerBlock param (in wei) for farming contract in the .env file');
} else {
  rewardPerBlock = JSON.parse(process.env.REWARD_PER_BLOCK as string);
}

async function main() {
  const accounts = await ethers.getSigners();
  const deployer = accounts[0].address;
  console.log('Sender address: ', deployer);

  // Deploy WKLAY
  const wklay = await ethers.getContractFactory('WETH9');
  const wklayInstance = await wklay.deploy();
  await wklayInstance.deployed();

  console.log(`WKLAY deployed to : ${wklayInstance.address}`);

  // Deploy Factory
  const factory = await ethers.getContractFactory('DexFactory');
  const factoryInstance = await factory.deploy(deployer);
  await factoryInstance.deployed();

  console.log(`Dex Factory deployed to : ${factoryInstance.address}`);
  console.log("INIT_HASH", (await factoryInstance.INIT()));

  // Deploy Dex Router passing Factory Address and WKLAY Address
  const router = await ethers.getContractFactory('DexRouter');
  const routerInstance = await router.deploy(
    factoryInstance.address,
    wklayInstance.address,
  );
  await routerInstance.deployed();

  console.log(`Dex Router deployed to :  ${routerInstance.address}`);

  // Deploy Dex Token
  const dexToken = await ethers.getContractFactory('PlatformToken');
  const dexTokenInstance = await dexToken.deploy('JDEX Token', 'JDEX');
  await dexTokenInstance.deployed();

  console.log(`Dex Token deployed to : ${dexTokenInstance.address}`);

  // Deploy Farming
  const farming = await ethers.getContractFactory('Farming');
  const currentBlock = await ethers.provider.getBlockNumber();
  const farmingInstance = await farming.deploy(
    dexTokenInstance.address,
    rewardPerBlock,
    currentBlock + 1
  );
  await farmingInstance.deployed();
  console.log(`Farming deployed to : ${farmingInstance.address}`);

  // Deploy Staking Factory passing multisig contract's address as a parameter
  const stakingFactory = await ethers.getContractFactory('StakingFactory');
  const stakingFactoryInstance = await stakingFactory.deploy();
  await stakingFactoryInstance.deployed();

  console.log(`Staking Factory deployed to : ${stakingFactoryInstance.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
