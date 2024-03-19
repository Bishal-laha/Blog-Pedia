import React from 'react'
import { useId } from 'react'

function Select({ options, label, className, ...props }, ref) {
    const id = useId();


    return (
        <div className='w-full'>
            {label && <label htmlFor={id} className='inline-block text-[1rem] font-semibold leading-6  dark:text-white mb-1 pl-1'>{label}</label>}
            <select {...props} id={id} ref={ref} className={`px-3 py-2 rounded-lg bg-white text-black outline-none
             focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}>
                {options?.map((item) => (<option key={item} value={item}>{item}</option>))}
            </select>
        </div>
    )
}

export default React.forwardRef(Select)
