
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import { Client } from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";

contract CCIPReceiver {
    event MessageReceived(
        bytes32 indexed messageId,
        uint64 sourceChainSelector,
        address sender,
        uint256 iterations,
        uint256 maxIterations,
        uint256 result
    );

    function _ccipReceive(Client.Any2EVMMessage memory any2EvmMessage) public {
        uint256 iterations = abi.decode(any2EvmMessage.data, (uint256));

        uint256 result = iterations;
        uint256 maxIterations = iterations % 100;
        for (uint256 i = 0; i < maxIterations; i++) {
            result += i;
        }

        emit MessageReceived(
            any2EvmMessage.messageId,
            any2EvmMessage.sourceChainSelector,
            abi.decode(any2EvmMessage.sender, (address)),
            iterations,
            maxIterations,
            result
        );
    }
}
