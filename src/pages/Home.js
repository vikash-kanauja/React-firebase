import React, { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user,loading } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      signOut(auth);
      localStorage.removeItem("accessToken");
      navigate("/");
    } catch (error) {
    }
  };

  return (
    <div>
      <nav>
        <h1 className="text-center m-8 font-bold">Welcome Home</h1>
      </nav>
      <div className="flex flex-col justify-center m-12 items-center">
        <div className="bg-gray-300 p-8 flex justify-center rounded-md lg:w-1/2">
          {!Object.keys(user).length || loading ? (
            <div className="flex items-center px-4 py-1">
              <div className="relative w-5 h-5">
                <div className="w-full h-full rounded-full absolute "></div>
                <div className="w-full h-full rounded-full animate-spin absolute border-4 border-solid border-black border-t-transparent"></div>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex flex-col justify-center items-center">
                <p>user profile Photo :</p>
                <img
                  className="w-12 h-12 text-center"
                  alt="profile"
                  src={user.profilePhoto}
                />
              </div>
              <p>
                User Name : {user?.firstName} {user?.lastName}
              </p>
              <p>Email : {user?.email}</p>
            </div>
          )}
        </div>
      </div>
      <div className="text-center m-4">
        <button className="px-4 py-2 bg-sky-400 rounded-md" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
