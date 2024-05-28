import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { fetchData } from "../redux/reducer/userDataReducer";

const ProtectedRoutes = ({ Component, redirectTo, publicRoute }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        dispatch(fetchData(user.uid))
      } else {
        setIsAuthenticated(false);
      }
    });
    return () => unsubscribe();
  }, []);

    if (!publicRoute && !isAuthenticated) {
      navigate('/');
    }
    if (publicRoute && isAuthenticated) {
      navigate(redirectTo);
    }

  return <Component />;
};

export default ProtectedRoutes;