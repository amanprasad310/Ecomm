import React, { useEffect, useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
function Cart() {
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const [shoeSizes, setShoeSizes] = useState([]);

    // useEffect(() => {
    //     const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    //     if (cartItems && cartItems.length > 0) {
    //         const sizes = cartItems.map(item => item.selectedSize);
    //         setShoeSizes(sizes);
    //     }
    // }, []);

    const decreaseQuantity = (index) => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        } else {
            handleRemoveItem(index);
            setQuantity(0);
        }
    };


    const increaseQuantity = () => {
        if (quantity < 5) {
            setQuantity(prevQuantity => prevQuantity + 1);
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
                // console.log(cartItems, cartItems[0].selectedSize)
                if (cartItems.length > 0) {
                    const sizes = cartItems.map(item => item.selectedSize);
                    setShoeSizes(sizes);

                    const promises = cartItems.map(item =>
                        fetch(`http://localhost:8080/find-products/${item.productId}`)
                            .then(res => res.json())
                    );
                    const productsData = await Promise.all(promises);
                    setProduct(productsData);
                }
            } catch (err) {
                console.log(err);
                setError('Failed to fetch product.');
            }
        };

        fetchData();
    }, []);




    const handleRemoveItem = (index) => {

        const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        console.log(index)
        existingCartItems.splice(index, 1);
        console.log(existingCartItems);
        localStorage.setItem('cartItems', JSON.stringify(existingCartItems));
        window.location.reload();
        // if (product && product.length > 0) {
        //     const updatedCartItems = existingCartItems.filter(
        //         item => item.productId !== productId || item.size !== product[0].size
        //     );
        //     const temp = existingCartItems.filter(
        //         item => item.productId === productId
        //     )
        //     localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        //     console.log('Remove Item clicked. Product removed from cart.');
        //     window.location.reload()
        // } else {
        //     console.log('Product not found.');
        // }
    };



    return (
        <div className="container mx-auto mt-8 px-4 ">
            {/* {console.log(product)} */}
            {product ? (
                product.map((item, index) => (
                    <div key={index} className="mb-8 flex flex-col md:flex-row max-w-4xl mx-auto border rounded-lg shadow-md">
                        <div className="w-full md:w-1/2 relative  h-80 md:h-80">
                            <img
                                src={item.imgUrl}
                                alt={item.name}
                                className="absolute inset-0 w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none border-b md:border-b-0 md:border-r-[2px] border-black"
                            />
                        </div>
                        <div className="w-full md:w-1/2 p-4 flex flex-col justify-between">
                            <div>
                                <h2 className="text-lg md:text-xl font-semibold mb-2">{item.pname}</h2>
                                <p className="text-xs md:text-sm text-gray-600 mb-4">{item.description}</p>

                                <div className="flex gap-2 mb-2 md:mb-0">
                                    {shoeSizes[index] && (
                                        <p className='text-xs md:text-xl border border-black p-2'>
                                            Size: {shoeSizes[index]}
                                        </p>
                                    )}
                                </div>
                                <p className="text-lg md:text-2xl font-bold mt-5 md:mb-0">${(item.price * quantity).toFixed(2)}</p>

                            </div>
                            <div className="flex items-center space-x-4 mb-1 md:mb-0">
                                <button onClick={decreaseQuantity} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none">
                                    <FaMinus className="text-lg md:text-xl" />
                                </button>
                                <span className="text-lg md:text-xl font-semibold">{quantity}</span>
                                <button onClick={increaseQuantity} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none">
                                    <FaPlus className="text-lg md:text-xl" />
                                </button>
                            </div>
                            <div className="flex gap-2 mt-2">
                                <Link to={`/order-status/${item._id}`}>
                                    <button className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none text-xs md:text-base">
                                        Buy Now
                                    </button>
                                </Link>
                                <button onClick={() => handleRemoveItem(index)} className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none text-xs md:text-base">
                                    Remove Item
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="flex flex-col items-center justify-center h-screen ">
                    <h1 className="text-4xl md:text-6xl text-red-700 font-bold mb-6 text-center">
                        Cart is Empty
                    </h1>
                    <img
                        src="https://bakestudio.in/assets/images/cart/empty-cart.gif"
                        alt="Empty Cart"
                        className="w-full max-w-md rounded-lg shadow-lg mb-6"
                    />
                    <p className="text-xl text-gray-600 text-center">
                        Looks like your cart is empty. Start shopping and fill it up!
                    </p>
                </div>

            )
            }
            {error && <p className="text-center mt-8 text-red-500">{error}</p>}
        </div >
    );



}

export default Cart;
