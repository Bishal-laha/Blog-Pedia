import { useState, useEffect, useCallback, useRef } from 'react'

function PassGen() {
    const [password, setPassword] = useState("");
    const [length, setLength] = useState(8);
    const [numberAllowed, setNumberAllowed] = useState(true);
    const [charAllowed, setCharAllowed] = useState(false);
    const inputRef = useRef(null);

    const passGenerator = useCallback(() => {
        let pass = "";
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        for (let i = 1; i <= length; i++) {
            if (numberAllowed) str += "0123456789";
            if (charAllowed) str += "@_&";
            const val = Math.floor(Math.random() * str.length + 1);
            pass += str.charAt(val);
        }
        setPassword(pass);
    }, [length, charAllowed, numberAllowed, setPassword])

    const handleCopy = () => {
        inputRef.current?.select();
        window.navigator.clipboard.writeText(password);
    }

    useEffect(() => { passGenerator() }, [length, numberAllowed, charAllowed, setPassword]);
    return (
        <div className='text-white w-full p-3 rounded-lg bg-gradient-to-br from-cyan-900 to-zinc-700 '>
            <h1 className='text-center text-gray-200 text-[1.2rem] mt-5 lg:mt-0  lg:text-2xl font-bold leading-tight mb-8'>PASSWORD GENERATOR</h1>
            <div>
                <label className='inline-block text-[1rem] font-semibold leading-6 dark:text-white mb-1 pl-1'>PASSWORD</label>
                <div className='flex gap-3 mt-1'>
                    <input type="text" value={password} ref={inputRef} readOnly={true} className="block w-[60%] rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    <button onClick={handleCopy} className='bg-white text-black px-3 py-1 rounded-lg font-medium duration-200 hover:bg-gray-300 hover:duration-200 hover:font-semibold'>Copy</button>
                </div>
            </div>
            <div className='mt-3'>
                <div className='flex flex-col gap-1'>
                    <label className='inline-block text-[1rem] font-semibold leading-6  dark:text-white mb-1 pl-1'>Length({length})</label>
                    <input type="range" min={8} max={16} value={length} onChange={(e) => { setLength(e.target.value) }} />

                </div>
                <div className='flex gap-8 mt-3'>
                    <div>
                        <input type="checkbox" defaultChecked={numberAllowed} onChange={() => { setNumberAllowed(!numberAllowed) }} />
                        <label className='ml-1'>Number</label>
                    </div>
                    <div>
                        <input type="checkbox" defaultChecked={charAllowed} onChange={() => { setCharAllowed(!charAllowed) }} />
                        <label className='ml-1'>Character</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PassGen
