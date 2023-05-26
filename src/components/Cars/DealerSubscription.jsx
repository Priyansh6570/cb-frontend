import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newSubscription } from "../../actions/subscriptionAction";
import Modal from "react-modal";
import { AiOutlineArrowRight } from "react-icons/ai";
import {useAlert} from "react-alert";

const DealerSubscription = () => {
  const dispatch = useDispatch();
    const alert = useAlert();

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const {user} = useSelector((state) => state.user);

  const handlePlanSelection = (plan) => {
    setSelectedPlan(plan);
    setIsConfirmationOpen(true);
  };

  const handleConfirmation = () => {
    try {
        const subscription = {
            userId: user._id, 
            planName: selectedPlan.name,
            planPrice: selectedPlan.price,
            planDuration: selectedPlan.duration,
            planCredits: selectedPlan.credits,
            planDescription: selectedPlan.description,
          };
      
          dispatch(newSubscription(subscription));
          setIsConfirmationOpen(false);
            alert.success("Subscription Request Sent successfully");
    }
    catch (error) {
        alert.error(error.response.data.message);
    }
  };
  return (
    <div className="font-sans bg-[url('/Images/bg3.jpeg')] bg-cover sm:overflow-hidden">
      {/* Plan Cards */}
      <div className="min-h-screen pb-[7rem] pt-12 flex justify-center items-center">
        <div className="">
          {/* Plan Details */}
          <div className="text-center font-semibold">
            {/* Title */}
            <h1 className="text-5xl">
              <span className="text-blue-700 tracking-wide">Dealer </span>
              <span>Plans</span>
            </h1>
            {/* Description */}
            <p className="pt-6 text-xl text-gray-400 font-normal w-full px-8 md:w-full">
              Choose a plan that works best for you and
              <br /> your team.
            </p>
          </div>
          {/* Plan Cards */}
          <div className="pt-24 flex flex-row sm:flex-col sm:gap-[10px] sm:justify-center">
            {/* Silver Package */}
            <div className="w-96 sm:w-[300px] p-8 bg-white self-center text-center overflow-hidden rounded-3xl pr-16 sm:pr-8 shadow-xl">
              <h1 className="text-black font-semibold text-2xl">Silver</h1>
              <p className="pt-2 tracking-wide">
                <span className="text-gray-400 align-top">₹ </span>
                <span className="text-3xl font-semibold">4,999</span>
                <span className="text-gray-400 font-medium">/ user</span>
              </p>
              {/* Features */}
              <hr className="mt-4 border-1" />
              <div className="pt-8">
                <p className="font-semibold flex justify-center text-gray-400 text-left">
                  <span className="material-icons align-middle">Credit</span>
                  <span className="pl-2">50 Ads</span>
                </p>
                <p className="font-semibold flex justify-center text-gray-400 text-left pt-5">
                  <span className="material-icons align-middle">Duration</span>
                  <span className="pl-2">Validity 30 days</span>
                </p>
                <p className="font-semibold flex justify-center text-gray-400 text-left pt-5">
                  <span className="material-icons align-middle">Location</span>
                  <span className="pl-2">Single location</span>
                </p>
                {/* Choose Plan Button */}
                <button
                  className="w-full py-4 relative flex gap-1 justify-center align-middle bg-blue-600 mt-8 rounded-xl text-white"
                  onClick={() =>
                    handlePlanSelection({
                      name: "Silver",
                      price: "4,999",
                      duration: 30,
                      credits: 50,
                      description: "Single location",
                    })
                  }
                >
                  <span className="font-medium">Choose Plan</span>
                  <span className="pl-2 my-auto scale-[1.2] material-icons align-middle text-sm">
                    <AiOutlineArrowRight />
                  </span>
                </button>
              </div>
            </div>
            {/* Premium Package */}
            <div className="w-80 sm:w-[400px] p-8 pb-0 sm:pb-8 bg-gray-900 text-center overflow-hidden rounded-3xl text-white border-4 shadow-xl border-white transform scale-125 sm:scale-[1]">
              <h1 className="text-white font-semibold text-2xl">Premium</h1>
              <p className="pt-2 tracking-wide">
                <span className="text-gray-400 align-top">₹ </span>
                <span className="text-3xl font-semibold">7,999</span>
                <span className="text-gray-400 font-medium">/ user</span>
              </p>
              {/* Features */}
              <hr className="mt-4 border-1 border-gray-600" />
              <div className="pt-8">
                <p className="font-semibold flex justify-center text-gray-400 text-left">
                  <span className="material-icons align-middle">Credit</span>
                  <span className="pl-2">60 Ads</span>
                </p>
                <p className="font-semibold flex justify-center text-gray-400 text-left pt-5">
                  <span className="material-icons align-middle">Duration</span>
                  <span className="pl-2">Validity 30 days</span>
                </p>
                <p className="font-semibold flex justify-center text-gray-400 text-left pt-5">
                  <span className="pl-2">Single location</span>
                </p>
                <p className="font-semibold flex justify-center text-gray-400 text-left pt-5">
                  <span className="pl-2">Store Branding & PR</span>
                </p>
                <p className="font-semibold flex justify-center text-gray-400 text-left pt-5">
                  <span className="pl-2">Inventory shoot</span>
                </p>
                {/* Choose Plan Button */}
                <button
                  className="w-full py-4 flex gap-1 justify-center align-middle bg-blue-600 mt-8 rounded-xl text-white"
                  onClick={() =>
                    handlePlanSelection({
                      name: "Premium",
                      price: "7,999",
                      duration: 30,
                      credits: 60,
                      description:
                        "Single location, Store Branding & PR, Inventory shoot",
                    })
                  }
                >
                  <span className="font-medium">Choose Plan</span>
                  <span className="pl-2 material-icons my-auto scale-[1.2] align-middle text-sm">
                    <AiOutlineArrowRight />
                  </span>
                </button>
                {/* Popular Tag */}
                <div className="absolute top-4 right-4">
                  <p className="bg-blue-700 font-semibold px-4 py-1 rounded-full uppercase text-xs">
                    Popular
                  </p>
                </div>
              </div>
            </div>
            {/* Platinum Package */}
            <div className="w-96 sm:w-[400px] p-8 bg-white text-center overflow-hidden rounded-3xl pl-16 sm:pl-8 shadow-xl">
              <h1 className="text-black font-semibold text-2xl">Platinum</h1>
              <p className="pt-2 tracking-wide">
                <span className="text-gray-400 align-top">₹ </span>
                <span className="text-3xl font-semibold">12,999</span>
                <span className="text-gray-400 font-medium">/ user</span>
              </p>
              {/* Features */}
              <hr className="mt-4 border-1 translate-x-[30px] " />
              <div className="pt-8">
                <p className="font-semibold flex justify-center text-gray-400 text-left">
                  <span className="material-icons align-middle">Credit</span>
                  <span className="pl-2">60 Ads</span>
                </p>
                <p className="font-semibold flex justify-center text-gray-400 text-left pt-5">
                  <span className="material-icons align-middle">Duration</span>
                  <span className="pl-2">Validity 3 months</span>
                </p>
                <p className="font-semibold flex justify-center text-gray-400 text-left pt-5">
                  <span className="material-icons align-middle">Location</span>
                  <span className="pl-2">Single location</span>
                </p>
                <p className="font-semibold flex justify-center text-gray-400 text-left pt-5">
                  <span className="pl-2">Store Branding & PR</span>
                </p>
                <p className="font-semibold flex justify-center text-gray-400 text-left pt-5">
                  <span className="pl-2">Inventory shoot</span>
                </p>
                <p className="font-semibold flex justify-center text-gray-400 text-left pt-5">
                  <span className="pl-2">CRM support</span>
                </p>
                {/* Choose Plan Button */}
                <button
                  className="w-full flex gap-1 justify-center align-middle py-4 bg-blue-600 mt-8 rounded-xl text-white"
                  onClick={() =>
                    handlePlanSelection({
                      name: "Platinum",
                      price: "12,999",
                      duration: 90,
                      credits: 60,
                      description:
                        "Single location, Store Branding & PR, Inventory shoot, CRM support",
                    })
                  }
                >
                  <span className="font-medium">Choose Plan</span>
                  <span className="pl-2 material-icons my-auto scale-[1.2] text-sm">
                    <AiOutlineArrowRight />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Confirmation Modal */}
      <Modal
        isOpen={isConfirmationOpen}
        onRequestClose={() => setIsConfirmationOpen(false)}
        className="modal absolute bg-[#110c2f] w-[500px] sm:w-[400px] h-[250px] p-8 justify-center flex flex-col rounded-lg shadow-lg overflow-hidden"
        overlayClassName="modal-overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      >
        <h2 className="modal-title text-2xl border-b-2 text-white py-2 px-4 rounded text-center w-full self-center font-bold mb-4">
          Confirm Subscription
        </h2>
        <p className="modal-message text-lg py-4 text-white text-center mb-8">
          On Continuing CarsBecho Team will Contact you for further Verification
          and Activation of{" "}
          <span className="font-semibold">{selectedPlan?.name}</span> plan.
        </p>
        <div className="modal-buttons self-center flex justify-end">
          <button
            className="modal-button bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-4"
            onClick={() => setIsConfirmationOpen(false)}
          >
            Cancel
          </button>
          <button
            className="modal-button bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            onClick={handleConfirmation}
          >
            Confirm
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default DealerSubscription;
