import React, { useContext} from 'react'; 

import { TransactionContext } from '../context/TransactionContext';
import dummyData from '../utils/dummyData';
import { shortenAddress } from '../utils/shortenAddress';
import useFetch from '../hooks/useFetch';

const TransactionCard = ({ addressTo, addressFrom, timestamp, message, keyword, amount, url }) => {

    const gifUrl = useFetch({keyword}); // get the gif url using useFetch hook
    url = "https://media.giphy.com/media/3zhxq2ttgN6rEw8SDx/giphy.gif"

    return (
        <div className='bg-[#181918] m-4 flex flex-1 flex-col p-3 rounded-md min-w-full hover:shadow-2xl
        2xl:min-w-[450px] 
        2xl:max-w-[500px] 
        sm:min-w-[270px]
        sm:max-w-[300px]'>
            <div className='flex flex-col items-center w-full mt-3'>
                <div className=' w-full mb-6 p-2'>
                    <a href={`https://ropsten.etherscan.io/address/${addressFrom}`} target="_blank" rel='noopener noreferrer'>
                        <p className='text-white text-base'> From: {shortenAddress(addressFrom)} </p>
                    </a>
                    <a href={`https://ropsten.etherscan.io/address/${addressTo}`} target="_blank" rel='noopener noreferrer'>
                        <p className='text-white text-base'> To: {shortenAddress(addressTo)} </p>
                    </a>
                    <p className='text-white text-base'>Amount: {amount} ETH </p>
                    {message && ( // if message is not null and if message is null then it will not render anything 
                        <>   {/* // then render the following , this is a react fragment  */}
                        <br /> {/* // line break */}
                       <p className='text-white text-base'>Message: {message} </p> 
                       </> // end of react fragment
                    )}
                </div>
                <img 
                    src={ gifUrl || url }
                    alt = "gif"
                    className='w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover' 
                />

                <div className='bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl'>
                    <p className='text-[#37c7da] font-bold'>{timestamp}</p>
                </div>
            </div>
        </div>
    )
}


const Transactions = () => {
    const { currentAccount, Transactions } = useContext(TransactionContext); // get the transactionContract and currentAccount from the context object

    return (
        <div className='flex flex-col w-full justify-center items-center 2xl:px-20 gradient-bg-transactions'>
            <div className='flex flex-col md:p-12 px-4 py-12'>
                {currentAccount ? (
                    <h3 className='text-white text-3xl text-center my-2'>Latest transactions, messages and gifs</h3>
                ) : ( 
                    <h3 className='text-white text-3xl text-center my-2'>Please connect your wallet to view the latest transactions</h3>    
                )}
            </div>
            <div className='flex flex-wrap justify-center items-center mt-10'>
                {[...Transactions].reverse().map((transaction, index) => ( // reverse the array and map over it
                    <TransactionCard key={index} {...transaction} />
                ))}
            </div>
        </div>
    )
}

export default Transactions

// .map() and reverse() only works on arrays
// [...Transactions] is the spread operator which converts the array to an array of elements

