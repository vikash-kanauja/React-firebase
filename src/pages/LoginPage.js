import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { validateForm } from "../utils/formValidation";
import { loginUser } from '../redux/reducer/authReducer';
const LoginPage = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const { loading ,user } = useSelector((state) => state.auth);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: null });
    }
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm(formData,false);
        const isValid = Object.values(validationErrors).every(
            (error) => error === null
        );

        if (isValid) {
            const response = await dispatch(
                loginUser({ email: formData.email, password: formData.password })
            );
            if (
                response.payload?.message === "Firebase: Error (auth/invalid-credential)." ||
                response.payload?.message === "Firebase: Error (auth/invalid-email)."
            ) {
                setErrors({ ...errors, password: "Email or Password is incorrect" });
                return;
            }
            const userId = response.payload.uid;
            if (userId) {
                navigate("/home");
            }

        } else {
            setErrors(validationErrors);
        }
    };
    return (
        <div className="min-h-screen bg-gray-200 py-6 flex flex-col justify-center items-center sm:py-12">
            <div className="relative py-4 sm:mx-auto sm:w-6/12 md:w-[50%] lg:w-[40%] xl:w-[30%] 2xl:w-[25%]">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-md"></div>
                <div className="relative p-10 md:p-12 2xl:px-8 2xl:py-12 bg-white shadow-lg sm:rounded-md sm:p-6">
                    <div className="max-w-md mx-auto">
                        <div className="flex justify-center">
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-center">Login</h1>
                        </div>
                        <div className="divide-y divide-gray-200">
                            <div className="py-6 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <div className="relative">
                                    <input
                                        autoComplete="off"
                                        id="Email"
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-sky-400 "
                                    />
                                    <label
                                        htmlFor="Email"
                                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                    >
                                        Email
                                    </label>
                                    {errors.email && (
                                        <span className="text-red-400 text-sm">{errors.email}</span>
                                    )}
                                </div>
                                <div className="relative">
                                    <input
                                        autoComplete="off"
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-sky-400"
                                    />
                                    <label
                                        htmlFor="password"
                                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                    >
                                        Password
                                    </label>
                                    <div className="absolute right-2 top-[30%] z-10">
                                        <button
                                            type="button"
                                            className=" right-0 top-[50%]"
                                            onClick={() =>
                                                setShowPassword(
                                                    !showPassword
                                                )
                                            }
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                </div>
                                {errors.password && (
                                    <span className="text-red-400 text-sm leading-[8px] ">
                                        {errors.password}
                                    </span>
                                )}
                                <div className="relative text-center pt-4">
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
                                            "Login"
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className="text-base text-center font-semibold">Don't have an account? <Link className="text-blue-600" to="/signup">Register</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;
