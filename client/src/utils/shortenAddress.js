export const shortenAddress = (address) => ( // implicit return
`${address.slice(0, 6)}...${address.slice(address.length - 5)}`
);
// function to shorten address length
//address = '0x12345678901234567890123456789012345678901';
//console.log(shortenAddress(address));
// address.slice(0, 6) = '0x12345' it takes total of 5 characters as indicated from 0 to 5 
//address.slice(address.length - 5) = '678901' it takes total of 5 characters as indicated from end of address