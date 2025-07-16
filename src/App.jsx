import React from "react";
import { Routes, Route } from "react-router-dom";
import Form from "./components/Form";
import Newaccount from "./components/Newaccount";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // ✅ Don't forget this
import VerifyEmail from "./components/Verifyemail";
import AdminPanel from "./components/Adminpanel";
import ProtectedRoute from "./Protection/Protectroute";
import VerifyEmailCode from "./components/Verifyemail";

function App() {
  return (
    <div>
      {/* ✅ ToastContainer should be outside Routes */}
      <ToastContainer />

      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/create" element={<Newaccount />} />
        
        <Route path="/verify-email" element={<VerifyEmailCode />} /> {/* Add this line */}
          <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminPanel />
          </ProtectedRoute>
        }
      />

      </Routes>
    </div>
  );
}

export default App;