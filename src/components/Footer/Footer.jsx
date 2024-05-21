// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FaFacebook, FaTwitter } from "react-icons/fa";
// import { RiInstagramFill } from "react-icons/ri";
// import { FaHome, FaPhoneVolume } from "react-icons/fa";
// import { MdAttachEmail } from "react-icons/md";
// import { IoSendSharp } from "react-icons/io5";
// import { FaArrowAltCircleUp } from "react-icons/fa";

// export default function Footer() {

//     return (
//         <div>

//             <div className='bg-black text-white py-12'>
//                 <div className="container mx-auto flex justify-around">
//                     <div className="flex flex-col">
//                         <h2 className="text-2xl font-bold uppercase mb-4 underline">Shop</h2>
//                         <div>
//                             <Link to="" className="text-white hover:text-gray-300">Man</Link>
//                         </div>
//                         <div>
//                             <Link to="" className="text-white hover:text-gray-300">Women</Link>
//                         </div>
//                         <div>
//                             <Link to="" className="text-white hover:text-gray-300">Kids</Link>
//                         </div>
//                     </div>
//                     <div className="flex flex-col">
//                         <h2 className="text-2xl font-bold uppercase mb-4 underline">Follow us</h2>
//                         <div className="flex items-center mb-2">
//                             <FaFacebook className="mr-2" />
//                             <a href="#" className="text-white hover:text-gray-300">Air Original</a>
//                         </div>
//                         <div className="flex items-center mb-2">
//                             <RiInstagramFill className="mr-2" />
//                             <a href="#" className="text-white hover:text-gray-300">Air</a>
//                         </div>
//                         <div className="flex items-center">
//                             <FaTwitter className="mr-2" />
//                             <a href="#" className="text-white hover:text-gray-300">A!R india</a>
//                         </div>
//                     </div>
//                     <div className="flex flex-col">
//                         <h2 className="text-2xl font-bold uppercase mb-4 underline">Connect</h2>
//                         <div className="flex items-center mb-2">
//                             <FaHome className="mr-2" />
//                             <span>Punjab, India 140401</span>
//                         </div>
//                         <div className="flex items-center mb-2">
//                             <MdAttachEmail className="mr-2" />
//                             <span>a!r@gmail.com</span>
//                         </div>
//                         <div className="flex items-center">
//                             <FaPhoneVolume className="mr-2" />
//                             <span>91 00000-11111</span>
//                         </div>
//                     </div>
//                     <div className="flex flex-col">
//                         <h2 className="text-2xl font-bold uppercase mb-4 underline">Feedback</h2>
//                         <div className="mb-2">
//                             <input type="text" className="px-10 py-4 rounded-lg bg-white text-black focus:outline-none w-full" placeholder="Enter your feedback" />
//                         </div>
//                         <div className="flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-800 cursor-pointer">
//                             <button >Send</button>
//                             <IoSendSharp className="ml-2" />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className='bg-black text-white py-4 text-xs font-mono text-center'>
//                 <span>
//                     <Link to="" className="text-white hover:text-gray-300">Privacy Policy</Link> |
//                     <Link to="" className="text-white hover:text-gray-300">Terms and Conditions</Link> |
//                     <Link to="" className="text-white hover:text-gray-300">Cookies</Link>
//                 </span>
//                 <div>
//                     <span> &copy; 2024 A!R BHARAT Marketing Pvt. Ltd. | <a href="#" className="text-white hover:text-gray-300">ALL RIGHTS RESERVED</a></span>
//                 </div>
//             </div>
//             {/* <div className=' bg-black text-white cursor-pointer items-end justify-end flex'>
//                 <Link to="/"><FaArrowAltCircleUp size={30} /></Link>
//             </div> */}
//         </div >
//     );
// }
import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaHome, FaPhoneVolume } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { MdAttachEmail } from "react-icons/md";


export default function Footer() {
    return (

        <div className=' h-full w-full'>
            <div className="bg-black text-white" >
                <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="footer-section mb-8 md:mb-0">
                            <h2 className="text-2xl font-bold uppercase mb-4 underline">Shop</h2>
                            <Link to="" className="text-white hover:text-gray-300 block mb-2">Man</Link>
                            <Link to="" className="text-white hover:text-gray-300 block mb-2">Women</Link>
                            <Link to="" className="text-white hover:text-gray-300 block">Kids</Link>
                        </div>
                        <div className="footer-section mb-8 md:mb-0">
                            <h2 className="text-2xl font-bold uppercase mb-4 underline">Follow us</h2>
                            <div className="flex items-center mb-2">
                                <FaFacebook className="mr-2" />
                                <a href="#" className="text-white hover:text-gray-300">Air Original</a>
                            </div>
                            <div className="flex items-center mb-2">
                                <RiInstagramFill className="mr-2" />
                                <a href="#" className="text-white hover:text-gray-300">Air</a>
                            </div>
                            <div className="flex items-center">
                                <FaTwitter className="mr-2" />
                                <a href="#" className="text-white hover:text-gray-300">A!R india</a>
                            </div>
                        </div>
                        <div className="footer-section mb-8 md:mb-0">
                            <h2 className="text-2xl font-bold uppercase mb-4 underline">Connect</h2>
                            <div className="flex items-center mb-2">
                                <FaHome className="mr-2" />
                                <span>Punjab, India 140401</span>
                            </div>
                            <div className="flex items-center mb-2">
                                <MdAttachEmail className="mr-2" />
                                <span>a!r@gmail.com</span>
                            </div>
                            <div className="flex items-center">
                                <FaPhoneVolume className="mr-2" />
                                <span>91 00000-11111</span>
                            </div>
                        </div>
                        <div className="footer-section">
                            <h2 className="text-2xl font-bold uppercase mb-4 underline">Feedback</h2>
                            <input type="text" className="px-4 py-2 rounded-lg bg-white text-black focus:outline-none w-full mb-4" placeholder="Enter your feedback" />
                            <div className="flex items-center justify-center">
                                <button className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-700 hover:to-blue-900 text-white px-6 py-2 rounded-lg shadow-md transition duration-300 ease-in-out uppercase">
                                    Send
                                </button>
                            </div>

                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-center mt-6">
                        <div className="text-center md:text-left mb-4 md:mb-0">
                            <span className="mr-2"><a href="" className=' hover:text-gray-500'>Privacy Policy</a></span>
                            <span className="mr-2"><a href="" className=' hover:text-gray-500'>Terms and Conditions</a></span>
                            <span><a href="" className=' hover:text-gray-500'>Cookies</a></span>
                        </div>
                        <div className="text-center md:text-right">
                            <span><a href="" className=' hover:text-gray-500'>&copy; 2024 A!R BHARAT Marketing Pvt. Ltd.</a> | <a href="#" className="text-white hover:text-gray-300">ALL RIGHTS RESERVED</a></span>
                        </div>
                    </div>
                </div>
            </ div >
        </div>


    );
}
