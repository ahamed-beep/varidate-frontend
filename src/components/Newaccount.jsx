import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signupuserform } from '../Redux/Auth'; // ✅ Correct action name
import { toast } from 'react-toastify';

function Newaccount() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const formhandler = async (e) => {
    e.preventDefault();
    const data = { firstname, lastname, email, password };

    const response = await dispatch(signupuserform(data));

    if (!response.error) {
      toast.success("Verification code sent to your email.");
      navigate('/verify-email', { state: { email } });
    } else {
      toast.error("Signup failed.");
    }
  };

  return (
    <div className="px-5 md:px-16 mt-10">
      <div className="flex items-center text-sm font-sans mb-4">
        <Link to="/" className="text-blue-600 hover:underline">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-500">Create Account</span>
      </div>

      <div className="flex flex-col md:flex-row justify-start md:justify-between">
        {/* Signup Form */}
        <form onSubmit={formhandler} className="w-full md:w-1/2 md:pr-12 border-r border-gray-300">
          <h2 className="text-3xl font-bold border-b-2 border-yellow-400 pb-1 mb-2">Create New Account</h2>
          <p className="text-gray-600 mb-4">Create your own account</p>

          <div className="mb-4">
            <label className="font-semibold">First Name*</label>
            <input
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
              className="w-full border px-4 py-2 rounded mt-1"
            />
          </div>

          <div className="mb-4">
            <label className="font-semibold">Last Name*</label>
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
              className="w-full border px-4 py-2 rounded mt-1"
            />
          </div>

          <div className="mb-4">
            <label className="font-semibold">Email*</label>
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

          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-black hover:text-white font-bold py-2 rounded transition duration-300"
          >
            Register
          </button>
        </form>

        {/* Login Prompt */}
        <div className="w-full md:w-1/2 mt-10 md:mt-0 md:pl-12">
          <h2 className="text-3xl font-bold border-b-2 border-yellow-400 pb-1 mb-2">Login</h2>
          <p className="text-gray-600 mb-4">Welcome back! Already have an account?</p>
          <Link to="/">
            <button className="w-full bg-yellow-400 hover:bg-black hover:text-white font-bold py-2 rounded transition duration-300">
              Login
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

export default Newaccount;