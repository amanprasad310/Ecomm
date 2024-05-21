import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { CiHeart } from "react-icons/ci";
import { ImPrevious, ImNext } from "react-icons/im";
import { Link } from 'react-router-dom'

function Trending() {
    // const TrendingData = [
    //     {
    //         url: "https://raw.githubusercontent.com/amanprasad310/Git-codes/5b03fa6d34e572c9c897037c9aaa1cf3aef69e7d/Picture6.svg",
    //         ModleName: "Model 1",
    //         for: "Usage 1",
    //         price: "$100"
    //     },
    //     {
    //         url: "https://raw.githubusercontent.com/amanprasad310/Git-codes/5b03fa6d34e572c9c897037c9aaa1cf3aef69e7d/Picture10.svg",
    //         ModleName: "Model 2",
    //         for: "Usage 2",
    //         price: "$150"
    //     },
    //     {
    //         url: "https://raw.githubusercontent.com/amanprasad310/Git-codes/5b03fa6d34e572c9c897037c9aaa1cf3aef69e7d/Picture3.svg",
    //         ModleName: "Model 1",
    //         for: "Usage 1",
    //         price: "$100"
    //     },
    //     {
    //         url: "https://raw.githubusercontent.com/amanprasad310/Git-codes/5b03fa6d34e572c9c897037c9aaa1cf3aef69e7d/Picture4.svg",
    //         ModleName: "Model 2",
    //         for: "Usage 2",
    //         price: "$150"
    //     },
    //     {
    //         url: "https://raw.githubusercontent.com/amanprasad310/Git-codes/5b03fa6d34e572c9c897037c9aaa1cf3aef69e7d/Picture24.svg",
    //         ModleName: "Model 1",
    //         for: "Usage 1",
    //         price: "$100"
    //     },
    //     {
    //         url: "https://raw.githubusercontent.com/amanprasad310/Git-codes/5b03fa6d34e572c9c897037c9aaa1cf3aef69e7d/Picture23.svg",
    //         ModleName: "Model 2",
    //         for: "Usage 2",
    //         price: "$150"
    //     },
    //     {
    //         url: "https://raw.githubusercontent.com/amanprasad310/Git-codes/5b03fa6d34e572c9c897037c9aaa1cf3aef69e7d/Picture21.svg",
    //         ModleName: "Model 1",
    //         for: "Usage 1",
    //         price: "$100"
    //     },
    //     {
    //         url: "https://raw.githubusercontent.com/amanprasad310/Git-codes/5b03fa6d34e572c9c897037c9aaa1cf3aef69e7d/Picture20.svg",
    //         ModleName: "Model 2",
    //         for: "Usage 2",
    //         price: "$150"
    //     },
    // ];
    const [product, setProduct] = useState([])
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };
    useEffect(() => {
        // console.log("api call success");
        fetch('http://localhost:8080/trending-products')
            .then(response => response.json())
            .then(data => {
                setProduct(data);
                // if (data.length > 0) {
                //     console.log("First image URL:", data[0].imgUrl);
                // }
            })
            .catch(error => {
                console.error('Error fetching trending products:', error);
            });
    }, []);

    const [slidesToShow, setSlidesToShow] = useState(3);
    const sliderRef = useRef(null);

    useEffect(() => {
        const updateSlidesToShow = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth >= 1024) {
                setSlidesToShow(4);
            } else if (screenWidth >= 768) {
                setSlidesToShow(2);
            } else {
                setSlidesToShow(1);
            }
        };
        updateSlidesToShow();
        window.addEventListener('resize', updateSlidesToShow);
        return () => {
            window.removeEventListener('resize', updateSlidesToShow);
        };
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: slidesToShow,
        slidesToScroll: 1
    };

    const nextSlide = () => {
        sliderRef.current.slickNext();
    };

    const previousSlide = () => {
        sliderRef.current.slickPrev();
    };

    return (
        <div className='w-full  h-fit px-4 py-10 lg:px-20 lg:py-20 gap-10'>
            <h1 className='text-6xl text-black font-bold text-center'>TRENDING</h1>
            <div className="flex justify-between mt-4">
                <button onClick={previousSlide}><ImPrevious size={25} /></button>
                <button onClick={nextSlide}><ImNext size={25} /></button>
            </div>
            <p className='text-xl text-center'>Discover What's Hot 🔥 - Shop Our Trending Picks!</p>
            <div className='w-full h-fit p-8'>
                <Slider ref={sliderRef} {...settings}>
                    {
                        product.map((item, index) => (
                            <div key={item._id} className="px-2">
                                <div className='  p-10 border rounded-lg shadow-2xl shadow-slate-300 border-b-black   border-t-red-800'>
                                    <div className="flex  items-center justify-between w-full">

                                        <CiHeart size={25} className=' cursor-pointer ' />
                                        <span className="ml-2 uppercase text-md font-extrabold text-red-500">new</span>

                                    </div>

                                    <div className=''>
                                        <img src={item.imgUrl} alt={item.pname} className="w-full" />
                                        <h3 className=' text-lg font-bold'>{item.pname}</h3>
                                        <p className=' text-xs font-thin'>{item.description}</p>
                                        <p className='text-sm font-semibold'>MRP: ${item.price}</p>
                                    </div>
                                    <div className=' cursor-pointer bg-neutral-800 text-white px-2 py-2 mt-5 rounded-xl text-center'>
                                        <Link to={`/viewpage/${item._id}`}><button>Buy Now</button></Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </Slider>
            </div >
        </div >
    );


}

export default Trending;