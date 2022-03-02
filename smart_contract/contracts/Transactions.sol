// SPDX-License-Identifier: UNLICENSED 

pragma solidity ^0.8.0; //using solidity version 0.8.0


contract Transactions { // this contract is serving as class 
    uint256 transactionCount; // this is a variable of type uint256 that will be used to count the number of transactions (number of transactions)

    event Transfer(address from, address receiver, uint amount, string message, uint256 timestamp, string keyword); // this is a event that will be triggered when a transaction is made //function that we will emit/call later

    struct TransferStruct { // this is a struct that will be used to store the data of the transaction
        address sender; // this is the address of the sender
        address receiver; // this is the address of the receiver
        uint amount; // this is the amount of the transaction
        string message; // this is the message of the transaction
        uint256 timestamp; // this is the timestamp of the transaction
        string keyword; // this is the keyword of the transaction
    }

    TransferStruct[] transactions; // this is an array of structs that will be used to store the data of the transactions(which is a variable of type struct)

    function addToBlockchain(address payable receiver, uint amount, string memory message, string memory keyword) public { // this is a payable(can be paid) function that will be used to add a transaction to the blockchain and can be accessed by anyone (public)
        transactionCount++; // this is the counter that will be increased by 1 every time a transaction is made
        // transactions.push(TransferStruct({ // this is adding a new transaction to the list of all the transactions .push is a function that will add a new element to the end of the array
        //     sender: msg.sender, // this is the address of the sender
        //     receiver: receiver, // this is the address of the receiver
        //     amount: amount, // this is the amount of the transaction
        //     message: message, // this is the message of the transaction
        //     timestamp: block.timestamp, // this is the timestamp of the transaction
        //     keyword: keyword // this is the keyword of the transaction
        // })); // this is the push that will be used to store the data of the transaction

        //above transactions.push is doing the same thing as below
        transactions.push(TransferStruct(msg.sender, receiver, amount, message, block.timestamp, keyword)); // this is the push that will be used to store the data of the transaction

        emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword); // this is the emit that will be used to trigger the event

    }

    function getAllTransactions() public view returns (TransferStruct[] memory) { // this is a function that will be used to get all the transactions from memory and can be accessed by anyone (public) and can only be viewed(means it can not modify the state )
        return transactions; // this is the array of structs that will be returned
    }

    function getTransactionCount() public view returns (uint256) { // this is a function that will be used to get the number of transactions and can be accessed by anyone (public) and can only be viewed(means it can not modify the state )
        return transactionCount; // this is the number of transactions that will be returned
    }
}

