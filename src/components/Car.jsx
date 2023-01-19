import React from 'react';
import NumberWithCommas from './PriceSeperator';
import { FaGasPump } from 'react-icons/fa';
import { SlSpeedometer } from 'react-icons/sl';
import { GiGearStickPattern } from 'react-icons/gi';
import { IoIosArrowDroprightCircle } from 'react-icons/io';
import '../styles/carCard.scss'

const Car = (props) => {
  const { car } = props;
  return (
    <>
      <div className="carCard flex flex-col gap-[10px] sm:hidden border-2 w-[300px] h-[400px] p-4 rounded shrink-0 cursor-pointer">
        <img
          src={car.image}
          alt={car.model}
          className="w-[300px] h-[250px] object-cover rounded "
        />
        <div className="carDetails flex flex-col gap-[10px]">
          <span className="flex gap-1">
            <h2>{car.company}</h2>
            <h2>{car.model}</h2>
          </span>
          <div className="carPrice">
            <h3>₹ {NumberWithCommas(`${car.price}`)}</h3>
          </div>
          <div className="carYear">
            <h4>{car.year}</h4>
          </div>
        </div>
      </div>

      <div className="mobile-carCard hidden sm:flex w-[100vw] h-[125px] p-1 rounded-xl gap-4 cursor pointer">
        <div className="image-container w-[30%] h-[100px] p-1">
          <img
            src={car.image}
            alt={car.model}
            className="w-full h-full object-cover rounded"
          />
        </div>
        <div className="carDetails flex flex-col gap-[5px] w-[60%] h-[80%] p-1">
          <span className="flex gap-1 whitespace-nowrap text-sm">
            <h2>{car.year}</h2>
            <h2>{car.company}</h2>
            <h2>{car.model}</h2>
            <h2 className='overflow-hidden text-ellipsis varient'>{car.varient}</h2>
          </span>
          <div className="main-perks text-[#666] flex text-xs items-center gap-2">
            
          <span className='flex gap-1 mr-1 justify-center items-center'><FaGasPump /> {car.fuel}{`•`}</span>
              <span className='flex gap-2 mr-2 justify-center items-center'><SlSpeedometer /> {car.Km_Driven}km{`•`}</span>
              <span className='flex gap-2 mr-2 justify-center items-center'><GiGearStickPattern />{car.transmission}</span>
          </div>
          <div className="carPrice">
            <h3 className='text-2xl font-bold font-sans'>₹ {NumberWithCommas(`${car.price}`)}</h3>
          </div>
          <div className="click-to-open flex gap-2 items-center text-[#ee3131] mt-4 font-medium text-sm">
            <h4>Click to View More</h4>
            <IoIosArrowDroprightCircle />
          </div>
        </div>
      </div>
    </>
  );
};

export default Car;
