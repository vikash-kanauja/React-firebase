import React from 'react';
import { signOut } from "firebase/auth";
import { auth } from '../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
 
  auth.onAuthStateChanged(user => {  if(user) {
    console.log(user.uid);    console.log(user.email)  }
})

  const handleLogout = async () => {
    try {
      signOut(auth)
      navigate("/login");
    }
    catch (error) {
    }
  }
  return (
    
    
      <nav>
        <p className='text-center'>
          Welcome Home
        </p>
        <div className='text-center '>
          <button className='p-1 bg-sky-400 rounded-sm' onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
  )
}

export default Home;