import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import "../../styles/dashboard.scss";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Doughnut } from "react-chartjs-2";
import { getAllUsers } from "../../actions/userAction.js";
import { getAllPendingCars, getCar } from "../../actions/carAction.js";
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import MetaData from "../Layout/MetaData";

const Dashboard = () => {
  const dispatch = useDispatch();

    const { carCount, cars } = useSelector((state) => state.cars);
    console.log('new: ',carCount);

    // Getting notVerifiedcar count from cars state
    const notVerifiedCars = cars.filter((car) => car.verified === false);

    // Get All Users
    const { users } = useSelector((state) => state.allUsers);
    console.log('users: ',users);

    // Get All Users whose Role is Dealer
    const dealers = users && users.filter((user) => user.role === "dealer");

    const pendingCars = notVerifiedCars.length;
    const verifiedCars = carCount;

    const data01 = [
      { name: 'Verified Cars', value: carCount },
      { name: 'Pending Cars', value: pendingCars },
    ];
    
    const data02 = [
      { name: 'Users', value: users.length },
      { name: 'Dealers', value: dealers.length },
    ];


    useEffect(() => {
        dispatch(getCar());
        dispatch(getAllPendingCars());
        dispatch(getAllUsers());
    }, [dispatch]);

  return (
    <div className="dashboard flex gap-4 ">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className="dashboard__content border-[#999] mx-auto border-[1px] p-8 rounded-xl bg-white h-[90%] w-[80%] m-4">
        <div className="dashboard__content__title">
          <Typography variant="h4">Dashboard</Typography>
        </div>

        <div className="card_container flex justify-center align-middle mx-auto w-[80%] bg-slate-300 gap-12 my-8 rounded-xl p-4">
          <div className="card card1 w-[20%] h-[150px] bg-white rounded-xl p-4 flex flex-col gap-8 justify-center align-middle">
            <span className="text-xl font-semibold mt-4 self-center">Total Cars</span>
            <span className="text-2xl font-medium mb-4 self-center">{carCount+notVerifiedCars.length}</span>
          </div>
          <div className="card card2 w-[20%] h-[150px] bg-white rounded-xl p-4 flex flex-col gap-8 justify-center align-middle">
            <span className="text-xl text-center font-semibold mt-4 self-center">Pending Cars</span>
            <span className="text-2xl font-medium mb-5 relative bottom-2 self-center">{notVerifiedCars.length}</span>
          </div>
          <div className="card card3 w-[20%] h-[150px] bg-white rounded-xl p-4 flex flex-col gap-8 justify-center align-middle">
            <span className="text-xl font-semibold mt-4 self-center">Verified Cars</span>
            <span className="text-2xl font-medium mb-4 self-center">{carCount}</span>
          </div>
          <div className="card card4 w-[20%] h-[150px] bg-white rounded-xl p-4 flex flex-col gap-8 justify-center align-middle">
            <span className="text-xl font-semibold mt-4 self-center">Users</span>
            <span className="text-2xl font-medium mb-4 self-center">{users.length}</span>
          </div>
          <div className="card card5 w-[20%] h-[150px] bg-white rounded-xl p-4 flex flex-col gap-8 justify-center align-middle">
            <span className="text-xl font-semibold mt-4 self-center">Dealers</span>
            <span className="text-2xl font-medium mb-4 self-center">{dealers.length}</span>
          </div>
        </div>

        <div style={{ width: '800px', height: '300px' }}>
  <ResponsiveContainer width="100%" height="90%">
  <PieChart width={800} height={400} className="chart">
  <Pie
  dataKey="value"
  isAnimationActive={false}
  data={data01}
  cx="30%"
  cy="50%"
  outerRadius={80}
  fill="#8884d8"
  label
/>
<Pie
  dataKey="value"
  data={data02}
  cx="70%"
  cy="50%"
  innerRadius={40}
  outerRadius={80}
  fill="#ee3131"
/>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      </div>

        <div className="link_to_action_container relative top-[-100px] flex justify-center w-[90%] align-middle bg-slate-400 mx-auto px-14 gap-8 my-8 rounded-xl p-4">
          <Link
            to="/admin/cars/pending"
            className="link_to_action link_to_action1 flex justify-end w-[30%] overflow-hidden h-[200px] bg-white rounded-xl p-4"
          >
            <div className="w-full px-auto flex flex-col">
              <h2 className="text-lg font-semibold p-4 self-center">Approve Pending Cars</h2>
              <hr />
              <p className="py-8 px-8 text-center">
                Reviw, Update and Approve all pending Car requests by Dealers
                and Users
              </p>
            </div>
          </Link>
          <Link
            to="/admin/dealers"
            className="link_to_action link_to_action1 flex justify-end w-[30%] overflow-hidden h-[200px] bg-white rounded-xl p-4"
          >
            <div className="w-full px-auto flex flex-col">
              <h2 className="text-lg font-semibold p-4 self-center">View All Dealers</h2>
              <hr />
              <p className="py-8 px-8 text-center">View all Dealers on Platform and their details</p>
            </div>
          </Link>
          <Link
            to="/admin/allUsers"
            className="link_to_action link_to_action1 flex justify-end w-[30%] overflow-hidden h-[200px] bg-white rounded-xl p-4"
          >
            <div className="w-full px-auto flex flex-col">
              <h2 className="text-lg font-semibold p-4 self-center">View All Users</h2>
              <hr />
              <p className="py-8 px-8 text-center">View all Users on Platform and their details</p>
            </div>
          </Link>
        </div>

     
        
      </div>
    </div>
  );
};

export default Dashboard;
