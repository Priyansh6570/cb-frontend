import React from 'react';
import { BsSearch } from 'react-icons/bs';
import { ImLocation } from 'react-icons/im';
import { RxTriangleDown } from 'react-icons/rx';
import { BiLogIn } from 'react-icons/bi';
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { debounce } from './helper.js';

import '../styles/navbar.scss';

const Navbar = () => {

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const handleScroll = debounce(() => {
    const currentScrollPos = window.pageYOffset;

    setVisible((prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > 70) || currentScrollPos < 10);

    setPrevScrollPos(currentScrollPos);
  }, 100);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);

  }, [prevScrollPos, visible, handleScroll]);

  const navbarStyles = {
    position: 'sticky',
    transition: 'top 0.6s'
  }


  return (
    <nav className='navbar flex flex-wrap shadow-md sm:hidden ' style={{ ...navbarStyles, top: visible ? '0' : '-68px' }}>
      <div className="upperNav h-[70px] z-50" >

        {/* carsbecho logo  */}
        <Link to={'/'}>
        <div className="navBrand flex shrink-0 items-center">
          {/* <img src={'/Images/cbLogo.png'} alt="Cars Becho Logo" className='brandLogo h-[60px] relative top-[-1px] sm:block' /> */}
          {/* <img src={'/Images/brandName-clearBG.png'} alt="Cars Becho Name" className='brandName h-[45px] relative top-1 sm:block' /> */}
          <img src={'/Images/brandNameNew.png'} alt="CarsBecho Logo" className='brandName h-[70px] relative top-1 sm:block' />
        </div>
        </Link>

        {/* search bar  */}
        <form className="search object-contain rounded bg-[#24272c] items-center relative left-[-60px] md:left-[0px] justify-center flex" role="search">
          <input
            className="searchInput border h-[48px] bg-[#f7f7f7] rounded-l shadow-inner focus:outline-none p-[20px] relative "
            type="search"
            placeholder="Search Cars or Brands"
            aria-label="Search"
          />
          <button className="searchBtn w-[50px] h-[48px]" type="submit">
            <BsSearch className='translate-x-[80%] text-lg invert' />
          </button>
        </form>

        {/* login/register  */}
        <div className="login flex gap-[4px]">
          <BiLogIn className='relative bottom-[-3px]' />
          <a href="#">Login/Register</a>
        </div>
      </div>
      <div className="border-b-[1px] w-full"></div>

      <div className="lowerNav justify-between h-[50px] relative bottom-[1px] py-[4px] lg:flex font-normal">
        <ul className='flex p-0 SMN_effect-4'>
          <li className='p-4'>
            <Link to={'./newCar'}> NEW CAR</Link>
          </li>
          <li className='p-4'>
            <Link to={'./usedCar'}> USED CAR</Link>
          </li>
          <li className='p-4'>
            <Link to={'./sellCar'}> SELL CAR</Link>
          </li>
          <li className='p-4'>
            <Link to={'about'}> ABOUT CARSBECHO</Link>
          </li>
          <li className='p-4'>
            <Link to={'./workshop'}> WORKSHOP</Link>
          </li>
        </ul>
        <div className="location flex p-4 items-center text-slate-600">
          <ImLocation />
          <a href="#">Select City</a>
          <RxTriangleDown />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
