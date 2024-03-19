import React from 'react'

const Button = ({
    children,
    type = "button",
    bgColor = "bg-blue-800",
    textColor = "text-white",
    className = "",
    ...props
}) => {
    return (
        <button className={`px-4 py-2 rounded-lg duration-200 hover:duration-200 hover:bg-blue-700 ${bgColor} ${textColor} ${className}`} {...props}>
            {children}
        </button>
    )
}

export default Button
