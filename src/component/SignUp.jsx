import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import authServiceObj from '../appwrite/auth'
import { Input, Button, PassGen } from "./Index"
import { login } from '../store/authSlice';

const SignUp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState("");
    const { register, handleSubmit } = useForm();

    const createUser = async (data) => {
        setError("");
        try {
            const userDataToSent = await authServiceObj.signUp(data);
            if (userDataToSent) {
                const userData = await authServiceObj.getUser();
                if (userData) {
                    dispatch(login(userData));
                    navigate("/");
                } else
                    setError(userDataToSent);
            }
        } catch (error) {
            setError(error.message);
        }
    }


    return (
        <div className='flex flex-col lg:flex-row justify-center items-center gap-[3rem] lg:gap-[8rem] py-8'>
            <div className='relative w-[90%] lg:w-full max-w-lg bg-gradient-to-br from-cyan-900 to-zinc-700  rounded-xl px-3 py-7 lg:px-7 border border-black/10'>
                <h2 className='text-center text-white text-[1.2rem] mt-6 lg:mt-0  lg:text-2xl font-bold leading-tight uppercase'><span className='text-[1.8rem] lg:text-[2.5rem] absolute top-1 lg:top-7 left-1 lg:left-3 cursor-pointer' onClick={() => navigate("/")}>⬅️</span>Sign Up To Your Account</h2>
                <p className='mt-2 text-center text-base text-gray-300'>
                    Already have an account?&nbsp;
                    <Link to="/login" className='font-sans text-primary transition-all duration-200 hover:duration-200 hover:text-white hover:underline hover:font-bold'>
                        Sign In
                    </Link>
                </p>
                {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
                <form onSubmit={handleSubmit(createUser)} className='mt-8'>
                    <div className='space-y-5'>

                        <Input label="Enter Your Name" {...register("name", {
                            required: true
                        })} className="block w-full rounded-md border-0 px-3 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />

                        <Input label="Enter Your Email: " type="email" {...register("email", {
                            required: true,
                            validate: {
                                matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Email Address must be a valid address"
                            }
                        })} className="block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />

                        <Input label="Enter Your Password" type="password" {...register("password", {
                            required: true,
                            minLength: {
                                value: 8,
                                message: "Min Length must be of 8 Characters"
                            },
                            maxLength: {
                                value: 16,
                                message: "Max Length must be of 16 Characters"
                            },
                            validate: {
                                matchPattern: (value) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,16}$/.test(value) ||
                                    "Password is not correct"
                            }
                        })} className="block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />

                        <Button type='submit' className='w-full'>Create Account</Button>
                    </div>
                </form>

            </div>
            <div>
                <PassGen />
            </div>
        </div>
    )
}

export default SignUp
