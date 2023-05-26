import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCar, clearErrors } from "../../actions/carAction";
import { FaGasPump } from "react-icons/fa";
import { GiGearStickPattern } from "react-icons/gi";
import { SlSpeedometer } from "react-icons/sl";
import MetaData from "../Layout/MetaData";
import NumberWithCommas from "../PriceSeperator";
import Carousel from "react-material-ui-carousel";
import { NEW_CAR_RESET } from "../../constants/carConstants";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";

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

const fuelTypes = ["All", "Petrol", "Diesel", "CNG", "LPG", "Electric"];

const transmissionTypes = ["All", "Manual", "Automatic"];

const NewCar = () => {

  const history = useHistory();
  const alert = useAlert();

  const [formData, setFormData] = useState({
    make: "",
    model: "",
    varient: "",
    year: "",
    Km_Driven: "",
    fuel: "",
    transmission: "",
    color: "",
    no_of_owners: "",
    RTO: "",
    city: "",
    price: "",
    description: "",
    image: [],
    category: "",
  });

  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.newCar);

  const user = useSelector((state) => state.user);
  const { id } = user;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageArray = [];

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          imageArray.push({ public_id: Date.now(), url: reader.result });
          setFormData({ ...formData, image: imageArray });
        }
      };

      reader.readAsDataURL(file);
    });
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Car Sent for Approvel");
      history.push("/");
      dispatch({ type: NEW_CAR_RESET });
    }
  }, [dispatch, alert, error, history, success]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createCar(id, formData));
  };

  return (
    <div className="flex sm:flex-col-reverse p-8 sm:p-1">
      {user.user.role === "user" && user.user.credit===1 ? (
              <h1 className="text-gray-600 absolute bg-yellow-200 rounded py-4 text-center w-[70%] left-[50%] translate-x-[-50%]">
                You have only <strong>{user.user.credit} credit</strong>, and currently plan is not upgradable so use it wisely.
                </h1>
                ) : (<></>)}
      {
        user.user.credit > 0 || user.user.role === "admin" ? (
          <>
          <div className="w-1/2 p-6 sm:w-full flex flex-col gap-4">
            
        <div className="main w-[90%] sm:w-full bg-[url('/Images/user-action-bg.jpg')] bg-cover  mx-auto m-8 sm:m-0 sm:mb-8 h-[200px] sm:h-[80px] rounded-2xl ">
          <h2 className="text-[30px] w-full text-center xs:top-[0rem] xs:text-black sm:top-[1.4rem] font-sans font-bold relative top-9 pt-8 justify-center flex">
            Detail Preview
          </h2>
        </div>
        <div className="carousel w-full h-[360px] xs:h-[180px] sm:h-[215px] overflow-hidden bg-slate-900 rounded-2xl">
          <Carousel className="h-[372px] xs:h-[200px] sm:h-[230px] rounded-2xl">
            {formData.image &&
              formData.image.map((item, i) => (
                <img
                  key={item.public_id}
                  src={item.url}
                  alt={`${i} Slide`}
                  className="CarouselImage object-cover object-center rounded-2xl"
                />
              ))}
          </Carousel>
        </div>

        <div className="detail w-full object-contain flex flex-col gap-4 sm:gap-2  p-8 sm:p-1 rounded-2xl sm:mt-6 sm:px-4">
          <MetaData title={`Sell Car`} />

          <div className="flex justify-between items-center">
            <h2 className="text-3xl sm:text-base font-medium">
              {formData.make}
              {` `}
              {formData.model}
              {` `}
              {formData.year}
            </h2>
          </div>
          <p className="text-xl sm:text-base">{formData.variant}</p>
          <span className="text-xl sm:my-4 sm:text-sm uppercase text-[#666] flex">
            <span className="flex gap-2 mr-2 justify-center items-center">
              <FaGasPump /> {formData.fuel} {` | `}
            </span>
            <span className="flex gap-2 mr-2 justify-center items-center">
              <SlSpeedometer /> {formData.km_Driven}km{` | `}
            </span>
            <span className="flex gap-2 mr-2 justify-center items-center">
              <GiGearStickPattern />
              {formData.transmission}
            </span>
          </span>
          <div className=" hidden mb-4 sm:flex price w-full flex-col justify-start items-center gap-8 rounded-2xl p-8 mt-2">
            <span className="text-3xl text-[#002f34] font-bold">
              ₹ {NumberWithCommas(`${formData.price}`)}
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
              <span className="w-[50%] lable-content">{formData.model}</span>
            </li>
            <li className="flex gap-4 items-center">
              <span className="w-[50%] font-semibold overview-label">
                Brand :{" "}
              </span>
              <span className="w-[50%] lable-content">{formData.make}</span>
            </li>
            <li className="flex gap-4 items-center">
              <span className="w-[50%] font-semibold overview-label">
                Year :{" "}
              </span>
              <span className="w-[50%] lable-content">{formData.year}</span>
            </li>
            <li className="flex gap-4 items-center">
              <span className="w-[50%] font-semibold overview-label">
                Km Driven :{" "}
              </span>
              <span className="w-[50%] lable-content">
                {formData.Km_Driven}km
              </span>
            </li>
            <li className="flex gap-4 items-center">
              <span className="w-[50%] font-semibold overview-label">
                RTO :{" "}
              </span>
              <span className="w-[50%] lable-content">{formData.RTO}</span>
            </li>
            <li className="flex gap-4 items-center">
              <span className="w-[50%] font-semibold overview-label">
                Transmission :{" "}
              </span>
              <span className="w-[50%] lable-content">
                {formData.transmission}
              </span>
            </li>
            <li className="flex gap-4 items-center">
              <span className="w-[50%] font-semibold overview-label">
                Fuel :{" "}
              </span>
              <span className="w-[50%] lable-content">{formData.fuel}</span>
            </li>
            <li className="flex gap-4 items-center">
              <span className="w-[50%] font-semibold overview-label">
                Past Owners :{" "}
              </span>
              <span className="w-[50%] lable-content">
                {formData.no_of_owners}
              </span>
            </li>
            <li className="flex gap-4 items-center">
              <span className="w-[50%] font-semibold overview-label">
                Color :{" "}
              </span>
              <span className="w-[50%] lable-content">{formData.color}</span>
            </li>
            <li className="flex gap-4 items-center">
              <span className="w-[50%] font-semibold overview-label">
                Category :{" "}
              </span>

              <span className="w-[50%] lable-content">{formData.category}</span>
            </li>
          </ul>
        </div>

        <div className="carDescription w-full h-fit sm:h-fit flex flex-col overflow-hidden gap-4 p-8 sm:px-2 rounded-2xl">
          <h2 className="text-2xl sm:px-8 sm:py-4 font-bold">Description</h2>
          <hr className="p-4 w-full relative left-[0px]" />
          <div className="descriptionContainer sm:px-4">
            <p className="whitespace-normal">{formData.description}</p>
          </div>
        </div>

        <div className="price sm:hidden w-full flex flex-col justify-start items-center gap-8 rounded-2xl p-8">
          <span className="text-[45px] text-[#002f34] font-bold">
            ₹ {NumberWithCommas(`${formData.price}`)}
          </span>
        </div>
      </div>

      <div className="w-1/2 p-6 sm:w-full">
        <div className="main w-[90%] sm:w-full bg-[url('/Images/bg-car-side.jpg')] bg-cover mx-auto m-8 sm:m-0 sm:mb-8 h-[200px] sm:h-[80px] rounded-2xl ">
          <h2 className="text-[30px] w-full text-center xs:top-[0rem] xs:text-black sm:top-[1.4rem] font-sans font-bold relative top-9 pt-8 justify-center flex">
            Add New Car
          </h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 sm:w-full"
          encType="multipart/form-data"
        >
          {/* Form inputs for each field */}
          <label htmlFor="make" className="block">
            Company*
          </label>
          <input
            type="text"
            id="make"
            name="make"
            value={formData.make}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />

          <label htmlFor="model" className="block">
            Model*
          </label>
          <input
            type="text"
            id="model"
            name="model"
            value={formData.model}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />

          <label htmlFor="variant" className="block">
            Variant*
          </label>
          <input
            type="text"
            id="variant"
            name="varient"
            value={formData.varient}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />

          <label htmlFor="year" className="block">
            Year*
          </label>
          <input
            type="number"
            id="year"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />

          <label htmlFor="images" className="block cursor-pointer">
            Images*
          </label>
          <label htmlFor="images" className="block cursor-pointer">
            <span className="inline-block w-full bg-gray-300 cursor-pointer rounded-md py-2 px-3 text-center">
              Browse...
            </span>
          </label>
          <input
            type="file"
            id="images"
            name="images"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="hidden"
            style={{ display: "none" }}
          />

          <label htmlFor="category" className="block">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <label htmlFor="Km_Driven" className="block">
            Km Driven*
          </label>
          <input
            type="number"
            id="km_Driven"
            name="Km_Driven"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="Example: 15000, no commas"
            value={formData.Km_Driven}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />

          <div className="flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="fuel" className="block">
                Fuel
              </label>
              <select
                id="fuel"
                name="fuel"
                value={formData.fuel}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                {fuelTypes.map((fuelType) => (
                  <option key={fuelType} value={fuelType}>
                    {fuelType}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-1/2">
              <label htmlFor="transmission" className="block">
                Transmission
              </label>
              <select
                id="transmission"
                name="transmission"
                value={formData.transmission}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                {transmissionTypes.map((transmissionType) => (
                  <option key={transmissionType} value={transmissionType}>
                    {transmissionType}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <label htmlFor="color" className="block">
            Color*
          </label>
          <input
            type="text"
            id="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />

          <label htmlFor="no_of_owners" className="block">
            No. of Owners*
          </label>
          <input
            type="number"
            id="no_Of_Owners"
            name="no_of_owners"
            value={formData.no_of_owners}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />

          <label htmlFor="RTO" className="block">
            RTO*
          </label>
          <input
            type="text"
            id="RTO"
            name="RTO"
            placeholder="Example: MP04"
            value={formData.RTO}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />

          <label htmlFor="city" className="block">
            City*
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />

          <label htmlFor="price" className="block">
            Price*
          </label>
          <input
            type="number"
            id="price"
            name="price"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="Example: 1000000, no commas"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />

          <label htmlFor="description" className="block">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Any Extra Information about the car"
            value={formData.description}
            onChange={handleChange}
            maxLength={500}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />

          <button
            type="submit"
            disabled={loading}
            className="btn bg-[#ee3131] text-white rounded-md py-2 px-12 transition-colors"
          >
            Add Car
          </button>

          {/* Display success/error messages */}
          {loading && <p>Loading...</p>}
          {success && <p>Car added successfully!</p>}
          {error && <p>{error}</p>}
        </form>
      </div></>
        ) : (
          <div className="main w-[70vw] sm:w-full bg-[url('/Images/bg-car-side.jpg')] bg-cover mx-auto m-8 h-[200px] sm:h-[150px] rounded-2xl ">
        <h2 className="text-[30px] xs:top-[0.9rem] xs:text-black sm:top-[1.4rem] sm:left-[-20px] font-sans font-bold relative top-9 pt-8 justify-center flex">
          You Have Used up all your Credits
        </h2>
      </div>
        )
      }
    </div>
  );
};

export default NewCar;
