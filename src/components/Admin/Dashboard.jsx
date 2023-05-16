import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import "../../styles/dashboard.scss";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../../actions/userAction.js";
import { getAllPendingCars, getCar } from "../../actions/carAction.js";
import { PieChart, Pie, ResponsiveContainer } from 'recharts';
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
    <div className="dashboard flex gap-4 bg-[#0e0c33] ">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className="dashboard__content overflow-hidden justify-center border-[#999] mx-auto border-[1px] p-8 rounded-xl bg-white h-[90vh] sm:h-fit w-[80%] sm:w-full m-4">
        <div className="dashboard__content__title">
          <Typography variant="h4">Dashboard</Typography>
        </div>
        <hr className="my-8 w-full" />

        <div className="card_container flex flex-col ml-[100px] sm:mx-auto justify-center align-middle w-[300px] bg-slate-300 gap-12 sm:gap-4 my-8 rounded-xl p-4">
          <div className="card card1 w-full h-[50px] bg-white rounded-xl flex gap-8 align-middle p-4">
            <span className="text-xl mr-[90px] font-semibold">Total Cars : </span>
            <span className="text-xl flex justify-self-end font-medium mb-4">{carCount+notVerifiedCars.length}</span>
          </div>
          <div className="card card2 w-full h-[50px] bg-white rounded-xl p-4 flex gap-8 pl-4 align-middle">
            <span className="text-xl mr-[65px] text-center font-semibold self-center">Pending Cars</span>
            <span className="text-xl font-medium mb-5 relative bottom-2">{notVerifiedCars.length}</span>
          </div>
          <div className="card card3 w-full h-[50px] bg-white rounded-xl p-4 flex gap-8 pl-4 align-middle">
            <span className="text-xl mr-[60px] font-semibold self-center">Verified Cars : </span>
            <span className="text-xl font-medium mb-4">{carCount}</span>
          </div>
          <div className="card card4 w-full h-[50px] bg-white rounded-xl p-4 flex gap-8 pl-4 align-middle">
            <span className="text-xl mr-[120px] font-semibold self-center">Users : </span>
            <span className="text-xl font-medium mb-4">{users.length}</span>
          </div>
          <div className="card card5 w-full h-[50px] bg-white rounded-xl p-4 flex gap-8 pl-4 align-middle">
            <span className="text-xl mr-[110px] font-semibold self-center">Dealers : </span>
            <span className="text-xl font-medium mb-4">{dealers.length}</span>
          </div>
        </div>

        <div style={{ width: '500px', height: '200px' }} className="relative sm:top-[0px] sm:right-[100px] scale-[1.3] xs:right-[150px] top-[-400px] right-[-400px] sm:scale-[0.7]">
  <ResponsiveContainer width="100%" height="100%">
    <PieChart width={800} height={400} className="chart">
      <Pie
        dataKey="value"
        isAnimationActive={false}
        data={data01}
        cx="20%"
        cy="50%"
        outerRadius={80}
        fill="#8884d8"
        label={({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {
          const RADIAN = Math.PI / 180;
          const radius = 25 + innerRadius + (outerRadius - innerRadius);
          const x = cx + radius * Math.cos(-midAngle * RADIAN);
          const y = cy + radius * Math.sin(-midAngle * RADIAN);
          return (
            <text
              x={x}
              y={y}
              fill="#8884d8"
              textAnchor={x > cx ? 'start' : 'end'}
              dominantBaseline="central"
            >
              {data01[index].name}
            </text>
          );
        }}
      />
      <Pie
        dataKey="value"
        data={data02}
        cx="70%"
        cy="50%"
        innerRadius={40}
        outerRadius={80}
        fill="#ee3131"
        label={({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {
          const RADIAN = Math.PI / 180;
          const radius = 25 + innerRadius + (outerRadius - innerRadius);
          const x = cx + radius * Math.cos(-midAngle * RADIAN);
          const y = cy + radius * Math.sin(-midAngle * RADIAN);
          return (
            <text
              x={x}
              y={y}
              fill="#ee3131"
              textAnchor={x > cx ? 'start' : 'end'}
              dominantBaseline="central"
            >
              {data02[index].name}
            </text>
          );
        }}
      />
    </PieChart>
  </ResponsiveContainer>
</div>


        <div className="link_to_action_container relative sm:top-[-50px] top-[-400px] right-[-400px] sm:right-0 flex justify-center sm:w-[100%] w-[60%] align-middle bg-slate-50 px-14 sm:px-0 gap-8 my-8 rounded-xl p-4">
          <Link
            to="/admin/cars/pending"
            className="link_to_action link_to_action1 flex justify-center align-middle w-[30%] h-[100px] overflow-hidden text-center btn bg-[#ee3131] text-white rounded-xl p-4"
          >
            {/* <div className="w-full px-auto flex flex-col mb-2"> */}
              <h2 className="text-lg font-semibold p-4 self-center">Approve Pending Cars</h2>
              {/* <hr /> */}
              {/* <p className="py-8 px-8 text-center">
                // Reviw, Update and Approve all pending Car requests by Dealers
                and Users
              </p> */}
            {/* </div> */}
          </Link>
          <Link
            to="/admin/dealers"
            className="link_to_action link_to_action1 flex justify-center align-middle w-[30%] h-[100px] overflow-hidden text-center btn bg-[#ee3131] text-white rounded-xl p-4"
          >
            {/* <div className="w-full px-auto flex flex-col mb-2"> */}
              <h2 className="text-lg font-semibold p-4 self-center">View All Dealers</h2>
              {/* <hr /> */}
              {/* <p className="py-8 px-8 text-center">View all Dealers on Platform and their details</p> */}
            {/* </div> */}
          </Link>
          <Link
            to="/admin/allUsers"
            className="link_to_action link_to_action1 flex justify-center align-middle w-[30%] h-[100px] overflow-hidden text-center btn bg-[#ee3131] text-white rounded-xl p-4"
          >
            {/* <div className="w-full px-auto flex flex-col mb-2"> */}
              <h2 className="text-lg font-semibold p-4 self-center">View All Users</h2>
              {/* <hr /> */}
              {/* <p className="py-8 px-8 text-center">View all Users on Platform and their details</p> */}
            {/* </div> */}
          </Link>
        </div>

     
        
      </div>
    </div>
  );
};

export default Dashboard;
