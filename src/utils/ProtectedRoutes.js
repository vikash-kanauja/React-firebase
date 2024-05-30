import React, { useEffect, useState } from "react";
import { useNavigate,Navigate } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { getUserData } from "../redux/reducer/authReducer";

const ProtectedRoutes = ({ Component, redirectTo, publicRoute }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const token = localStorage.getItem("accessToken") || null;
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        dispatch(getUserData(user.uid))
      } else {
        setIsAuthenticated(false);
      }
    });
    return () => unsubscribe();
  }, []);
  useEffect(()=>{
    if(token){
      if(!isAuthenticated){
        <Component />
      }else{
        navigate(redirectTo);
      }
    }
  },[])
  
    if (!publicRoute && !token && !isAuthenticated) {
      navigate('/');
    }
    if (publicRoute && token && isAuthenticated) {
      navigate(redirectTo);
    }
  return <Component />;
};
export default ProtectedRoutes;
