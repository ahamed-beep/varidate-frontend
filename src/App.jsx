import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Form from "./components/Form";
import Newaccount from "./components/Newaccount";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; 

import VerifyEmailCode from "./components/Verifyemail";
import Userdashboard from "./components/UserDashboard";
import ProtectedRoute from "./Protection/Protectroute";
import ForgotPassword from "./components/ForgetPassword";
import SuccessMessage from "./components/SubmissionSuccess";
import ProfileValidatorApp from "./components/Userprofiledetail";
import PromptForm from "./prompt/DeepFrom";
import { autoLogin } from "./components/Redux/Auth";
import { useDispatch, useSelector } from "react-redux";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminProfilesList from "./components/Admin/AdminProfilelist";
import AdminProfileDetail from "./components/Admin/AdminProfileDetail";
import LockedAccount from "./components/Admin/LockedAccount";



function App() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector(state => state.auth);
  

  useEffect(() => {
    // Try auto-login on app load
    if (localStorage.getItem('token') && !isAuthenticated) {
      dispatch(autoLogin());
    }
  }, [dispatch, isAuthenticated]);

    useEffect(() => {
    if (isAuthenticated) {
      const currentRole = user?.role || localStorage.getItem('userRole');
      if (currentRole === 'admin' && window.location.pathname === '/') {
        navigate('/admin-dashboard');
      }
    }
  }, [isAuthenticated, user]);
  return (
    <div>
      <ToastContainer
  position="top-center"
  autoClose={1000}
  closeOnClick
  draggable
  pauseOnHover
  pauseOnFocusLoss={false}
  theme="light"
  toastClassName="bg-white text-black border border-gray-300 rounded shadow-md p-4"
  bodyClassName="text-sm"
  progressClassName="bg-blue-500"
/>

      <Routes>
        <Route path="/log" element={<Form />} />
        <Route path="/create" element={<Newaccount />} />

        
   
<Route path="/profile/:id" element={<ProfileValidatorApp/>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/prompt" element={<PromptForm />} />



       <Route
          path="/"
          element={
            <ProtectedRoute>
              <Userdashboard />
            </ProtectedRoute>
          }
        />
 <Route
          path="/success"
          element={
            <ProtectedRoute>
              <SuccessMessage />
            </ProtectedRoute>
          }
        />
 <Route path="/admin-dashboard" element={
          <ProtectedRoute adminOnly>
            <AdminDashboard />
          </ProtectedRoute>
        } />
         <Route path="/admin/profiles" element={
          <ProtectedRoute >
            <AdminProfilesList />
          </ProtectedRoute>
        } />
         <Route path="/admin/profiles/:id" element={
          <ProtectedRoute >
            <AdminProfileDetail />
          </ProtectedRoute>
        } />

    
 
<Route path="/locked" element={<LockedAccount />} />
        <Route path="/verify-email" element={<VerifyEmailCode />} /> {/* Add this line */}
       
      

        
        
      


      </Routes>
    </div>
  );
}

export default App;