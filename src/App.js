import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AddEmployeeForm from "./components/AddEmployeeForm";
import EmployeeList from "./components/EmployeeList";
import NavBar from "./components/NavBar";
import PutEmployeeForm from "./components/PutEmployeeForm";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route index element={<EmployeeList />}></Route>
          <Route path="/" element={<EmployeeList />}></Route>
          <Route path="/employee-list" element={<EmployeeList />}></Route>
          <Route path="/add-employee" element={<AddEmployeeForm />}></Route>
          <Route path="/edit-employee/:id" element={<PutEmployeeForm />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
