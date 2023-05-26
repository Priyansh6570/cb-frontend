import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "../Layout/MetaData";
import Loader from "../Layout/Loader/Loader";
import { Link } from "react-router-dom";
import "../../styles/profile.scss";

const Profile = ({ history }) => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === false) {
      history.push("/login");
    }
  }, [history, isAuthenticated]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user.name}'s Profile`} />
          <div className="LoginSignUpContainer flex justify-center align-top sm:h-[1000px] bg-[#ffffff]">
            <div className="profileContainer p-3 bg-slate-200 w-[100%] sm:w-full sm:h-[950px] sm:rounded-none h-full flex sm:flex-col gap-3 rounded-2xl">
              <div className="profileContainer__left w-[50%] sm:h-[358px] sm:w-full rounded-xl flex flex-col justify-center gap-6 items-center bg-[#ffffff00]">
                <h1 className="text-[30px] font-sans font-bold">My Profile</h1>
                <div className="profileContainer__left__imgContainer border-[0.5px] border-[#ee3131] w-[200px] h-[200px] rounded-[100%] overflow-hidden">
                  <img
                    src={user.avatar[0].url}
                    alt={user.name}
                    className="rounded-[100%] w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null; // prevent infinite loop
                      e.target.src = "./Images/man.png"; // fallback image
                      e.target.alt = "Default Avatar"; // fallback alt text
                    }}
                  />
                </div>
                <Link
                  to="/me/update"
                  className="btn-secondary bg-[#ee3131] active:scale-[0.98] text-white text-lg font-medium font-sans flex place-content-center p-2 rounded justify-center w-[200px] h-[40px]"
                >
                  Edit Profile
                </Link>
              </div>

              <div className="profileContainer__right rounded-xl text-center w-[50%] sm:w-full sm:h-[598px] bg-[#ffffff8f] flex flex-col gap-5 p-6 pl-12">
                <div className="profileContainer__right__top flex pl-[100px] pt-[50px] sm:p-0 flex-col gap-4">
                  <h4 className="text-xl font-semibold place-self-start">
                    Full Name
                  </h4>
                  <div className="heading-name sm:min-w-[80vw] h-fit w-[80%] border-1 place-self-start rounded-lg border-black bg-[#bcc7d294] p-2 flex justify-center">
                    <h1 className="text-xl font-normal">{user.name}</h1>
                  </div>

                  {/* Dealership name if user role is dealer  */}
                  {user.role === "dealer" && (
                    <Fragment>
                      <h4 className="text-xl font-semibold place-self-start">
                        Dealership Name
                      </h4>
                      <div className="heading-name sm:min-w-[80vw] h-fit w-[80%] border-1 place-self-start rounded-lg border-black bg-[#bcc7d294] p-2 flex justify-center">
                        <h1 className="text-xl font-normal">
                          {user.dealershipName}
                        </h1>
                      </div>
                    </Fragment>
                  )}

                  <h4 className="text-xl font-semibold place-self-start relative left-0">
                    Email
                  </h4>
                  <div className="email sm:min-w-[80vw] xs:min-w-full sm:min-h-[45px] xs:min-h-[45px] h-fit w-[80%] place-self-start border-1 rounded-lg border-black bg-[#bcc7d294] p-2 flex justify-center">
                    <p className="text-lg xs:text-base place-self-middle relative sm:top-[5px] font-normal">
                      {user.email}
                    </p>
                  </div>
                  <h4 className="text-xl font-semibold place-self-start relative left-0">
                    Address
                  </h4>
                  <div className="email sm:min-w-[80vw] xs:min-w-full sm:min-h-[45px] xs:min-h-[45px] h-fit w-[80%] place-self-start border-1 rounded-lg border-black bg-[#bcc7d294] p-2 flex justify-center">
                    <p className="text-lg xs:text-base place-self-middle relative sm:top-[5px] font-normal">
                      {user.address}
                    </p>
                  </div>
                  <h4 className="text-xl font-semibold place-self-start relative left-0">
                    Joined On
                  </h4>
                  <div className="email sm:min-w-[80vw] h-fit w-[80%] place-self-start border-1 rounded-lg border-black bg-[#bcc7d294] p-2 flex justify-center">
                    <p className="text-lg font-normal">
                      {" "}
                      {new Date(user.createdAt)
                        .toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                        .replace(/(\d+)(?:st|nd|rd|th)/, "$1$2")}
                    </p>
                  </div>

                  <div className="profileContainer__right__top__btns mt-8 relative left-[-50px] sm:left-0 sm:flex-wrap sm:justify-center sm:ml-0 xs:flex-col xs:mx-auto gap-4 sm:mt-[30px] flex flex-row">
                    <Link
                      to={`/orders/${user._id}`}
                      className="btn btn-primary btn bg-[#ee3131] text-white text-lg place-self-start font-sans flex p-2 rounded justify-center w-[200px] sm:w-[150px] h-[40px]"
                    >
                      My Orders
                    </Link>
                    <Link
                      to={`/seller`}
                      className="btn btn-primary btn bg-[#ee3131] text-white text-lg place-self-start font-sans flex p-2 rounded justify-center w-[200px] sm:w-[150px] h-[40px]"
                    >
                      My Cars
                    </Link>
                    <Link
                      to="/password/update"
                      className="btn btn-primary btn bg-[#ee3131] text-white text-lg place-self-start font-sans flex p-2 rounded justify-center w-[200px] sm:w-[150px] h-[40px]"
                    >
                      Change Password
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;

{
  /* <div>
<div>
<p>{user.name}</p>
</div>
  <div>
    <p>{user.email}</p>
    </div>
    <div>
    <h4>Joined On</h4>
    <p>{String(user.createdAt).substr(0, 10)}</p>
    </div>
    
    <div>
    <Link to="/orders">My Orders</Link>
    <Link to="/password/update">Change Password</Link>
    </div>
  </div> */
}

{
  /* <img
    src="./Images/user-action-bg.jpg"
    alt=""
    className="user-action-img w-[880px] sm:right-1 sm:rounded-none absolute h-[70%] sm:h-[113%] rounded-3xl"
  /> */
}
