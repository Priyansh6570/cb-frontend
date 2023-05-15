import React, { useState } from "react";
import "../../styles/sidebar.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State variable for sidebar visibility

  const { user } = useSelector((state) => state.user);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`sidebar gap-5 overflow-hidden ${isSidebarOpen ? "" : "collapsed"}`}>
  <button onClick={handleToggleSidebar} className="toggle-button">
    <BsFillArrowLeftCircleFill
      className={`collapse-icon relative top-[10%] scale-[2.5] text-[#ee3131] ${
        isSidebarOpen ? "" : "rotate-180" // Add the "rotate-180" class to rotate the collapse icon
      }`}
    />
  </button>
      <Link to="/" className="flex relative right-3 flex-col pt-3 w-[90%] bg-[#ececec] justify-center align-middle">
        <img
          src={user.avatar && user.avatar[0].url}
          alt={user.name}
          className="rounded-full w-[50px] h-[50px] self-center"
        />
        <h2 className="text-xl pb-4 font-bold text-black self-center">
          {user && user.name}
        </h2>
      </Link>
      <Link to="/admin/dashboard" className='mt-6 flex gap-4'>
      <DashboardIcon />
        <p>
           Dashboard
        </p>
      </Link>
      <hr />
      <Link className='mt-6 flex gap-4'>
        <TreeView className="tree flex gap-4"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ImportExportIcon />}
        >
          <TreeItem nodeId="1" label={` ${isSidebarOpen ? "Cars" : ""} `}>
            <Link to="/admin/cars" className={`${isSidebarOpen ? "mt-3 relative top-3" : "relative right-4 flex gap-4 "}`}>
              <TreeItem nodeId="2" label={` ${isSidebarOpen ? "All" : ""} `} icon={<PostAddIcon />} />
            </Link>

            <Link to="/admin/car" className={`${isSidebarOpen ? "mt-3 relative top-6" : "relative right-4 flex gap-4 "}`}>
              <TreeItem nodeId="3" label={` ${isSidebarOpen ? "Create" : ""} `} icon={<AddIcon />} />
            </Link>
          </TreeItem>
        </TreeView>
      </Link>
      <hr className={`${isSidebarOpen ? "relative top-7" : "collapsed"}`} />
      <Link to="/admin/orders" className='mt-10 flex gap-4'>
          <ListAltIcon />
        <p>
          Orders
        </p>
      </Link>
      <hr />
      <Link to="/admin/allUsers" className='mt-6 flex gap-4'>
          <PeopleIcon />
        <p>
           Users
        </p>
      </Link>
      <hr />
    </div>
  );
};

export default Sidebar;
