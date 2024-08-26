# BOOTCAMP 2024 -- CCIP Gas Estimation

test results below

  Sender and Receiver
Router deployed at: 0x5FbDB2315678afecb367f032d93F642f64180aa3
LINK token deployed at: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
Sender deployed at: 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9
Receiver deployed at: 0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9
Iterations: 0, Gas Used: 5190, Increased Gas Limit: 5709
Iterations: 50, Gas Used: 14740, Increased Gas Limit: 16214
Iterations: 99, Gas Used: 24099, Increased Gas Limit: 26508
Final Gas Usage Report:
Number of iterations 0 - Gas used: 5190, Increased Gas Limit: 5709
Number of iterations 50 - Gas used: 14740, Increased Gas Limit: 16214
Number of iterations 99 - Gas used: 24099, Increased Gas Limit: 26508
    ✔ should estimate gas for ccipReceive function and use it in the transaction (1077ms)
Gas Used: 60743, Increased Gas Limit: 66817
    ✔ should estimate gas for transferUsdc function and use it in the transaction


  2 passing (1s)




# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```
