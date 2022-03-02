import {useState} from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

import logo from "../../images/logo.png";

//Navbar item component with title and classProps as props 
const NavbarItem = ({ title, classProps }) => {
  return (
    <li className={`mx-4 cursor-pointer ${classProps}`}>
      {title}
    </li>
  );
};


const Navbar = () => {
  const [toggleMenu, settoggleMenu] = useState(false); //state for menu toggle for mobile navbar(navigation)

  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4">
        <div className="md:flex-[0.5] flex-initial justify-center items-center">
            <img src={logo} alt="logo" className="w-32 cursor-pointer"/>
        </div>
        <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
          {/* <NavbarItem title="Home" classProps="text-white" /> for a single title */}
          {["Market", "Exchange", "Tutorials", "Wallets"].map((title, index) => (  //for multiple titles, map through the array and return the NavbarItem component
            <NavbarItem key={title + index} title={title} classProps="text-white" />
          ))}        
          <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2545bd]"> {/* for a button with a background color and hover color */} 
            Login 
          </li>
        </ul>
        <div className="flex relative"> 
            {toggleMenu //if toggleMenu is true, return the menu icon, else return the close icon 
              ?  <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => settoggleMenu(false)} /> //onClick event to close the menu
              : <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => settoggleMenu(true)} />  //onClick={() => settoggleMenu(true)} toggles the menu
            }
            {toggleMenu && ( //if toggleMenu is true, return the menu items, else return nothing}  
              <ul className="z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none 
              flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"> {/* //ul className to position the menu items */}
                <li className="text-xl w-full my-2"> 
                  <AiOutlineClose onClick={() => settoggleMenu(false)} /> {/* //onClick event to close the menu */}
                </li>
                {["Market", "Exchange", "Tutorials", "Wallets"].map((title, index) => ( //map through the array and return the NavbarItem component for mobile responsive
                  <NavbarItem key={title + index} title={title} classProps="my-2 text-lg" />
                ))}
              </ul>
            )}
        </div>
    </nav>
  );
};

export default Navbar;
