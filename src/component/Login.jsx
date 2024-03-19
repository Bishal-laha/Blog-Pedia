import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import authServiceObj from "../appwrite/auth"
import { login } from "../store/authSlice"
import { Input, Button } from "./Index"


const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState("");
    const { register, handleSubmit } = useForm();

    const loginUser = async (data) => {
        setError("");
        try {
            const session = await authServiceObj.login(data);
            if (session) {
                const userData = await authServiceObj.getUser();
                if (userData) {
                    dispatch(login(userData));
                    navigate("/");
                } else
                    setError(session);
            }
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className='flex justify-center items-center w-full'>
            <div className='relative mx-auto w-[90%] lg:w-full max-w-lg bg-gradient-to-tr from-cyan-900 to-zinc-700 rounded-xl py-10 px-3 lg:px-10 border border-black/10'>
                <h2 className='text-center text-white text-[1.2rem] mt-5 lg:mt-0  lg:text-2xl font-bold leading-tight uppercase'>
                    <span className='text-[1.8rem] lg:text-[2.5rem] absolute top-1 lg:top-9 left-1 lg:left-3 cursor-pointer' onClick={() => navigate("/")}>⬅️</span>Sign In To Your Account</h2>
                <p className='mt-2 text-center text-base text-gray-300'>
                    Don&apos;t have any account?&nbsp;
                    <Link to="/signup" className='font-sans text-primary transition-all duration-200 hover:duration-200 hover:text-white hover:underline hover:font-bold'>
                        Sign Up
                    </Link>
                </p>
                {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
                <form onSubmit={handleSubmit(loginUser)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input label="Enter Your Email: " type="email" {...register("email", {
                            required: true,
                            validate: {
                                matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Email Address must be a valid address"
                            }
                        })} className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />

                        <Input label="Enter Your Password" type="password" {...register("password", {
                            required: true,
                            minLength: {
                                value: 8,
                                message: "Min Length must be of 8 Characters"
                            },
                            validate: {
                                matchPattern: (value) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(value) ||
                                    "Password is not correct"
                            }
                        })} className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />

                        <Button type='submit' className='w-full'>Sign In</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
