import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import Carousel from "react-material-ui-carousel";
import { Link } from "react-router-dom";

// Components, APIs, utils
import Loader from "../Layout/Loader/Loader";
import MetaData from "../Layout/MetaData";
import NumberWithCommas from "../PriceSeperator";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getCarDetails,
  approvePendingCar, // Import the action
} from "../../actions/carAction";

// Styles, Icons
import "../../styles/carDetail.scss";
import { FaGasPump } from "react-icons/fa";
import { SlSpeedometer } from "react-icons/sl";
import { GiGearStickPattern } from "react-icons/gi";

const ApproveCar = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { id } = useParams();
  const { car, loading, error } = useSelector((state) => state.carDetails);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getCarDetails(id));
  }, [dispatch, id, error, alert]);

  const handleApprove = () => {
    if (car && car._id) {
      const carId = car._id;
      console.log('id : ', carId);
      dispatch(approvePendingCar(carId));
    }
  };

  const seller = car?.user;
  console.log('seller : ', seller);

  return loading || !car ? (
    <Loader />
  ) :  (
    <div className="carName">
      <main className="carDetail__mainContainer sm:overflow-hidden flex sm:flex-col gap-10 sm:gap-0 my-[50px] sm:my-2 w-[1220px] sm:w-[100vw] mx-auto  ">
        <div className="left w-[800px] sm:w-full text-justify flex flex-col justify-center gap-8 sm:gap-0">
          <div className="carousel w-full h-[372px] xs:h-[200px] sm:h-[230px] bg-slate-900 rounded-2xl">
            <Carousel className="h-[372px] xs:h-[200px] sm:h-[230px] rounded-2xl">
              {car.image &&
                car.image.map((item, i) => (
                  <img
                    key={item.url}
                    src={item.url}
                    alt={`${i} Slide`}
                    className="CarouselImage rounded-2xl h-[372px] relative sm:top-[0px] object-contain"
                  />
                ))}
            </Carousel>
          </div>

          <div className="detail w-full object-contain flex flex-col gap-4 sm:gap-2  p-8 sm:p-1 rounded-2xl sm:mt-6 sm:px-4">
            <MetaData
              title={`${car.make} ${car.model} ${car.varient} ${car.year}`}
            />

            <div className="flex justify-between items-center">
              <h2 className="text-3xl sm:text-base font-medium">
                {car.make}
                {` `}
                {car.model}
                {` `}
                {car.year}
              </h2>
            </div>
            <p className="text-xl sm:text-base">{car.varient}</p>
            <span className="text-xl sm:my-4 sm:text-sm uppercase text-[#666] flex">
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
            <div className=" hidden mb-4 sm:flex price w-full flex-col justify-start items-center gap-8 rounded-2xl p-8 mt-2">
              <span className="text-3xl text-[#002f34] font-bold">
                ₹ {NumberWithCommas(`${car.price}`)}
              </span>
            </div>
          </div>

          <div className="carDetail_carOverview w-full h-[372px] sm:h-[500px] flex flex-col gap-4 p-8 sm:p-2 rounded-2xl">
            <h2 className="text-2xl sm:px-8 sm:py-4 font-bold">Overview</h2>
            {/* <hr /> */}
            <ul className="flex gap-8 sm:gap-6 sm:ml-4 sm:text-sm w-[100%] flex-wrap">
              <li className="flex gap-4 items-center">
                <span className="w-[50%] font-semibold overview-label">
                  Model :{" "}
                </span>
                <span className="w-[50%] lable-content">{car.model}</span>
              </li>
              <li className="flex gap-4 items-center">
                <span className="w-[50%] font-semibold overview-label">
                  Brand :{" "}
                </span>
                <span className="w-[50%] lable-content">{car.make}</span>
              </li>
              <li className="flex gap-4 items-center">
                <span className="w-[50%] font-semibold overview-label">
                  Year :{" "}
                </span>
                <span className="w-[50%] lable-content">{car.year}</span>
              </li>
              <li className="flex gap-4 items-center">
                <span className="w-[50%] font-semibold overview-label">
                  Km Driven :{" "}
                </span>
                <span className="w-[50%] lable-content">{car.Km_Driven}km</span>
              </li>
              <li className="flex gap-4 items-center">
                <span className="w-[50%] font-semibold overview-label">
                  RTO :{" "}
                </span>
                <span className="w-[50%] lable-content">{car.RTO}</span>
              </li>
              <li className="flex gap-4 items-center">
                <span className="w-[50%] font-semibold overview-label">
                  Transmission :{" "}
                </span>
                <span className="w-[50%] lable-content">
                  {car.transmission}
                </span>
              </li>
              <li className="flex gap-4 items-center">
                <span className="w-[50%] font-semibold overview-label">
                  Fuel :{" "}
                </span>
                <span className="w-[50%] lable-content">{car.fuel}</span>
              </li>
              <li className="flex gap-4 items-center">
                <span className="w-[50%] font-semibold overview-label">
                  Past Owners :{" "}
                </span>
                <span className="w-[50%] lable-content">
                  {car.no_of_owners}
                </span>
              </li>
              <li className="flex gap-4 items-center">
                <span className="w-[50%] font-semibold overview-label">
                  Color :{" "}
                </span>
                <span className="w-[50%] lable-content">{car.color}</span>
              </li>
              <li className="flex gap-4 items-center">
                <span className="w-[50%] font-semibold overview-label">
                  Category :{" "}
                </span>

                <span className="w-[50%] lable-content">{car.category}</span>
              </li>
            </ul>
          </div>

          
          <div className="carDescription w-full h-fit sm:h-fit flex flex-col gap-4 p-8 sm:px-2 rounded-2xl">
            <h2 className="text-2xl sm:px-8 sm:py-4 font-bold">Description</h2>
            {/* <hr /> */}
            <p className="sm:px-4">{car.description}</p>
          </div>
        </div>

        <div className="right price sm:h-fit sm:my-8 sm:w-full sm:p-1 h-fit w-[480px] p-8 flex gap-4 flex-col">
          <h2 className="font-semibold text-lg sm:my-4 sm:p-4">Car Verification</h2>
          {/* <select
            value={car?.verified ? "true" : "false"}
            onChange={(e) => handleApprove(id, e.target.value)}
          >
            <option value="false">Not Verified</option>
            <option value="true">Verified</option>
          </select> */}
          <button className="btn bg-[#ee3131] text-white font-semibold text-lg p-4" onClick={handleApprove}>Approve Car</button>

          <div className="price sm:hidden w-full flex flex-col justify-start items-center gap-8 rounded-2xl p-8">
            <span className="text-[45px] text-[#002f34] font-bold">
              ₹ {NumberWithCommas(`${car.price}`)}
            </span>
          </div>
          <Link to={`/seller/${seller && seller._id}`} className='sm:px-6 w-full'>
            <div className="seller_Detail w-full h-[360px] sm:pb-[60px] flex flex-col gap-2 rounded-2xl">
              <div className="top-div w-full overflow-hidden h-[139px]">
                <span className="seller-title text-sm m-2 py-1 px-4 rounded-2xl bg-[#ffffff60] font-semibold absolute text-white z-10">
                  SELLER DETAILS
                </span>
                <img src={car.image && car.image[0].url} alt={car.name} />
                <div className="overlay bg-black opacity-40"></div>
              </div>

              <div className="bottom-div relative top-[-73px] p-8 w-full h-[50%] flex flex-col gap-4">
                {/* seller image  */}
                <div className="seller-img scale-[1.2] w-full h-[50%] flex justify-center items-center">
                  {seller && seller.avatar.length > 0 && (
                    <img
                    src={seller.avatar[0].url}
                    alt={seller.name}
                    className="w-[100px] avatar-image h-[100px] rounded-full border-white border-[5px]"
                    />
                    )}
                </div>
                <div className="seller-name w-full h-[50%] flex flex-col gap-2">
                  {/* seller name  */}
                  <h3 className="text-2xl font-bold place-self-center capitalize py-6">
                    {seller && seller.name}
                  </h3>

                  {/* seller email  */}
                  <span className="text-base xs:text-[0.9rem] py-2 px-6 rounded-2xl bg-[#ffffff7c] font-medium">
                    {seller && seller.email}
                  </span>

                    {/* seller mobile  */}
                  {/* <span className="text-base xs:text-[0.9rem] py-2 px-6 rounded-2xl bg-[#ffffff7c] font-medium">
                    {seller && seller.mobile}
                  </span> */}

                  <small className="text-base py-2 px-6 rounded-2xl bg-[#ffffff8c] font-medium">
                    Posted on :{" "}
                    {new Date(car.createdAt)
                      .toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                      .replace(/(\d+)(?:st|nd|rd|th)/, "$1$2")}
                  </small>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default ApproveCar;
