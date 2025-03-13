import React, { useState,useEffect } from 'react';
import LoginImage from '../../assets/Images/LoginImage.jpg'
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate,useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

import { login,loginotp } from '../../Redux/action/Authaction'

const Loginotp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    let deviceToken="empty"
    const handleLogin = (e) => {
        e.preventDefault();
        if (!email.trim() || !otp.trim()|| !deviceToken.trim()) {
            toast.dismiss()
            toast.error('Please fill in the details');
            return;
        }

        dispatch(loginotp(email, otp,deviceToken, navigate));
    };
    useEffect(() => {
   
        const params = new URLSearchParams(location.search);
        const emailFromURL = params.get('email');
        if (emailFromURL) {
          setEmail(emailFromURL);
        }
      }, [location.search]);
    return (
        <>
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
                        <p className="login-subtitle">Verify to your account</p>

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
                                <label htmlFor="password">Otp</label>
                                <div className='input_eye'>
                                    <div className='in_put_f'>
                                        <input
                                            className="form-control "
                                            id="password"
                                            placeholder="Enter your otp "
                                            type='text'
                                            value={otp}
                                            onChange={(e) => {
                                                setOtp(e.target.value);
                                            }}
                                        />
                                    </div>


                                </div>


                            </div>


                            <button type="submit" className="btn btn-primary w-100">
                                Login
                            </button>
                        </form>


                    </div>
                </div>
            </div>
        </>
    )
}

export default Loginotp


