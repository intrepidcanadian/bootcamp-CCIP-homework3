import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { ethers } from "hardhat";

describe("Sender and Receiver", function () {
  const chainSelector = "16015286601757825753";

  async function deployFixture() {
    const [owner] = await ethers.getSigners();
  
    const Router = await ethers.getContractFactory("MockCCIPRouter");
    const Sender = await ethers.getContractFactory("Sender");
    const Receiver = await ethers.getContractFactory("Receiver");
    const BurnMintERC677 = await ethers.getContractFactory("BurnMintERC677");
  
    const router = await Router.deploy();
    console.log("Router deployed at:", router.target);
  
    const link = await BurnMintERC677.deploy(
      "ChainLink Token",
      "LINK",
      18,
      BigInt(1e27)
    );
    console.log("LINK token deployed at:", link.target);
  
    const sender = await Sender.deploy(router.target, link);
    console.log("Sender deployed at:", sender.target);
  
    const receiver = await Receiver.deploy(router.target);
    console.log("Receiver deployed at:", receiver.target);
  
    await sender.allowlistDestinationChain(chainSelector, true);
    await receiver.allowlistSourceChain(chainSelector, true);
    await receiver.allowlistSender(sender, true);
  
    return { owner, sender, receiver, router, link };
  }

  it("should estimate gas for ccipReceive function and use it in the transaction", async function () {
    const { sender, receiver, router } = await loadFixture(deployFixture);

    const testParams = [0, 50, 99];
    const gasUsageReport = [];

    for (const iterations of testParams) {
      // Send message with an initial gas limit
      await sender.sendMessagePayLINK(
        chainSelector,
        receiver.target,
        iterations,
        500_000 // Use an arbitrary initial gas limit
      );

      // Retrieve gas used from the last message executed
      const mockRouterEvents = await router.queryFilter(
        router.filters.MsgExecuted()
      );
      const mockRouterEvent = mockRouterEvents[mockRouterEvents.length - 1];
      // const gasUsed = mockRouterEvent.args.gasUsed;
      const gasUsed = mockRouterEvent.args.gasUsed as bigint; // Ensure gasUsed is treated as bigint

      // Increase gas limit by 10%
      const increasedGasLimit = gasUsed * 110n / 100n;

      // Log the estimation and increased gas limit
      console.log(
        `Iterations: ${iterations}, Gas Used: ${gasUsed.toString()}, Increased Gas Limit: ${increasedGasLimit.toString()}`
      );

      // Use the increased gas limit in the next transaction
      const tx = await sender.sendMessagePayLINK(
        chainSelector,
        receiver.target,
        iterations,
        increasedGasLimit
      );
      await tx.wait();

      gasUsageReport.push({
        iterations,
        gasUsed: gasUsed.toString(),
        increasedGasLimit: increasedGasLimit.toString(),
      });
    }

    // Log the final report of gas usage for each iteration
    console.log("Final Gas Usage Report:");
    gasUsageReport.forEach((report) => {
      console.log(
        "Number of iterations %d - Gas used: %d, Increased Gas Limit: %d",
        report.iterations,
        report.gasUsed,
        report.increasedGasLimit
      );
    });
  });
});
