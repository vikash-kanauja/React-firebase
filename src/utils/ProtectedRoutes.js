import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../redux/reducer/authReducer";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";

const ProtectedRoutes = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(getUserData(user.uid));
      }
    });
    return () => unsubscribe();
  }, []);
  return localStorage.getItem('accessToken') ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes