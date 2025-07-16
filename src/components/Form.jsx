import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // <-- import useNavigate
import { useDispatch } from 'react-redux';
import { loginuserform } from '../Redux/Auth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;