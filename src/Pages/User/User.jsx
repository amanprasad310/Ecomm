import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function User() {
    const [showOrder, setShowOrder] = useState(false);
    const [myOrder, setMyOrder] = useState([]);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        imgUrl: 'https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?size=626&ext=jpg&ga=GA1.1.557681814.1709935812&semt=sph'
    });
    const [error, setError] = useState('');

    useEffect(() => {
        const storedData = localStorage.getItem('myData');
        if (storedData) {
            const userData = JSON.parse(storedData);
            const userEmail = userData.email;

            const fetchData = async () => {
                try {
                    const res = await fetch(`http://localhost:8080/get-data/${userEmail}`);
                    const data = await res.json();
                    if (data.email) {
                        setFormData({
                            username: data.name,
                            email: data.email,
                            password: data.password,
                            imgUrl: formData.imgUrl,
                        });
                    } else {
                        setError('Failed to fetch user data');
                        toast.error('Failed to fetch user data');
                    }
                } catch (error) {
                    setError(error.message);
                    toast.error(error.message);
                }
            };

            fetchData();
        } else {
            setError('User data not found in localStorage');
            toast.error('User data not found in localStorage');
        }

        const orders = JSON.parse(localStorage.getItem('orders'));
        if (orders) {
            setMyOrder(orders);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:8080/update-data', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await res.json();
            if (res.ok) {
                toast.success("Profile updated successfully");
            } else {
                setError('Failed to update profile');
                toast.error('Failed to update profile');
            }
        } catch (error) {
            setError(error.message);
            toast.error(error.message);
        }
    };

    const handleSignOut = () => {
        localStorage.removeItem('myData');
        navigate('/login');
        toast.success('Signed out successfully');
    };

    const handleDeleteAccount = async () => {
        const data = localStorage.getItem('myData');
        if (data) {
            const userData = JSON.parse(data);
            const userEmail = userData.email;

            try {
                const res = await fetch(`http://localhost:8080/delete-data/${userEmail}`, {
                    method: 'DELETE'
                });

                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }

                const responseData = await res.json();

                if (responseData.message === 'Account deleted successfully') {
                    localStorage.removeItem('myData');
                    navigate('/');
                    toast.success('Account deleted successfully');
                } else {
                    setError('Failed to delete account');
                    toast.error('Failed to delete account');
                }

            } catch (err) {
                setError(err.message);
                toast.error(err.message);
            }
        }
    };

    const handleToggleOrder = () => {
        setShowOrder(!showOrder);
    };

    const handleDelete = (id) => {
        console.log(id);
        const orders = JSON.parse(localStorage.getItem('orders'));

        if (orders && Array.isArray(orders)) {
            const order = orders.find(order => order.productId === id);

            if (order) {
                if (window.confirm("Are you sure you want to cancel this order?")) {
                    const updatedOrders = orders.filter(order => order.productId !== id);
                    localStorage.setItem('orders', JSON.stringify(updatedOrders));
                    setMyOrder(updatedOrders);
                    toast.success(`Order with Product ID ${order.productId} has been cancelled.`);
                }
            } else {
                toast.error(`Order with ID ${id} not found.`);
            }
        } else {
            toast.error('No orders found .');
        }
    };

    return (
        <div className='p-3 max-w-lg mx-auto'>
            <ToastContainer />
            <div className="bg-white rounded-lg shadow-lg shadow-slate-500 p-6 ">
                <h1 className='text-3xl font-semibold text-center mb-7'>Profile</h1>

                <form className='flex flex-col gap-4' onSubmit={handleUpdate}>
                    <input type="file" hidden accept='image/*' />
                    <div className="flex items-center justify-center">
                        <img src={formData.imgUrl} alt="profile" className='rounded-full h-24 w-24 object-cover cursor-pointer' />
                    </div>
                    <input type="text" placeholder='username' value={formData.username} name='username' onChange={handleChange} className='border p-3 rounded-lg' />
                    <input type="email" placeholder='email' value={formData.email} name='email' onChange={handleChange} className='border p-3 rounded-lg' />
                    <input type="password" placeholder='password' value={formData.password} name='password' onChange={handleChange} className='border p-3 rounded-lg' />
                    <button type="submit" className='bg-slate-700 text-white rounded-lg p-3 uppercase cursor-pointer hover:opacity-95'>Update</button>
                </form>
            </div>
            <div className='text-red-800 text-center mt-5 font-bold'>
                {error}
            </div>
            <div className="flex justify-between mt-5">
                <span className='text-red-700 cursor-pointer' onClick={handleDeleteAccount}>Delete Account</span>
                <span className='text-red-700 cursor-pointer' onClick={handleSignOut}>Sign out</span>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                <div className="flex justify-between">
                    <h1 className='text-2xl font-semibold'>Your Order</h1>
                    <button className='text-green-700' onClick={handleToggleOrder}>{showOrder ? 'Hide Order' : 'Show Order'}</button>
                </div>
                {showOrder && (
                    <div className="bg-white rounded-lg  p-6 mt-6 w-full">

                        <div className="flex flex-col gap-4 mt-4 ">
                            {myOrder.length > 0 ? (
                                myOrder.map((order, index) => (
                                    <div key={index} className="bg-gray-100 rounded-lg p-4 mb-4 w-full ">
                                        <div className="flex flex-col md:flex-row">
                                            <img src={order.img} alt={order.productName} className="w-28 h-24 object-cover rounded-lg mr-4 mb-4 md:mb-0" />
                                            <div className="flex-grow">
                                                <p className="text-lg font-semibold mb-2">{order.productName}</p>
                                                <p className="text-gray-700"><span className="font-medium">Product ID:</span> {order.productId}</p>
                                                <p className="text-gray-700"><span className="font-medium">Price:</span> {order.price}</p>
                                                <p className="text-gray-700"><span className="font-medium">Quantity:</span> {order.quantity}</p>
                                                <p className="text-gray-700"><span className="font-medium">Size:</span> {order.size}</p>
                                                <p className="text-gray-700"><span className="font-medium">Address:</span> {order.address}</p>
                                                <p className="text-gray-700"><span className="font-medium">Payment Method:</span> {order.paymentMethod}</p>
                                            </div>
                                        </div>
                                        <div className="mt-4 flex flex-col space-y-2">
                                            <button
                                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
                                                onClick={() => handleDelete(order.productId)}
                                            >
                                                Cancel Order
                                            </button>
                                            <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-black transition duration-200"><Link to='/contact'> Help</Link></button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className=' text-red-600 text-center text-2xl'>No orders found</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div >
    );
}
