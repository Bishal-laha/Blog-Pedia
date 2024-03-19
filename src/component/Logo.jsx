import React from 'react'

function Logo() {
    return (
        <div>
            <img
                className="h-10 w-auto mx-8 my-1"
                src={import.meta.env.VITE_LOGO_URL}
                alt="Blog" />
        </div>
    )
}

export default Logo