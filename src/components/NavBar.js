import React from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/");
  };

  return (
    <div className="bg-gray-800">
      <div className="h-16 flex items-center justify-center sm:justify-start">
        <p
          className="text-white font-bold px-4 hover:cursor-pointer"
          onClick={navigateToHome}
        >
          Employee Management System
        </p>
      </div>
    </div>
  );
};

export default NavBar;
