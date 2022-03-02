const main = async () => {  // async function main()
  const Transactions = await hre.ethers.getContractFactory("Transactions");  // get the contract factory for the contract Transactions from the hre.ethers library (create a new instance of the contract) 
  const transactions = await Transactions.deploy(); // deploy the contract Transactions

  await transactions.deployed(); // wait for the contract to be deployed

  console.log("Transactions deployed to:", transactions.address); // print the address of the deployed contract
  

}


const runMain = async () => { // converted the normal promise function into async and await function
  try {          
    await main(); 
    process.exit(0); // exit the process with success
  } catch (error) {
    console.error(error);
    process.exit(1); // exit the process with error
  }
}

runMain();

//what is process.exit(0)? 
// process.exit(0) is used to exit the process with a status code of 0 means success.

//what is hre.ethers.getContractFactory("Greeter")?
// hre.ethers.getContractFactory("Greeter") is used to get the contract factory for the Greeter smart contract.

//what is get the contract factory?
// get the contract factory is used to get the contract factory for the contract Greeter from the hre.ethers library.

//what is hre.ethers.getContractFactory("Transactions")?
// hre.ethers.getContractFactory("Transactions") is used to get the contract factory for the contract Transactions from the hre.ethers library.