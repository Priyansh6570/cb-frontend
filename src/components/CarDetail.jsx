import React from 'react';
import { useParams } from 'react-router-dom';
import { useReducer, useEffect } from 'react';
import axios from 'axios';
import '../styles/carDetail.scss';
import { FaGasPump } from 'react-icons/fa';
import { SlSpeedometer } from 'react-icons/sl';
import { GiGearStickPattern } from 'react-icons/gi';
import NumberWithCommas from './PriceSeperator';
import Badge from './Badge';
import { FaHeart } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import Loader from './Loader';
import { getError } from '../utils';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, car: action.payload, error: '' };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
const CarDetail = () => {
  const params = useParams();
  const { id } = params;

  const [{ loading, error, car }, dispatch] = useReducer(reducer, {
    loading: true,
    car: [],
    error: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`http://localhost:5000/api/cars/${id}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (error) {
        dispatch({ type: 'FETCH_ERROR', payload: getError(error) });
      }
    };
    fetchData();
  }, [id]);

  return loading ? (
    <Loader />
  ) : error ? (
    <div className="error-container w-full h-[90vh] justify-center items-center">
      <div className="error w-[60vw] h-[40px] bg-[#ff74747f] rounded flex justify-center items-center relative top-[20%] m-auto">
        <h2 className="text-xl font-medium uppercase">{error}</h2>
      </div>
    </div>
  ) : (
    <div className="carName">
      <main className="carDetail__mainContainer sm:overflow-hidden flex sm:flex-col gap-10 sm:gap-0 my-[50px] sm:my-2 w-[1220px] sm:w-[100vw] mx-auto  ">
        <div className="left w-[800px] sm:w-full text-justify flex flex-col justify-center gap-8 sm:gap-0">
          <div className="carousel w-full h-[372px] sm:h-[200px] bg-slate-900 rounded-2xl">
            <img
              src={car.image}
              alt={car.model}
              className="rounded-2xl object-cover"
            />
          </div>

          <div className="detail w-full object-contain flex flex-col gap-4 sm:gap-2  p-8 sm:p-1 rounded-2xl sm:mt-6 sm:px-4">
            <Helmet>
              <title>{car.company}</title>
            </Helmet>
            <div className="flex justify-between items-center">
              <h2 className="text-3xl sm:text-base font-medium">
                {car.company}
                {` `}
                {car.model}
                {` `}
                {car.year}
              </h2>
              <span className="sm:flex hidden shortList gap-2 items-center cursor-pointer pl-4">
                <FaHeart className="text-[#ffcfcf] font-lg" />
                <h3 className="font-light text-base">Shortlist</h3>
              </span>
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

              <span className="flex gap-4 w-full">
                <button className="make_offer bg-[#ee3131] text-white text-2xl font-bold rounded">
                  Make Offer
                </button>
                <button className="contact_seller text-2xl font-bold rounded">
                  Contact Seller
                </button>
              </span>
            </div>
          </div>

          <div className="carDetail_carOverview w-full h-[372px] sm:h-[500px] flex flex-col gap-4 p-8 sm:p-2 rounded-2xl">
            <h2 className="text-2xl sm:px-8 sm:py-4 font-bold">Overview</h2>
            <hr />
            <ul className="flex gap-8 sm:gap-6 sm:ml-4 sm:text-sm w-[100%] flex-wrap">
              <li className="flex gap-4 items-center">
                <span className="w-[50%] font-semibold overview-label">
                  Model :{' '}
                </span>
                <span className="w-[50%] lable-content">{car.model}</span>
              </li>
              <li className="flex gap-4 items-center">
                <span className="w-[50%] font-semibold overview-label">
                  Brand :{' '}
                </span>
                <span className="w-[50%] lable-content">{car.company}</span>
              </li>
              <li className="flex gap-4 items-center">
                <span className="w-[50%] font-semibold overview-label">
                  Year :{' '}
                </span>
                <span className="w-[50%] lable-content">{car.year}</span>
              </li>
              <li className="flex gap-4 items-center">
                <span className="w-[50%] font-semibold overview-label">
                  Km Driven :{' '}
                </span>
                <span className="w-[50%] lable-content">{car.Km_Driven}km</span>
              </li>
              <li className="flex gap-4 items-center">
                <span className="w-[50%] font-semibold overview-label">
                  Mileage :{' '}
                </span>
                <span className="w-[50%] lable-content">{car.mileage}km/l</span>
              </li>
              <li className="flex gap-4 items-center">
                <span className="w-[50%] font-semibold overview-label">
                  Fuel :{' '}
                </span>
                <span className="w-[50%] lable-content">{car.fuel}</span>
              </li>
              <li className="flex gap-4 items-center">
                <span className="w-[50%] font-semibold overview-label">
                  Transmission :{' '}
                </span>
                <span className="w-[50%] lable-content">
                  {car.transmission}
                </span>
              </li>
              <li className="flex gap-4 items-center">
                <span className="w-[50%] font-semibold overview-label">
                  Engine :{' '}
                </span>
                <span className="w-[50%] lable-content">{car.engine}</span>
              </li>
              <li className="flex gap-4 items-center">
                <span className="w-[50%] font-semibold overview-label">
                  Color :{' '}
                </span>
                <span className="w-[50%] lable-content">{car.color}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="right sm:h-[200px] sm:w-full sm:p-1 h-[60vh] w-[480px] p-8 flex gap-4 flex-col">
          <div className="price sm:hidden w-full flex flex-col justify-start items-center gap-8 rounded-2xl p-8">
            <span className="text-[45px] text-[#002f34] font-bold">
              ₹ {NumberWithCommas(`${car.price}`)}
            </span>

            <span className="flex gap-4 w-full">
              <button className="make_offer bg-[#ee3131] text-white text-2xl font-bold rounded">
                Make Offer
              </button>
              <button className="contact_seller text-2xl font-bold rounded">
                Contact Seller
              </button>
            </span>
          </div>

          <span className="sm:hidden shortList flex gap-2 items-center cursor-pointer pl-4">
            <FaHeart className="text-[#ffcfcf] font-lg" />
            <h3 className="font-light text-base">Shortlist</h3>
          </span>

          <div className="seller_Detail w-full flex flex-col gap-2 rounded-2xl p-8">
            <div className="wrapper-badge flex justify-between items-center">
              <small className="uppercase font-extralight text-base">
                sold by
              </small>

              {car.seller_verified === true ? (
                <Badge />
              ) : (
                <div className=""></div>
              )}
            </div>
            <span className="seller_name text-3xl font-[700]">
              {car.seller_name}
            </span>

            <small className="capitalize font-extralight text-base pt-4">
              Posted on : {car.seller_date}
            </small>
          </div>
        </div>
      </main>
      <div className="mb-8 h-[50vh] w-[1220px] sm:w-full bg-yellow-500 m-auto"></div>
    </div>
  );
};

export default CarDetail;
