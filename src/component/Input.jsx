import React, { useId } from 'react'

const Input = React.forwardRef(
    ({
        label,
        type = "text",
        placeHolder = "Enter Your Value",
        className = "",
        ...props
    }, ref) => {
        const id = useId();

        return (
            <div className='w-full'>
                {label && <label className='inline-block text-[1rem] font-semibold leading-6  dark:text-white mb-1 pl-1' htmlFor={id}>{label}</label>}

                <input type={type} placeholder={placeHolder} className={`${className}`} {...props} id={id} ref={ref} />
            </div>
        )
    }
)


export default Input
