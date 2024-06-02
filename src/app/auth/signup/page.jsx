"use client";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from "axios"; // Import Axios

const Signup = () => {
    const router = useRouter();
    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const [viewPassword, setViewPassword] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const firstName = firstNameRef.current.value;
        const lastName = lastNameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        if (password.length < 8) {
            alert("Passwords must be at least 8 characters!");
            return;
        }

        const signupData = { firstName, lastName, email, password };

        try {
            const response = await axios.post('/api/signup', signupData); // Use Axios instead of fetch
            console.log("Signup Data:", signupData);

            if (response.status === 201) {
                console.log("Signup successful:", response.data);
                router.push("/login");
            } else {
                console.error("Signup error:", response.data);
                alert(response.data.error || 'An error occurred during signup');
            }
        } catch (error) {
            console.error("An error occurred:", error);
            alert(error.message || 'An error occurred during signup');
        }
    };

    const handleView = () => {
        setViewPassword(!viewPassword);
    };

    return (
        <>
            <div className="video_info_header">
                <div className="home_heading2">Create Account</div>
            </div>
            <div className="flex justify-center items-center h-screen">
                <div className='bg-white shadow-lg rounded-lg p-8 w-96'>
                    <div className="text-center text-2xl font-bold mb-4">Create Your Account</div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="firstName" className="text-lg">First Name:</label>
                            <input type="text" id="firstName" ref={firstNameRef} className='border rounded-lg px-4 py-2 outline-none' required />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="lastName" className="text-lg">Last Name:</label>
                            <input type="text" id="lastName" ref={lastNameRef} className='border rounded-lg px-4 py-2 outline-none' required />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="email" className="text-lg">Email:</label>
                            <input type="email" id="email" ref={emailRef} className='border rounded-lg px-4 py-2 outline-none' required />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="password" className="text-lg">Password:</label>
                            <div className="relative">
                                <input type={viewPassword ? 'text' : 'password'} placeholder="at least 8 characters" id="password" ref={passwordRef} className='border rounded-lg px-4 py-2 outline-none' required />
                                <span className="absolute right-4 top-3 cursor-pointer" onClick={handleView}>
                                    {viewPassword ? <RemoveRedEyeIcon sx={{ color: "#789ADE" }} /> : <VisibilityOffIcon sx={{ color: "#789ADE" }} />}
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="confirmPassword" className="text-lg">Confirm Password:</label>
                            <input type="password" id="confirmPassword" ref={confirmPasswordRef} className='border rounded-lg px-4 py-2 outline-none' required />
                        </div>
                        <button type="submit" className='bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300'>
                            Create your account
                        </button>
                        <div className="text-sm text-center">
                            Already have an account? <a href="/login" className="text-blue-500 hover:underline">Sign in</a>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup;
