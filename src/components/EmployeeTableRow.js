import React from "react";
import { useNavigate } from "react-router-dom";

const EmployeeTableRow = ({ employee, deleteEmployee }) => {
  const navigate = useNavigate();

  const putEmployee = (e, id) => {
    e.preventDefault();
    navigate(`/edit-employee/${id}`);
  };

  return (
    <tr className="hover:bg-slate-50">
      <td className="p-2 text-left" style={{ wordBreak: "break-word" }}>
        {employee.firstName}
      </td>
      <td className="p-2 text-left" style={{ wordBreak: "break-word" }}>
        {employee.lastName}
      </td>
      <td className="p-2 text-left" style={{ wordBreak: "break-word" }}>
        {employee.email}
      </td>
      <td
        className="p-2 text-right whitespace-nowrap font-medium text-sm space-x-2 sm:space-x-4"
        style={{ wordBreak: "break-word" }}
      >
        <a
          onClick={(e) => putEmployee(e, employee.id)}
          className="text-indigo-500 hover:text-indigo-800 hover:cursor-pointer"
        >
          Edit
        </a>
        <a
          onClick={(e) => deleteEmployee(e, employee.id)}
          className="text-red-500 hover:text-red-800 hover:cursor-pointer"
        >
          Delete
        </a>
      </td>
    </tr>
  );
};

export default EmployeeTableRow;
