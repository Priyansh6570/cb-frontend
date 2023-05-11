import React, { Fragment, useState } from "react";
import "../../../styles/UserOptions.scss";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import Backdrop from "@material-ui/core/Backdrop";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import {useHistory} from "react-router-dom";
import { useAlert } from "react-alert";
import { logout } from "../../../actions/userAction";
import { FaHeart } from "react-icons/fa";
import { useDispatch} from "react-redux";

const UserOptions = ({ user, top, top1 }) => {
  // const { cartItems } = useSelector((state) => state.cart);

  const [open, setOpen] = useState(false);
  const history = useHistory();
  const alert = useAlert();
  const dispatch = useDispatch();

  const options = [
    { icon: <FaHeart />, name: "Shortlist", func: wishlist },
    { icon: <PersonIcon />, name: "Profile", func: account },
    // {
    //   icon: (
    //     <ShoppingCartIcon
    //       style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
    //     />
    //   ),
    //   name: `Cart(${cartItems.length})`,
    //   func: cart,
    // },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  const speedDialStyles = {
    zIndex: "11",
    borderColor: "#ee3131",
    ...(user.role === "admin" && { top: top }),
    ...(user.role !== "admin" && { top: top1 }),
  };

  function dashboard() {
    history.push("/admin/dashboard");
  }

  function wishlist() {
    history.push("/wishlist/me");
  }
  function account() {
    history.push("/account");
  }
  // function cart() {
  //   history.push("/cart");
  // }
  function logoutUser() {
    dispatch(logout());
    history.push("/");
    alert.success("Logout Successfully");
  }

  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={speedDialStyles}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar[0].url}
            alt="Profile"
            onError={(e) => {
              e.target.onerror = null; // prevent infinite loop
              e.target.src = './Images/man.png'; // fallback image
              e.target.alt = 'Default Avatar'; // fallback alt text
            }}
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;