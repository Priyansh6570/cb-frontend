
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  carsReducer,
  newCarReducer,
  carReducer,
  newReviewReducer,
  carDetailsReducer,
  carReviewsReducer,
  reviewReducer,
} from "./reducers/carReducer";

import {
  allUsersReducer,
  forgotPasswordReducer,
  profileReducer,
  userDetailsReducer,
  userReducer,
} from "./reducers/userReducer";

import {
  allOrdersReducer,
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
  orderReducer,
} from "./reducers/orderReducer";

const reducer = combineReducers({
  cars: carsReducer,
  newCar: newCarReducer,
  car: carReducer,
  // newReview: newReviewReducer,
  carDetails: carDetailsReducer,
  // carReviews: carReviewsReducer,
  // review: reviewReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  allOrders: allOrdersReducer,
  myOrders: myOrdersReducer,
  newOrder: newOrderReducer,
  orderDetails: orderDetailsReducer,
  order: orderReducer,
});

const initialState = {
  user: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};

const middleware = [thunk];

const store = configureStore({
  reducer,
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
