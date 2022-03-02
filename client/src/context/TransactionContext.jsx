import React, { useEffect, useState, createContext } from "react"; 
import { ethers } from "ethers"; 
import { contractABI , contractAddress } from '../utils/constants'; 


export const TransactionContext = createContext(); // create a context object to be used by all components in the application

const { ethereum } = window; // get the ethereum object from the window object

// creating a function which will fetch our ethereum contract
const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum); // create a provider object using the ethereum object
    const signer = provider.getSigner(); // get the signer object from the provider object
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer); // create a contract object
    

   /*  console.log({
        provider,
        signer, 
        transactionContract
    }); */
    return transactionContract;
}


export const TransactionContextProvider = ({ children }) => { // create a provider component that will us to wrap the entire main.jsx application

    const [currentAccount, setCurrentAccount] = useState() // create a state variable to store the connected account
    const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: '' }) // this state variable will store the form data in object . 
    const [isLoading, setIsLoading] = useState(false) // this will load during transactionHash being fetched , means adding transactionContract to blockchain
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount')) // this will store the transaction count in local storage; 
    const [Transactions, setTransactions] = useState([]); // this will store the transactions in array


    const handleChange = (e, name) => { // create a function to handle the change in the form
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value })) // set the form data in the state variable
    }

    const getAllTransactions = async () => { // create a function to get all the transactions from the blockchain
        try {
            if(!ethereum) { // if ethereum is not connected
                return alert("Please install metamask"); // return
            }
            const transactionContract = getEthereumContract();
            const availableTransactions = await transactionContract.getAllTransactions(); // get all the transactions from the blockchain
            console.table(availableTransactions);

            const structuredTransactions = availableTransactions.map((transaction) => ({ // map the transactions to a structured object
                addressTo: transaction.receiver, 
                addressFrom: transaction.sender,
                timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(), // convert the timestamp to a readable format
                message: transaction.message, // get the message from the transaction
                keyword: transaction.keyword,
                amount: parseInt(transaction.amount._hex) / (10 ** 18) // converting the gwei amount to ethereum units
            }));

            setTransactions(structuredTransactions); // set the transaction count in the state variable
            console.log(structuredTransactions);

        } catch (error) {
            console.log(error);
        }
    }

    // explain ({ ...prevState, [name]: e.target.value })?
    // { ...prevState } is the previous state of the form data and [name] is the name of the input field which is being changed and e.target.value is the new value of the input field .

    const checkIfWalletIsConnected = async () => {
            try {
                if (!ethereum) { // if the ethereum object is not available in the window object then throw an alert
                    return alert("Please install MetaMask."); // alert the user to install metamask
                }
                const accounts = await ethereum.request({ method: "eth_accounts" }); // get the accounts from the ethereum object
                console.log(accounts);	
                //console.log(accounts.length);

                if (accounts.length) { // if the accounts array is not empty then set the currentAccount state variable to the first account in the array
                    setCurrentAccount(accounts[0]); // set the connected account state variable to the first account

                    getAllTransactions(); // get all the transactions from the blockchain

                } else {
                    console.log("No accounts found");
                }

            } catch (error) {
                console.log(error);   
                throw new Error("No Ethereum Object found"); 
            };
    };

    //function for checkIfTransactionsExist, this function will go to contract and get the transaction count from it and set it in local storage
    const checkIfTransactionsExist = async () => {
        try {
            if(ethereum) {
            const transactionContract = getEthereumContract(); // it is a function which will fetch the ethereum contract
            const transactionCount = await transactionContract.getTransactionCount(); // get the transaction count from the contract
            window.localStorage.setItem('transactionCount', transactionCount); // set the transaction count in local storage
            }
        } catch (error) {
            console.log(error);   
            throw new Error("No Ethereum Object found");
        }   
    }


    // connect wallet

    const connectWallet = async () => { 
        try {
            if(!ethereum) {
                return alert("Please install MetaMask.");
            }
            //await ethereum.enable(); // enable the wallet   {deprecated}
            const accounts = await ethereum.request({ method: "eth_requestAccounts" }); // request the accounts from the ethereum object and user will be prompted to connect the wallet and be able to choose the account

            console.log(accounts);
            setCurrentAccount(accounts[0]); // set the current account to the first account in the array
            window.location.reload(); // reload the page
        } catch (error) {
            if(error.code === 4001) console.log("error code 4001, User Rejected the Request");
            else {console.log(error)};
            throw new Error("No Ethereum Object found"); // throw an error if the ethereum object is not found  
        }
    };

    
    const sendTransaction = async () => {
        try {
            if(!ethereum) {
                return alert("Please install MetaMask.");
            }
            if(!currentAccount) {
                return alert("Please connect your wallet.");
            }

            const { addressTo, amount, keyword, message } = formData; 
            const transactionContract = getEthereumContract(); // get the transaction contract object
            const parsedAmount = ethers.utils.parseEther(amount); // parseEther is a utility function from ethers library to parse the amount in gwei
            
            await ethereum.request({
                method: "eth_sendTransaction", // send the transaction to the ethereum object
                params: [{ 
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208', //amount of gas to be used for the transaction, this is a hexadecimal number , it is 21000 in this case and it is gwei which is 0.000021 ethereum
                    value: parsedAmount._hex, // hex value of the amount to be sent in the transaction
                }]
            });

            // above method is only sending the transaction to the ethereum network and not storing it.

            // now we need to store the transaction in the blockchain which is executed above

            const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword); // add the transaction to the blockchain, and will take some time for transaction to be mined(go through the block chain)
            //                                                               // the order of parameters is important, the order of the parameters in the addToBlockchain function is important
            setIsLoading(true); // set the loading state to true
            console.log(`Loading:-- ${transactionHash.hash}`);
            await transactionHash.wait(); // wait for the transaction to be mined
            setIsLoading(false); // set the loading state to false
            console.log(`Transaction Mined, Success:-- ${transactionHash.hash}`); // log the transaction hash

            const transactionCount = await transactionContract.getTransactionCount(); // get the transaction count
            setTransactionCount(transactionCount.toNumber()); // set the transaction count in the state variable

            window.location.reload();
            

        } catch (error) {
            console.log(error);
            throw new Error("No Ethereum Object found");
        }
    };


    useEffect(() => {
        checkIfWalletIsConnected();
        checkIfTransactionsExist();
    }, [transactionCount]);




    return (  // weapping our entire react application with all of the data that will be passed to it
        <TransactionContext.Provider value={{ connectWallet, currentAccount, formData, sendTransaction, handleChange, Transactions, isLoading }}> {/* // pass the provider value to the provider component */}
            {children} {/* // whatever we pass to the provider component will be rendered inside the provider component */}
        </TransactionContext.Provider>    
    );
} 


//transactionCount.toNumber()?
// toNumber() is a utility function from ethers library to convert the transaction count to number

// what is localStorage.getItem('transactionCount')?	
// localStorage.getItem('transactionCount') is a function which will return the value of the transaction count in the local storage.

//what is a react context?
//https://reactjs.org/docs/context.html

// what is new ethers.providers.Web3Provider(ethereum)?
// https://docs.ethers.io/ethers.js/html/api-providers.html#providers-web3provider

//what is a new ethers.Contract(contractAddress, contractABI, signer)?
// https://docs.ethers.io/ethers.js/html/api-contract.html#contract-constructor