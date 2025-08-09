// src/pages/Locked.js
import React from 'react';
import { Link } from 'react-router-dom';

const LockedAccount = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Account Locked</h1>
        <p className="text-gray-700 mb-6">
          Your account has been locked. Please contact support for assistance.
        </p>
        <Link
          to="/contact"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
};

export default LockedAccount;