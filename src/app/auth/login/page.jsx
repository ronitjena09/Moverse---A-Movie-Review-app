// auth/login/SignIn.jsx
"use client";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from "axios"; 

const Signin = () => {
    const router = useRouter();
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [viewPassword, setViewPassword] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        const signinData = { email, password };

        try {
            const response = await axios.post('/api/signin', signinData);

            if (response.status === 200) {
                console.log("Sign-in successful:", response.data);
                // Store user info in localStorage
                localStorage.setItem("user", JSON.stringify(response.data.user));
                // Redirect to home or another page
                router.push("/src/pages/index.js");
            } else {
                console.error("Sign-in error:", response.data);
                alert(response.data.error || 'An error occurred during sign-in');
            }
        } catch (error) {
            console.error("An error occurred:", error);
            alert(error.message || 'An error occurred during sign-in');
        }
    };

    const handleView = () => {
        setViewPassword(!viewPassword);
    };

    return (
        <>
            <div className="video_info_header">
                <div className="home_heading2">Sign In</div>
            </div>
            <div className="flex justify-center items-center h-screen">
                <div className='bg-white shadow-lg rounded-lg p-8 w-96'>
                    <div className="text-center text-2xl font-bold mb-4">Sign In to Your Account</div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="email" className="text-lg">Email:</label>
                            <input type="email" id="email" ref={emailRef} className='border rounded-lg px-4 py-2 outline-none' required />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="password" className="text-lg">Password:</label>
                            <div className="relative">
                                <input type={viewPassword ? 'text' : 'password'} id="password" ref={passwordRef} className='border rounded-lg px-4 py-2 outline-none' required />
                                <span className="absolute right-4 top-3 cursor-pointer" onClick={handleView}>
                                    {viewPassword ? <RemoveRedEyeIcon sx={{ color: "#789ADE" }} /> : <VisibilityOffIcon sx={{ color: "#789ADE" }} />}
                                </span>
                            </div>
                        </div>
                        <button type="submit" className='bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300'>
                            Sign In
                        </button>
                        <div className="text-sm text-center">
                            Don&apos;t have an account? <a href="/auth/signup" className="text-blue-500 hover:underline">Sign up</a>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signin;
