import React, { useEffect } from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

const AuthLayout = ({ children, userProvideAuth = "true" }) => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector((state) => state.auth.status);

    useEffect(() => {
        if (userProvideAuth && authStatus !== userProvideAuth) {
            navigate("/login");
        } else if (!userProvideAuth && authStatus !== userProvideAuth) {
            navigate("/");
        }
        setLoader(false);
    }, [authStatus, userProvideAuth, navigate])



    return (
        loader ? <h1>hiiii</h1> : <>{children}</>
    )
}

export default AuthLayout
