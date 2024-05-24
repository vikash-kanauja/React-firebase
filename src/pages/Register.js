import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser, storeUserData } from "../redux/reducer/authReducer"
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNo: "",
    profilePhoto: null,
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector(state => state.auth)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    setFormData({
      ...formData, profilePhoto: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(signupUser({ email: formData.email, password: formData.password }));
    const userId = res.payload.uid
    if (userId) {
      await dispatch(storeUserData({ userId, formData }))
    }
    navigate("/home");
  };
  return (
    <div className="min-h-screen bg-gray-200 py-6 flex flex-col justify-center items-center sm:py-12">
      <div className="relative py-1 sm:mx-auto sm:w-6/12 md:w-[50%] lg:w-[40%] xl:w-[30%] 2xl:w-[25%]">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-md"></div>
        <div className="relative px-8 py-10 2xl:px-8 2xl:py-12 bg-white shadow-lg sm:rounded-md sm:p-6">
          <div className="max-w-md mx-auto">
          <div className="flex justify-center">
              {formData.profilePhoto ? (
                <img className="w-16 h-16 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24  rounded-full border-2 border-sky-300" src={URL.createObjectURL(formData.profilePhoto)} alt="Profile Preview" />
              ):<FaUserCircle className="w-16 h-16 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24  rounded-full border-2 border-sky-300"/>}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-center">Register</h1>
            </div>
            
            <div className="divide-y divide-gray-200">
              <div className="py-4 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative mt-0">
                  <input
                    autoComplete="off"
                    id="firstName"
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-green-600"
                  />
                  <label
                    htmlFor="firstName"
                    className="absolute left-0 -top-3.5 text-gray-500 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-[12px]"
                  >
                    First Name
                  </label>
                </div>
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="LastName"
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-green-600"
                  />
                  <label
                    htmlFor="LastName"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Last Name
                  </label>
                </div>
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="mobileNo"
                    type="text"
                    name="mobileNo"
                    placeholder="Mobile No."
                    value={formData.mobileNo}
                    onChange={handleChange}
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-green-600"
                  />
                  <label
                    htmlFor="mobileNo"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Mobile No
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="file"
                    name="profilePhoto"
                    onChange={handlePhotoChange}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  />

                </div>
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="Email"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-green-600"
                  />
                  <label
                    htmlFor="Email"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Email
                  </label>
                </div>
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-green-600"
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Password
                  </label>
                </div>
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-green-600"
                  />
                  <label
                    htmlFor="confirmPassword"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Confirm Password
                  </label>
                </div>
                <div className="relative text-center">
                  <button
                    className=" bg-cyan-500 text-white rounded-md px-4 py-1 "
                    onClick={handleSubmit}
                  >
                    {loading ? (
                      <div className="flex items-center px-4 py-1">
                        <div className="relative w-5 h-5">
                          <div className="w-full h-full rounded-full absolute "></div>
                          <div className="w-full h-full rounded-full animate-spin absolute border-4 border-solid border-black border-t-transparent"></div>
                        </div>
                      </div>
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <button className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
              <span>Continue with Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
