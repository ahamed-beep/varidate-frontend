import React, { useEffect, useState } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Search, X } from "lucide-react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getallimages } from '../Redux/Slider';
import { useRef } from 'react';




function Website() {


  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNestedOpen, setIsNestedOpen] = useState(false);
  const [isSecondNestedOpen, setIsSecondNestedOpen] = useState(false);
  const [time, setTime] = useState({
    hours: 17,
    minutes: 10,
    seconds: 35,
  });
  const [openSections, setOpenSections] = useState({
    services: false,
    company: false,
    legal: false
  });
  const topRef = useRef(null);

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  };


  // Toggle function for each section
  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTime((prevTime) => {
        let { hours, minutes, seconds } = prevTime;

        if (seconds > 0) {
          seconds--;
        } else {
          if (minutes > 0) {
            minutes--;
            seconds = 59;
          } else {
            if (hours > 0) {
              hours--;
              minutes = 59;
              seconds = 59;
            } else {
              // Timer has ended
              clearInterval(timerInterval);
            }
          }
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timerInterval);
  }, []);


   useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === 4 ? 1 : prev + 1)); // Cycle through slides 1 to 4
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);


  const {slider} = useSelector((state)=>state.sliderslice)
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getallimages())
  },[dispatch])

  const toggleContent = () => {
    setIsExpanded(!isExpanded);
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
      <div className='hidden md:block'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="size-6">
          <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
        </svg>
      </div>
      
      <div className='flex items-center sm:block md:hidden'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 w-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
      <Link to="/form" className="text-xs pr-3 py-1 pl-1">
        <p className='' >Sign in or Register</p>
      </Link>
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

<div className="carousel w-full relative group">
  <div id="slide1" className="carousel-item relative w-full">
    <img
      src="https://eveen.pk/cdn/shop/files/IMG_1634.png?v=1740292888&width=1600"
      className="w-full" />
    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <a href="#slide4" className="bg-black text-white btn btn-circle w-12 h-12 flex items-center justify-center">❮</a>
      <a href="#slide2" className="bg-black text-white btn btn-circle w-12 h-12 flex items-center justify-center">❯</a>
    </div>
  </div>
  <div id="slide2" className="carousel-item relative w-full">
    <img
      src="https://eveen.pk/cdn/shop/files/IMG_1649.png?v=1740558430&width=720"
      className="w-full" />
    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <a href="#slide1" className="bg-black text-white btn btn-circle w-12 h-12 flex items-center justify-center">❮</a>
      <a href="#slide3" className="bg-black text-white btn btn-circle w-12 h-12 flex items-center justify-center">❯</a>
    </div>
  </div>
  <div id="slide3" className="carousel-item relative w-full">
    <img
      src="https://eveen.pk/cdn/shop/files/IMG_1648.png?v=1740558461&width=720"
      className="w-full" />
    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <a href="#slide2" className="bg-black text-white btn btn-circle w-12 h-12 flex items-center justify-center">❮</a>
      <a href="#slide4" className="bg-black text-white btn btn-circle w-12 h-12 flex items-center justify-center">❯</a>
    </div>
  </div>
  <div id="slide4" className="carousel-item relative w-full">
    <img
      src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp"
      className="w-full" />
    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <a href="#slide3" className="bg-black text-white btn btn-circle w-12 h-12 flex items-center justify-center">❮</a>
      <a href="#slide1" className="bg-black text-white btn btn-circle w-12 h-12 flex items-center justify-center">❯</a>
    </div>
  </div>
</div>
<div className="p-4 sm:p-6 max-w-6xl mx-auto w-full font-sans overflow-hidden">
  {/* Heading */}
  <h1 className="text-md font-bold text-gray-800 mb-4 whitespace-normal">
    Welcome to Eveen.pk: <br />Best Online Shopping Store in Pakistan
  </h1>

  {/* Paragraph 1 */}
  <p className="text-gray-700 mb-4 text-sm whitespace-normal">
    <a href="#" className="text-blue-800 font-semibold break-words">
      Looking for the best online shopping store in Pakistan?
    </a> Your search ends here at Eveen.pk, where we offer a seamless online shopping experience for a wide range of products, from home gadgets to exquisite home decoration items.
  </p>

  {/* Additional Content (Hidden by Default) */}
  <div className={`${isExpanded ? 'block' : 'hidden'} text-sm text-gray-700 mb-4 whitespace-normal`}>
    {/* Paragraph 2 */}
    <p className="text-gray-700 mb-4">
  <span className="-mb-6 block">Best Online Shopping Experience</span><br />
  Eveen.pk is committed to providing the best online shopping experience in Pakistan...
</p>

    {/* Paragraph 3 */}
    <p className="text-gray-700 mb-4">
      Our shoe organizers, makeup organizers, jewellery organizers, and clothes organizers are designed to keep your belongings neat and easily accessible. From makeup organizer bags and boxes to rotating makeup organizers, we have the perfect solution.
    </p>

    <p>
      <strong className="font-bold">Quality and Affordability At One Place</strong><br />
      We take pride in curating a diverse selection of <a href="#" className="text-blue-800 font-semibold break-words">home gadgets in Pakistan</a> and home decoration items that combine quality and affordability. Whether you're looking for practical gadgets to simplify your daily routine or elegant decor pieces to elevate your living space, Eveen.pk has it all.
    </p>

    <p className="mt-4">
      <strong className="font-bold">Unbeatable Selection and Value</strong><br />
      As the <a href="#" className="text-blue-800 font-semibold break-words">best online shopping store in Pakistan</a>, Eveen.pk offers an unbeatable selection of products at the best prices. Our commitment to providing value for our customers means that you can shop with confidence, knowing that you're getting the most competitive deals on the market.
    </p>

    <p className="mt-4">
      <strong className="font-bold">Improve Your Living Space with Style</strong><br />
      Explore our exclusive range of <a href="#" className="text-blue-800 font-semibold break-words">home decoration in Pakistan</a> and discover the latest trends to transform your home. From modern accents to timeless pieces, our collection is designed to help you express your personal style and create a living space that truly reflects who you are.
    </p>

    <p className="mt-4">
      <strong className="font-bold">Shop with Confidence and Convenience</strong><br />
      With Eveen.pk, online shopping is not only convenient but also secure. Our user-friendly site and secure payment options ensure a hassle-free shopping experience. Shop for home gadgets, home decoration, and more with confidence, knowing that you're in good hands.
    </p>

    <p className="mt-4">
      <strong className="font-bold">Trusted eCommerce Website in Online Shopping</strong><br />
      Eveen.pk is more than just an online shopping site – we are your trusted partner in finding the best deals and products to enhance your lifestyle. Join us in our commitment to offering the best online shopping in Pakistan and elevate your home with our exceptional range of products.
    </p>

    {/* Quick Links */}
    <div className="mt-4">
      <h2 className="text-lg font-bold text-gray-800 mb-2">Quick Links:</h2>
      <div className="text-blue-800 font-bold break-words">
        <a href="#" className="hover:underline block">https://eveen.pk/collections/organizer</a>
        <a href="https://eveen.pk/collections/bathroom-interiors" className="hover:underline block">https://eveen.pk/collections/bathroom-interiors</a>
        <a href="https://eveen.pk/collections/travel-essential" className="hover:underline block">https://eveen.pk/collections/travel-essential</a>
        <a href="https://eveen.pk/collections/kitchen-essentials" className="hover:underline block">https://eveen.pk/collections/kitchen-essentials</a>
        <a href="https://eveen.pk/collections/house-hold" className="hover:underline block">https://eveen.pk/collections/house-hold</a>
        <a href="https://eveen.pk/collections/lightning" className="hover:underline block">https://eveen.pk/collections/lightning</a>
      </div>
    </div>
  </div>

  {/* Read More / Read Less Button */}
  <button
    onClick={toggleContent}
    className="text-black hover:text-gray-800 transition duration-300 font-semibold focus:outline-none"
  >
    {isExpanded ? 'Read Less' : 'Read More'}
  </button>
</div>
<section className="text-gray-600 body-font">
  <div className="container px-5 py-12 mx-auto ">
    <div className="flex flex-wrap -m-2">
      {/* Card 1 */}
      <div className="w-1/2 sm:w-1/2 md:w-1/4 lg:w-1/4 p-2">
        <a className="block relative h-35 rounded overflow-hidden">
          <img
            alt="ecommerce"
            className="object-cover object-center w-full h-full block"
            src="https://eveen.pk/cdn/shop/files/1.png?v=1672080831&width=360"
          />
        </a>
      </div>

      {/* Card 2 */}
      <div className="w-1/2 sm:w-1/2 md:w-1/4 lg:w-1/4 p-2">
        <a className="block relative h-35 rounded overflow-hidden">
          <img
            alt="ecommerce"
            className="object-cover object-center w-full h-full block"
            src="https://eveen.pk/cdn/shop/files/Small-Banner-2.png?v=1672340510&width=360"
          />
        </a>
      </div>

      {/* Card 3 */}
      <div className="w-1/2 sm:w-1/2 md:w-1/4 lg:w-1/4 p-2">
        <a className="block relative h-35 rounded overflow-hidden">
          <img
            alt="ecommerce"
            className="object-cover object-center w-full h-full block"
            src="https://eveen.pk/cdn/shop/files/3.png?v=1672080847&width=360"
          />
        </a>
      </div>

      {/* Card 4 */}
      <div className="w-1/2 sm:w-1/2 md:w-1/4 lg:w-1/4 p-2">
        <a className="block relative h-35 rounded overflow-hidden">
          <img
            alt="ecommerce"
            className="object-cover object-center w-full h-full block"
            src="https://eveen.pk/cdn/shop/files/Eveen-Banner-3-C1-Final.jpg?v=1662347166"
          />
        </a>
      </div>
    </div>
  </div>
</section>
<div className='flex justify-center  flex-col   md:flex-row bg-gray-100 '>
<div className=' flex justify-center  pt-15 pl-5 pb-10 pr-10 '>

  <div className="  relative  border-2 border-yellow-400 max-w-110 overflow-hidden bg-white rounded-3xl shadow-lg dark:bg-gray-800">
    {/* Image */}
    <img
      className="object-cover p-5 w-full h-115"
      src="https://eveen.pk/cdn/shop/files/84E1AD8B-04A7-4FF2-90F6-5DE3DBAB0F79.jpg?v=1742235028"
      alt="avatar"
    />
    
    {/* Overlapping Text */}
    <div className="absolute top-5 right-5 bg-yellow-400 p-4 rounded-full">
      <p className="text-black">save   <h1 className="text-black font-semibold text-2xl -mt-1">47%</h1></p>
    
    </div>

    {/* Content Below Image */}
    <div className=" text-center justify-center mx-auto">
     
      <span className="text-sm font-bold hover:text-yellow-400 transition duration-300 max-w-[10px] text-gray-700 dark:text-gray-200">Set Of 10 Dollar Eid Envelopes, Kids Eidi Envelop, New Trendy Dollar Envelopes </span>
    </div>
    <div className='flex text-center justify-center mt-3'>
      <h1 className='text-red-600 mr-4 text-2xl'>Rs.240.00</h1><h2 className=' text-xl line-through'>Rs.450.00</h2>
    </div>
    <div className='flex justify-between mt-3'>
    <div className='flex ml-5 '>
      <p className='mr-1' >Already Sold:</p><p className='font-semibold'> 4200</p>
    </div>
    <div className='flex mr-5'>
      <p className='mr-1' >Available:</p><p className=' font-semibold'>200</p>
    </div>
    </div>
    <div className=' justify-center flex mt-2'>
    <div className='w-100 h-4 bg-gray-300 rounded-2xl relative'>
  <div className='w-30 h-4 bg-yellow-300 rounded-2xl absolute top-0 left-0'>
  </div>
</div>
    </div>
    <div className='flex justify-center mt-3'> <h1>Hurry Up! Offer ends in</h1></div>
    <div className="relative w-full max-w-md mx-auto">
      {/* Image */}
     
<div className=' mt-20 relative'>
      {/* Countdown Timer Overlay */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg">
        <div className="flex space-x-2 ">
          <div className='text-4xl font-semibold rounded-lg  bg-gray-200'>
          <span className=" px-3 py-4 ">
            {time.hours.toString().padStart(2, "0")}
          </span>
          </div>
          <span className="  text-2xl">:</span>
          <div className='text-4xl font-semibold rounded-lg  bg-gray-200'>
          <span className=" px-3 py-4">
            {time.minutes.toString().padStart(2, "0")}
          </span>
          </div>
          <span className=" text-2xl">:</span>
          <div className=' text-4xl font-semibold rounded-lg  bg-gray-200'>
          <span className="px-3 py-4">
            {time.seconds.toString().padStart(2, "0")}
          </span>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>



</div>

<div className=' w-full '>
  <nav className='flex justify-center gap-10 text-xl font-sans pt-18 '>
    <a className='font-semibold border-b-2 border-yellow-400'>New Arrival</a>
    <a className=' hover:border-b-2 border-yellow-400 transition duration-1000'>On Sale</a>
    <a className='hover:border-b-2 border-yellow-400 transition duration-1000'>Top Rated</a>

  </nav>
  <section className="text-gray-600 body-font -mt-22">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-wrap -m-4 bg-white mt-1">
      {/* Card 1 */}
      <div className="xl:w-1/5 lg:w-1/4 md:w-1/2 p-4 w-1/2 border-1 border-gray-300">
        <div className='flex justify-center mb-1 text-center'>
          <h3 className="text-sm font-semibold mb-1 hover:text-yellow-400 transition duration-200">
          3pcs Reusable Food Storage Jar With Lid,
          </h3>
        </div>
        <div className="group relative h-48 rounded overflow-hidden">
          <img 
            src="https://eveen.pk/cdn/shop/files/80BDDFFA-BC61-4BCB-BFF6-3EA181AB8EEF.jpg?v=1742932656"
            className="absolute w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
            alt="Refrigerator Drink Dispense"
          />
          <img 
            src="https://eveen.pk/cdn/shop/files/BB7BFF1A-9D97-4631-A0B6-A0D63D739382.jpg?v=1742932656"
            className="absolute w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            alt="Refrigerator Drink Dispense alternate view"
          />
        </div>
        <div className="mt-4 flex flex-col">
          <span className="text-red-500 text-lg font-semibold">Rs.3,099.00</span>
          <span className="text-gray-400 text-md line-through">Rs.3,850.00</span>
        </div>
      </div>

      {/* Card 2 */}
      <div className="xl:w-1/5 lg:w-1/4 md:w-1/2 p-4 w-1/2 border-1 border-gray-300">
        <div className='flex justify-center mb-1 text-center'>
          <h3 className="text-sm font-semibold mb-1 hover:text-yellow-400 transition duration-200">
            14 Grid Ice Cube Tray, Easy Release Mini Ice
          </h3>
        </div>
        <div className="group relative h-48 rounded overflow-hidden">
          <img 
            src="https://eveen.pk/cdn/shop/files/02B897C0-549F-4D6C-80A3-8DEAB6CEAF57.jpg?v=1742836122"
            className="absolute w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
            alt="Ice Cube Tray"
          />
          <img 
            src="https://eveen.pk/cdn/shop/files/D65959F7-6D59-4AFB-B7B6-061E244D877C.jpg?v=1742836122"
            className="absolute w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            alt="Ice Cube Tray alternate view"
          />
        </div>
        <div className="mt-4 flex flex-col">
          <span className="text-red-500 text-lg font-semibold">Rs.399.00</span>
          <span className="text-gray-400 text-md line-through">Rs.550.00</span>
        </div>
      </div>

      {/* Card 3 */}
      <div className="xl:w-1/5 lg:w-1/4 md:w-1/2 p-4 w-1/2 border-1 border-gray-300">
        <div className='flex justify-center mb-1 text-center'>
          <h3 className="text-sm font-semibold mb-1 hover:text-yellow-400 transition duration-200">
            Hand Bag Style Tissue Box, Large
          </h3>
        </div>
        <div className="group relative h-48 rounded overflow-hidden">
          <img 
            src="https://eveen.pk/cdn/shop/files/63E958AF-32D2-40E8-844A-12765EA60523.jpg?v=1742497436"
            className="absolute w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
            alt="Tissue Box"
          />
          <img 
            src="https://eveen.pk/cdn/shop/files/F948AA47-336E-4A93-A590-10063B0E2902.jpg?v=1742497436"
            className="absolute w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            alt="Tissue Box alternate view"
          />
        </div>
        <div className="mt-4 flex flex-col">
          <span className="text-red-500 text-lg font-semibold">Rs.2,899.00</span>
          <span className="text-gray-400 text-md line-through">Rs.3,850.00</span>
        </div>
      </div>

      {/* Card 4 */}
      <div className="xl:w-1/5 lg:w-1/4 md:w-1/2 p-4 w-1/2 border-1 border-gray-300">
        <div className='flex justify-center mb-1 text-center'>
          <h3 className="text-sm font-semibold mb-1 hover:text-yellow-400 transition duration-200">
            Bamboo Cereal Wood Grain Food Storage
          </h3>
        </div>
        <div className="group relative h-48 rounded overflow-hidden">
          <img 
            src="https://eveen.pk/cdn/shop/files/9CFAAD4E-35B7-4DA9-8A7B-A343D9B581E3.jpg?v=1742497057"
            className="absolute w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
            alt="Food Storage"
          />
          <img 
            src="https://eveen.pk/cdn/shop/files/CD4C7FA2-FFE7-4229-8F11-5464D471B5B7.jpg?v=1742496947"
            className="absolute w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            alt="Food Storage alternate view"
          />
        </div>
        <div className="mt-4 flex flex-col">
          <span className="text-red-500 text-lg font-semibold">Rs.3,599.00</span>
          <span className="text-gray-400 text-md line-through">Rs.4,550.00</span>
        </div>
      </div>

      {/* Card 5 */}
      <div className="xl:w-1/5 lg:w-1/4 md:w-1/2 p-4 w-1/2 border-1 border-gray-300">
        <div className='flex justify-center mb-1 text-center'>
          <h3 className="text-sm font-semibold mb-1 hover:text-yellow-400 transition duration-200">
            Disney Mickey Mouse Shoulder Cross Bag
          </h3>
        </div>
        <div className="group relative h-48 rounded overflow-hidden">
          <img 
            src="https://eveen.pk/cdn/shop/files/740830D1-3BC5-4D91-8333-B7770885B876.jpg?v=1742496105"
            className="absolute w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
            alt="Shoulder Bag"
          />
          <img 
            src="https://eveen.pk/cdn/shop/files/EBB9503E-2DBE-4417-9F03-C5A7D890DD6B.jpg?v=1742496105"
            className="absolute w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            alt="Shoulder Bag alternate view"
          />
        </div>
        <div className="mt-4 flex flex-col">
          <span className="text-red-500 text-lg font-semibold">Rs.850.00</span>
          <span className="text-gray-400 text-md line-through">Rs.1,250.00</span>
        </div>
      </div>

      {/* Card 6 */}
      <div className="xl:w-1/5 lg:w-1/4 md:w-1/2 p-4 w-1/2 border-1 border-gray-300">
        <div className='flex justify-center mb-1 text-center'>
          <h3 className="text-sm font-semibold mb-1 hover:text-yellow-400 transition duration-200">
            Plastic Transparent Airtight Jar, Transparent
          </h3>
        </div>
        <div className="group relative h-48 rounded overflow-hidden">
          <img 
            src="https://eveen.pk/cdn/shop/files/93CDF1D6-60E4-4267-B973-967386A780A7.jpg?v=1742410732"
            className="absolute w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
            alt="Airtight Jar"
          />
          <img 
            src="https://eveen.pk/cdn/shop/files/7583B851-E2E0-43FE-A250-BF22E10B5C15.jpg?v=1742931506&width=360"
            className="absolute w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            alt="Airtight Jar alternate view"
          />
        </div>
        <div className="mt-4 flex flex-col">
          <span className="text-red-500 text-lg font-semibold">Rs.349.00</span>
          <span className="text-gray-400 text-md line-through">Rs.650.00</span>
        </div>
      </div>

      {/* Card 7 */}
      <div className="xl:w-1/5 lg:w-1/4 md:w-1/2 p-4 w-1/2 border-1 border-gray-300">
        <div className='flex justify-center mb-1 text-center'>
          <h3 className="text-sm font-semibold mb-1 hover:text-yellow-400 transition duration-200">
            Acrylic Round Juice Container, Pot
          </h3>
        </div>
        <div className="group relative h-48 rounded overflow-hidden">
          <img 
            src="https://eveen.pk/cdn/shop/files/13C7C78B-784E-45D1-A0D2-718DCB251971.jpg?v=1742411523"
            className="absolute w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
            alt="Juice Container"
          />
          <img 
            src="https://eveen.pk/cdn/shop/files/275B1AD3-F148-4F23-879B-92411D5D83F1.jpg?v=1742411523"
            className="absolute w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            alt="Juice Container alternate view"
          />
        </div>
        <div className="mt-4 flex flex-col">
          <span className="text-red-500 text-lg font-semibold">Rs.3,499.00</span>
          <span className="text-gray-400 text-md line-through">Rs.4,550.00</span>
        </div>
      </div>

      {/* Card 8 */}
      <div className="xl:w-1/5 lg:w-1/4 md:w-1/2 p-4 w-1/2 border-1 border-gray-300">
        <div className='flex justify-center mb-1 text-center'>
          <h3 className="text-sm font-semibold mb-1 hover:text-yellow-400 transition duration-200">
            Retractable Motorcycles Elastic 
          </h3>
        </div>
        <div className="group relative h-48 rounded overflow-hidden">
          <img 
            src="https://eveen.pk/cdn/shop/files/FDAFCAA4-5549-48AD-AF31-29FA3190AD75.jpg?v=1742495517"
            className="absolute w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
            alt="Motorcycle Elastic"
          />
          <img 
            src="https://eveen.pk/cdn/shop/files/0E9064C1-B919-42C4-859D-2DEDA297231C.jpg?v=1742495467"
            className="absolute w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            alt="Motorcycle Elastic alternate view"
          />
        </div>
        <div className="mt-4 flex flex-col">
          <span className="text-red-500 text-lg font-semibold">Rs.799.00</span>
          <span className="text-gray-400 text-md line-through">Rs.1,050.00</span>
        </div>
      </div>

      {/* Card 9 */}
      <div className="xl:w-1/5 lg:w-1/4 md:w-1/2 p-4 w-1/2 border-1 border-gray-300">
        <div className='flex justify-center mb-1 text-center'>
          <h3 className="text-sm font-semibold mb-1 hover:text-yellow-400 transition duration-200">
          Portable Aluminium Alloy Notebook
          </h3>
        </div>
        <div className="group relative h-48 rounded overflow-hidden">
          <img 
            src="https://eveen.pk/cdn/shop/files/066079ED-653A-4338-9886-5C6957A7259F.jpg?v=1742494816"
            className="absolute w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
            alt="New Product 1"
          />
          <img 
            src="https://eveen.pk/cdn/shop/files/0A08AF85-6E14-4A4A-A032-3D28654B59FB.jpg?v=1742494838"
            className="absolute w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            alt="New Product 1 alternate view"
          />
        </div>
        <div className="mt-4 flex flex-col">
          <span className="text-red-500 text-lg font-semibold">Rs.999.00</span>
          <span className="text-gray-400 text-md line-through">Rs.1,499.00</span>
        </div>
      </div>

      {/* Card 10 */}
      <div className="xl:w-1/5 lg:w-1/4 md:w-1/2 p-4 w-1/2 border-1 border-gray-300">
        <div className='flex justify-center mb-1 text-center'>
          <h3 className="text-sm font-semibold mb-1 hover:text-yellow-400 transition duration-200">
            New Product Example 2
          </h3>
        </div>
        <div className="group relative h-48 rounded overflow-hidden">
          <img 
            src="https://eveen.pk/cdn/shop/files/DABD7315-3AD0-4F76-8825-73A0F5C712AE.jpg?v=1742412474"
            className="absolute w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
            alt="New Product 2"
          />
          <img 
            src="https://eveen.pk/cdn/shop/files/ADBD1EDC-BF34-4332-B3A7-49E60F18CC99.jpg?v=1742412283"
            className="absolute w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            alt="New Product 2 alternate view"
          />
        </div>
        <div className="mt-4 flex flex-col">
          <span className="text-red-500 text-lg font-semibold">Rs.1,299.00</span>
          <span className="text-gray-400 text-md line-through">Rs.1,799.00</span>
        </div>
      </div>
    </div>
  </div>
</section>

</div>

</div>
<div className='w-full h-full ' >
  <nav className='font-sans mt-12  justify-center gap-3 font-semibold mb-3 hidden  md:flex  '>
    <a className='border-2 border-yellow-400 rounded-xl  pl-4 pr-4' >Kitchen Essentials</a>
    <a className='  hover:border-2 border-yellow-400 rounded-xl  pl-4 pr-4 transition duration-200'>Jewellery</a>
    <a className=' hover:border-2 border-yellow-400 rounded-xl  pl-4 pr-4 transition duration-200' >Beauty</a>
    <a className=' hover:border-2 border-yellow-400 rounded-xl  pl-4 pr-4 transition duration-200'>
    Home and Living Essentials</a>
    <a className=' hover:border-2 border-yellow-400 rounded-xl  pl-4 pr-4 transition duration-200'>Party Supply</a>
    <a className=' hover:border-2 border-yellow-400 rounded-xl  pl-4 pr-4 transition duration-200'>Mobile Accessories</a>
    <a className=' hover:border-2 border-yellow-400 rounded-xl  pl-4 pr-4 transition duration-200'>Eveen Organics</a>
  </nav>
  <div className='flex justify-center'>
  <div className='border-b-2 border-gray-300 w-300' ></div>
  </div>
</div>
<div className="flex flex-col justify-center md:flex-row items-center gap-4 p-4">
  
  <div className="grid grid-cols-2 gap-3 w-full md:w-1/4">
 
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2">
  <div className='flex justify-center mb-1 text-center'>
    <h3 className="text-xs font-medium hover:text-yellow-400 transition duration-200">
      3-in-1 Kitchen Vegetable Fruit Peeler
    </h3>
  </div>
  

  <div className="group relative h-40 w-full">
    <img
      src="https://eveen.pk/cdn/shop/files/6734B351-1C16-4881-B799-469943D1E18E.jpg?v=1727884314"
      alt="Product 1"
      className="absolute h-full w-full object-contain transition-opacity duration-500 group-hover:opacity-0"
    />
    <img
      src="https://eveen.pk/cdn/shop/files/73690954-B1E9-4B6B-8EE3-DF09B9678C0F.jpg?v=1727884314" 
      alt="Product 1 alternate view"
      className="absolute h-full w-full object-contain opacity-0 transition-opacity duration-500 group-hover:opacity-100"
    />
  </div>
  
  <div className="p-2">
    <div className="mt-1">
      <span className="text-red-500 text-sm mr-2 font-semibold">Rs.699</span>
      <span className="text-gray-400 text-xs line-through ml-1">Rs.1000</span>
    </div>
  </div>
</div>
    

<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2">
  <div className='flex justify-center mb-1 text-center'>
    <h3 className="text-xs font-medium hover:text-yellow-400 transition duration-200">
      Plastic Kitchen Drain Basket, Double Layer
    </h3>
  </div>
  

  <div className="group relative h-40 w-full">
    <img
      src="https://eveen.pk/cdn/shop/files/8EC031DF-3430-46C2-BD6D-30ED6BDBD7C4.jpg?v=1719403435"
      className="absolute h-full w-full object-contain transition-opacity duration-300 group-hover:opacity-0"
      alt="Plastic Kitchen Drain Basket"
    />
    <img
      src="https://eveen.pk/cdn/shop/files/7FB23BB7-A077-46C3-A1B3-66623E700D0C.jpg?v=1719403435&width=540" 
      className="absolute h-full w-full object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      alt="Plastic Kitchen Drain Basket alternate view"
    />
  </div>
  

  <div className="p-2">
    <div className="mt-1">
      <span className="text-red-500 text-sm mr-2 font-semibold">Rs.499</span>
      <span className="text-gray-400 text-xs line-through ml-1">Rs.999</span>
    </div>
  </div>
</div>

<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2">
  <div className='flex justify-center mb-1 text-center'>
    <h3 className="text-xs font-medium hover:text-yellow-400 transition duration-200">
      3 In 1 Multipurpose Food Tong, Reusable Easy
    </h3>
  </div>
  
  {/* Image section with hover effect - only change made */}
  <div className="group relative h-40 w-full">
    <img
      src="https://eveen.pk/cdn/shop/files/00D58431-656D-4B86-BA72-42D00EBFD654.jpg?v=1731430584"
      className="absolute h-full w-full object-contain transition-opacity duration-300 group-hover:opacity-0"
      alt="3 In 1 Multipurpose Food Tong"
    />
    <img
      src="https://eveen.pk/cdn/shop/files/234F199E-DA22-4D5B-91D1-24EBDB0C86F5.jpg?v=1731430584" 
      className="absolute h-full w-full object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      alt="3 In 1 Multipurpose Food Tong alternate view"
    />
  </div>
  
  {/* Everything below remains exactly the same */}
  <div className="p-2">
    <div className="mt-1">
      <span className="text-red-500 text-sm mr-2 font-semibold">Rs.450</span>
      <span className="text-gray-400 text-xs line-through ml-1">Rs.850</span>
    </div>
  </div>
</div>
    
   
<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2">
  <div className='flex justify-center mb-1 text-center'>
    <h3 className="text-xs font-medium hover:text-yellow-400 transition duration-200">
      Heat Resistant Glass Water Jug
    </h3>
  </div>
  
  {/* Image section with hover effect - only change made */}
  <div className="group relative h-40 w-full">
    <img
      src="https://eveen.pk/cdn/shop/files/FCD7100E-C5F5-4D41-A43C-015B98259A91.jpg?v=1722943364"
      className="absolute h-full w-full object-contain transition-opacity duration-300 group-hover:opacity-0"
      alt="Heat Resistant Glass Water Jug"
    />
    <img
      src="https://eveen.pk/cdn/shop/files/1117D6B7-7B5C-43F0-A7D9-4AC89F2379FE.jpg?v=1722943364" 
      className="absolute h-full w-full object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      alt="Heat Resistant Glass Water Jug alternate view"
    />
  </div>
  
  {/* Everything below remains exactly the same */}
  <div className="p-2">
    <div className="mt-1">
      <span className="text-red-400 text-sm mr-1 font-semibold">Rs2,799.00</span>
      <span className="text-gray-400 text-xs line-through ml-1">Rs.3599</span>
    </div>
  </div>
</div>
  </div>

  <div className="w-full md:w-2/4 max-w-md mx-4 justify-center">
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
           <div className=' flex justify-center text-center mt-3 '>
    <h3 className="text-md font-medium hover:text-yellow-400 transition duration-200">3 In 1 Rotated Beverage Dispenser With 3 Tap, Plastic Drink Dispenser For Refrigerator, Lemonade Drink
    </h3>
    </div>
      <img src="https://eveen.pk/cdn/shop/products/image_17142964-4d26-41d1-a60f-b82d4355c8f0.jpg?v=1714154988&width=540" className="w-full h-110 object-contain p-4" alt="Featured Product"/>
      <div className="p-4 "> 
        
        <div className="mt-2">
          <span className="text-red-600 text-xl font-bold">Rs.1,299</span>
          <span className="text-gray-400 text-sm line-through ml-2">Rs.1,999</span>
        </div>
        <div className="text-xs bg-yellow-100 text-yellow-800 inline-block px-2 py-1 rounded mt-2">
          Best Seller
        </div>
      </div>
    </div>
  </div>


  <div className="grid grid-cols-2 gap-3 w-full md:w-1/4">

  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2">
    <div className='flex justify-center mb-2 text-center'>
      <h3 className="text-xs font-medium hover:text-yellow-400 transition duration-200">
        Set Of 10 Aluminum Foil Plates, Disposable
      </h3>
    </div>
    <div className="group relative h-32 w-full">
      <img
        src="https://eveen.pk/cdn/shop/files/p2_526cb184-742b-49d0-9ff4-1b9501f600c5.jpg?v=1716036461"
        className="absolute h-full w-full object-contain transition-opacity duration-300 group-hover:opacity-0"
        alt="Aluminum Foil Plates"
      />
      <img
        src="https://eveen.pk/cdn/shop/files/p7_2d54842a-57de-416e-bb8c-79c935a8e51a.jpg?v=1716036461"
        className="absolute h-full w-full object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        alt="Aluminum Foil Plates alternate view"
      />
    </div>
    <div className="p-2">
      <div className="mt-1">
        <span className="text-red-500 text-sm mr-2 font-semibold">Rs.450</span>
        <span className="text-gray-400 text-xs line-through ml-1">Rs.700</span>
      </div>
    </div>
  </div>

  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2">
    <div className='flex justify-center mb-2 text-center'>
      <h3 className="text-xs font-medium hover:text-yellow-400 transition duration-200">
        Kitchen Cooking Pan Holder, silicone Pot
      </h3>
    </div>
    <div className="group relative h-32 w-full">
      <img
        src="https://eveen.pk/cdn/shop/files/4C66D26F-EBAE-4FEC-ABC1-358B3034A269.jpg?v=1721981028"
        className="absolute h-full w-full object-contain transition-opacity duration-300 group-hover:opacity-0"
        alt="Kitchen Cooking Pan Holder"
      />
      <img
        src="https://eveen.pk/cdn/shop/files/8D539D39-7CFA-4783-AAA3-C5F487234F11.jpg?v=1721981028&width=540"
        className="absolute h-full w-full object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        alt="Kitchen Cooking Pan Holder alternate view"
      />
    </div>
    <div className="p-2">
      <div className="mt-1">
        <span className="text-gray-400 text-sm font-bold ml-1">Sold out</span>
      </div>
    </div>
  </div>


  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2">
    <div className='flex justify-center mb-2 text-center'>
      <h3 className="text-xs font-medium hover:text-yellow-400 transition duration-200">
        Manual Claw Meat Shredder, Bear Claw
      </h3>
    </div>
    <div className="group relative h-32 w-full">
      <img
        src="https://eveen.pk/cdn/shop/files/0EFF6EC1-B7D2-4161-B5FD-7A6114C3FF1E.jpg?v=1727433518"
        className="absolute h-full w-full object-contain transition-opacity duration-300 group-hover:opacity-0"
        alt="Manual Claw Meat Shredder"
      />
      <img
        src="https://eveen.pk/cdn/shop/files/B8E43A36-FDA0-47EC-A756-4004F507B123.jpg?v=1727433518&width=540"
        className="absolute h-full w-full object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        alt="Manual Claw Meat Shredder alternate view"
      />
    </div>
    <div className="p-2">
      <div className="mt-1">
        <span className="text-red-500 text-sm mr-2 font-semibold">Rs.450</span>
        <span className="text-gray-400 text-xs line-through ml-1">Rs.800</span>
      </div>
    </div>
  </div>


  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2">
    <div className='flex justify-center mb-2 text-center'>
      <h3 className="text-xs font-medium hover:text-yellow-400 transition duration-200">
        Set Of 2 Silicone Spatula, Mixing Scrap
      </h3>
    </div>
    <div className="group relative h-32 w-full">
      <img
        src="https://eveen.pk/cdn/shop/files/9DF4A07B-CEBD-47AD-96D9-28C6D8B8D95F.jpg?v=1721985818"
        className="absolute h-full w-full object-contain transition-opacity duration-300 group-hover:opacity-0"
        alt="Silicone Spatula Set"
      />
      <img
        src="https://eveen.pk/cdn/shop/files/68A40428-47F8-4F54-8080-F9585132DDE9.jpg?v=1721985819&width=540"
        className="absolute h-full w-full object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        alt="Silicone Spatula Set alternate view"
      />
    </div>
    <div className="p-2">
      <div className="mt-1">
        <span className="text-red-500 text-sm mr-2 font-semibold">Rs.699</span>
        <span className="text-gray-400 text-xs line-through ml-1">Rs.1000</span>
      </div>
    </div>
  </div>
</div>
</div>
<div className='flex justify-center mt-12'>
  <a href='#' >
    <img  className='w-110' src='https://tse3.mm.bing.net/th?id=OIP.4tG9n9_MneXIdNsKFDovBQHaB2&pid=Api&P=0&h=220' />
  </a>
</div>
<div className='flex justify-around mt-11 font-sans mb-10 md:flex-row flex-col '>
<div className=' text-2xl border-b-2 border-yellow-400 '>
  <h1>Bestsellers</h1>
</div>
<div className='justify-center flex gap-10 font-sans font-semibold overflow-x-scroll md:overflow-x-visible md:flex-nowrap whitespace-nowrap mt-5 md:mt-0 border-b border-gray-300'>
  <a className=' border-2 border-yellow-400 rounded-xl  pl-4 pr-4' > 
TOP 20
</a>
  <a className='hover:border-2 border-yellow-400 rounded-xl  pl-4 pr-4 transition duration-200'>Mobile Accessories
  </a>
  <a className='hover:border-2 border-yellow-400 rounded-xl  pl-4 pr-4 transition duration-200'>Under 299</a>
  <a className='hover:border-2 border-yellow-400 rounded-xl  pl-4 pr-4 transition duration-200'>Baby Care</a>
  <a className='hover:border-2 border-yellow-400 rounded-xl  pl-4 pr-4 transition duration-200'>Bathroom Interiors</a>
  <a className='hover:border-2 border-yellow-400 rounded-xl  pl-4 pr-4 transition duration-200'>Bag
  </a>
  
</div>

</div>
<div className='flex justify-center flex-wrap '>

  <div className=' mb-4  border-r border-gray-200  w-1/2 sm:w-1/2 md:w-1/4 lg:w-1/4 '>
    <div className='flex  p-3 justify-center gap-5'>
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
      <div className='flex flex-col justify-center mb-1 text-center'>
        <h3 className="text-xs font-medium hover:text-yellow-400 transition duration-200">
        3 Liter Refrigerator Kettle with Faucet,
        </h3>
        <div className="mt-1 flex flex-col">
          <span className="text-red-500 text-sm mr-2 font-semibold">Rs.999</span>
          <span className="text-gray-400 text-sm line-through">Rs.1,450</span>
        </div>
      </div>
    </div>
  </div>


  <div className='  mb-4 border-r border-gray-200  w-1/2 sm:w-1/2 md:w-1/2 lg:w-1/4 '>
    <div className='flex k p-3 justify-center gap-5'>
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
      <div className='flex flex-col justify-center mb-1 text-center'>
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


  <div className=' mb-4  border-r border-gray-200  w-1/2 sm:w-1/2 md:w-1/2 lg:w-1/4 '>
    <div className='flex  p-3 justify-center gap-5'>
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
      <div className='flex flex-col justify-center mb-1 text-center'>
        <h3 className="text-xs font-medium hover:text-yellow-400 transition duration-200">
        Amazing Electric Water Dispenser,
        </h3>
        <div className="mt-1 flex flex-col">
          <span className="text-red-500 text-sm mr-2 font-semibold">Rs.1,499</span>
          <span className="text-gray-400 text-sm line-through">Rs.2,000</span>
        </div>
      </div>
    </div>
  </div>


  <div className=' mb-4  border-r border-gray-200  w-1/2 sm:w-1/2 md:w-1/2 lg:w-1/4 '>
    <div className='flex  p-3 justify-center gap-5'>
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
      <div className='flex flex-col justify-center mb-1 text-center'>
        <h3 className="text-xs font-medium hover:text-yellow-400 transition duration-200">
        elescopic Mobile Holder, Live Selfie
        </h3>
        <div className="mt-1 flex flex-col">
          <span className="text-red-500 text-sm mr-2 font-semibold">Rs.690</span>
          <span className="text-gray-400 text-sm line-through">Rs.2,300</span>
        </div>
      </div>
    </div>
  </div>

 
  <div className='  border-r border-gray-200  w-1/2 sm:w-1/2 md:w-1/2 lg:w-1/4 '>
    <div className='flex p-3 justify-center gap-5'>
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
      <div className='flex flex-col justify-center mb-1 text-center'>
        <h3 className="text-xs font-medium hover:text-yellow-400 transition duration-200">
        Washing Gloves, Silicone Dish Washer,
        </h3>
        <div className="mt-1 flex flex-col">
          <span className="text-red-500 text-sm mr-2 font-semibold">Rs.499</span>
          <span className="text-gray-400 text-sm line-through">Rs.900.</span>
        </div>
      </div>
    </div>
  </div>


  <div className='  border-r border-gray-200  w-1/2 sm:w-1/2 md:w-1/2 lg:w-1/4 '>
    <div className='flex p-3 justify-center gap-5'>
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
      <div className='flex flex-col justify-center mb-1 text-center'>
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


  <div className=' border-r border-gray-200 w-1/2 sm:w-1/2 md:w-1/2 lg:w-1/4 '>
    <div className='flex p-3 justify-center gap-5'>
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
      <div className='flex flex-col justify-center mb-1 text-center'>
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

  <div className='   border-r border-gray-200  w-1/2 sm:w-1/2 md:w-1/2 lg:w-1/4 '>
    <div className='flex  p-3 justify-center gap-5'>
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
      <div className='flex flex-col justify-center mb-1 text-center'>
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
<div className='mt-20 font-sans ml-15 justify-start flex  text-2xl mb-5'>
  <h1 className=' border-b border-yellow-400 ' >Trending In Pakistan</h1>
</div>
<div className="max-w-6xl mx-auto px-4 py-8">
 
<div className="flex flex-wrap -mx-2">
  {/* Item 1 */}
  <div className="w-1/2 sm:w-1/2 md:w-1/2 lg:w-1/4 px-2 mb-4 group relative">
    <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2">
      Heat Resistant Aluminium Foil Tape, Waterproof Adhesive Tape For Pipes
    </h3>
    <div className="rounded-lg overflow-hidden transition-shadow">
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <img
          className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0 p-3 border-r border-gray-200"
          src="https://eveen.pk/cdn/shop/files/ED688966-4343-45FC-9AE0-C8CEBE3B8AFF.jpg?v=1735812110&width=540"
          alt="Heat Resistant Aluminium Foil Tape"
        />
        <img
          className="w-full h-full object-cover absolute top-0 left-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 p-3"
          src="https://eveen.pk/cdn/shop/files/0FD44FF1-E511-4016-8678-C4F95F4BAF43.jpg?v=1735812110&width=360"
          alt="Heat Resistant Tape Alternate View"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center">
          <span className="text-red-500 font-semibold">Rs.399.00</span>
          <span className="text-gray-400 text-sm line-through ml-2">Rs.999.00</span>
        </div>
      </div>
    </div>
  </div>

  {/* Item 2 */}
  <div className="w-1/2 sm:w-1/2 md:w-1/2 lg:w-1/4 px-2 mb-4 group relative">
    <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2">
      50 Pcs Air Fryer Plates, Kitchen Baking Greaseproof Paper, Oil...
    </h3>
    <div className="rounded-lg overflow-hidden transition-shadow">
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <img
          className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0 border-r border-gray-200 p-3"
          src="https://eveen.pk/cdn/shop/files/image_97e33708-c1a9-4222-b6cd-34e158e3d5f2.jpg?v=1714153566"
          alt="Air Fryer Plates"
        />
        <img
          className="w-full h-full object-cover absolute top-0 left-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 p-3"
          src="https://eveen.pk/cdn/shop/files/P2_2e357198-27c7-4420-9eb4-f211d181ad54.jpg?v=1714153566&width=360"
          alt="Air Fryer Plates Alternate View"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center">
          <span className="text-red-500 font-semibold">Rs.499.00</span>
          <span className="text-gray-400 text-sm line-through ml-2">Rs.959.00</span>
        </div>
      </div>
    </div>
  </div>

  {/* Item 3 */}
  <div className="w-1/2 sm:w-1/2 md:w-1/2 lg:w-1/4 px-2 mb-4 group relative">
    <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2 hover:text-yellow-400">
      Mini Mighty Waffle Maker, Electric Waffles Maker Machine, Breakfast...
    </h3>
    <div className="rounded-lg overflow-hidden transition-shadow">
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <img
          className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0 border-r border-gray-200 p-3"
          src="https://eveen.pk/cdn/shop/files/image_5bb15d56-c9cb-490c-a830-b5a7ccb039f8.jpg?v=1714153310&width=540"
          alt="Mini Mighty Waffle Maker"
        />
        <img
          className="w-full h-full object-cover absolute top-0 left-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 border-r border-gray-200 p-3"
          src="https://eveen.pk/cdn/shop/files/w2.jpg?v=1714153311&width=360"
          alt="Waffle Maker Alternate View"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center">
          <span className="text-red-500 font-semibold">Rs.2,899.00</span>
          <span className="text-gray-400 text-sm line-through ml-2">Rs.4,250.00</span>
        </div>
      </div>
    </div>
  </div>

  {/* Item 4 */}
  <div className="w-1/2 sm:w-1/2 md:w-1/2 lg:w-1/4 px-2 mb-4 group relative">
    <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2">
      Portable Travel Clothes Dryer, Electric Clothes Dryer, Smart...
    </h3>
    <div className="rounded-lg overflow-hidden transition-shadow">
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <img
          className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0 border-r border-gray-200 p-3"
          src="https://eveen.pk/cdn/shop/files/A1C6E9E8-E613-4DD9-AC68-1FBB042BFD6A.jpg?v=1739442365&width=540"
          alt="Portable Travel Clothes Dryer"
        />
        <img
          className="w-full h-full object-cover absolute top-0 left-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 p-3"
          src="https://eveen.pk/cdn/shop/files/5416AF20-0676-4A96-9343-38BA312D03B2.jpg?v=1739442365"
          alt="Clothes Dryer Alternate View"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center">
          <span className="text-red-500 font-semibold">Rs.5,499.00</span>
          <span className="text-gray-400 text-sm line-through ml-2">Rs.6,999.00</span>
        </div>
      </div>
    </div>
  </div>
</div>
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
      alt='Chat on WhatsApp'
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

export default Website
