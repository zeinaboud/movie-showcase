import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { FaBars } from "react-icons/fa6";
import { FaX } from "react-icons/fa6";;
import { CiSearch } from "react-icons/ci";
import { CiBellOn } from "react-icons/ci";

const Navbar = () => {
    const [isScroll, setIsScroll] = useState(false);
    const [isopen, setisopen] = useState(false);
 
    
    const toggleNavbar = () => {
        setisopen(!isopen);
    }
    

    // nav items 
    const navItems = [
        { label: 'Home', path: '/' },
        { label: 'Trending', path: '#trending' },
        { label: 'papular', path: '#papular' },
       
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScroll(window.scrollY > 50)
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


return (
    <nav className={' fixed top-0 left-0 z-50 md:px-16 px-4 py-2 md:py-6 w-full  h-[8ch] backdrop-blur-md '}>
            <div className={`flex justify-between items-center 
            w-[full] h-full transition-all ease-in-out duration-300 
            ${isScroll ? 'bg-tras' : 'bg-transparent'}`}>
                {/*logo section */}
                <div className={'flex items-center gap-2 px-6 pr-0 md:pr-16'}>
                    <a to="/" className='' >
                        <img className='w-16' src="/logo.png" alt="" />
                    </a>
                </div>

                {/*hunburger menu for mobile */}
                <div className='md:hidden px-6'>
                    <button onClick={toggleNavbar} className=' text-[#c11f30] focus:outline-none cursor-pointer' >
                        {isopen
                            ? (<FaX size={24} />) 
                            : (<FaBars size={24} />)
                        }
                    </button>

                </div>
                {/*navbar items and buttons */}
                <div className={`${isopen ? 'flex absolute top-20 left-0 w-full h-auto md:h-auto md:relative' : 'hidden'}
                flex-1 md:flex flex-col md:flex-row md:gap-14 gap-5 md:items-center md:justify-between md:p-0 sm:p-4 p-4
                md:bg-transparent bg-neutral-950/70 backdrop-blur-3xl transition-transform md:shadow-none sm:shadow-md shadow-md
                rounded-md `}>
                    <ul className='flex md:items-center items-center flex-wrap  flex-col md:flex-row md:gap-6 gap-4 text-sm
                    text-stone-50  md:text-stone-600 font-medium uppercase'>
                        
                        {navItems.map((item, index) => (
                            <li key={index}>
                                <a href={item.path} className='text-white border-b border-amber-50 md:border-none pb-2 text-center hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#c11f30] hover:to-[#1B1F86]  hover:text-neutral-200 ease-in-out duration-300'>{item.label}</a>
                            </li>
                        ))}
                        </ul>
                </div>
                {/*buttons on the left */}
                <div className='hidden  md:flex gap-2'>
                    <a href="">
                        <CiBellOn className='text-white' size={24} />
                    </a>
                     <button className="w-8 h-8 rounded-full border border-neutral-700/70 p-0.5">
                            <img src="https://cdn.pixabay.com/photo/2024/05/14/09/26/ai-generated-8760744_1280.png" alt="" className="w-full h-full object-cover object-center rounded-full" />
                        </button>
                </div>
            </div>
            
        </nav>
        
  )
}

export default Navbar