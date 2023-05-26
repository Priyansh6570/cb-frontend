import React from "react";
import NumberWithCommas from "../PriceSeperator";
import { FaGasPump } from "react-icons/fa";
import { SlSpeedometer } from "react-icons/sl";
import { Link } from "react-router-dom";
import { GiGearStickPattern } from "react-icons/gi";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import "../../styles/carCard.scss";

const Car = (props) => {
  const { car } = props;
  return (
    <>
      <Link to={`/car/${car._id}`} className="h-fit" key={car._id}>
        <div className="carCard sm:hidden flex w-[300px] h-fit flex-col gap-[4px] sm:border-1 sm:text-sm hover:border-3 hover:shadow-md sm:w-[154px] sm:h-[192px] sm:p-0 shrink-0 cursor-pointer sm:overflow-hidden">
          <div className="img-container-car sm:overflow-hidden">
            <img
              src={car && car.image[0].url}
              alt={car.model}
              className="w-[300px] h-[150px] sm:w-[282px] sm:h-[90px] object-cover sm:scale-[1.1] "
            />
          </div>
          <div className="carDetails flex flex-col gap-[10px] sm:px-2">
            <span className="flex gap-1 sm:text-sm text-lg font-semibold">
              <h2>{car.make}</h2>
              <h2>{car.model}</h2>
              <h4 className="font-normal sm:hidden">{`(${car.year})`}</h4>
            </span>
            <span className="text-xs mb-2 sm:my-2 sm:text-sm uppercase text-[#3d3d3d] flex">
              <span className="flex gap-2 mr-2 justify-center items-center">
                <FaGasPump /> {car.fuel} {` | `}
              </span>
              <span className="flex gap-2 mr-2 justify-center items-center">
                <SlSpeedometer /> {car.Km_Driven}km{` | `}
              </span>
              <span className="flex gap-2 mr-2 justify-center items-center">
                <GiGearStickPattern />
                {car.transmission}
              </span>
            </span>
            <div className="carPrice font-bold text-xl">
              <h3>₹ {NumberWithCommas(`${car.price}`)}</h3>
            </div>
            <div className="click-to-open flex gap-2 items-center text-[#ee3131] mt-4 font-medium text-sm">
              <h4>View More</h4>
              <IoIosArrowDroprightCircle />
            </div>
          </div>
        </div>
      </Link>
      <Link to={`/car/${car._id}`} key={`mobile_car_${car._id}`}>
        <div className="mobile-carCard hidden sm:flex w-[100vw] h-fit p-1 rounded-xl gap-4 cursor pointer">
          <div className="image-container w-[35%] h-[100px] p-1">
            <img
              src={car.image[0].url}
              alt={car.model}
              className="w-full h-full object-cover rounded"
            />
          </div>
          <div className="carDetails flex flex-col gap-[5px] w-[60%] h-[80%] p-1">
            <span className="flex gap-1 whitespace-nowrap text-sm">
              <h2>{car.year}</h2>
              <h2>{car.make}</h2>
              <h2>{car.model}</h2>
              <h2 className="overflow-hidden text-ellipsis varient">
                {car.varient}
              </h2>
            </span>
            <div className="main-perks text-[#666] flex text-xs items-center gap-2">
              <span className="flex gap-1 mr-1 justify-center items-center">
                <FaGasPump /> {car.fuel}
                {`•`}
              </span>
              <span className="flex gap-2 mr-2 justify-center items-center">
                <SlSpeedometer /> {car.Km_Driven}km{`•`}
              </span>
              <span className="flex gap-2 mr-2 justify-center items-center">
                <GiGearStickPattern />
                {car.transmission}
              </span>
            </div>
            <div className="carPrice">
              <h3 className="text-2xl font-bold font-sans">
                ₹ {NumberWithCommas(`${car.price}`)}
              </h3>
            </div>
            <div className="click-to-open flex gap-2 items-center text-[#ee3131] mt-1 font-medium text-sm">
              <h4>Click to View More</h4>
              <IoIosArrowDroprightCircle />
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Car;
