import React, { useEffect, useState } from 'react';
import { FaCartPlus } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`http://localhost:8080/find-products/${id}`);
                const data = await res.json();
                setProduct(data);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch product.');
            }
        };
        fetchData();
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    const handleSize = (size) => {
        setSelectedSize(size);
    };

    const handleAddToCart = () => {
        if (!selectedSize) {
            setError('Please select a size.');
            return;
        }

        const existingCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');

        const existingCartItem = existingCartItems.find(
            item => item.productId === id && item.selectedSize === selectedSize.toString()
        );

        if (existingCartItem) {
            existingCartItem.quantity += 1;
        } else {
            existingCartItems.push({
                productId: id,
                selectedSize: selectedSize.toString(),
                quantity: 1,
            });
        }

        localStorage.setItem('cartItems', JSON.stringify(existingCartItems));

        toast.success('Product added to cart successfully!', {
            position: 'bottom-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    let totalPrice = product.price * 1;

    return (
        <div className="container mx-auto p-6 min-h-screen flex justify-center items-center bg-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-white rounded-lg shadow-lg">
                <div className="flex justify-center items-center">
                    <img
                        src={product.imgUrl}
                        alt="Product"
                        className="rounded-lg h-80"
                    />
                </div>

                <div className="flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-4">{product.pname}</h1>
                        <p className="text-lg text-gray-600 mb-6">{product.description}</p>
                        <div className="mb-6">
                            <h2 className="text-base font-medium mb-2">Sizes:</h2>
                            <div className="flex space-x-4">
                                {[4, 5, 6, 7, 8, 9, 10].map((size) => (
                                    <div
                                        key={size}
                                        onClick={() => handleSize(size)}
                                        className={`flex items-center justify-center cursor-pointer border rounded-full p-2 ${selectedSize === size ? 'bg-black text-white border-black' : 'border-gray-300'}`}
                                    >
                                        {size}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <p className="text-2xl font-semibold mb-4">${totalPrice.toFixed(2)}</p>
                    </div>
                    <div className='flex justify-center items-center py-3 bg-black text-white rounded-lg hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'>
                        <FaCartPlus className="text-2xl mr-2" />
                        <button className="cursor-pointer" onClick={handleAddToCart}>
                            Add to Cart
                        </button>
                    </div>
                    <div className='text-red-700 font-bold text-center'>
                        {error}
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
