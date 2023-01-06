import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbarMobileLower.scss';

const NavbarMobileLower = () => {
  return (
    <section className="lowerNav flex flex-wrap p-4 gap-4 w-[97vw] object-contain justify-center mx-auto relative">
      <Link
        to={'./newCar'}Car
        className="lower-nav-link active:scale-[0.95] w-[48%] h-[150px] flex flex-col justify-center items-center rounded-xl bg-[#995ded]"
      >
        <h3 className='text-xl font-semibold text-white'>New Car</h3>
        <img src={'Images/new-car.png'} alt="new-car logo" />
      </Link>
      <Link
        to={'./sellCar'}
        className="lower-nav-link active:scale-[0.95] w-[48%] h-[150px] flex flex-col justify-center items-center rounded-xl bg-[#ee3131]"
      >
        <h3 className='text-xl font-semibold text-white'>Sell Car</h3>
        <img src={'Images/car.png'} alt="sell-car logo" />
      </Link>
      <Link
        to={'./usedCar'}
        className="lower-nav-link active:scale-[0.95] w-[48%] h-[150px] flex flex-col justify-center items-center rounded-xl bg-[#5ca7f9]"
      >
        <h3 className='text-xl font-semibold text-white'>Used Car</h3>
      <img src={'Images/sport-car.png'} alt="used-car logo" className='w-[80px]'/>
      </Link>
      <Link
        to={'./workshop'}
        className="lower-nav-link active:scale-[0.95] w-[48%] h-[150px] flex flex-col justify-center items-center rounded-xl bg-[#52dc99]"
      >
        <h3 className='text-xl font-semibold text-white'>Workshop</h3>
        <img src={'Images/mechanic.png'} alt="mechanic logo" />
      </Link>
    </section>
  );
};

export default NavbarMobileLower;
