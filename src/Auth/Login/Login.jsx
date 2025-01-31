import React, { useState } from 'react';
import LoginImage from '../../assets/Images/LoginImage.jpg'
import { useDispatch } from 'react-redux';
import {  NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login } from '../../Redux/action/Authaction'
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
          src={LoginImage}
          alt="Login Illustration"
        />
      </div>

      <div className="login-form-container">
        <div className="login-form">
          <h2 className="text-primary">Welcome Back</h2>
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
              <NavLink to="/verficationemail" className="text-primary">
                Forgot Password?
              </NavLink>
            </div>
            <button type="submit" className="btn btn-primary w-100">
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
