import React, { useState } from 'react';
<<<<<<< HEAD
import { Link, useNavigate } from 'react-router-dom';
=======
import { Link, useNavigate } from 'react-router-dom'; // <-- import useNavigate
>>>>>>> 6f748bbeecb58b7b7edf5af465ee3e486cb20d11
import { useDispatch } from 'react-redux';
import { loginuserform } from '../Redux/Auth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
<<<<<<< HEAD
  const navigate = useNavigate();

  const fromhandler = async (e) => {
    e.preventDefault();
    const data = { email, password };

    try {
      const response = await dispatch(loginuserform(data));
      if (response?.payload?.message === 'Login successful.') {
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/admin');
      }
    } catch (error) {
      // handled by toast
    }
  };

  return (
    <div className="min-h-screen bg-white px-5 md:px-16 py-10">
      <div className="max-w-5xl mx-auto">
        {/* Logo */}
        <div className="mb-10 text-center">
          <img
            src="/Images/logo.png"
            alt="Veridate Logo"
            className="h-20 w-auto mx-auto"
          />
        </div>

        <div className="flex flex-col md:flex-row bg-white  rounded-lg  overflow-hidden">
          {/* Login Form */}
          <form
            onSubmit={fromhandler}
            className="w-full md:w-1/2 px-6 py-8 border-r border-gray-200"
          >
            <h2 className="text-3xl font-bold text-black mb-2 pb-2 border-b-2 border-blue-500">
              Login
            </h2>
            <p className="text-gray-600 mb-6">
              Welcome back! Sign in to your account
            </p>

            <div className="mb-5">
              <label className="font-semibold text-black">Email Address*</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-gray-300 px-4 py-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-5">
              <label className="font-semibold text-black">Password*</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-gray-300 px-4 py-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-between text-sm text-gray-600 mb-4">
              <Link to="#" className="hover:underline text-blue-600">
                Forgotten Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-black text-white font-semibold py-2 rounded transition duration-300"
            >
              Login
            </button>
          </form>

          {/* Signup Prompt */}
          <div className="w-full md:w-1/2 px-6 py-8 bg-gray-50">
            <h2 className="text-2xl font-bold text-black mb-2 pb-2 border-b-2 border-blue-500">
              Create New Account
            </h2>
            <p className="text-gray-600 mb-6">Don't have an account yet?</p>
            <Link to="/create">
              <button className="w-full bg-blue-600 hover:bg-black text-white font-semibold py-2 rounded transition duration-300">
                Register
              </button>
            </Link>

            <div className="mt-8">
              <p className="text-lg font-semibold text-black mb-3">
                Why create an account?
              </p>
              <ul className="space-y-2 text-gray-700">
                 <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Faster checkout with saved details</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Track orders and order history</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Exclusive member discounts and offers</span>
                  </li>
              </ul>
            </div>
=======
  const navigate = useNavigate(); // <-- initialize useNavigate

  const fromhandler = async (e) => {
  e.preventDefault();
  const data = { email, password };
  
  try {
    const response = await dispatch(loginuserform(data));
    
    if (response?.payload?.message === "Login successful.") {
      localStorage.setItem("isLoggedIn", "true");
      navigate('/admin');
    }
  } catch (error) {
    // Error will be shown by the toast in the Redux slice
  }
};

  return (
    <div className="px-5 md:px-16 mt-10">
      <div className="flex items-center text-sm font-sans mb-4">
        <Link to="/" className="text-blue-600 hover:underline">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-500">Account</span>
      </div>

      <div className="flex flex-col md:flex-row justify-start md:justify-between">
        {/* Login Form */}
        <form onSubmit={fromhandler} className="w-full md:w-1/2 md:pr-12 border-r border-gray-300">
          <h2 className="text-3xl font-bold border-b-2 border-yellow-400 pb-1 mb-2">Login</h2>
          <p className="text-gray-600 mb-4">Welcome back! Sign in to your account</p>

          <div className="mb-4">
            <label className="font-semibold">Email Address*</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border px-4 py-2 rounded mt-1"
            />
          </div>

          <div className="mb-4">
            <label className="font-semibold">Password*</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border px-4 py-2 rounded mt-1"
            />
          </div>

          <div className="flex justify-between text-sm text-gray-700 mb-4">
            <Link to="/" className="hover:underline">Return to Store</Link>
            <Link to="#" className="hover:underline">Forgotten Password?</Link>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-black hover:text-white font-bold py-2 rounded transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Signup Prompt */}
        <div className="w-full md:w-1/2 mt-10 md:mt-0 md:pl-12">
          <h2 className="text-3xl font-bold border-b-2 border-yellow-400 pb-1 mb-2">Create New Account</h2>
          <p className="text-gray-600 mb-4">Don't have an account yet?</p>
          <Link to="/create">
            <button className="w-full bg-yellow-400 hover:bg-black hover:text-white font-bold py-2 rounded transition duration-300">
              Register
            </button>
          </Link>

          <div className="mt-8">
            <p className="text-lg font-medium mb-3">Why create an account?</p>
            <ul className="space-y-2 text-gray-700">
              <li>✅ Speed through checkout</li>
              <li>✅ Track your orders easily</li>
              <li>✅ Keep a record of all your purchases</li>
            </ul>
>>>>>>> 6f748bbeecb58b7b7edf5af465ee3e486cb20d11
          </div>
        </div>
      </div>
    </div>
  );
}

<<<<<<< HEAD
export default Login;
=======
export default Login;
>>>>>>> 6f748bbeecb58b7b7edf5af465ee3e486cb20d11
