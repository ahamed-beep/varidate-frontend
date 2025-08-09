import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { autoLogin, logoutUser } from "../components/Redux/Auth";
import axiosinstance from "../Connection/Api";

const ProtectedRoute = ({ children, adminOnly = false, userOnly = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [checkingAuth, setCheckingAuth] = useState(true);

  const { isAuthenticated, user, loading } = useSelector(state => state.auth);
  const token = localStorage.getItem("token");
  const storedRole = localStorage.getItem("userRole");
  const storedHasAccess = localStorage.getItem("hasAccess");

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      try {
        if (!token) throw new Error("No token found");

        // Verify token with backend
        const response = await axiosinstance.get("/verify-token", {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.data?.user?.hasAccess === false) {
          toast.error("Your account has been blocked");
          await dispatch(logoutUser());
          navigate("/blocked");
          return;
        }

        if (!isAuthenticated && response.data.valid) {
          await dispatch(autoLogin());
        }

        const currentRole = user?.role || storedRole;
        if (adminOnly && currentRole !== "admin") {
          navigate("/unauthorized");
          return;
        }
        if (userOnly && currentRole !== "user") {
          navigate("/unauthorized");
          return;
        }

      } catch (error) {
        if (isMounted) {
          await dispatch(logoutUser());
          if (location.pathname !== "/log") {
            navigate("/log", { state: { from: location } });
          }
        }
      } finally {
        if (isMounted) setCheckingAuth(false);
      }
    };

    checkAuth();
    return () => { isMounted = false; };
  }, [isAuthenticated, token, user, storedRole, storedHasAccess, location, dispatch, navigate]);

  if (checkingAuth || loading) return <div>Loading...</div>;
  if (!isAuthenticated) return null;

  const currentRole = user?.role || storedRole;
  if (adminOnly && currentRole !== "admin") return null;
  if (userOnly && currentRole !== "user") return null;
  if (user?.hasAccess === false || storedHasAccess === "false") return null;

  return children;
};

export default ProtectedRoute;
