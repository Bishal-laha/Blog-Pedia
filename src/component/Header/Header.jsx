import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { LogoutBtn, Logo } from "../Index"

const Header = () => {

    const loginState = useSelector((state) => state.auth.status);
    const navigate = useNavigate();

    const navItems = [
        {
            name: "Home",
            slug: "/",
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            active: !loginState
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !loginState
        },
        {
            name: "All Post",
            slug: "/all-posts",
            active: loginState
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: loginState
        },
    ]

    return (
        <header className='py-3 shadow bg-black'>
            <div className='flex flex-col lg:flex-row lg:justify-between'>
                <div><Logo /></div>
                <div className="flex flex-col lg:flex-row lg:space-x-14">
                    {navItems.map((item) => (
                        item.active ?
                            (<button
                                key={item.name}
                                onClick={() => navigate(item.slug)}
                                className={`text-white rounded-md px-3 lg:px-5 py-2 text-[1rem] lg:text-[1.2rem] font-medium hover:bg-gray-700`}>
                                {item.name}
                            </button>) : null
                    ))}
                    {
                        loginState && (
                            <li className={`text-white list-none text-center hover:bg-gray-700 hover:text-white rounded-md `}><LogoutBtn /></li>
                        )
                    }
                </div>
                <div className='ml-[70%] lg:ml-0'><Logo /></div>
            </div>
            <hr className='absolute h-[0.1rem] mt-3 rounded-[100%] w-full bg-white' />
        </header >
    )
}

export default Header
