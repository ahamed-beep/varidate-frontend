import React, { useEffect, useState } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Search, X } from "lucide-react";
import { Link } from 'react-router-dom';;
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { siginuserform } from '../Redux/Auth';


function Newaccount() {
  const [firstname , setFirstname]=useState('');
  const [lastname , setLastname]=useState('');
  const [email , setEmail]=useState('');
  const [password , setPassword]=useState('');
  const dispatch = useDispatch();
  const firstnamehandler =(e)=>{
    setFirstname(e.target.value)
  };
  const lastnamehandler =(e)=>{
    setLastname(e.target.value)
  };
  const emailhandler =(e)=>{
    setEmail(e.target.value)
  };
  const passwordhandler =(e)=>{
    setPassword(e.target.value)
  };
  const data ={
    firstname,
    lastname,
    email,
    password
  }
  const formhandler = async(e)=>{
    e.preventDefault();
    const responce = await dispatch(siginuserform(data))
    if(responce){
      setFirstname('');
      setLastname('');
      setEmail('');
      setPassword('')
      console.log(responce)
    }
    else{
      console.log('error occured')
    }
  }
     const [isOpen, setIsOpen] = useState(false);
      const [isDropdownOpen, setIsDropdownOpen] = useState(false);
        const [isNestedOpen, setIsNestedOpen] = useState(false);
        const [isSecondNestedOpen, setIsSecondNestedOpen] = useState(false);
          const [openSections, setOpenSections] = useState({
            services: false,
            company: false,
            legal: false
          });
          const topRef = useRef(null);
        
          const scrollToTop = () => {
            topRef.current?.scrollIntoView({ behavior: 'smooth' });
          };
        
        
          const toggleSection = (section) => {
            setOpenSections(prev => ({
              ...prev,
              [section]: !prev[section]
            }));
          };
  return (
    <div>
           <div className='display-flex justify-center text-center gap-1  '>
            <h1  className='bg-yellow-400 p-2.5 text-xl font-semibold font-sans text-gray-800 hover:text-transparent transition-all duration-500' >
            Winter Sale is Live UPTO 70% OFF
            </h1>
            </div>
                  <div className='border-b border-gray-300 hidden md:flex justify-between'>
              <div className='flex p-1 pl-5'>
                <div className='flex items-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-yellow-500 w-4">
                    <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                  </svg>
                  <p className='text-xs pr-3 py-1 pl-2'>+92 335-8544254</p>
                  <p className='pl-2 mr-3 text-gray-200'>|</p>
                </div>
            
                {/* Email Icon and Address */}
                <div className='flex items-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-yellow-500 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                  <p className='text-xs pr-3 py-1 pl-2'>Ahadpk@gmail.com</p>
                </div>
              </div>
            
            
              <div className='flex p-1'>
                {/* Store Location */}
                <div className='flex items-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                  <p className='text-xs pr-3 py-1 pl-1 text-medium'>Store Location</p>
                  <p className='pl-2 mr-3 text-gray-200'>|</p>
                </div>
            
                {/* Sign In or Register */}
                <div className='flex items-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                  <Link to="/form" className="text-xs pr-3 py-1 pl-1">
                    Sign in or Register
                  </Link>
                </div>
            
                {/* Menu (Currencies) */}
                <div className='pl-3 pr-2'>
                  <Menu as="div" className="relative">
                    <div>
                      <MenuButton className="relative flex text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:outline-hidden">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                        </svg>
                      </MenuButton>
                    </div>
                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                    >
                      <MenuItem>
                        <a
                          href="#"
                          className="border border-t-yellow-300 font-bold block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                        >
                          Currencies
                        </a>
                      </MenuItem>
                      <MenuItem>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                        >
                          PKR
                        </a>
                      </MenuItem>
                    </MenuItems>
                  </Menu>
                </div>
              </div>
            </div>
            <div className="navbar bg-base-100 sticky top-0 left-0 right-0 z-50">
              {/* Navbar Start (Logo and Mobile Menu) */}
              <div className="navbar-start">
                <div
                  tabIndex={0}
                  role="button"
                  className="m-1 ml-1 bg-white border border-none lg:hidden"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                </div>
            
                {/* Custom Logo with Left Margin */}
                <div className="w-full flex justify-center">
                  <img
                    src="https://up.yimg.com/ib/th?id=OIP.FXNDatcWXUZ1jY50IdDK8AAAAA&pid=Api&rs=1&c=1&qlt=95&w=371&h=119"
                    className="w-40 sm:w-52 max-w-full h-auto p-2"
                    alt="Logo"
                  />
                </div>
              </div>
            
              {/* Navbar Center (Search Bar for Desktop) */}
              <div className="navbar-center hidden md:flex">
                <div className="flex items-center border-2 border-yellow-400 rounded-full px-4 py-2 w-130">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full outline-none bg-transparent"
                  />
                  <Search className="text-gray-500 ml-2" size={20} />
                </div>
              </div>
            
              {/* Navbar End (Search Bar for Mobile and Icons) */}
              <div className="navbar-end">
                {/* Mobile Search Icon and Icons */}
                <div className="md:hidden flex items-center gap-4 pr-4">
                  {/* Search Icon */}
                  {!isOpen ? (
                    <button onClick={() => setIsOpen(true)}>
                      <Search className="text-gray-600" size={24} />
                    </button>
                  ) : (
                    <div className="absolute top-0 left-0 w-full bg-white p-2 shadow-md flex items-center">
                      <input
                        type="text"
                        placeholder="Search..."
                        className="w-full p-2 bg-white text-black border-2 border-yellow-400 rounded-lg focus:outline-none focus:border-yellow-500"
                      />
                      <button onClick={() => setIsOpen(false)}>
                        <X className="text-gray-600 ml-2" size={24} />
                      </button>
                    </div>
                  )}
            
                  {/* Heart Icon */}
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="size-6">
                      <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                    </svg>
                  </div>
            
                  {/* Cart Icon */}
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="size-6">
                      <path fillRule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
            
                {/* Icons for Large Screens with Right Margin */}
                <div className="hidden md:flex gap-8 justify-center text-center mr-4">
            
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                  </div>
            
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="size-6">
                      <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                    </svg>
                  </div>
            
                
                  <div className="mr-20">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="size-6">
                      <path fillRule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-wrap'>
      <div className="dropdown dropdown-start ml-27">
            {/* "All Departments" Button */}
            <div tabIndex={0} role="button" className="btn pr-30 mt-4 bg-yellow-400 hidden lg:inline-flex rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              All Departments
            </div>
      
            {/* Main Dropdown Menu */}
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box w-52 p-2 shadow">
              <li><a>Item 1</a></li>
              <li
                onMouseEnter={() => setIsNestedOpen(true)}
                onMouseLeave={() => setIsNestedOpen(false)}
                className="relative"
              >
                <a>Item 2 (Hover Me)</a>
      
                {/* First Nested Dropdown */}
                {isNestedOpen && (
                  <ul className="absolute left-full top-0 ml-0 bg-base-100 rounded-box shadow w-48 p-2">
                    <li><a>Nested Item 1</a></li>
                    <li><a>Nested Item 2</a></li>
                    <li
                      onMouseEnter={() => setIsSecondNestedOpen(true)}
                      onMouseLeave={() => setIsSecondNestedOpen(false)}
                      className="relative"
                    >
                      <a>Nested Item 3 (Hover Me)</a>
      
                      {/* Second Nested Dropdown */}
                      {isSecondNestedOpen && (
                        <ul className="absolute left-full top-0 ml-0 bg-base-100 rounded-box shadow w-48 p-2">
                          <li><a>Deep Nested Item 1</a></li>
                          <li><a>Deep Nested Item 2</a></li>
                          <li><a>Deep Nested Item 3</a></li>
                        </ul>
                      )}
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </div>
      
      
        <nav className="ml-15 mt-4  flex-wrap items-center text-base hidden sm:flex">
          <a className="mr-5 hover:text-red-500 font-bold transition duration-300 cursor-pointer">Home</a>
          <a className="mr-5 font-bold cursor-pointer">About Us</a>
          <a className="mr-5 font-bold cursor-pointer">Eveen Organics</a>
          <a className="relative mr-5 font-bold cursor-pointer">
            Best sellers
            <div>
              <p className='font-semibold absolute bg-blue-500 text-white text-xs px-2 pt-0 rounded-sm ml-14 -mt-8.5'>sale</p>
            </div>
          </a>
        </nav>
      </div>
      <div className='flex mt-8 md:ml-30 ml-5 font-sans '>
        <Link to={'/'} className=' hover:text-yellow-300 transition duration-300'>Home</Link>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 mt-1 ml-1 mr-1">
        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"  />
      </svg>
      <p>Create Account</p>
      </div>
      <div className='flex flex-col justify-start md:justify-center font-sans  md:gap-15 md:flex-row mb-30 ' >
         <form  onSubmit={formhandler} className='border-r border-gray-300 pr-10 ml-5 md:ml-15 mt-10' >
            <div className='flex flex-wrap'>
            <h1 className=' text-3xl border-b border-yellow-400' >Create New Account</h1><div className='w-45 border-b border-gray-300'></div>
            </div>
            <p className='mt-2'>Create your own Account</p>
            <div className='mt-3 flex-col flex'>
            <label className='font-semibold '>First Name*</label>
            <input type='text' id='firstname' name='fistname' autoComplete='text' onChange={firstnamehandler} value={firstname} required className='md:w-110 w-full h-12 mt-2 bg-white rounded-4xl border border-gray-300 outline-none pl-5'/>
            </div>
            <div className='mt-3 flex-col flex'>
            <label className='font-semibold '>Last Name*</label>
            <input type='text' id='lastname' name='lastname' autoComplete='text' onChange={lastnamehandler} value={lastname} required className='md:w-110 w-full h-12 mt-2 bg-white rounded-4xl border border-gray-300 outline-none pl-5'/>
            </div>
            <div className='mt-3 flex-col flex'>
            <label className='font-semibold '>Email*</label>
            <input type='email' id='email' name='email' autoComplete='email' onChange={emailhandler} value={email} required className='md:w-110 w-full h-12 mt-2 bg-white rounded-4xl border border-gray-300 outline-none pl-5'/>
            </div>
            <div className='mt-3 flex-col flex'>
            <label className='font-semibold '>Password*</label>
            <input type='password' id='password' name='password' autoComplete='password' onChange={passwordhandler} value={password} required className='md:w-110 w-full h-12 mt-2 bg-white rounded-4xl border border-gray-300 outline-none pl-5'/>
            </div>
          
            <div className=' mb-10 md:mb-0'>
              <button className=' md:w-40 w-full px-10 py-3 rounded-3xl bg-yellow-400 font-bold hover:bg-black hover:text-white transition duration-300 mt-5'>
                Register
              </button>
            </div>
            <div className='border-b border-gray-300 block md:hidden '></div>
            <div className='mt-10'>
            <p className='mt-2 text-xl'>Sign up today and you'll be able to :</p>
    <div className='flex mt-3'>
    <svg 
  xmlns="http://www.w3.org/2000/svg" 
  fill="none" 
  viewBox="0 0 24 24" 
  strokeWidth={1.5} 
  stroke="currentColor" 
  className="size-5 text-green-500 mt-1 mr-0.5"
>
  <path 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    d="m4.5 12.75 6 6 9-13.5" 
  />
</svg>
<p>Speed your way through the checkout</p>
</div>
<div className='flex mt-2'>
    <svg 
  xmlns="http://www.w3.org/2000/svg" 
  fill="none" 
  viewBox="0 0 24 24" 
  strokeWidth={1.5} 
  stroke="currentColor" 
  className="size-5 text-green-500 mt-1 mr-0.5"
>
  <path 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    d="m4.5 12.75 6 6 9-13.5" 
  />
</svg>
<p>Track your orders easily</p>
</div>
<div className='flex mt-2'>
    <svg 
  xmlns="http://www.w3.org/2000/svg" 
  fill="none" 
  viewBox="0 0 24 24" 
  strokeWidth={1.5} 
  stroke="currentColor" 
  className="size-5 text-green-500 mt-1 mr-0.5"
>
  <path 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    d="m4.5 12.75 6 6 9-13.5" 
  />
</svg>
<p>Keep a record of all your purchases</p>
</div>
</div>       </form>
          <form className='mt-10 ml-5 md:ml-0'>
          <div className='flex flex-wrap'>
              <h1 className=' flex  text-3xl border-b border-yellow-400' >Login</h1><div className=' w-full md:w-90 border-b border-gray-300'></div>
              </div>
              <p className='mt-2'>Welcome back! Have an account</p>
             
          <div>
                <button className=' md:w-40 w-full px-10 py-3 rounded-3xl bg-yellow-400 font-bold hover:bg-black hover:text-white transition duration-300 mt-5'>
                 <Link to={'/form'}> Login</Link>
             
                </button>
              </div>
          </form>

      </div>
      <div>
<div className=' flex justify-center flex-wrap  gap-20 w-full   font-sans text-xl ' >
  <h1 className='border-b border-yellow-400  hidden  md:block ' >Featured products</h1>
  <h1 className='border-b border-yellow-400 hidden  md:block '>Onsale Products</h1>
  <h1 className='border-b border-yellow-400 '>Pakistan's Choice</h1>
</div>
<div className=' flex flex-col md:flex-row'>
  <div className='  w-full md:ml-10 mt-10'>
    <div className='flex flex-wrap '>
      
      <div className='mb-4 border-b border-gray-200 w-full sm:w-full md:w-1/4 lg:w-1/3 md:border-r'>
        <div className='flex p-3 gap-5'>
          <div className="group relative w-30 aspect-square overflow-hidden">
            <img 
              className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0" 
              src="https://eveen.pk/cdn/shop/products/WhatsAppImage2022-01-21at12.52.08PM.jpg?v=1714155535" 
              alt="Product"
            />
            <img 
              className="w-full h-full object-cover absolute top-0 left-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" 
              src="https://eveen.pk/cdn/shop/products/WhatsAppImage2022-01-21at12.52.06PM.jpg?v=1714155522&width=360" 
              alt="Product alternate view"
            />
          </div>
          <div className='flex flex-col justify-center mb-1'>
            <h3 className="text-xs font-medium hover:text-yellow-400 transition duration-200">
              3 Liter Refrigerator Kettle with Faucet
            </h3>
            <div className="mt-1 flex flex-col">
              <span className="text-red-500 text-sm mr-2 font-semibold">Rs.999</span>
              <span className="text-gray-400 text-sm line-through">Rs.1,450</span>
            </div>
          </div>
        </div>
      </div>


      <div className='mb-4 border-b border-gray-200 w-full sm:w-full md:w-1/4 lg:w-1/3 md:border-r'>
        <div className='flex p-3 gap-5'>
          <div className="group relative w-30 aspect-square overflow-hidden">
            <img 
              className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0" 
              src="https://eveen.pk/cdn/shop/products/WhatsAppImage2022-01-29at10.06.14AM.jpg?v=1714155507" 
              alt="Product"
            />
            <img 
              className="w-full h-full object-cover absolute top-0 left-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" 
              src="https://eveen.pk/cdn/shop/products/WhatsAppImage2022-01-29at10.06.14AM_2.jpg?v=1714155506" 
              alt="Product alternate view"
            />
          </div>
          <div className='flex flex-col justify-center mb-1'>
            <h3 className="text-xs font-medium hover:text-yellow-400 transition duration-200">
              Translucent Dustproof Garment Bags
            </h3>
            <div className="mt-1 flex flex-col">
              <span className="text-red-500 text-sm mr-2 font-semibold">Rs.450</span>
              <span className="text-gray-400 text-sm line-through">Rs.600</span>
            </div>
          </div>
        </div>
      </div>

      <div className='mb-4 border-b border-gray-200 w-full sm:w-full md:w-1/4 lg:w-1/3 '>
        <div className='flex p-3 gap-5'>
          <div className="group relative w-30 aspect-square overflow-hidden">
            <img 
              className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0" 
              src="https://eveen.pk/cdn/shop/products/image_c6b3b478-6ddc-4417-9671-9974e52c981a.jpg?v=1714154763&width=540" 
              alt="Product"
            />
            <img 
              className="w-full h-full object-cover absolute top-0 left-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" 
              src="https://eveen.pk/cdn/shop/products/image_f09e512a-b190-465f-982b-0a3d4528d5c5.jpg?v=1714154761" 
              alt="Product alternate view"
            />
          </div>
          <div className='flex flex-col justify-center mb-1'>
            <h3 className="text-xs font-medium hover:text-yellow-400 transition duration-200">
              Amazing Electric Water Dispenser
            </h3>
            <div className="mt-1 flex flex-col">
              <span className="text-red-500 text-sm mr-2 font-semibold">Rs.1,499</span>
              <span className="text-gray-400 text-sm line-through">Rs.2,000</span>
            </div>
          </div>
        </div>
      </div>

  
      <div className='mb-4 border-b border-gray-200 w-full sm:w-full md:w-1/4 lg:w-1/3 md:border-r'>
        <div className='flex p-3 gap-5'>
          <div className="group relative w-30 aspect-square overflow-hidden">
            <img 
              className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0" 
              src="https://eveen.pk/cdn/shop/files/image_50cb415c-0462-47c9-96ed-e6197ae6e871.jpg?v=1714153675&width=540" 
              alt="Product"
            />
            <img 
              className="w-full h-full object-cover absolute top-0 left-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" 
              src="https://eveen.pk/cdn/shop/files/image_052be2b0-bdc7-4f59-98a7-3e026c56bcd9.jpg?v=1714153678" 
              alt="Product alternate view"
            />
          </div>
          <div className='flex flex-col justify-center mb-1'>
            <h3 className="text-xs font-medium hover:text-yellow-400 transition duration-200">
              Telescopic Mobile Holder, Live Selfie
            </h3>
            <div className="mt-1 flex flex-col">
              <span className="text-red-500 text-sm mr-2 font-semibold">Rs.690</span>
              <span className="text-gray-400 text-sm line-through">Rs.2,300</span>
            </div>
          </div>
        </div>
      </div>


      <div className='mb-4 border-b border-gray-200 w-full sm:w-full md:w-1/4 lg:w-1/3 md:border-r'>
        <div className='flex p-3 gap-5'>
          <div className="group relative w-30 aspect-square overflow-hidden">
            <img 
              className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0" 
              src="https://eveen.pk/cdn/shop/products/image_97a67f30-801d-47bb-8d52-f13bfe0b9cd5.jpg?v=1714111964&width=540" 
              alt="Product"
            />
            <img 
              className="w-full h-full object-cover absolute top-0 left-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" 
              src="https://eveen.pk/cdn/shop/products/image_67b7633b-4464-4657-9445-b998d7c40060.jpg?v=1714111961&width=360" 
              alt="Product alternate view"
            />
          </div>
          <div className='flex flex-col justify-center mb-1'>
            <h3 className="text-xs font-medium hover:text-yellow-400 transition duration-200">
              Washing Gloves, Silicone Dish Washer
            </h3>
            <div className="mt-1 flex flex-col">
              <span className="text-red-500 text-sm mr-2 font-semibold">Rs.499</span>
              <span className="text-gray-400 text-sm line-through">Rs.900</span>
            </div>
          </div>
        </div>
      </div>


      <div className='mb-4 border-b border-gray-200 w-full sm:w-full md:w-1/4 lg:w-1/3 '>
        <div className='flex p-3 gap-5'>
          <div className="group relative w-30 aspect-square overflow-hidden">
            <img 
              className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0" 
              src="https://eveen.pk/cdn/shop/files/image_9b3b52bf-0f82-4929-a94e-24bf03f15474.jpg?v=1714153535&width=540" 
              alt="Product"
            />
            <img 
              className="w-full h-full object-cover absolute top-0 left-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" 
              src="https://eveen.pk/cdn/shop/files/image_0999f008-6f99-473e-96c2-d769c4f438e2.jpg?v=1685356327&width=360" 
              alt="Product alternate view"
            />
          </div>
          <div className='flex flex-col justify-center mb-1'>
            <h3 className="text-xs font-medium hover:text-yellow-400 transition duration-200">
              Pair Of Butterfly Shoe Insole, Heel Liner
            </h3>
            <div className="mt-1 flex flex-col">
              <span className="text-red-500 text-sm mr-2 font-semibold">Rs.199</span>
              <span className="text-gray-400 text-sm line-through">Rs.350</span>
            </div>
          </div>
        </div>
      </div>

  
      <div className='mb-4 border-b border-gray-200 w-full sm:w-full md:w-1/4 lg:w-1/3 md:border-r'>
        <div className='flex p-3 gap-5'>
          <div className="group relative w-30 aspect-square overflow-hidden">
            <img 
              className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0" 
              src="https://eveen.pk/cdn/shop/products/image_0ece106f-c1aa-47b0-97f2-c5ce2e6dab2c.jpg?v=1714156343&width=360" 
              alt="Product"
            />
            <img 
              className="w-full h-full object-cover absolute top-0 left-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" 
              src="https://eveen.pk/cdn/shop/products/image_4efc5c5a-727a-43c5-910d-206eaf73448e.jpg?v=1714156341&width=360" 
              alt="Product alternate view"
            />
          </div>
          <div className='flex flex-col justify-center mb-1'>
            <h3 className="text-xs font-medium hover:text-yellow-400 transition duration-200">
              Stainless Steel Garlic Crusher, Garlic
            </h3>
            <div className="mt-1 flex flex-col">
              <span className="text-red-500 text-sm mr-2 font-semibold">Rs.499</span>
              <span className="text-gray-400 text-sm line-through">Rs.750</span>
            </div>
          </div>
        </div>
      </div>

      <div className='mb-4 border-b border-gray-200 w-full sm:w-full md:w-1/4 lg:w-1/3 md:border-r'>
        <div className='flex p-3 gap-5'>
          <div className="group relative w-30 aspect-square overflow-hidden">
            <img 
              className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0" 
              src="https://eveen.pk/cdn/shop/products/image_8fd2270e-832d-4a23-a821-667498373918.jpg?v=1714153951&width=540" 
              alt="Product"
            />
            <img 
              className="w-full h-full object-cover absolute top-0 left-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" 
              src="https://eveen.pk/cdn/shop/products/image_782a42d2-e546-4230-84e5-adcf9a901fde.jpg?v=1714153947&width=360" 
              alt="Product alternate view"
            />
          </div>
          <div className='flex flex-col justify-center mb-1'>
            <h3 className="text-xs font-medium hover:text-yellow-400 transition duration-200">
              Stainless Steel Oil Filter Pot, Kitchen Oil
            </h3>
            <div className="mt-1 flex flex-col">
              <span className="text-red-500 text-sm mr-2 font-semibold">Rs.1,999</span>
              <span className="text-gray-400 text-sm line-through">Rs.2,550</span>
            </div>
          </div>
        </div>
      </div>
      <div className='mb-4 border-b border-gray-200 w-full sm:w-full md:w-1/4 lg:w-1/3 '>
        <div className='flex p-3 gap-5'>
          <div className="group relative w-30 aspect-square overflow-hidden">
            <img 
              className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0" 
              src="https://eveen.pk/cdn/shop/products/image_8fd2270e-832d-4a23-a821-667498373918.jpg?v=1714153951&width=540" 
              alt="Product"
            />
            <img 
              className="w-full h-full object-cover absolute top-0 left-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" 
              src="https://eveen.pk/cdn/shop/products/image_782a42d2-e546-4230-84e5-adcf9a901fde.jpg?v=1714153947&width=360" 
              alt="Product alternate view"
            />
          </div>
          <div className='flex flex-col justify-center mb-1'>
            <h3 className="text-xs font-medium hover:text-yellow-400 transition duration-200">
              Stainless Steel Oil Filter Pot, Kitchen Oil
            </h3>
            <div className="mt-1 flex flex-col">
              <span className="text-red-500 text-sm mr-2 font-semibold">Rs.1,999</span>
              <span className="text-gray-400 text-sm line-through">Rs.2,550</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
 
  <div className=' w-full md:w-80 mr-10  md:mt-30 mt-5 '>
    <img src='https://eveen.pk/cdn/shop/files/39ED5FB0-36F1-4821-99EF-9D291F02D432.jpg?v=1722931822&width=540' className='w-100   object-cover '/>
  </div>
</div>
</div>
<div className='bg-yellow-300 w-full h-full md:h-25 mt-10 pt-5 flex-wrap '>
  <div className=' flex md:flex-row flex-col md:fex-col justify-center text-center '>
    <div className='flex justify-center md:ml-20'>
<svg  className='ml-5' xmlns="http://www.w3.org/2000/svg"  width="40"  height="40"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-send"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 14l11 -11" /><path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" /></svg>
<div className=' font-sans text-2xl ml-1 md:flex-col flex flex-row  '>
<h1  className='mr-1' >Sign up to  </h1><h1>Newsletter</h1>
</div>
</div>
<div className='ml-20 mr-5  gap-1 text-md mt-5 hidden md:block '>
  <div className='flex gap-1'>
  < p  >and receive</p> <p className=' font-semibold'> updates on special promotions, gift ideas, sales and  more.</p>
  </div>
</div>
<div className="relative w-full max-w-md mx-auto mt-3">
  <input 
    className="w-full bg-white rounded-2xl h-10 pl-4 pr-32 border border-gray-300 focus:outline-none"
    placeholder="Enter your email"
    type="email"
    required
  />
  <div className="mt-2 w-full md:mt-0 md:absolute md:inset-y-0 md:right-0 flex justify-center md:justify-normal md:w-28 md:-mr-6">
    <button  className="w-full cursor-pointer md:w-auto h-10 bg-gray-700 rounded-2xl md:rounded-l-none md:rounded-r-2xl px-4 text-white font-medium">
      Subscribe
    </button>
  </div>
</div>
</div>

</div>
<footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
  <aside>
    <img src='https://eveen.pk/cdn/shop/files/logo_94a8b223-deab-4122-b823-38fd49b52dde_200x.png?v=1671623025'/>
    <div className='flex mt-12'>
      <svg 
        className='w-4 mr-7 ml-2 filter drop-shadow-[0_0_0.5px_currentColor]' 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 320 512"
      >
        <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z"/>
      </svg>
      
      <svg 
        className='w-6 filter drop-shadow-[0_0_0.5px_currentColor]' 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 448 512"
      >
        <path d="M194.4 211.7a53.3 53.3 0 1 0 59.3 88.7 53.3 53.3 0 1 0 -59.3-88.7zm142.3-68.4c-5.2-5.2-11.5-9.3-18.4-12c-18.1-7.1-57.6-6.8-83.1-6.5c-4.1 0-7.9 .1-11.2 .1c-3.3 0-7.2 0-11.4-.1c-25.5-.3-64.8-.7-82.9 6.5c-6.9 2.7-13.1 6.8-18.4 12s-9.3 11.5-12 18.4c-7.1 18.1-6.7 57.7-6.5 83.2c0 4.1 .1 7.9 .1 11.1s0 7-.1 11.1c-.2 25.5-.6 65.1 6.5 83.2c2.7 6.9 6.8 13.1 12 18.4s11.5 9.3 18.4 12c18.1 7.1 57.6 6.8 83.1 6.5c4.1 0 7.9-.1 11.2-.1c3.3 0 7.2 0 11.4 .1c25.5 .3 64.8 .7 82.9-6.5c6.9-2.7 13.1-6.8 18.4-12s9.3-11.5 12-18.4c7.2-18 6.8-57.4 6.5-83c0-4.2-.1-8.1-.1-11.4s0-7.1 .1-11.4c.3-25.5 .7-64.9-6.5-83l0 0c-2.7-6.9-6.8-13.1-12-18.4zm-67.1 44.5A82 82 0 1 1 178.4 324.2a82 82 0 1 1 91.1-136.4zm29.2-1.3c-3.1-2.1-5.6-5.1-7.1-8.6s-1.8-7.3-1.1-11.1s2.6-7.1 5.2-9.8s6.1-4.5 9.8-5.2s7.6-.4 11.1 1.1s6.5 3.9 8.6 7s3.2 6.8 3.2 10.6c0 2.5-.5 5-1.4 7.3s-2.4 4.4-4.1 6.2s-3.9 3.2-6.2 4.2s-4.8 1.5-7.3 1.5l0 0c-3.8 0-7.5-1.1-10.6-3.2zM448 96c0-35.3-28.7-64-64-64H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96zM357 389c-18.7 18.7-41.4 24.6-67 25.9c-26.4 1.5-105.6 1.5-132 0c-25.6-1.3-48.3-7.2-67-25.9s-24.6-41.4-25.8-67c-1.5-26.4-1.5-105.6 0-132c1.3-25.6 7.1-48.3 25.8-67s41.5-24.6 67-25.8c26.4-1.5 105.6-1.5 132 0c25.6 1.3 48.3 7.1 67 25.8s24.6 41.4 25.8 67c1.5 26.3 1.5 105.4 0 131.9c-1.3 25.6-7.1 48.3-25.8 67z"/>
      </svg>
    </div>
  </aside>
  
  <nav>
    <h6 
      className="footer-title cursor-pointer sm:cursor-auto font-semibold" 
      onClick={() => toggleSection('Quick Links')}
    >
      Quick Links
      <span className="sm:hidden ml-2 ">
        {openSections['Quick Links'] ? '▼' : '▶'}
      </span>
    </h6>
    <div className={`${openSections['Quick Links'] ? 'block' : 'hidden'} sm:block font-sans`}>
      <a className="  cursor-pointer hover:text-yellow-300 duration-300 transition block">About Us</a>
   
    </div>
  </nav>
  
  <nav>
    <h6 
      className="footer-title cursor-pointer sm:cursor-auto font-semibold" 
      onClick={() => toggleSection('Customer Services')}
    >
      Customer Services
      <span className="sm:hidden ml-2">
        {openSections['Customer Services'] ? '▼' : '▶'}
      </span>
    </h6>
    <div className={`${openSections['Customer Services'] ? 'block' : 'hidden'} sm:block font-sans `}>
    <a className="  cursor-pointer hover:text-yellow-300 duration-300 transition block ">Privacy Policy</a>
    <a className="  cursor-pointer hover:text-yellow-300 duration-300 transition block mt-2">Exchange Policy</a>
    <a className="  cursor-pointer hover:text-yellow-300 duration-300 transition block mt-2">Advance Payment Policy</a>
    <a className="  cursor-pointer hover:text-yellow-300 duration-300 transition block mt-2">Terms of Service</a>
    </div>
  </nav>
  
  <nav>
    <h6 
      className="footer-title cursor-pointer sm:cursor-auto font-semibold" 
      onClick={() => toggleSection('Contact Us')}
    >
      Contact Us
      <span className="sm:hidden ml-2">
        {openSections['Contact Us'] ? '▼' : '▶'}
      </span>
    </h6>
    <div className={`${openSections['Contact Us'] ? 'block' : 'hidden'} sm:block font-sans`}>
    <a className="  cursor-pointer hover:text-yellow-300 duration-300 transition block ">▤ Mon - Sun / 9:00 AM - 11:00 PM</a>
    <a className="  cursor-pointer hover:text-yellow-300 duration-300 transition block mt-2">✉ eveendotpk@gmail.com</a>
    <a className="  cursor-pointer hover:text-yellow-300 duration-300 transition block mt-2">✆ +92 335-8544254</a>
    </div>
  </nav>
</footer>
<div className='bg-gray-200 w-full h-10 flex justify-start font-sans text-md '>
  <p className=' ml-22 mt-3 flex'>© 2025 <p className='font-semibold ml-2 mr-2'>eveen.pk.</p>  All Rights Reserved</p>
</div>
<div className='bottom-4 right-3 fixed'>
  <a href="https://wa.me/923110461411" target="_blank" rel="noopener noreferrer">
    <img 
      src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/800px-WhatsApp.svg.png' 
      className='w-15 h-15' 
      alt='Chat on WhatsAppss'
    />
  </a>
</div>
<div 
  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
  className="fixed bottom-20 right-9 bg-yellow-300 p-3 rounded-full cursor-pointer hover:bg-yellow-400 transition-colors"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-6"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
  </svg>
</div>
<label className="swap swap-rotate     fixed bottom-40 left-2 hidden md:block
">
  {/* this hidden checkbox controls the state */}
  <input type="checkbox" className="theme-controller" value="synthwave" />

  {/* sun icon */}
  <svg
    className="swap-off h-10 w-10 fill-current"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24">
    <path
      d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
  </svg>

  {/* moon icon */}
  <svg
    className="swap-on h-10 w-10 fill-current"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24">
    <path
      d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
  </svg>
</label>
    </div>
  )
}

export default Newaccount
