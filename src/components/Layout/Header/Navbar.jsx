import React from 'react';
import { BsSearch } from 'react-icons/bs';
import { ImLocation } from 'react-icons/im';
import { RxTriangleDown } from 'react-icons/rx';
import { BiLogIn } from 'react-icons/bi';
import { Link, useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { debounce } from '../../helper.js';
import { useSelector } from 'react-redux';
import UserOptions from './UserOptions.jsx';

import '../../../styles/navbar.scss';


const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const history = useHistory();
  const [keyword, setKeyword] = useState("");
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      const formattedKeyword = keyword.trim().split(' ').join(' ');
      history.push(`/cars/${formattedKeyword}`);
    } else {
      history.push("/cars");
    }
  };
  
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
          <img src={'/Images/brandNameNew.png'} alt="CarsBecho Logo" className='brandName h-[70px] relative top-1 sm:block' />
        </div>
        </Link>

        {/* search bar  */}
        <form 
           onSubmit={searchSubmitHandler}
         className="search object-contain rounded bg-[#24272c] items-center relative left-[-60px] md:left-[0px] justify-center flex" role="search">
          <input
            className="searchInput border h-[48px] bg-[#f7f7f7] rounded-l shadow-inner focus:outline-none p-[20px] relative "
            type="text"
            placeholder="Search Cars by Name, Colour, City, RTO"
            onChange={(e) => setKeyword(e.target.value)}
            aria-label="Search"
          />
          <button className="searchBtn w-[50px] h-[48px]" type="submit" value="search">
            <BsSearch className='translate-x-[80%] text-lg invert' />
          </button>
        </form>

        {/* login/register  */}
        <div className="login-dash">
        {isAuthenticated ? <UserOptions user={user} top={'8vmax'} top1={'6vmax'} /> :
        <Link to={'/login'}>
        <div className="login flex gap-[4px]">
          <BiLogIn className='relative bottom-[-3px]' />
          <span>Login/Register</span>
        </div>
        </Link>}
        </div>
      </div>
      <div className="border-b-[1px] w-full"></div>

      <div className="lowerNav justify-between h-[50px] relative bottom-[1px] py-[4px] lg:flex font-normal">
        <ul className='flex p-0 SMN_effect-4'>
          <li className='p-4'>
            <Link to={'/cars'}> USED CAR</Link>
          </li>
          <li className='p-4'>
            <Link to={'/sellCar'}> SELL CAR</Link>
          </li>
          <li className='p-4'>
            <Link to={'/in-progress'}> ABOUT CARSBECHO</Link>
          </li>
          <li className='p-4'>
            <Link to={'/in-progress'}> WORKSHOP</Link>
          </li>
          <li className='p-4'>
            <a href='https://www.businessworld.in/article/CarsBecho-The-Fastest-Growing-Auto-Tech-Startup-Built-On-5irechain/23-12-2022-459255/' target='_blank'> NEWS & REVIEWS</a>
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
