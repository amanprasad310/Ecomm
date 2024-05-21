import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Signup() {

    const navigate = useNavigate();
    const [user, setUser] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        cpass: ""
    });

    const [Error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user.firstname || !user.lastname || !user.email || !user.password || !user.cpass) {
            setError('Fill All the Blanks');
            return;
        }
        if (user.password !== user.cpass) {
            setError('Password not matching');
            return;
        }
        if (user.password.length !== 6) {
            setError('Pass should be length of six');
            return;
        }
        try {
            const response = await fetch('http://localhost:8080/register', {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Failed to sign up');
            }
            const data = await response.json();
            console.log(data);
            toast.success('Sign up successfully!', {
                position: 'bottom-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (err) {
            setError(err.message)
            console.log(err)
        }
    };

    return (
        <div className='rounded-xl bg-gray-900 shadow-md shadow-slate-300 px-8 pt-6 pb-8 sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/3 mx-auto mt-2 mb-4'>
            <form onSubmit={handleSubmit}>
                <div>
                    <h2 className='text-4xl dark:text-white font-bold text-center mb-10'>Welcome !</h2>
                </div>
                <div className='mb-4 flex justify-between'>
                    <div className='w-full sm:w-1/2 mb-2 sm:mr-2'>
                        <label className='block text-gray-400 text-sm font-bold mb-2' htmlFor='firstName'>
                            First Name
                        </label>
                        <input
                            className='rounded-lg text-gray-300 w-full bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
                            id='firstName'
                            type='text'
                            name='firstname'
                            value={user.firstname}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='w-full sm:w-1/2 mb-2 sm:ml-2'>
                        <label className='block text-gray-400 text-sm font-bold mb-2' htmlFor='lastName'>
                            Last Name
                        </label>
                        <input
                            className='rounded-lg w-full text-gray-300 bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
                            id='lastName'
                            type='text'
                            name='lastname'
                            value={user.lastname}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-400 text-sm font-bold mb-2' htmlFor='email'>
                        Email
                    </label>
                    <input
                        className='rounded-lg w-full bg-gray-700 text-gray-300 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
                        id='email'
                        type='email'
                        name='email'
                        value={user.email}
                        onChange={handleChange}
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-400 text-sm font-bold mb-2' htmlFor='password'>
                        Password
                    </label>
                    <input
                        className='rounded-lg w-full bg-gray-700 text-gray-300 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
                        id='password'
                        type="password"
                        name='password'
                        value={user.password}
                        onChange={handleChange}
                    />

                </div>
                <div className='mb-10'>
                    <label className='block text-gray-400 text-sm font-bold mb-2' htmlFor='confirmPassword'>
                        Confirm Password
                    </label>
                    <input
                        className='rounded-lg w-full bg-gray-700 text-gray-300 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
                        id='confirmPassword'
                        type='password'
                        name='cpass'
                        value={user.cpass}
                        onChange={handleChange}
                    />
                </div>
                <div className=' text-red-500 items-center justify-center text-center mb-4'>
                    {Error}
                </div>
                <div className='flex items-center justify-center'>
                    <button className='w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='submit'>
                        Create Account
                    </button>
                </div>
            </form >
            <div className='flex items-center mt-4'>
                <div className='border-t border-gray-400 flex-1'></div>
                <div className='mx-4 text-gray-500 font-bold'>or</div>
                <div className='border-t border-gray-400 flex-1'></div>
            </div>
            <div className='flex justify-center items-center pt-4'>
                <span className='text-white'>
                    Already have an account? <Link to="/login" className='text-blue-500 hover:underline'>Login</Link>
                </span>
            </div>
            <ToastContainer />
        </div >
    );
}

export default Signup;
