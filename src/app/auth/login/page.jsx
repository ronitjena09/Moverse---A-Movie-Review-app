"use client"
import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Checkbox from '@mui/material/Checkbox';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Login = () => {
    const router = useRouter();
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const [viewPassword, setViewPassword] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        console.log("Username:", username);
        console.log("Password:", password);
        // Placeholder: Implement your login logic here
        if (username === "user" && password === "password") {
            localStorage.setItem("user", "loggedIn");
            router.push("/");
        } else {
            alert("Invalid credentials");
        }
    };

    const handleView = () => {
        setViewPassword(!viewPassword);
    };

    return (
        <>
            <div className="video_info_header">
                <div className="home_heading2">Login</div>
            </div>
            <div className="flex justify-center items-center h-screen">
                <div className='bg-white shadow-lg rounded-lg p-8 w-96'>
                    <div className="text-center text-2xl font-bold mb-4">WELCOME BACK!</div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="username" className="text-lg">Username:</label>
                            <input type="text" id="username" ref={usernameRef} className='border rounded-lg px-4 py-2 outline-none' required />
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
                        <div className="flex items-center justify-between">
                            <label htmlFor="remember" className="text-base flex items-center">
                                <Checkbox defaultChecked inputProps={{ 'aria-label': 'Remember Me' }} />
                                <span className="ml-2">Remember Me</span>
                            </label>
                            <a href="#" className="text-sm">Forgot Password?</a>
                        </div>
                        <button type="submit" className='bg-blue-500 w-full text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300'>
                            Sign in
                        </button>
                        <div className="text-sm text-center">
                            New to MovieVerse? <a href="/auth/signup" className="text-blue-500 hover:underline">Sign up</a>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;
