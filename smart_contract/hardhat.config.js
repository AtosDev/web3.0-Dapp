// https://eth-ropsten.alchemyapi.io/v2/NhZkqR73doiss7vMf-7hzZqe1F0zAYWm

require("@nomiclabs/hardhat-waffle"); // Waffle is a tool that makes it easy to deploy and test smart contracts.

NETWORK_URL = ALCHEMY_URL;
ACCOUNT_FUND = ACCOUNT_ROPSTEN_METAMASK_KEY;


module.exports = { 
  solidity: "0.8.0",                             // solidity version
  networks: {                                   // this is the network configuration for the network that we are going to deploy our smart contract to.
    ropsten: {
      url: NETWORK_URL,          // this is the url of the network that we are going to deploy our smart contract to.
      accounts: [ACCOUNT_FUND]                           // account needed to fund this contract // this is the account that we are going to use to deploy the contract.
    },
  },
};



//what is hardhat-waffle?
// hardhat-waffle is a tool that makes it easy to deploy and test smart contracts and to interact with the blockchain network using the Web3 API.

// what is ABI?
// ABI is the Application Binary Interface. It is a standard that defines the format of the data that is passed between the contract and the blockchain. // standard way to interact with in the blockchain, as contract to contract and contract to client. etc
