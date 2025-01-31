import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import Withdraw from './Components/withdrawal/Withdraw'
import "./assets/Css/style.css";
import Login from "./Auth/Login/Login";
import Public from './Routing/Public'
import Private from './Routing/Private'
import Margintranction from "./Components/Desposit/Margintranction";
import Dashbaord from './Components/Dashboard/Dashbaord'
import 'react-loading-skeleton/dist/skeleton.css'
import Users from './Components/UserList/Users'
import Desposittranction from './Components/Desposit/Desposittranction'
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<Public />}>
            <Route path="/login" element={<Login />} />
           
          </Route>
          <Route element={<Private />}>
            <Route path="" element={<Layout />}>
            <Route path="/dashboard" element={<Dashbaord />} />
            <Route path="/users">
            <Route path="list" element={<Users />} />
            </Route>
            <Route path="/desposit">
            <Route path="desposittranction" element={<Desposittranction />} />
            <Route path="margintranction" element={<Margintranction />} />
            </Route>
            <Route path="/withdrawal">
            <Route path="withdraw" element={<Withdraw />} />
            {/* <Route path="margintranction" element={<Margintranction />} /> */}
            </Route>
              {/* <Route path="/settings" element={<Settings />} /> */}
            </Route>

          </Route>
        </Routes>

      </Router>
    </>
  );
};

export default App;
