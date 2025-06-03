import React, { useState } from 'react';
import LoginImage from '../../assets/Images/LoginImage.jpg'
import { useDispatch } from 'react-redux';
import {  NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login } from '../../Redux/action/Authaction'
import Logo from '../../assets/Images/logoHeader.png';
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const handleLogin = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast.dismiss()
      toast.error('Please fill in the details');
      return;
    }

    dispatch(login(email, password, navigate));
  };

  return (
    <div className="login-container">
      <div className="login-picture">
        <img
        src='https://img.freepik.com/free-vector/tablet-login-concept-illustration_114360-7873.jpg?ga=GA1.1.952322199.1741257962&semt=ais_hybrid&w=740'
          // src={LoginImage}
          alt="Login Illustration"
        />
      </div>

      <div className="login-form-container">
        <div className="login-form ">
          <div className="logo text-center mb-4">
         <div className="logo_img w-100 d-flex justify-content-center">
         <img src={Logo} alt="Logo"  className='w-50 image-fluid'/>
         </div>
            
          </div>
          <h2 className="text-clr  text-center ">Welcome Back</h2>
          <p className="login-subtitle">Login to your account</p>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="form-control"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group password">
              <label htmlFor="password">Password</label>
            <div className='input_eye'>
              <div className='in_put_f'>
              <input
                className="form-control "
                id="password"
                placeholder="Enter your password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);

                }}
              />
              </div>
              <div
              className="eye_sec "
              onClick={() => setShowPassword(!showPassword)}
              style={{
                cursor: 'pointer',

              }}
            >
              {showPassword ? (
                <i className="fa-solid fa-eye-slash " />
              ) : (
                <i className="fa-solid fa-eye" />
              )}
            </div>
             
              </div>
             

            </div>
         
            <div className="form-group d-flex flex-md-row flex-column justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember" className="ms-2 mt-2">
                  Remember me
                </label>
              </div>
              <NavLink to="/verficationemail" className="text-primary text-decoration-none">
                Forgot Password?
              </NavLink>
            </div>
            <button type="submit" className="btn bgClr1 text-white w-100 login-btn">
              Login
            </button>
          </form>

          <p className="signup-text">
            Don't have an account?{" "}
            <a href="#!" className="text-primary">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
