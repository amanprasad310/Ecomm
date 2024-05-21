import React, { useState } from 'react';
import { IoLogoGoogleplus } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../../components/Oauth/OAuth';


function Login() {
    const [Error, setError] = useState()
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            setError('Fill all fields');
            return;
        }
        if (formData.password.length !== 6) {
            setError('Password must be length of 6')
            return;
        }

        try {
            const res = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            localStorage.setItem('myData', JSON.stringify(data.user));
            // console.log(data);

            if (data.message === 'Login successful') {
                navigate('/');
            } else {
                setError('Invalid credentials');
            }
        } catch (error) {
            setError(error.message);
        }
    }


    return (
        <div className='mb-10 justify-center items-center mt-2 overflow-hidden'>
            <div className='flex flex-col justify-center'>
                <form className='max-w-[400px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8' onSubmit={handleSubmit}>
                    <h2 className='text-4xl dark:text-white font-bold text-center mb-10'>Welcome!</h2>
                    <div className='flex flex-col text-gray-400 py-2'>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
                            type="text"
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex flex-col text-gray-400 py-2'>
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            className='p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
                            type="password"
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex justify-between text-gray-400 py-2'>
                        <label>
                            <input className='mr-2' type="checkbox" />
                            Remember Me
                        </label>
                        <Link to="/forget">Forgot Password</Link>
                    </div>
                    <div className=' text-red-500 items-center justify-center text-center mb-4'>
                        {Error}
                    </div>
                    <button
                        className='w-full my-5 py-2 bg-blue-500 shadow-lg hover:shadow-blue-500/40 text-white font-semibold rounded-lg'
                        type="submit"
                    >
                        Login
                    </button>
                    <div className='flex items-center mt-4 mb-6'>
                        <div className='border-t border-gray-400 flex-1'></div>
                        <div className='mx-4 text-gray-500 font-bold'>or</div>
                        <div className='border-t border-gray-400 flex-1'></div>
                    </div>
                    <div className='flex items-center justify-center w-full py-2 bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
                        <IoLogoGoogleplus className='mr-2 text-2xl text-white ' />
                        <div className="flex">
                            <OAuth />
                        </div>
                    </div>
                    <div className='flex justify-center items-center pt-4 '>
                        <span className='text-white'>
                            Don't have an account? <Link to="/signup" className='text-blue-500 hover:underline'>Register here</Link>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
