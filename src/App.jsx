import React from "react";
import { Routes, Route } from "react-router-dom";
import Form from "./components/Form";
import Newaccount from "./components/Newaccount";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // ✅ Don't forget this
<<<<<<< HEAD
import AdminPanel from "./components/Adminpanel";
import ProtectedRoute from "./Protection/Protectroute";
import VerifyEmailCode from "./components/Verifyemail";
import Home from "./components/UserForm";
import Userdashboard from "./components/UserDashboard";
=======
import VerifyEmail from "./components/Verifyemail";
import AdminPanel from "./components/Adminpanel";
import ProtectedRoute from "./Protection/Protectroute";
import VerifyEmailCode from "./components/Verifyemail";
>>>>>>> 6f748bbeecb58b7b7edf5af465ee3e486cb20d11

function App() {
  return (
    <div>
      {/* ✅ ToastContainer should be outside Routes */}
      <ToastContainer />

      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/create" element={<Newaccount />} />
<<<<<<< HEAD
        <Route path="/admin" element={<Userdashboard />} />


    

        
        <Route path="/verify-email" element={<VerifyEmailCode />} /> {/* Add this line */}
       
      
=======
        
        <Route path="/verify-email" element={<VerifyEmailCode />} /> {/* Add this line */}
          <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminPanel />
          </ProtectedRoute>
        }
      />
>>>>>>> 6f748bbeecb58b7b7edf5af465ee3e486cb20d11

      </Routes>
    </div>
  );
}

export default App;