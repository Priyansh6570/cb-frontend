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
import UpdateCar from "./components/Cars/UpdateCar";
import SellerPage from "./components/Seller/SellerPage.jsx"
import SellerCarDetail from "./components/Seller/SellerCarDetail";
import axios from "axios";
import GetWishlist from "./components/Cars/GetWishlist";
import Dashboard from "./components/Admin/Dashboard";
import AllUser from "./components/Admin/AllUser";
import AllDealer from "./components/Admin/AllDealer";
import AllSubscriptions from "./components/Admin/AllSubscriptions";
import PendingCars from "./components/Admin/PendingCars";
import ApproveCar from "./components/Admin/ApproveCar.jsx";
import SellerCarPage from "./components/Seller/SellerCarPage";
import InProgress from "./components/Layout/Progress/InProgress";
import About from "./components/Layout/About/About";
import Orders from "./components/Order/Orders";
import CreateCar from "./components/Cars/CreateCar";
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
        <Route exact path="/login" component={LoginSignUp} />
        <Route strict path="/car/:id" component={CarDetail} />
        <Route exact path="/cars" component={UsedCar} />
        <Route exact path="/cars/:keyword?" component={UsedCar} />
        <Route exact path="/about" component={About} />
        <ProtectedRoute exact path="/account" component={Profile} />
        <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
        <ProtectedRoute exact path="/wishlist/me" component={GetWishlist} />
        <Route exact path="/sellerCar/:id" component={SellerCarPage} />
        <Route exact path="/seller" component={SellerPage} />
        <Route exact path="/in-progress" component={InProgress} />
        <ProtectedRoute exact path="/sellCar" component={CreateCar} />
        <ProtectedRoute exact path="/seller/car/update/:id" component={UpdateCar} />
        <ProtectedRoute exact path="/seller/car/:id" component={SellerCarDetail} />
        <Route exact path="/orders/:id" component={Orders} />

        <ProtectedRoute
          exact
          path="/password/update"
          component={UpdatePassword}
        />
         <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/dashboard"
          component={Dashboard}
        />
         <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/allUsers"
          component={AllUser}
        />
         <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/dealers"
          component={AllDealer}
        />
         <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/cars/pending"
          component={PendingCars}
        />
         <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/cars/pending/:id"
          component={ApproveCar}
        />
         <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/subscriptions"
          component={AllSubscriptions}
        />

        <Route exact path="/password/forgot" component={ForgotPassword} />

        <Route exact path="/password/reset/:token" component={ResetPassword} />
      </Switch>
      <Footer />
      <FooterMobile />
    </Router>
  );
}

export default App;
