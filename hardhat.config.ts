import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const SOLC_SETTINGS = {
  optimizer: {
    enabled: true,
    runs: 1_000,
  },
};

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
    //   {
    //     version: "0.8.20",
    //     settings: {
    //         optimizer: {
    //             enabled: true,
    //             runs: 200,
    //         },
    //     },
    // },
    {
        version: "0.8.19",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
      },
    ],
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
  },
};

export default config;
