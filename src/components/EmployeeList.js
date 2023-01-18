import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";
import EmployeeTableRow from "./EmployeeTableRow";

const EmployeeList = () => {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        //Another example
        // fetch("http://localhost:8080/employee")
        //   .then((response) => response.json())
        //   .then((data) => {
        //     setEmployees(data);
        //     setLoading(false);
        //   });

        const response = await EmployeeService.getEmployees();
        setEmployees(response.data);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const deleteEmployee = (e, id) => {
    e.preventDefault();
    EmployeeService.deleteEmployee(id).then((response) => {
      if (employees) {
        setEmployees((prevElement) => {
          //Once the deletion is completed, retrieve the already set employees list in the state to filter out the one that has been
          //deleted based on its ID.
          return prevElement.filter((employee) => employee.id !== id);
        });
        alert(
          "Record of employee " +
            response.data.firstName +
            " " +
            response.data.lastName +
            " has been deleted."
        );
      }
    });
  };

  return (
    <div className="sm:mx-4">
      <div className="h-12 flex justify-center sm:justify-start my-4">
        <button
          className="rounded bg-slate-600 hover:bg-slate-800 text-white px-4 py-2"
          onClick={() => navigate("/add-employee")}
        >
          Add Employee
        </button>
      </div>
      <div className="flex shadow border">
        <table className="min-w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="text-left font-medium text-gray-600 uppercase p-2">
                First Name
              </th>
              <th className="text-left font-medium text-gray-600 uppercase p-2">
                Last Name
              </th>
              <th className="text-left font-medium text-gray-600 uppercase p-2">
                Email
              </th>
              <th className="text-right font-medium text-gray-600 uppercase p-2">
                Actions
              </th>
            </tr>
          </thead>
          {!loading && (
            <tbody className="bg-white">
              {employees.map((employee) => (
                <EmployeeTableRow
                  key={employee.id}
                  deleteEmployee={deleteEmployee}
                  employee={employee}
                />
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
