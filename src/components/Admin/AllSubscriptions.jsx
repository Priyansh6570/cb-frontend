import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubscriptions } from "../../actions/subscriptionAction";
import Modal from "react-modal";
import { updateCreditAndExpireLimit } from "../../actions/userAction";
import { useAlert } from "react-alert";

const formatDateTime = (dateTimeString) => {
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "Asia/Kolkata",
  };
  const dateTime = new Date(dateTimeString);
  return dateTime.toLocaleDateString("en-IN", options);
};

const AllSubscriptions = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState(null);

  const openModal = (subscription) => {
    setSelectedSubscription(subscription);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const { loading, subscriptions, error } = useSelector(
    (state) => state.subscriptions
  );

  const handleApprove = () => {
    if (selectedSubscription) {
      const user = selectedSubscription.userId._id;
      const updatedCredit = selectedSubscription.planCredits;
      const expireTime = selectedSubscription.planDuration;

      try {
        dispatch(updateCreditAndExpireLimit(user, updatedCredit, expireTime));
        alert.success("Approved Successfully, Refresh the page to see changes");
        closeModal();
      } catch (error) {
        alert.error("Something went wrong. Please try again later.");
      }
    }
  };

  useEffect(() => {
    dispatch(getSubscriptions());
  }, [dispatch]);

  return loading ? (
    <loading />
  ) : (
    <main className="container mx-auto py-6">
      <div>
        <div className="main w-[70vw] sm:w-full bg-[url('/Images/bg-car-side.jpg')] bg-cover mx-auto m-8 h-[200px] sm:h-[150px] rounded-2xl ">
          <h2 className="text-[30px] xs:top-[0.9rem] xs:text-black sm:top-[1.4rem] sm:left-[-20px] font-sans font-bold relative top-9 pt-8 justify-center flex">
            {subscriptions.length > 0 ? "subscriptions" : "No subscriptions"}
          </h2>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div>
            {subscriptions &&
              subscriptions.map((subscription) => (
                <div
                  key={subscription._id}
                  className="mb-4 p-2 sm:px-2 sm:py-4 sm:overflow-hidden w-[80vw] sm:border-[2px] sm:border-[#cacaca] sm:w-[98%] mx-auto h-fit border rounded"
                >
                  <h2 className="text-lg flex gap-8 justify-between font-bold bg-slate-100 px-4 py-2 rounded text-center mb-2">
                    <span>Date & Time:</span>{" "}
                    <span>{formatDateTime(subscription.createdAt)}</span>
                  </h2>
                  <div className=" flex flex-row-reverse sm:flex-col-reverse gap-[10px] sm:gap-0 justify-center align-middle">
                    <button
                      onClick={() => openModal(subscription)}
                      className="updateCar w-[200px] mx-auto h-fit sm:w-[80%] sm:self-center sm:mx-auto bg-[#ee3131] btn text-white rounded mt-8 font-semibold text-lg py-2 px-4 sm:text-base"
                    >
                      Approve
                    </button>

                    <div className="bg-slate-100 w-fit min-w-[400px] h-fit self-center rounded p-8">
                      <h3 className="font-bold bg-slate-200 rounded w-full text-center py-2 px-4 text-lg">
                        User Details:
                      </h3>
                      <div className="flex flex-col xs:px-2 gap-4">
                        <div className="flex gap-8 mt-4">
                          <span className="font-medium bg-slate-50 rounded w-fit p-2 mx-auto text-center py-1 px-2 text-base">
                            <img
                              src={subscription.userId.avatar[0].url}
                              alt={subscription.userId.name}
                              className="w-[200px] h-fit rounded self-center mx-auto"
                            />
                          </span>
                        </div>
                        <div className="flex gap-8 mt-4">
                          <span className="font-bold">Name:</span>
                          <span className="font-medium bg-slate-50 rounded w-fit text-center py-1 px-2 text-base">
                            {subscription.userId.name}
                          </span>
                        </div>

                        {subscription.userId.role === "dealer" && (
                          <div className="flex gap-8 mt-4">
                            <span className="font-bold">Dealership Name:</span>
                            <span className="font-medium bg-slate-50 rounded w-fit text-center py-1 px-2 text-base">
                              {subscription.userId.dealershipName}
                            </span>
                          </div>
                        )}

                        <div className="flex gap-8 mt-2">
                          <span className="font-bold">Email:</span>
                          <span className="font-medium bg-slate-50 rounded w-fit text-center py-1 px-2 text-base">
                            {subscription.userId.email}
                          </span>
                        </div>
                        <div className="flex gap-8 mt-2">
                          <span className="font-bold">Mobile:</span>
                          <span className="font-medium font-mono  bg-slate-50 rounded w-fit text-center py-1 px-2 text-base">
                            {subscription.userId.mobile}
                          </span>
                        </div>
                        <div className="flex gap-8 mt-2">
                          <span className="font-bold">Address:</span>
                          <span className="font-medium bg-slate-50 rounded w-fit text-center py-1 px-2 text-base">
                            {subscription.userId.address}
                          </span>
                        </div>
                        <div className="flex gap-8 mt-2">
                          <div className="">
                            <span className="font-bold">Credits:</span>
                            <span className="font-medium bg-slate-50 rounded w-fit text-center py-1 px-2 text-base">
                              {subscription.userId.credit}
                            </span>
                          </div>
                          <div className="">
                            <span className="font-bold">Until Epiration:</span>
                            <span className="font-medium bg-slate-50 rounded w-fit text-center py-1 px-2 text-base">
                              {subscription.userId.expireLimit} Days
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-[70px] flex justify-center">
                      {subscription.planName === "Premium" && (
                        <div className="w-[370px] sm:w-[400px] p-8 pb-4 sm:pb-8 bg-gray-900 text-center overflow-hidden rounded-3xl text-white border-4 shadow-xl border-white">
                          <h1 className="text-white font-semibold text-2xl">
                            Premium
                          </h1>
                          <p className="pt-2 tracking-wide">
                            <span className="text-gray-400 align-top">₹ </span>
                            <span className="text-3xl font-semibold">
                              7,999
                            </span>
                            <span className="text-gray-400 font-medium">
                              / user
                            </span>
                          </p>
                          {/* Features */}
                          <hr className="mt-4 border-1 border-gray-600" />
                          <div className="pt-8">
                            <p className="font-semibold flex justify-center text-gray-400 text-left">
                              <span className="material-icons align-middle">
                                Credit
                              </span>
                              <span className="pl-2">60 Ads</span>
                            </p>
                            <p className="font-semibold flex justify-center text-gray-400 text-left pt-5">
                              <span className="material-icons align-middle">
                                Duration
                              </span>
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
                          </div>
                        </div>
                      )}
                      {subscription.planName === "Platinum" && (
                        <div className="w-96 sm:w-[400px] p-8 bg-white text-center overflow-hidden rounded-3xl shadow-xl">
                          <h1 className="text-black font-semibold text-2xl">
                            Platinum
                          </h1>
                          <p className="pt-2 tracking-wide">
                            <span className="text-gray-400 align-top">₹ </span>
                            <span className="text-3xl font-semibold">
                              12,999
                            </span>
                            <span className="text-gray-400 font-medium">
                              / user
                            </span>
                          </p>
                          {/* Features */}
                          <hr className="mt-4 border-1 translate-x-[30px] " />
                          <div className="pt-8">
                            <p className="font-semibold flex justify-center text-gray-400 text-left">
                              <span className="material-icons align-middle">
                                Credit
                              </span>
                              <span className="pl-2">60 Ads</span>
                            </p>
                            <p className="font-semibold flex justify-center text-gray-400 text-left pt-5">
                              <span className="material-icons align-middle">
                                Duration
                              </span>
                              <span className="pl-2">Validity 3 months</span>
                            </p>
                            <p className="font-semibold flex justify-center text-gray-400 text-left pt-5">
                              <span className="material-icons align-middle">
                                Location
                              </span>
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
                          </div>
                        </div>
                      )}

                      {subscription.planName === "Silver" && (
                        <div className="w-96 sm:w-[300px] p-8 bg-white self-center text-center overflow-hidden rounded-3xl shadow-xl">
                          <h1 className="text-black font-semibold text-2xl">
                            Silver
                          </h1>
                          <p className="pt-2 tracking-wide">
                            <span className="text-gray-400 align-top">₹ </span>
                            <span className="text-3xl font-semibold">
                              4,999
                            </span>
                            <span className="text-gray-400 font-medium">
                              / user
                            </span>
                          </p>
                          {/* Features */}
                          <hr className="mt-4 border-1" />
                          <div className="pt-8">
                            <p className="font-semibold flex justify-center text-gray-400 text-left">
                              <span className="material-icons align-middle">
                                Credit
                              </span>
                              <span className="pl-2">50 Ads</span>
                            </p>
                            <p className="font-semibold flex justify-center text-gray-400 text-left pt-5">
                              <span className="material-icons align-middle">
                                Duration
                              </span>
                              <span className="pl-2">Validity 30 days</span>
                            </p>
                            <p className="font-semibold flex justify-center text-gray-400 text-left pt-5">
                              <span className="material-icons align-middle">
                                Location
                              </span>
                              <span className="pl-2">Single location</span>
                            </p>
                          </div>
                        </div>
                      )}
                      {subscription.planName === "True value package" && (
                        <div className="w-80 sm:w-[400px] h-fit p-8 sm:pb-8 bg-gray-900 text-center overflow-hidden rounded-3xl text-white border-4 shadow-xl border-white">
                          <h1 className="text-white font-semibold text-2xl">
                            True value package
                          </h1>
                          <p className="pt-2 tracking-wide">
                            <span className="text-gray-400 align-top">₹ </span>
                            <span className="text-3xl font-semibold">
                              1,299
                            </span>
                            <span className="text-gray-400 font-medium">
                              / user
                            </span>
                          </p>
                          {/* Features */}
                          <hr className="mt-4 border-1 border-gray-600" />
                          <div className="pt-8">
                            <p className="font-semibold flex justify-center text-gray-400 text-left">
                              <span className="material-icons align-middle">
                                Credit
                              </span>
                              <span className="pl-2">10 Ads</span>
                            </p>
                            <p className="font-semibold flex justify-center text-gray-400 text-left pt-5">
                              <span className="material-icons align-middle">
                                Duration
                              </span>
                              <span className="pl-2">Validity 30 days</span>
                            </p>
                            <p className="font-semibold flex justify-center text-gray-400 text-left pt-5">
                              <span className="pl-2">Single location</span>
                            </p>
                            <p className="font-semibold flex justify-center text-gray-400 text-left pt-5">
                              <span className="pl-2">Organic boosting</span>
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Confirmation Modal"
        className="modal absolute bg-white w-[500px] sm:w-[400px] h-fit p-8 justify-center flex flex-col rounded-lg shadow-lg overflow-hidden"
        overlayClassName="modal-overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      >
        <h2 className="font-bold bg-slate-200 rounded w-full text-center mb-8 py-2 px-4 text-lg">
          Confirmation
        </h2>
        <p className="modal-message text-base text-center mb-8">
          Please Contact & Validate Payment before Approving Request!
        </p>
        <div className="modal-buttons self-center flex justify-end">
          <button
            onClick={closeModal}
            className="modal-button bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-4"
          >
            Cancel
          </button>
          <button
            onClick={handleApprove}
            className="modal-button bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            Approve
          </button>
        </div>
      </Modal>
    </main>
  );
};

export default AllSubscriptions;
