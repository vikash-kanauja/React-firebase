
import React, { useEffect, useState } from "react";
import { useNavigate,Navigate } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { getUserData } from "../redux/reducer/userDataReducer";

const ProtectedRoutes = ({ Component, redirectTo, publicRoute }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        dispatch(getUserData(user.uid))
      } else {
        setIsAuthenticated(false);
        navigate('/')
      }
    });
    return () => unsubscribe();
  }, []);
    console.log(publicRoute);
    if (!publicRoute && !isAuthenticated) {
      navigate('/');
    }
    if (publicRoute && isAuthenticated) {
      navigate(redirectTo);
    }

  return <Component />;
};

export default ProtectedRoutes;