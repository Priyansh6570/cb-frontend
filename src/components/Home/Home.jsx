import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';

//Reducers, API
import { clearErrors, getCar } from "../../actions/carAction.js";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
// import axios from 'axios';

//Components
import NumberWithCommas from '../PriceSeperator';
import MetaData from '../Layout/MetaData';
import ImageSlider from './ImageSlider.jsx';
import NavbarMobileLower from '../Layout/Header/NavbarMobileLower.jsx';
import TestimonialCarousel from './TestimonialCarousel.jsx';
import Loader from '../Layout/Loader/Loader.jsx';

//Icons, Stylesheet
import '../../styles/Home.scss';
import { FiCheckCircle, FiThumbsUp } from 'react-icons/fi';
import { IoCarSportOutline } from 'react-icons/io5';
import { BsArrowRight } from 'react-icons/bs';
import { IoIosArrowDroprightCircle } from 'react-icons/io';
import { FaGasPump } from 'react-icons/fa';
import { SlSpeedometer } from 'react-icons/sl';
import { GiGearStickPattern } from 'react-icons/gi';
import ScrollToTopOnMount from "../ScrollToTopOnMount";
import { CLEAR_SEARCH_RESULTS } from "../../constants/carConstants";
const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, cars } = useSelector((state) => state.cars);

  useEffect(() => {
    dispatch({ type: CLEAR_SEARCH_RESULTS });
    dispatch(getCar());
  }, [dispatch, alert, error]);

  const slides = [
    {
      id: 0,
      image: '/Images/c1.jpg',
    },
    {
      id: 1,
      image: '/Images/c4.jpg',
    },
    {
      id: 2,
      image: '/Images/c6.jpg',
    },
    {
      id: 3,
      image: '/Images/c11.jpg',
    },
    {
      id: 4,
      image: '/Images/c2.jpg',
    },
  ];
  const testimonials = [
    {
      id: 1,
      image: 'Images/img1.jpeg',
    },
    {
      id: 2,
      image: 'Images/img2.jpeg',
    },
    {
      id: 3,
      image: 'Images/img3.jpeg',
    },
    {
      id: 4,
      image: 'Images/img4.jpeg',
    },
    {
      id: 5,
      image: 'Images/img5.jpeg',
    },
  ];

  return (
   <Fragment>
    {loading ? (
      <Loader />
    ) : (
      <main className="flex gap-16 sm:gap-0 flex-col sm:object-contain sm:overflow-hidden">
      <ScrollToTopOnMount />
      <MetaData title="CarsBecho: Gadi Becho Phata Phat" />

       <section className="carousel_container w-[95vw] sm:overflow-hidden h-[75vh] sm:h-[200px] sm:mt-2 my-0 mx-auto relative sm:flex top-[-55px] sm:top-0">
        <div className="home-carousel-text-container absolute z-50 h-[80%] bg-[#000000b3] rounded-xl top-[50px] sm:top-[10px] px-8 sm:px-1 xs:mx-[5%] left-[50px] sm:left-1 flex flex-col justify-start sm:items-center pt-[100px] sm:pt-6 sm:mt-2 sm:mx-[11%]">
          <h1 className="text-[50px] sm:text-[20px] font-bold text-white">
            GET BEST PRICE IN
          </h1>
          <h1 className="text-[50px] sm:text-[20px] font-bold text-[#ee3131] mx-auto">
            10 MINUTES
          </h1>
          <hr className="mt-[20px] sm:mt-1" />
          <div className="button-container-evaluate-you-car">
            <button className="evaluate-button bg-[#ee3131] text-white text-xl xs:w-[300px] font-medium px-8 py-4 rounded flex justify-center items-center mx-auto relative bottom-[-50px] sm:bottom-[-5px] sm:left-[0px] hover:shadow-md sm:scale-[0.6]">
              EVALUATE YOUR CAR{' '}
              <BsArrowRight className="pl-4 text-white w-[50px] scale-[1.2]" />
            </button>
          </div>
        </div>
        <ImageSlider slides={slides} parentWidth={1470} />
      </section>

      {/* mobile lower nav  */}
      <div className="mobile-lower-nav hidden sm:flex sm:pt-8">
        <NavbarMobileLower />
      </div>

      {/* featured_Section  */}
      <section className="featured_Section w-[1300px] sm:w-[100vw] sm:overflow-hidden mx-auto object-contain flex flex-col gap-4 p-4 rounded-2xl my-0 sm:relative sm:top-[100px]">
        <h2 className="text-3xl font-normal pl-4 capitalize sm:text-2xl">
          Featured Cars
        </h2>
        <hr />

        <div className="car-container flex w-[1220px] sm:w-[90vw] m-auto overflow-x-auto gap-4 mt-4">
          {cars && cars.map((car) => {
            return (
              <Link to={`/car/${car._id}`} key={car._id}>
                <div className="carCard flex flex-col gap-[4px] sm:border-1 sm:text-sm hover:border-3 hover:shadow-md w-[294px] sm:w-[164px] sm:h-[192px] sm:p-0 shrink-0 cursor-pointer sm:overflow-hidden">
                  <div className="img-container-car sm:overflow-hidden">
                    <img
                      src={car.image[0].url}
                      alt={car.model}
                      className="w-[300px] h-[150px] sm:w-[282px] sm:h-[90px] object-cover sm:scale-[1.1] "
                    />
                  </div>

                  <div className="carDetails-home flex flex-col gap-[10px] sm:gap-1 sm:pt-[2px]">
                    <span className="flex gap-1 sm:text-sm sm:font-normal text-lg font-semibold">
                      <h2>{car.make}</h2>
                      <h2>{car.model}</h2>
                      <h4 className="font-normal sm:hidden">{`(${car.year})`}</h4>
                    </span>
                    <span className="text-xs mb-2 sm:hidden sm:my-2 sm:text-sm uppercase text-[#3d3d3d] flex">
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

            <div className="carPrice">
            <h3 className='text-2xl sm:text-base font-bold font-sans'>₹ {NumberWithCommas(`${car.price}`)}</h3>
          </div>
                    <div className="click-to-open flex gap-2 items-center text-[#ee3131] mt-4 font-medium text-base">
            <h4>View More</h4>
            <IoIosArrowDroprightCircle />
          </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        <hr />
        <div className="viewAll flex items-center w-full pl-4 sm:pl-0 sm:justify-center">
          <Link to="/cars">
            <button className="view_marketplace text-xl sm:text-lg font-medium ml-4 rounded">
              View Marketplace
            </button>
          </Link>
        </div>
      </section>

      {/* about section  */}

      <section className="about_Section object-contain w-full bg-slate-50 sm:relative sm:top-[150px]">
        <div className="about_container w-[1300px] sm:w-[95vw] mx-auto object-contain bg-slate-50 flex flex-col gap-4 p-8  my-8">
          <div className="flex items-center justify-between sm:justify-center sm:w-full">
            <h2 className="text-[40px] sm:text-[28px] pl-4 sm:pl-0 capitalize font-semibold ml-4 sm:ml-0">
              sell in 3 easy steps!
            </h2>
            <img
              src={'Images/cbLogo.png'}
              alt="carsBecho Logo"
              className="w-24 sm:hidden"
            />
          </div>
          <hr />

          <div className="about_card_container flex flex-wrap items-center sm:gap-0 gap-8 p-4 mx-auto sm:relative sm:left-[-25px]">
            <div className="card1 card w-[360px] h-[300px] sm:scale-[0.8] bg-white cursor-pointer rounded-2xl flex flex-col p-8 sm:relative sm:left-[-55px]">
              <h3 className="text-2xl font-bold text-[#ee3131] pt-8 pb-8 mx-auto">
                Online Price Estimate{' '}
              </h3>
              <hr />
              <p className="ju justify-items-stretch py-8 px-6 text-lg font-normal text-justify">
                Enter your car details, and get an estimate selling price in a
                minute.
              </p>
              <img
                src={'Images/priceEstimatelogo.png'}
                alt="vector image"
                className="card-image1 relative sm:bottom-[110px] xs:bottom-[80px] xs:left-[148px] sm:left-[250px] z-20 scale-[1.2]"
              />
            </div>
            <div className="card2 card w-[360px] h-[300px] xs:w-[309px] xs:h-[270px] sm:scale-[0.8] xs:left-[48px] sm:top-[-30px] bg-white cursor-pointer rounded-2xl flex flex-col p-8 sm:relative sm:left-[60px]">
              <h3 className="text-2xl font-bold text-[#ee3131] pt-8 pb-8 mx-auto text-center">
                Inspection at home or branch
              </h3>
              <hr className="relative top-[-25px]" />
              <p className="ju justify-items-stretch pb-8 px-6 text-lg font-normal text-justify">
                Each car is unique! Our expert evaluates your car to give you
                the final price.
              </p>
              <img
                src={'Images/inspectionlogo.png'}
                alt="vector image"
                className="card-image2 relative sm:bottom-[150px] sm:right-[250px] xs:right-[210px] xs:bottom-[131px] bottom-8 z-20"
              />
            </div>
            <div className="card3 card w-[360px] h-[300px] sm:scale-[0.8] sm:top-[-57px] xs:top-[-50px] bg-white cursor-pointer rounded-2xl flex flex-col p-8 sm:relative sm:left-[-55px]">
              <h3 className="text-2xl font-bold text-[#ee3131] pt-8 pb-8 mx-auto">
                Sell & get paid!
              </h3>
              <hr />
              <p className="ju justify-items-stretch py-8 px-6 text-lg font-normal text-justify">
                Get the best price through online auction and get paid
                instantly. We also take care of the RC Transfer for free.
              </p>
              <img
                src={'Images/selllogo.png'}
                alt="vector image"
                className="card-image3 relative bottom-12 xs:bottom-[70px] xs:left-[150px] z-20  sm:bottom-[101px] sm:left-[211px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* why choose us section  */}
      <section className="whyChooseUs object-contain w-full bg-slate-50 flex sm:flex-col sm:justify-center sm:items-center gap-8 mt-12 sm:relative sm:top-[50px]">
        <div className="sm:flex items-center justify-between hidden xs:relative xs:top-14">
          <h2 className="text-[40px] sm:text-[25px] pl-4 capitalize font-semibold ml-4">
            why choose us?
          </h2>
        </div>
        <hr className="w-[80vw] hidden sm:flex xs:relative xs:top-14" />
        <div className="whyChooseUs-container flex flex-wrap gap-8 sm:gap-0 sm:p-1 p-8 mx-auto sm:mx-0 sm:justify-center sm:items-center">
          <div className="card-x card w-[360px] sm:w-full h-[300px] bg-[#ee3131] cursor-pointer rounded-2xl flex flex-col p-8 place-content-center">
            <div className="ico w-[80px] h-[80px] rounded bg-white flex place-content-center items-center place-self-center">
              <FiCheckCircle className="text-[#ee3131] text-[40px]" />
            </div>
            <div className="relative bottom-[-30px] w-full flex flex-col justify-center">
              <h3 className="text-3xl font-bold text-[#ffffff] pt-2 pb-2 mx-auto">
                BEST PRICE{' '}
              </h3>
              <p className="ju justify-items-stretch pb-8 pt-4 px-6 text-xl font-normal text-center text-white">
                Enter your car details, and get an estimate selling price in a
                minute.
              </p>
            </div>
          </div>
          <div className="card-x mx-[20px] sm:mx-0 card w-[360px] sm:w-full h-[300px] bg-[#ee3131] cursor-pointer rounded-2xl flex flex-col p-8 place-content-center sm:relative sm:top-[-60px]">
            <div className="ico w-[80px] h-[80px] rounded bg-white flex place-content-center items-center place-self-center">
              <IoCarSportOutline className="text-[#ee3131] text-[40px]" />
            </div>
            <div className="relative bottom-[-30px] w-full flex flex-col justify-center">
              <h3 className="text-3xl font-bold text-[#ffffff] pt-2 pb-2 mx-auto">
                INSTANT PAYMENT{' '}
              </h3>
              <p className="ju justify-items-stretch pb-8 pt-4 px-6 text-xl font-normal text-center text-white">
                The entire amount is tranferred to you even before car pickup!
              </p>
            </div>
          </div>
          <div className="card-x card w-[360px] sm:w-full h-[300px] bg-[#ee3131] cursor-pointer rounded-2xl flex flex-col p-8 place-content-center sm:relative sm:top-[-110px]">
            <div className="ico w-[80px] h-[80px] rounded bg-white flex place-content-center items-center place-self-center">
              <FiThumbsUp className="text-[#ee3131] text-[40px]" />
            </div>
            <div className="relative bottom-[-35px] w-full flex flex-col justify-center">
              <h3 className="text-3xl font-bold text-[#ffffff] pt-2 pb-2 mx-auto">
                FREE RC TRANSFER{' '}
              </h3>
              <p className="ju justify-items-stretch pb-8 pt-4 px-2 text-xl font-normal text-center text-white">
                We'll handle all the paperwork, from Loan clearance to RC
                transfer for free
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* testimonials section  */}
      <section className="testimonials w-[1300px] sm:w-[100vw] mx-auto h-[650px] sm:h-[400px] xs:h-[300px] flex flex-col gap-4 p-8 sm:p-0 rounded-2xl my-8 sm:relative sm:top-[-50px]">
        <div className="testimonial-carousel-container w-[1000px] sm:w-[90vw] h-[90%] my-0 mx-auto relative top-[-30px] mt-12 rounded-2xl flex flex-col justify-center">
          <h2 className="text-[40px] sm:text-[18px] sm:text-center place-self-center capitalize font-semibold ml-4 pb-8">
            Our Trusted +1000 Channel partners
          </h2>
          <hr className="py-8 xs:py-0" />
          <div className="testimonial-desktop-mode sm:hidden h-[90%]">
            <TestimonialCarousel
              slides={testimonials}
              parentWidth={1000}
              className="relative bottom-[100px]"
            />
          </div>
          <div className="testimonial-mobile-mode hidden sm:flex w-[90vw] h-[90%] overflow-hidden">
            <TestimonialCarousel
              slides={testimonials}
              parentWidth={400}
              className="relative bottom-[100px] overflow-hidden"
            />
          </div>
        </div>
      </section>
    </main>
    )}
    </Fragment>
  );
};

export default Home;
