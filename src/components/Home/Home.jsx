import React, { useState, useEffect } from 'react';
import Trending from '../Trending/Trending';
import Categories from '../Categories/Categories';

function Home() {
    const images = [
        {

            url: "https://raw.githubusercontent.com/Durgesh1008/ImagePNG/main/Black%20%26%20Red%20Modern%20Sneaker%20Shoes%20Fashion%20%20Facebook%20Cover.png"
        },
        {
            url: "https://raw.githubusercontent.com/Durgesh1008/ImagePNG/main/Black%20Green%20Modern%20Brutalism%20Exclusive%20Sneaker%20Facebook%20Cover.png"
        },
        {
            url: "https://raw.githubusercontent.com/Durgesh1008/ImagePNG/main/Black%20and%20White%20Grunge%20Shoes%20Sale%20Facebook%20Post.png"
        },
        {
            url: "https://raw.githubusercontent.com/Durgesh1008/ImagePNG/main/Blue%20and%20White%20Modern%20Shoes%20Sale%20Facebook%20Post.png"
        },
        {
            url: "https://raw.githubusercontent.com/Durgesh1008/ImagePNG/main/Orange%20and%20Black%20Grunge%20Shoes%20Sale%20Facebook%20Post.png"
        },
        {
            url: "https://raw.githubusercontent.com/Durgesh1008/ImagePNG/main/Red%20and%20White%20Modern%20Sneakers%20Twitter%20Post.png"
        },
        {
            url: "https://raw.githubusercontent.com/Durgesh1008/ImagePNG/main/black%20white%20shoes%20sale%20%20facebook%20cover.png"
        },
        {
            url: "https://raw.githubusercontent.com/Durgesh1008/ImagePNG/main/Black%20and%20White%20Grunge%20Shoes%20Sale%20Facebook%20Post.png"
        }
    ];

    const [currentIndex, setCurrIndex] = useState(0);
    const [isOpen, setisOpen] = useState(false);
    const [email, setEmail] = useState('');

    const nextSlide = () => {
        setCurrIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    const prevSlide = () => {
        setCurrIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };
    const handleNotifyClick = () => {
        setisOpen(true);
    }
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 4000);
        return () => clearInterval(interval);
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            if (response.ok) {
                alert('Email sent successfully!');
            } else {
                alert('Failed to send email.');
            }
        } catch (error) {
            alert('Error sending email.');
        }
    };
    return (
        <div className="">
            <div className="relative overflow-hidden h-screen">
                <div className=''>
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className={index === currentIndex ? 'absolute inset-0 opacity-100 transition-opacity duration-500 ease-in-out' : 'absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out'}
                        >
                            <img src={image.url} alt={image.caption} className='object-cover w-full h-full cursor-pointer' />
                        </div>
                    ))}
                    <button className='absolute top-1/2 transform -translate-y-1/2 left-4 bg-white bg-opacity-50 text-black py-2 px-4 rounded-md' onClick={prevSlide}>
                        &#10094;
                    </button>
                    <button className='absolute top-1/2 transform -translate-y-1/2 right-4 bg-white bg-opacity-50 text-black py-2 px-4 rounded-md' onClick={nextSlide}>
                        &#10095;
                    </button>
                </div>


                <button
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 text-black py-2 px-4 rounded-md"
                    onClick={prevSlide}
                >
                    &#10094;
                </button>
                <button
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 text-black py-2 px-4 rounded-md"
                    onClick={nextSlide}
                >
                    &#10095;
                </button>
            </div>

            {/* Trending Component */}
            <div className="mt-4">
                <Trending />
            </div>

            {/* Categories Component */}
            <div className="mt-4">
                <Categories />
            </div>

            {/* Feature Section */}
            <div className="relative">
                <div className="grid grid-cols-1 md:grid-cols-3">
                    <div className="mb-4 md:mb-0">
                        <img src="https://images.unsplash.com/photo-1594917390201-932fc909fb8b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODJ8fHJ1bm5pbmclMjBzaG9lc3xlbnwwfHwwfHx8MA%3D%3D" alt="" className="w-full h-auto" />
                    </div>
                    <div className="hidden md:block">
                        <img src="https://images.unsplash.com/photo-1535021766333-fc75c9ab1d62?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQwfHxydW5uaW5nJTIwc2hvZXN8ZW58MHx8MHx8fDA%3D" alt="" className="w-full h-auto" />
                    </div>
                    <div className="hidden md:block">
                        <img src="https://images.unsplash.com/photo-1601579548701-3eafadc418a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTh8fHJ1bm5pbmclMjBzaG9lc3xlbnwwfHwwfHx8MA%3D%3D" alt="" className="w-full h-auto" />
                    </div>
                </div>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="absolute bottom-0 left-0 p-4 mb-10 text-white">
                    <div className="mb-3">
                        <span className="text-5xl font-extrabold uppercase">supercomfort.</span>
                    </div>
                    <div className="mb-3">
                        <span className="text-4xl font-extrabold uppercase">supernova.</span>
                    </div>
                    <div className="mb-3">
                        <span className="text-xl font-semibold">Experience maximum comfort with new supernova</span>
                    </div>
                    {!isOpen && (
                        <button
                            className="text-white bg-gradient-to-br ml-3 from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                            onClick={handleNotifyClick}
                        >
                            Notify Me
                        </button>
                    )}
                    {isOpen && (
                        <form className="mt-4" onSubmit={handleSubmit}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="p-2 rounded-lg   text-black"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button type="button" class="text-white bg-gradient-to-br ml-3 from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Subscribe</button>
                        </form>
                    )}
                </div>
            </div>

        </div >
    );
}

export default Home;
