import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import About from "./About";
import AddVacation from "./admin/AddVacation";
import Report from "./admin/Report";
import UpdateVacation from "./admin/UpdateVacation";
import Feed from "./Feed";
import Login from "./LoginPage";
import MyVacations from "./MyVacations";
import Register from "./Register";
import Vacations from "./Vacations";

export default function Main() {
  const [update, setupdate] = useState();
  const [vacation, setvacation] = useState({
    description: "",
    location: "",
    picture: "",
    price: "",
  });

  return (
    <div className="main">
      <Routes>
        <Route path="/" element={<Feed />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/Home" element={<Feed />}></Route>
        <Route path="/Vacations" element={<Vacations />}></Route>
        <Route path="/myVacations" element={<MyVacations />}></Route>
        <Route
          path="/add"
          element={<AddVacation setupdate={setupdate} />}
        ></Route>
        <Route
          path="/update"
          element={<UpdateVacation setupdate={setupdate} vacation={vacation} />}
        ></Route>
        <Route path="/report" element={<Report />}></Route>
      </Routes>
    </div>
  );
}
