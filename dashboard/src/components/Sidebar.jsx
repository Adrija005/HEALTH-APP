import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiHealth } from "react-icons/bi";
import { MdAddModerator } from "react-icons/md";
import { IoBodyOutline } from "react-icons/io5";
import { FaPrescriptionBottle } from "react-icons/fa";

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();

  const gotoHome = () => {
    navigateTo("/");
    setShow(!show);
  };

  const gotoTestPage = () => {
    navigateTo("/test");
    setShow(!show);
  };

  const gotoMessagePage = () => {
    navigateTo("/message");
    setShow(!show);
  };

  const gotoAddNewTest = () => {
    navigateTo("/test/addnew");
    setShow(!show);
  };

  const gotoAddNewAdmin = () => {
    navigateTo("/admin/addnew");
    setShow(!show);
  };

  const gotoAddNewPrescriptions = () => {
    navigateTo("/prescriptions"); 
    setShow(!show);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/admin/logout", { withCredentials: true });
      toast.success(response.data.message);
      setIsAuthenticated(false);
      navigateTo('/login'); // Redirect to login after logout
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <nav
        style={isAuthenticated ? { display: "none" } : { display: "flex" }}
        className={show ? "show sidebar" : "sidebar"}
      >
        <div className="links">
          <TiHome onClick={gotoHome} />
          <BiHealth onClick={gotoTestPage} />
          <MdAddModerator onClick={gotoAddNewAdmin} />
          <IoBodyOutline onClick={gotoAddNewTest} />
          <AiFillMessage onClick={gotoMessagePage} />
          <FaPrescriptionBottle onClick={gotoAddNewPrescriptions} />
          <RiLogoutBoxFill onClick={handleLogout} />
        </div>
      </nav>
      <div
        style={!isAuthenticated ? { display: "none" } : { display: "flex" }}
        className="wrapper"
      >
        <GiHamburgerMenu className="hamburger" onClick={() => setShow(!show)} />
      </div>
    </>
  );
};

export default Sidebar;

