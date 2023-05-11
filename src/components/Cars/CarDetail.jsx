import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useAlert } from "react-alert";
import Carousel from "react-material-ui-carousel";

//Components, APIs, utils
import WishList from "./WishList";
import { Link } from "react-router-dom";
import Loader from "../Layout/Loader/Loader";
import Badge from "../Badge";
import MetaData from "../Layout/MetaData";
import NumberWithCommas from "../PriceSeperator";
import ImageSlider from "../Home/ImageSlider";
import { getError } from "../../utils";
import { useSelector, useDispatch } from "react-redux";
import { CLEAR_SEARCH_RESULTS } from "../../constants/carConstants";
import { Collapse, Ripple, initTE } from "tw-elements";
import {
  clearErrors,
  getCarDetails,
  getRCar,
  newReview,
} from "../../actions/carAction";

//Styles, Icons
import "../../styles/carDetail.scss";
import { FaGasPump } from "react-icons/fa";
import { SlSpeedometer } from "react-icons/sl";
import { GiGearStickPattern } from "react-icons/gi";
import { FaHeart } from "react-icons/fa";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import ScrollToTopOnMount from "../ScrollToTopOnMount";
import { HiPlus } from "react-icons/hi";

const CarDetail = () => {
  initTE({ Collapse, Ripple });
  const dispatch = useDispatch();
  const alert = useAlert();

  const { id } = useParams();
  const { car, loading, error } = useSelector((state) => state.carDetails);
  const { cars } = useSelector((state) => state.cars);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    // if (reviewError) {
    //   alert.error(reviewError);
    //   dispatch(clearErrors());
    // }

    // if (success) {
    //   alert.success("Review Submitted Successfully");
    //   dispatch({ type: NEW_REVIEW_RESET });
    // }
    // dispatch({ type: CLEAR_SEARCH_RESULTS });
    dispatch(getCarDetails(id));
  }, [dispatch, id, error, alert]);

  useEffect(() => {
    dispatch({ type: CLEAR_SEARCH_RESULTS });
    dispatch(getRCar(car.category, car.price));
  }, [dispatch, car]);
  const seller = car?.user;

  return loading || !car ? (
    <Loader />
  ) : error ? (
    <div className="error-container w-full h-[90vh] justify-center items-center">
      <ScrollToTopOnMount />
      <div className="error w-[60vw] h-[40px] bg-[#ff74747f] rounded flex justify-center items-center relative top-[20%] m-auto">
        <h2 className="text-xl font-medium uppercase">{error}</h2>
      </div>
    </div>
  ) : (
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
            <hr />
            <p className="sm:px-4">{car.description}</p>
          </div>

          <div className="carWarrenty w-full h-fit sm:h-fit flex flex-col gap-4 p-8 sm:px-2 rounded-2xl">
            <button
              className="filter-bt1 whitespace-nowrap flex justify-between p-8 scale-[1.1] font-semibold text-2xl h-3  "
              type="button"
              data-te-collapse-init
              data-te-ripple-init
              data-te-ripple-color="light"
              data-te-target="#collapseExample1"
              aria-expanded="true"
              aria-controls="collapseExample1"
              data-te-collapse-ignore
            >
              Warrenty
              <HiPlus className="" />
            </button>
            <div
              className="!visible hidden mt-2 scale-[1.1] relative top-[-15px] -z-10"
              id="collapseExample1"
              data-te-collapse-item
            >
              <div className="container-warrenty flex rounded-lg h-fit p-6 text-sm justify-evenly align-middle font-medium shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
                <img
                  src="/Images/wax-seal.png"
                  alt="warrenty logo"
                  className="w-[60px] h-[60px] place-self-center sm:mr-2"
                />
                <span className="place-self-center justify-center text-base sm:p-3 text-black font-semibold w-[70%]">
                  {" "}
                  Get CarsBecho Exclusive 2 Years Warrenty with your Dream Car
                  Now!{" "}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="right sm:h-[400px] sm:w-full sm:p-1 h-[90vh] w-[480px] p-8 flex gap-4 flex-col">
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

          <WishList carId={car._id} className='flex' />
          <Link to={`/seller/${seller && seller._id}`} className='sm:px-6'>
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

              {/*

              {car.verified === true ? (
                <Badge />
              ) : (
                <div className=""></div>
              )} */}
            </div>
          </Link>
        </div>
      </main>
      {cars && cars.length >= 2 && (
        <section className="featured_Section w-[1300px] sm:w-[100vw] sm:overflow-hidden mx-auto object-contain flex flex-col gap-4 p-4 rounded-2xl my-0 relative top-[-30px] sm:relative sm:top-[-40px]">
          <h2 className="text-3xl font-normal pl-4 capitalize sm:text-2xl">
            Related Cars
          </h2>
          <hr />

          <div className="car-container flex w-[1220px] sm:w-[90vw] m-auto overflow-x-auto gap-4 mt-4">
            {cars.map((relatedCar) => {
              return (
                <Link
                  to={`/car/${relatedCar._id}`}
                  key={relatedCar._id}
                  className={relatedCar._id === id ? "hidden" : "flex"}
                >
                  <ScrollToTopOnMount />
                  <div className="carCard flex flex-col gap-[4px] sm:border-1 sm:text-sm hover:border-3 hover:shadow-md w-[294px] sm:w-[154px] sm:h-[192px] sm:p-0 shrink-0 cursor-pointer sm:overflow-hidden">
                    <div className="img-container-car sm:overflow-hidden">
                      <img
                        src={relatedCar.image[0].url}
                        alt={relatedCar.model}
                        className="w-[300px] h-[150px] sm:w-[282px] sm:h-[90px] object-cover sm:scale-[1.1] "
                      />
                    </div>

                    <div className="carDetails flex flex-col gap-[10px] sm:gap-1 sm:px-2">
                      <span className="flex gap-1 sm:text-sm text-lg font-semibold">
                        <h2>{relatedCar.make}</h2>
                        <h2>{relatedCar.model}</h2>
                        <h4 className="font-normal sm:hidden">{`(${relatedCar.year})`}</h4>
                      </span>
                      <span className="text-xs sm:hidden mb-2 sm:my-2 sm:text-sm uppercase text-[#3d3d3d] flex">
                        <span className="flex gap-2 mr-2 justify-center items-center">
                          <FaGasPump /> {relatedCar.fuel} {` | `}
                        </span>
                        <span className="flex gap-2 mr-2 justify-center items-center">
                          <SlSpeedometer /> {relatedCar.Km_Driven}km{` | `}
                        </span>
                        <span className="flex gap-2 mr-2 justify-center items-center">
                          <GiGearStickPattern />
                          {relatedCar.transmission}
                        </span>
                      </span>
                      <div className="carPrice">
                        <h3 className="text-2xl sm:text-base font-bold font-sans">
                          ₹ {NumberWithCommas(`${relatedCar.price}`)}
                        </h3>
                      </div>
                      <div className="click-to-open flex gap-2 items-center text-[#ee3131] mt-4 font-medium sm:text-sm text-base">
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
        </section>
      )}
    </div>
  );
};

export default CarDetail;

// for reviews, future use

// const { success, error: reviewError } = useSelector(
//   (state) => state.newReview
// );

// const options = {
//   size: "large",
//   value: car.ratings,
//   readOnly: true,
//   precision: 0.5,
// };

// const [quantity, setQuantity] = useState(1);
// const [open, setOpen] = useState(false);
// const [rating, setRating] = useState(0);
// const [comment, setComment] = useState("");

// const increaseQuantity = () => {
//   if (car.Stock <= quantity) return;

//   const qty = quantity + 1;
//   setQuantity(qty);
// };

// const decreaseQuantity = () => {
//   if (1 >= quantity) return;

//   const qty = quantity - 1;
//   setQuantity(qty);
// };

// const addToCartHandler = () => {
//   dispatch(addItemsToCart(match.params.id, quantity));
//   alert.success("Item Added To Cart");
// };

// const submitReviewToggle = () => {
//   open ? setOpen(false) : setOpen(true);
// };

// const reviewSubmitHandler = () => {
//   const myForm = new FormData();

//   myForm.set("rating", rating);
//   myForm.set("comment", comment);
//   myForm.set("carId", match.params.id);

//   dispatch(newReview(myForm));

//   setOpen(false);
// };
