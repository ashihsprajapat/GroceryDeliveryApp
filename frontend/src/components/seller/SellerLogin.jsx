
import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import toast, { LoaderIcon } from 'react-hot-toast';
//import axios from 'axios';

function SellerLogin() {
    const [loading, setLoading] = useState(false);
    const { navigate, isSeller, axios, setIsSeller } = useAppContext();
    const [state, setState] = React.useState("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        // setIsSeller(true);
        setLoading(true);
        try {


            const { data } = await axios.post("/api/seller/login", {
                email, password,
            })
            console.log(data)
            if (data.success) {
                setIsSeller(true);
                toast.success(data.message)
                navigate("/seller")
            } else {
                toast.error(data.message);
            }
            setLoading(false)

        } catch (err) {
            console.log(err.message)

        }
    }

    useEffect(() => {
        if (isSeller) {
            navigate("/seller")
        }
    }, [])
    return (
        <div className='mx-auto my-40'>
            <form onSubmit={(e) => onSubmitHandler(e)} className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white">
                <p className="text-2xl font-medium m-auto">
                    <span className="text-indigo-500">User</span> {state === "login" ? "Login" : "Sign Up"}
                </p>
                
                <div className="w-full ">
                    <p>Email</p>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" type="email" required />
                </div>
                <div className="w-full ">
                    <p>Password</p>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" type="password" required />
                </div>
                {state === "register" ? (
                    <p>
                        Already have account? <span onClick={() => setState("login")} className="text-indigo-500 cursor-pointer">click here</span>
                    </p>
                ) : (
                    <p>
                        Create an account? <span onClick={() => setState("register")} className="text-indigo-500 cursor-pointer">click here</span>
                    </p>
                )}
                <button disabled={loading} className={`bg-indigo-500 hover:bg-indigo-600 transition-all text-white w-full py-2 rounded-md h-10 cursor-pointer ${loading && ' items-center flex justify-center'} `}>
                    {loading && <LoaderIcon className='w-5 ' />}
                    {
                        loading ?
                            ""
                            : (
                                state === "register" ? "Create Account" : "Login"
                            )
                    }
                </button>
            </form>
        </div>
    )
}

export default SellerLogin
