import React, { useState } from 'react';
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';

function Categories() {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className='flex justify-between items-center mb-8'>
                <h2 className="text-3xl md:text-5xl text-black font-bold text-center uppercase">
                    Categories
                </h2>
                <Link to='/allproduct'>
                    <button className="flex items-center gap-2 hover:bg-gray-300 px-4 py-2 rounded-lg">
                        All Product{" "}
                        <FaArrowRight className="h-5 w-5" />
                    </button>
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                <div
                    className={`relative overflow-hidden transition-transform duration-100 transform hover:scale-105`}
                    onMouseEnter={() => handleMouseEnter(0)}
                    onMouseLeave={handleMouseLeave}
                >
                    <img
                        src="https://github.com/amanprasad310/Git-codes/blob/main/Black%20sport%20shoes%20promotion%20Instagram%20Post.png?raw=true"
                        alt="sport"
                        className='w-full h-full rounded-md shadow-lg'
                    />
                    <button className='absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 w-full  shadow-md'><Link to="/newArrival"> SPORT</Link></button>
                </div>
                <div
                    className={`relative overflow-hidden transition-transform duration-100 transform hover:scale-105`}
                    onMouseEnter={() => handleMouseEnter(1)}
                    onMouseLeave={handleMouseLeave}
                >
                    <img
                        src="https://github.com/amanprasad310/Git-codes/blob/main/Black%20Modern%20New%20Collection%20Your%20Story.png?raw=true"
                        alt="sport"
                        className='w-full h-auto rounded-md shadow-lg'
                    />
                    <button className='absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white px-4 py-2 w-full  shadow-md'><Link to="/newArrival"> SNEAKERS</Link></button>
                </div>
                <div
                    className={`relative overflow-hidden transition-transform duration-100 transform hover:scale-105`}
                    onMouseEnter={() => handleMouseEnter(2)}
                    onMouseLeave={handleMouseLeave}
                >
                    <img
                        src="https://github.com/amanprasad310/Git-codes/blob/main/Latest%20Shoe%20Products%20Instagram%20Story%20(1).png?raw=true"
                        alt="sport"
                        className='w-full h-full rounded-md shadow-lg'
                    />
                    <button className='absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 w-full  shadow-md'>
                        {/* CASUAL */}
                        <Link to="/newArrival"> CASUAL</Link>
                    </button>
                </div>
            </div>
        </div >
    );
}

export default Categories;
