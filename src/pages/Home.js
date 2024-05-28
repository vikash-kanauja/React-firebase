import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../redux/reducer/userDataReducer";
import { onAuthStateChanged } from "firebase/auth";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userUid, setUserUid] = useState(null);
  const [userFilteredData, setUserFilteredData] = useState([]);

  const { items, loading, error } = useSelector((state) => state.data)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserUid(user.uid);
      } else {
        setUserUid(null);
      }
    });
  }, [dispatch]);

  useEffect(() => {
    if (userUid) {
      dispatch(fetchData());
    }
  }, [dispatch, userUid]);


  useEffect(() => {
    if (loading === true) {
      setUserFilteredData([]);
    } else if (loading === false) {
      setUserFilteredData(items.filter((item) => item.uid === userUid));
    }
  }, [items, loading, userUid]);

  const handleLogout = async () => {
    try {
      signOut(auth);
      navigate("/")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <nav>
        <h1 className="text-center m-8 font-bold">Welcome Home</h1>
      </nav>
      <div className="flex flex-col justify-center m-12 items-center">
      <div className="bg-gray-300 p-8 flex justify-center rounded-md lg:w-1/2">
        {loading ? (
          <div className="flex items-center px-4 py-1">
            <div className="relative w-5 h-5">
              <div className="w-full h-full rounded-full absolute "></div>
              <div className="w-full h-full rounded-full animate-spin absolute border-4 border-solid border-black border-t-transparent"></div>
            </div>
          </div>
        ) : (
          <div>
            {userFilteredData.map((item) => (
              <div key={item.id}>
                <div className="flex flex-col justify-center items-center"><p>user profile Photo :</p><img className="w-12 h-12 text-center" src={item.profilePhoto} /></div>
                <p>User Name : {item.firstName} {item.lastName}</p>
                <p>Email : {item.email}</p>
              </div>
            ))}
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
