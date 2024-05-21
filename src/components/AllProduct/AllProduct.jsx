import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllProduct = () => {
    const [products, setProducts] = useState([]);
    const [sortedProducts, setSortedProducts] = useState([]);
    const [sortBy, setSortBy] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/products');
                setProducts(response.data);
                setSortedProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    useEffect(() => {
        const filteredProducts = products.filter((product) =>
            product.pname.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSortedProducts(filteredProducts);
    }, [searchTerm, products]);

    const sortLowToHigh = () => {
        const sorted = [...sortedProducts].sort((a, b) => a.price - b.price);
        setSortedProducts(sorted);
        setSortBy('lowToHigh');
    };

    const sortHighToLow = () => {
        const sorted = [...sortedProducts].sort((a, b) => b.price - a.price);
        setSortedProducts(sorted);
        setSortBy('highToLow');
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">Products</h1>
            <div className="flex justify-center mb-4">
                <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="mr-4 px-4 py-2 rounded focus:outline-none bg-gray-200 text-gray-800"
                />
                <button
                    className={`mr-4 px-4 py-2 rounded focus:outline-none ${sortBy === 'lowToHigh' ? 'bg-black text-white' : 'bg-gray-200 text-gray-800'}`}
                    onClick={sortLowToHigh}
                >
                    Low to High
                </button>
                <button
                    className={`px-4 py-2 rounded focus:outline-none ${sortBy === 'highToLow' ? 'bg-black text-white' : 'bg-gray-200 text-gray-800'}`}
                    onClick={sortHighToLow}
                >
                    High to Low
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedProducts.map((product) => (
                    <div
                        key={product._id}
                        className="rounded-lg overflow-hidden shadow-xl bg-white hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1"
                    >
                        <img src={product.imgUrl} alt={product.pname} className="w-full h-54 object-cover" />
                        <div className="p-6">
                            <h3 className="text-xl font-semibold mb-2">{product.pname}</h3>
                            <p className="text-black mb-2">Price: {product.price}</p>
                            <p className="text-gray-700">{product.description}</p>
                            <button className="mt-4 bg-black text-white font-semibold py-2 px-4 w-full rounded hover:bg-neutral-800 transition duration-300 ease-in-out">
                                <Link to={`/viewpage/${product._id}`}>Add to Cart</Link>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllProduct;
