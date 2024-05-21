import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Forget() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:8080/forget-pass', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (res.ok) {
                console.log(data.message);

            } else {
                throw new Error(data.message || 'Failed to reset password');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className='flex justify-center items-center mt-10 mb-40'>
            <div className='w-full md:w-2/3 lg:w-1/2 xl:w-1/3 bg-gray-200 p-8 rounded-lg'>
                <h2 className='text-2xl font-bold mb-4'>Password Reset</h2>
                <p className='text-gray-600 mb-6'>Provide the email address associated with your account to recover your password.</p>
                <form className='space-y-4'>
                    <div className='flex flex-col'>
                        <label htmlFor="email">Email <span className='text-red-600'>*</span></label>
                        <input
                            type="email"
                            id="email"
                            className='border border-gray-300 p-2 rounded-md'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <button type="submit" className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600' onClick={handleSubmit}>Reset Password</button>
                </form>
                {error && <div className='text-red-600 mt-4'>{error}</div>}
                <div className='flex items-center mt-6'>
                    <div className='border-t border-gray-400 flex-1'></div>
                    <div className='mx-4 text-gray-500 font-bold'>or</div>
                    <div className='border-t border-gray-400 flex-1'></div>
                </div>
                <div className='flex justify-end items-end mt-6'>
                    <Link to="/login">
                        <button className='bg-gray-300 text-gray-800 py-2 px-8 rounded-md hover:bg-blue-800 hover:text-white'>Login</button>
                    </Link>
                </div>
            </div>
        </div>
    );

}

export default Forget;
