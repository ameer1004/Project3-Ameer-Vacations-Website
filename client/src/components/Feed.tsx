import React from "react";
import { isAdmin } from "../utils/is-admin";
import AdminPage from "./admin/AdminPage";
import Vacations from "./Vacations";

export default function Feed() {
  return (
    <div>
      <h1 className="headline-home">Vacations Website</h1>
      {isAdmin() ? <AdminPage /> : <Vacations />}
    </div>
  );
}
