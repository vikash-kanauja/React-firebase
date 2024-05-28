import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {auth} from "../firebase/firebaseConfig"
import { onAuthStateChanged } from "firebase/auth";

const ProtectedRoutes = ({ Component, redirectTo, publicRoute }) => {
  const navigate = useNavigate();
  const [isAuthenticated ,setIsAuthenticated] = useState(null)

  useEffect(() => {
    console.log("running use effet");
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(user)
        navigate(redirectTo);
      } else {
        setIsAuthenticated(null)
        navigate('/')
      }
    });
  }, []);

  useEffect(() => {
    if (!publicRoute && !isAuthenticated) {
      navigate('/');
    }
    if (publicRoute && isAuthenticated) {
      navigate(redirectTo);
    }
  }, [publicRoute, navigate, redirectTo]);
  return <Component />;
};

export default ProtectedRoutes;
