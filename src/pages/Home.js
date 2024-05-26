import React from 'react';
import { signOut } from "firebase/auth";
import { auth } from '../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      signOut(auth)
      navigate("/");
    }
    catch (error) {
    }
  }
  return (
    <nav>
      <p>
        Welcome Home
      </p>
      <div>
        <button onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Home;