import React, {useContext} from 'react'
import { AiFillPlayCircle } from 'react-icons/ai' 
import { SiEthereum } from 'react-icons/si'
import { BsInfoCircle } from 'react-icons/bs'	
import { Loader } from './' // Loader.jsx //we can also write Loader after ./ in the import statement
import { TransactionContext } from "../context/TransactionContext";
import {shortenAddress} from '../utils/shortenAddress'; // shortenAddress function from utils/shortenAddress.js
 
const commonStyles = "text-white border-gray-400 border-[0.5px] flex justify-center items-center text-sm font-light px-2 sm:px-0 min-h-[70px] sm:min-w-[120px]" // common styles for all the features


const Input = ({placeholder, type, name, value, handleChange}) => ( //custom input component which will be reused and placed in the blue color div below the gradient eth card
    <input 
    placeholder={placeholder}
    step="0.0001"
    type={type}
    value={value}
    onChange={(e) => handleChange(e, name)} // handle the change in the input field and pass the event and the name of the input field as arguments to the handleChange function which is passed as a prop to the input component by TransactionContext.jsx
    className="w-full my-2 p-2 bg-transparent outline-none rounded-sm text-white border-none white-glassmorphism text-sm"
    />
) 


const Welcome = () => {

    const { connectWallet, currentAccount, formData, sendTransaction, handleChange, isLoading } = useContext(TransactionContext); // get the connectWallet function from the context
    //console.log(currentAccount);

    const handleSubmit = (e) => {
        const { addressTo, amount, keyword, message } = formData; // get the form data from the state variable

        e.preventDefault(); // prevent the default behaviour of the form which when we press submit it refreshes the page but we don't want that

        if (!addressTo || !amount || !keyword || !message) { // if any of the form fields are empty then throw an alert
            return alert("Please fill all the fields");
        }

        sendTransaction(); // call the sendTransaction function which is passed as a prop to the TransactionContextProvider component
    }


    return (
        <div className='flex w-full justify-center items-center'> {/* className will center the entire welcome part  */}
            <div className='flex md:flex-row flex-col items-start justify-between md:p-20 px-4 py-12'>
                <div className='flex flex-1 justify-start flex-col md:mr-10'>
                    <h1 className='text-3xl sm:text-5xl text-white text-gradient py-1'> 
                        Send Crypto <br /> across the world  
                    </h1>
                    <p className='text-left text-white mt-5 font-light md:w-9/12 w-11/12 text-base'>
                        Explore the world of crypto and send money to anyone, anywhere in the world    
                    </p>
                    {!currentAccount ? (<button type="submit" onClick={connectWallet} className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd] "> 
                        <p className="text-white text-base font-semibold"> 
                            Connect Wallet 
                        </p>
                    </button>) : ( 
                    <button type="button" disabled className="flex flex-row justify-center items-center my-5 bg-[#cccccc] p-3 rounded-full cursor-not-allowed "> 
                    <p className="text-[#666666] text-base font-semibold"> 
                        Wallet Connected
                    </p>
                </button> ) }
                    <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10"> {/* grid of features where we can add more features */}
                        <div className={`rounded-tl-2xl ${commonStyles}`}>
                            Relaibility
                        </div>
                        <div className={`${commonStyles}`}>
                            Security
                        </div>
                        <div className={`sm:rounded-tr-2xl ${commonStyles}`}>
                            Speed
                        </div>
                        <div className={`sm:rounded-bl-2xl ${commonStyles}`}>
                            Ethereum
                        </div>
                        <div className={`${commonStyles}`}>
                            Web 3.0
                        </div>
                        <div className={`rounded-br-2xl ${commonStyles}`}>
                            Blockchain
                        </div>
                    </div>
                </div>

                <div className="flex flex-col flex-1 items-center justify-start w-full md:mt-0 mt-10"> {/* this is the right side of the welcome page  */} 
                    <div className="p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorphism"> {/* this is the right side gradient card of the welcome page , eth card gradient is made from csshero.org/mesher */} 
                        <div className="flex flex-col justify-between h-full w-full"> {/* div inside the card to contain the icon and the text(address and ethereum) */}
                            <div className="flex items-start justify-between"> {/* // div for the logos in a row, means info and ethereum logo placement div */}
                                <div className="flex h-10 w-10 border-white border-2 rounded-full items-center justify-center"> {/* //circle in which ethereum logo is placed */}
                                    <SiEthereum  fontSize={21} color="#fff" />
                                </div>
                                <BsInfoCircle fontSize={17} color="#fff" />
                            </div>
                            <div>  {/* // div for the address connected to the ethereum wallet and ethereum text */} 
                                <p className="text-white text-sm font-light">
                                    {currentAccount ? shortenAddress(currentAccount) : "Connect Wallet"} {/* // if the currentAccount is not null then display the currentAccount else display the connectWallet text */}
                                </p>
                                <p className="text-white text-lg font-semibold mt-1">
                                    Ethereum
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="blue-glassmorphism p-5 sm:w-96 w-full flex flex-col justify-start items-center"> {/* // below card  is the blue color semi transparent div in which input buttons are placed */}
                        <Input  placeholder="Address To" name="addressTo" type="text" handleChange={handleChange} className="w-full h-10 p-2 border-2 border-white rounded-full" /> 
                        <Input  placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} className="w-full h-10 p-2 border-2 border-white rounded-full" />
                        <Input  placeholder="Keyword (Gif)" name="keyword" type="text" handleChange={handleChange} className="w-full h-10 p-2 border-2 border-white rounded-full" />
                        <Input  placeholder="Enter Message" name="message" type="text" handleChange={handleChange} className="w-full h-10 p-2 border-2 border-white rounded-full" />

                        <div className="h-[1px] w-full bg-gray-400 my-2"/>  {/* this is the line below the input buttons */}

                        {isLoading ? ( <Loader/> ) : ( 
                            <button type="submit" onClick={handleSubmit} className="text-white w-full mt-2 border-[1px] flex flex-row justify-center items-center my-5 border-[#3d4f7c] p-2 rounded-full cursor-pointer hover:active:bg-[#48527a]" >
                                Send Now
                            </button>
                        )}
                    </div>
                </div>

            </div>
        </div>
    )
} 

export default Welcome 