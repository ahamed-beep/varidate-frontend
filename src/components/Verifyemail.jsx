import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { verifyEmailToken } from '../Redux/Auth';
import { useDispatch } from 'react-redux';

function VerifyEmailCode() {
  const [code, setCode] = useState('');
  const { state } = useLocation();
  const email = state?.email;
  const navigate = useNavigate();
  const dispatch = useDispatch();

   const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(verifyEmailToken({ email, code }));
      if (!response.error) {
        toast.success("Email verified successfully!");
        navigate('/');
      }
    } catch (error) {
      toast.error(error.message || "Verification failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Verify Your Email</h1>
        <p className="mb-4">Enter the 6-digit code sent to {email}</p>
        
        <form onSubmit={handleVerify}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Verification Code</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              className="w-full border px-4 py-2 rounded"
              placeholder="Enter 6-digit code"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-black hover:text-white font-bold py-2 rounded transition duration-300"
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
}

export default VerifyEmailCode;