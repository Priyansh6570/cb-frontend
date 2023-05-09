import React, { useEffect, Fragment, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import "../../styles/usedCar.scss";
import { useSelector, useDispatch } from "react-redux";
import { getCar, clearErrors } from "../../actions/carAction";
import { HiPlus } from "react-icons/hi";
import Loader from "../Layout/Loader/Loader";
import Car from "./Car";
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import { Collapse, Ripple, initTE } from "tw-elements";
import ScrollToTopOnMount from "../ScrollToTopOnMount";
import { CLEAR_SEARCH_RESULTS } from "../../constants/carConstants";

const categories = [
  "All",
  "Sedan",
  "Hatchback",
  "SUV",
  "MUV",
  "Convertible",
  "Coupe",
  "Luxury",
  "Wagon",
  "Van",
  "Pickup",
  "Truck",
  "Supercar",
];

const fuel_types = ["All", "Petrol", "Diesel", "CNG", "LPG", "Electric"];

const transmission_types = ["All", "Manual", "Automatic"];

const UsedCar = () => {
  initTE({ Collapse, Ripple });
  const dispatch = useDispatch();
  const alert = useAlert();

  const { keyword } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([10000, 10000000]);

  const [category, setCategory] = useState("");
  const [fuel, setFuel] = useState("");
  const [transmission, setTransmission] = useState("");

  const { cars, loading, error, carCount, resultPerPage } = useSelector(
    (state) => state.cars
  );

  // let count = filteredCarsCount;
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  function priceLabelFormat(value) {
    const formatter = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return formatter.format(value);
  }

  const handlePriceChange = useCallback(
    (event, newValue) => {
      setPrice(newValue);
    },
    [setPrice]
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch({ type: CLEAR_SEARCH_RESULTS });
    dispatch(getCar(keyword, currentPage, price, category, fuel, transmission));
  }, [
    dispatch,
    keyword,
    currentPage,
    category,
    price,
    fuel,
    transmission,
    error,
    alert,
  ]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <ScrollToTopOnMount />
          <main className="flex flex-col gap-3 mt-8 sm:mt-0 sm:relative sm:top-[-45px]">
            {/* warrenty info */}
            <div className="warrenty-alert overflow-hidden sm:flex hidden w-[96%] m-auto h-[150px] rounded-lg bg-[#222233] relative top-[38px]">
              <img
                src="./Images/warrenty-banner.png"
                alt="warrenty"
                className="w-[100%] h-[100%] object-cover"
              />
            </div>

            {/* filter */}
            <div className="right-sm hidden sm:flex sm:flex-col sm:relative sm:top-[38px] filters w-[30%] sm:w-full mb-8 h-[200px] sm:h-fit">
              <div className="filter-bt sm:flex sm:gap-[4px] sm:justify-between sm:px-4">
                <button
                  className="filter-bt1 whitespace-nowrap px-2 "
                  type="button"
                  data-te-collapse-init
                  data-te-ripple-init
                  data-te-ripple-color="light"
                  data-te-target="#collapseExample1"
                  aria-expanded="true"
                  aria-controls="collapseExample1"
                  data-te-collapse-ignore
                >
                  PRICE RANGE
                </button>
                <button
                  className="filter-bt1 w-fit"
                  type="button"
                  data-te-collapse-init
                  data-te-ripple-init
                  data-te-ripple-color="light"
                  data-te-target="#collapseExample2"
                  aria-expanded="false"
                  aria-controls="collapseExample2"
                >
                  CATEGORY
                </button>
                <button
                  className="filter-bt1 justify-center"
                  type="button"
                  data-te-collapse-init
                  data-te-ripple-init
                  data-te-ripple-color="light"
                  data-te-target="#collapseExample3"
                  aria-expanded="false"
                  aria-controls="collapseExample3"
                >
                  FUEL
                </button>
                <button
                  className="filter-bt1"
                  type="button"
                  data-te-collapse-init
                  data-te-ripple-init
                  data-te-ripple-color="light"
                  data-te-target="#collapseExample4"
                  aria-expanded="false"
                  aria-controls="collapseExample4"
                >
                  TRANSMISSION
                </button>
              </div>
              <div
                className="!visible hidden mt-2"
                id="collapseExample1"
                data-te-collapse-item
              >
                <div className="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] ">
                  <Slider
                    aria-labelledby="range-slider"
                    // valueLabelDisplay="auto"
                    min={10000}
                    max={10000000}
                    value={price}
                    onChange={handlePriceChange}
                    valueLabelFormat={priceLabelFormat}
                    style={{ color: "#ee3131" }}
                  />
                  <div className="price-num flex justify-between">
                    <div className="">
                      <span className="font-semibold">Min Price: </span>
                      <div> {priceLabelFormat(price[0])}</div>
                    </div>
                    <div className="">
                      <span className="font-semibold right-6">Max Price: </span>
                      <div className=""> {priceLabelFormat(price[1])}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="!visible hidden mt-2"
                id="collapseExample2"
                data-te-collapse-item
              >
                <div className="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
                  <ul className="categoryBox justify-center  flex flex-wrap gap-4">
                    {categories.map((category) => (
                      <li
                        className="category-link font-medium text-sm cursor-pointer block rounded-lg bg-white p-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]"
                        key={category}
                        onClick={() => setCategory(category)}
                      >
                        {category}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div
                className="!visible hidden mt-2"
                id="collapseExample3"
                data-te-collapse-item
              >
                <div className="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
                  <ul className="categoryBox justify-center  flex flex-wrap gap-4">
                    {fuel_types.map((fuel) => (
                      <li
                        key={fuel}
                        onClick={() => setFuel(fuel)}
                        className="category-link font-medium text-sm cursor-pointer block rounded-lg bg-white p-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]"
                      >
                        {fuel}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div
                className="!visible hidden mt-2"
                id="collapseExample4"
                data-te-collapse-item
              >
                <div className="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
                  <ul className="categoryBox justify-center  flex flex-wrap gap-4">
                    {transmission_types.map((transmission) => (
                      <li
                        key={transmission}
                        onClick={() => setTransmission(transmission)}
                        className="category-link font-medium text-sm cursor-pointer block rounded-lg bg-white p-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]"
                      >
                        {transmission}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="wrapper flex gap-3 mt-8 sm:mt-0 relative">
              <div className="right-lg flex sm:hidden sticky top-[200px] sm:relative sm:top-[38px] filters w-[30%] sm:w-full mb-8 h-fit sm:h-fit justify-center py-6">
                <div className="right-filter-secondary-container rounded-xl w-[80%] sm:w-full px-8 sm:px-0 py-8 h-fit">
                  <div className="filter-bt flex flex-col gap-4 sm:flex-row sm:flex sm:gap-[4px] sm:justify-between sm:px-4">
                    <div className="">
                      <button
                        className="filter-bt1 flex justify-between whitespace-nowrap h-16 px-6 font-semibold text-base "
                        type="button"
                        data-te-collapse-init
                        data-te-ripple-init="false"
                        data-te-ripple-color="light"
                        data-te-target="#collapseExample1"
                        aria-expanded="true"
                        aria-controls="collapseExample1"
                        data-te-collapse-ignore
                      >
                        PRICE RANGE
                        <HiPlus className="sm:hidden" />
                      </button>

                      <div
                        className="!visible hidden mt-2"
                        id="collapseExample1"
                        data-te-collapse-item
                      >
                        <div className="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] ">
                          <Slider
                            aria-labelledby="range-slider"
                            valueLabelDisplay="auto"
                            min={10000}
                            max={10000000}
                            value={price}
                            onChange={handlePriceChange}
                            valueLabelFormat={priceLabelFormat}
                            style={{ color: "#ee3131" }}
                          />
                          <div className="price-num flex justify-between">
                            <div className="">
                              <span className="font-semibold">Min Price: </span>
                              <div> {priceLabelFormat(price[0])}</div>
                            </div>
                            <div className="">
                              <span className="font-semibold relative right-0">
                                Max Price:{" "}
                              </span>
                              <div className="relative top-0">
                                {" "}
                                {priceLabelFormat(price[1])}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <button
                        className="filter-bt1 flex justify-between sm:w- h-16 px-6 font-semibold text-base"
                        type="button"
                        data-te-collapse-init
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        data-te-target="#collapseExample2"
                        aria-expanded="false"
                        aria-controls="collapseExample2"
                      >
                        CATEGORY
                        <HiPlus className="sm:hidden" />
                      </button>
                      <div
                        className="!visible hidden mt-2"
                        id="collapseExample2"
                        data-te-collapse-item
                      >
                        <div className="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
                          <ul className="categoryBox justify-center flex flex-wrap gap-4">
                            {categories.map((category) => (
                              <li
                                className="category-link font-medium text-sm hover:scale-[1.02] active:bg-[#eb5f5f] active:text-white cursor-pointer block rounded-lg bg-white p-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]"
                                key={category}
                                onClick={() => setCategory(category)}
                              >
                                {category}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <button
                        className="filter-bt1 sm:justify-center h-16 flex justify-between px-6 font-semibold text-base"
                        type="button"
                        data-te-collapse-init
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        data-te-target="#collapseExample3"
                        aria-expanded="false"
                        aria-controls="collapseExample3"
                      >
                        FUEL
                        <HiPlus className="sm:hidden" />
                      </button>
                      <div
                        className="!visible hidden mt-2"
                        id="collapseExample3"
                        data-te-collapse-item
                      >
                        <div className="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
                          <ul className="categoryBox justify-center  flex flex-wrap gap-4">
                            {fuel_types.map((fuel) => (
                              <li
                                key={fuel}
                                onClick={() => setFuel(fuel)}
                                className="category-link font-medium text-sm cursor-pointer block rounded-lg bg-white p-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]"
                              >
                                {fuel}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <button
                        className="filter-bt1 h-16 px-6 flex justify-between font-semibold text-base"
                        type="button"
                        data-te-collapse-init
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        data-te-target="#collapseExample4"
                        aria-expanded="false"
                        aria-controls="collapseExample4"
                      >
                        TRANSMISSION
                        <HiPlus className="sm:hidden" />
                      </button>
                      <div
                        className="!visible hidden mt-2"
                        id="collapseExample4"
                        data-te-collapse-item
                      >
                        <div className="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
                          <ul className="categoryBox justify-center  flex flex-wrap gap-4">
                            {transmission_types.map((transmission) => (
                              <li
                                key={transmission}
                                onClick={() => setTransmission(transmission)}
                                className="category-link font-medium text-sm cursor-pointer block rounded-lg bg-white p-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]"
                              >
                                {transmission}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="cars left flex justify-start content-start w-[65%] h-fit mt-4 flex-wrap gap-[10px] sm:gap-[2px] my-6">
                {cars && cars.map((car) => <Car key={car._id} car={car} />)}
              </div>
            </div>
            {
              <div className="paginationBox">
                <Pagination
                  totalItemsCount={carCount}
                  activePage={currentPage}
                  itemsCountPerPage={resultPerPage}
                  onChange={setCurrentPageNo}
                  nextPageText="Next"
                  prevPageText="Prev"
                  firstPageText="1st"
                  lastPageText="Last"
                  itemClass="page-item"
                  linkClass="page-link"
                  activeClass="pageItemActive"
                  activeLinkClass="pageLinkActive"
                />
              </div>
            }
          </main>
        </Fragment>
      )}
    </Fragment>
  );
};
export default UsedCar;
