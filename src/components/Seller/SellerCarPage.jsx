import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { getAllCarsBySeller } from "../../actions/carAction";
import MetaData from "../Layout/MetaData";
import Car from "../Cars/Car";
import "../../styles/SellerPage.scss";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";


const SellerCarPage = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { cars, error } = useSelector((state) => state.cars);
  const { user } = useSelector((state) => state.user);
  console.log(cars[0]?.user)

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
    if (user && cars.length > 0 && cars[0]?.user) {
      dispatch(getAllCarsBySeller(cars[0].user));
    }
    if (error) {
      alert.error(error);
    }
  }, [dispatch, error, cars]);

  return (
    <>
    <MetaData title={"Seller Page"} />
  <main className='p-8 flex w-full h-fit gap-8 bg-[url("/Images/user-action-bg.jpg")] bg-fixed bg-cover overflow-hidden'>
    <section className="seller_details h-fit w-[25%] mt-4 p-8 rounded-xl bg-white shadow-lg sticky top-[50px] mb-8">
      <div className="up h-[30%] w-full">
        {user && user.avatar && (
          <img
          src={user.avatar[0].url}
            className="w-full h-full object-cover rounded-lg"
            alt={user.name}
            />
            )}
      </div>
      <div className="down h-[70%] gap-2 w-full flex flex-col p-4 bg-slate-50 rounded-xl">
        <div className="absolute overflow-hidden rounded-full w-[150px] left-[50%] translate-x-[-50%] top-[150px] border-[5px] border-white scale-75 bg-white h-[150px]">
        <img
          src="/Images/user.png"
          alt={user.name}
          className="scale-[1.2]"
           />
        </div>

<div className="">
        <h2 className="text-lg mt-[110px] font-medium p-2">Name</h2>
        <div className="text-2xl text-center p-4 bg-slate-300 border-[#00000030] border-[1px] rounded-xl font-bold text-primary">
          {user && user.name}
        </div></div>
        <div className="">
        <h2 className="text-lg font-medium p-2">Email</h2>
        <h1 className="text-sm text-center p-4 bg-slate-300 border-[#00000030] border-[1px] rounded-xl font-bold text-primary">
          {user && user.email}
        </h1></div>
        <div className="">
        <h2 className="text-lg font-medium p-2">Mobile</h2>
        <h1 className="text-xl text-center p-4 bg-slate-300 border-[#00000030] border-[1px] rounded-xl font-bold text-primary">
          {user && user.mobile}789789789
        </h1></div>
        <div className="">
        <h2 className="text-lg font-medium p-2">Address</h2>
        <h1 className="text-lg text-center p-4 bg-slate-300 border-[#00000030] border-[1px] rounded-xl font-bold text-primary">
          {user && user.address}bhb,jbj,hb,hj jg jhghjg jh gjh
        </h1></div>
        <img src="/Images/" alt="" />
      </div>
    </section>

    <section className="seller_cars w-[70%] mx-auto mt-5">
    <div className="main w-full sm:w-full bg-[url('/Images/bg-car-side.jpg')] bg-fixed bg-cover mx-auto m-8 h-[200px] sm:h-[150px] rounded-2xl ">
      <h2 className="text-[30px] scale-[1.5] sm:text-white xs:top-[0.9rem] xs:text-black sm:top-[1.4rem] sm:left-[-20px] font-sans font-bold relative top-9 pt-8 justify-center flex">
        Cars
      </h2>
    </div>
      <div className=" grid-cols-1 flex flex-wrap md:grid-cols-2 lg:grid-cols-3 gap-5">
        {currentUsers.map((car) => <Car key={car._id} car={car} />)}
      </div>
     {cars && cars.length > carsPerPage && ( <div className="flex justify-center mt-4">
      <button
        className="bg-gray-200 hover:bg-gray-300 rounded-md p-2"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <BsChevronLeft />
      </button>
      {getPageRange().map((page, index) =>
        page === '...' ? (
          <span key={index} className="mx-2">
            {page}
          </span>
        ) : (
          <button
            key={index}
            className={`mx-2 ${
              page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
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
    </div>) }
    </section>
  </main>
  </>
  )
}

export default SellerCarPage