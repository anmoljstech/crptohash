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
import Viewdetials from './Components/UserList/Viewdetials'
import Desposittranction from './Components/Desposit/Desposittranction'
import Loginotp from './Auth/Login/Loginotp'
import Userbalance from './Components/UserList/Userbalance'
import PayoutTransaction from "./Components/Desposit/Payouttransaction";
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<Public />}>
            <Route path="/login" element={<Login />} />
            <Route path="/loginotp" element={<Loginotp />} />
           
          </Route>
          <Route element={<Private />}>
            <Route path="" element={<Layout />}>
            <Route path="/" element={<Dashbaord />} />
            <Route path="/users">
            <Route path="list" element={<Users />} />
             <Route path="userbalance" element={<Userbalance />} />
            
            </Route>
            <Route path="update/:id" element={<Viewdetials />} />
            <Route path="/desposit">
            <Route path="desposittranction" element={<Desposittranction />} />
            <Route path="margintranction" element={<Margintranction />} />
            <Route path="payouttransaction" element={<PayoutTransaction />} />
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
