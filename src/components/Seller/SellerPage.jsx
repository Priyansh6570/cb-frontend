import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { getAllCarsBySeller } from "../../actions/carAction";
import { getUserDetails } from "../../actions/userAction";
import MetaData from "../Layout/MetaData";
import NumberWithCommas from "../PriceSeperator";
import { FaGasPump } from "react-icons/fa";
import { SlSpeedometer } from "react-icons/sl";
import { Link } from "react-router-dom";
import { GiGearStickPattern } from "react-icons/gi";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import "../../styles/carCard.scss";
import "../../styles/SellerPage.scss";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const SellerPage = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { cars, loading, error, carCount } = useSelector((state) => state.cars);
  const { user } = useSelector((state) => state.user);

  console.log(user);

  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 6;
  const maxDisplayedPages = 4;

  // Pagination
  const indexOfLastUser = currentPage * carsPerPage;
  const indexOfFirstUser = indexOfLastUser - carsPerPage;
  const currentUsers = cars.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate total pages
  const totalPages = Math.ceil(cars.length / carsPerPage);

  // Determine the range of page numbers to display
  const getPageRange = () => {
    let startPage;
    let endPage;

    if (totalPages <= 4) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 2) {
        startPage = 1;
        endPage = 4;
      } else if (currentPage >= totalPages - 1) {
        startPage = totalPages - 3;
        endPage = totalPages;
      } else {
        startPage = currentPage - 1;
        endPage = currentPage + 2;
      }
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  useEffect(() => {
    if (user) {
      dispatch(getAllCarsBySeller(user._id));
      dispatch(getUserDetails(user._id));
    }
  }, [dispatch, user]);

  return (
    <>
      <MetaData title={"Seller Page"} />
      <main className='p-2 flex sm:flex-col w-full h-fit gap-8 bg-[url("/Images/user-action-bg.jpg")] bg-fixed bg-cover overflow-hidden'>
        <section className="seller_details h-fit w-[400px] sm:w-full mt-4 sm:mt-0 p-8 rounded-xl bg-[#b7b7b747] shadow-lg sticky top-[50px] sm:top-0 mb-8">
          <div className="up h-[30%] w-full">
            {user && user.avatar && (
              <img
                src={user.avatar[0].url}
                className="w-full h-full object-cover rounded-lg"
                alt={user.name}
              />
            )}
          </div>
          <div className="down h-[70%] gap-2 w-full flex flex-col p-4 rounded-xl">
            <div className="absolute overflow-hidden rounded-full w-[150px] left-[50%] translate-x-[-50%] top-[150px] border-[5px] border-white scale-75 bg-white h-[150px]">
              <img
                src="/Images/user.png"
                alt={user.name}
                className="scale-[1.2]"
              />
            </div>

            <div className="">
              <h2 className="text-lg mt-[110px] sm:mt-[40px] font-medium p-2">Name</h2>
              <div className="sd_name sd text-lg text-center p-4 bg-[#f0f0f3] rounded-xl  text-primary">
                {user && user.name}
              </div>
            </div>
            {user && user.role === "dealer" && (
              <div className="">
              <h2 className="text-lg font-medium p-2">Dealership </h2>
              <div className="text-lg text-center p-4 sd bg-[#f0f0f3] rounded-xl  text-primary">
                {user && user.dealershipName}
              </div>
            </div>
            )}
            <div className="">
              <h2 className="text-lg font-medium p-2">Email</h2>
              <h1 className="text-sm text-center p-4 sd bg-[#f0f0f3] rounded-xl  text-primary">
                {user && user.email}
              </h1>
            </div>
            <div className="">
              <h2 className="text-lg font-medium p-2">Mobile</h2>
              <h1 className="text-xl text-center p-4 sd bg-[#f0f0f3] rounded-xl  text-primary">
                {user && user.mobile}
              </h1>
            </div>
            <div className="">
              <h2 className="text-lg font-medium p-2">Address</h2>
              <h1 className="text-lg text-center p-4 sd bg-[#f0f0f3] rounded-xl  text-primary">
                {user && user.address}
              </h1>
            </div>
            <img src="/Images/" alt="" />
          </div>
        </section>

        <section className="seller_cars w-[70%] sm:w-full mx-auto mt-5 sm:mt-0">
          <div className="main w-full bg-[url('/Images/bg-car-side.jpg')] bg-fixed bg-cover mx-auto m-8 mb-0 sm:m-1 h-[130px] sm:h-[150px] rounded-2xl ">
            <h2 className="text-black  text-[30px] scale-[1.5] sm:text-[#fff] sm: xs:top-[0.9rem] xs:text-black sm:top-[1.4rem] sm:left-[-20px] font-sans font-bold relative top-2 pt-8 justify-center flex">
              Cars
            </h2>
          </div>
          
          {/* seller credit details  */}
          <div className="w-full h-[50px] flex mb-8 relative top-[-10px] justify-evenly align-middle rounded bg-slate-50">
            <div className="flex gap-2 self-center">
              <h1 className="text-lg text-gray-600 font-medium">Credit : </h1>
              {
                user && user.role === "admin" ? (
                  <h1 className="text-lg text-gray-900 font-medium scale-[2]">∞</h1>
                ) : ( <h1 className="text-lg text-gray-900 font-medium">{user && user.credit}</h1> )
              }
            </div>
            <div className="flex gap-2 self-center">
              <h1 className="text-lg text-gray-600 font-medium">Expire Time : </h1>
              <h1 className="text-lg text-gray-900 font-medium">{user && user.expireLimit} Days</h1>
            </div>
            <div className="flex gap-2 self-center">
              <h1 className="text-lg text-gray-600 font-medium">Total Cars : </h1>
              <h1 className="text-lg text-gray-900 font-medium">{cars.length}</h1>
            </div>
          </div>


          <div className=" grid-cols-1 flex flex-wrap md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-1 sm:mx-1">
            {currentUsers.map((car) =>(
             <>
              <Link to={`/seller/car/${car._id}`} className="h-fit" key={car._id}>
              <div className="carCard sm:hidden flex flex-col gap-[4px] sm:border-1 sm:text-sm hover:border-3 hover:shadow-md sm:w-[154px] sm:h-[192px] sm:p-0 shrink-0 cursor-pointer sm:overflow-hidden">
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
            <Link to={`/seller/car/${car._id}`} key={`mobile_car_${car._id}`}>
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
            ))}
          </div>
          {cars && cars.length > carsPerPage && (
            <div className="flex justify-center mt-4">
              <button
                className="bg-gray-200 hover:bg-gray-300 rounded-md p-2"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <BsChevronLeft />
              </button>
              {getPageRange().map((page, index) =>
                page === "..." ? (
                  <span key={index} className="mx-2">
                    {page}
                  </span>
                ) : (
                  <button
                    key={index}
                    className={`mx-2 ${
                      page === currentPage
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    } rounded-md p-2`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                className="bg-gray-200 hover:bg-gray-300 rounded-md p-2"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <BsChevronRight />
              </button>
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default SellerPage;
