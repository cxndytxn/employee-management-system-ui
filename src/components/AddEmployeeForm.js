import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";

const AddEmployeeForm = () => {
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setEmployee({ ...employee, [name]: value });

    switch (name) {
      case "firstName":
        if (value.length === 0) {
          setFirstNameError("First name shouldn't be empty.");
        } else {
          setFirstNameError("");
        }
        break;
      case "lastName":
        if (value.length < 1) {
          setLastNameError("Last name shouldn't be empty.");
        } else {
          setLastNameError("");
        }
        break;
      case "email":
        if (value.length < 1) {
          setEmailError("Email shouldn't be empty.");
        } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
          setEmailError("Email's format is invalid.");
        } else {
          setEmailError("");
        }
        break;
      default:
        break;
    }
  };

  const reset = (e) => {
    e.preventDefault();
    setEmployee({
      id: "",
      firstName: "",
      lastName: "",
      email: "",
    });
  };

  const saveEmployee = (e) => {
    //Prevent webpage from refreshing
    e.preventDefault();

    EmployeeService.saveEmployee(employee)
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex justify-center w-screen">
      <div className="my-8 shadow rounded-lg border-b w-full mx-8 md:max-w-2xl bg-gray-50">
        <div className="p-8 w-full">
          <div className="justify-items-center place-items-center grid">
            <div className="text-xl">
              <h1>Add New Employee</h1>
            </div>
            <div className="my-4 w-full grid justify-items-center">
              <label className="block py-1 text-gray-600 text-sm font-semibold">
                First Name
              </label>
              <input
                type={"text"}
                name="firstName"
                value={employee.firstName}
                onChange={(e) => handleChange(e)}
                required
                className="rounded focus:ring-transparent focus:border-gray-500 h-10 w-full max-w-md"
              ></input>
              <label className="text-sm text-red-600 text-left max-w-md w-full">
                {firstNameError}
              </label>
            </div>
            <div className="my-4 w-full grid justify-items-center">
              <label className="block py-1 text-gray-600 text-sm font-semibold">
                Last Name
              </label>
              <input
                type={"text"}
                name="lastName"
                value={employee.lastName}
                onChange={(e) => handleChange(e)}
                required
                className="rounded focus:ring-transparent focus:border-gray-500 h-10 w-full max-w-md"
              ></input>
              <label className="text-sm text-red-600 text-left max-w-md w-full">
                {lastNameError}
              </label>
            </div>
            <div className="w-full my-4 grid justify-items-center">
              <label className="block py-1 text-gray-600 text-sm font-semibold">
                Email
              </label>
              <input
                type={"email"}
                name="email"
                value={employee.email}
                onChange={(e) => handleChange(e)}
                required
                className="rounded focus:ring-transparent focus:border-gray-500 h-10 w-full max-w-md"
              ></input>
              <label className="text-sm text-red-600 text-left max-w-md w-full">
                {emailError}
              </label>
            </div>
            <div className="mt-8 space-x-4">
              <button
                onClick={saveEmployee}
                className="rounded shadow-lg text-white font-semibold bg-green-500 py-2 px-6 sm:px-8 hover:bg-green-600"
              >
                Save
              </button>
              <button
                onClick={reset}
                className="rounded shadow-lg text-white font-semibold bg-red-500 py-2 px-6 sm:px-8 hover:bg-red-600"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeForm;
