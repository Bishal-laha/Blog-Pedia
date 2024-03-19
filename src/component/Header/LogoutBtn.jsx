import React from 'react'
import { useDispatch } from 'react-redux'
import authServiceObj from '../../appwrite/auth';
import { logout } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';

const LogoutBtn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logoutHandler = async () => {
        await authServiceObj.logout();
        dispatch(logout());
        navigate("/");
    }

    return (
        <button onClick={logoutHandler} className='px-3 lg:px-5 py-2 text-[1rem] lg:text-[1.2rem] font-medium  '>Logout</button>
    )
}

export default LogoutBtn
