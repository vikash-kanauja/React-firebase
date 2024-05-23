import React, { useState } from "react";
import { useDispatch } from "react-redux";
import signupUser from "../redux/reducer/authReducer"

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        mobileNo: "",
        profilePhoto: null,
        email: "",
        password: "",
        confirmPassword: "",
    });

    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePhotoChange = (e) => {
        setFormData({ ...formData, profilePhoto: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await dispatch(signupUser(formData));
        console.log(res);
    };

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12 bg-teal-100">
            <div className="relative py-6 md:max-w-xl sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                </div>
                <div className="relative px-8 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-6">
                    <div className="max-w-md mx-auto">
                        <div>
                            <h1 className="text-2xl font-bold text-center">Register</h1>
                        </div>
                        <div className="divide-y divide-gray-200">
                            <div className="py-8 text-base leading-6 space-y-6 text-gray-700 sm:text-lg sm:leading-7">
                                <div className="relative">
                                    <input autoComplete="off" id="firstName" type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" />
                                    <label htmlFor="firstName" className="absolute left-0 -top-3.5 text-gray-400 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">First Name</label>
                                </div>
                                <div className="relative">
                                    <input autoComplete="off" id="LastName" type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" />
                                    <label htmlFor="LastName" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Last Name</label>
                                </div>
                                <div className="relative">
                                    <input autoComplete="off" id="mobileNo" type="text" name="mobileNo" placeholder="Mobile No." value={formData.mobileNo} onChange={handleChange} className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" />
                                    <label htmlFor="mobileNo" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">mobile No</label>
                                </div>
                                <div className="relative">
                                    <input type="file" name="profilePhoto" onChange={handlePhotoChange} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
                                </div>
                                <div className="relative">
                                    <input autoComplete="off" id="Email" type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" />
                                    <label htmlFor="Email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email</label>
                                </div>
                                <div className="relative">
                                    <input autoComplete="off" id="password" type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" />
                                    <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                                </div>
                                <div className="relative">
                                    <input autoComplete="off" id="confirmPassword" type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" />
                                    <label htmlFor="confirmPassword" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">confirmPassword</label>
                                </div>
                                <div className="relative text-center">
                                    <button className="bg-cyan-500 text-white rounded-md px-2 py-1" onClick={handleSubmit}>Submit</button>
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

export default RegisterPage;
