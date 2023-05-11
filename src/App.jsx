import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import WebFont from "webfontloader";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Navbar from "./components/Layout/Header/Navbar";
import UsedCar from "./components/Cars/UsedCar";
import Footer from "./components/Layout/Footer/Footer";
import NavbarMobile from "./components/Layout/Header/NavbarMobile";
import CarDetail from "./components/Cars/CarDetail";
import FooterMobile from "./components/Layout/Footer/FooterMobile";
import LoginSignUp from "./components/User/LoginSignUp";
import { loadUser } from "./actions/userAction";
import Profile from "./components/User/Profile.jsx";
import store from "./store";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";
import UpdatePassword from "./components/User/UpdatePassword";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import UpdateProfile from "./components/User/UpdateProfile";
import SellerPage from "./components/Seller/SellerPage.jsx"
import axios from "axios";
import GetWishlist from "./components/Cars/GetWishlist";
axios.defaults.withCredentials=true;

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Montserrat", "Arial", "Helvetica"],
      },
    });
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Navbar />
      <NavbarMobile />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/seller/:id" component={SellerPage} />
        <Route strict path="/car/:id" component={CarDetail} />
        <Route exact path="/cars" component={UsedCar} />
        <Route exact path="/cars/:keyword?" component={UsedCar} />
        <ProtectedRoute exact path="/account" component={Profile} />
        <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
        <ProtectedRoute exact path="/wishlist/me" component={GetWishlist} />

        <ProtectedRoute
          exact
          path="/password/update"
          component={UpdatePassword}
        />

        <Route exact path="/password/forgot" component={ForgotPassword} />

        <Route exact path="/password/reset/:token" component={ResetPassword} />
        <Route exact path="/login" component={LoginSignUp} />
      </Switch>
      <Footer />
      <FooterMobile />
    </Router>
  );
}

export default App;
