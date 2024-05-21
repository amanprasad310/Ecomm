


import React, { useState } from 'react';
import { FaCartPlus, FaUser, FaSearch } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';

function Header() {
    const [showMenu, setShowMenu] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const toggleSearch = () => {
        setShowSearch(!showSearch);
    };

    return (
        <nav className="bg-neutral-800 text-white sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="text-3xl font-semibold">
                            A!R
                        </Link>
                    </div>
                    <div className="hidden md:flex flex-grow items-center justify-center">
                        <NavLink
                            exact
                            to="/"
                            className="hover:bg-neutral-700 px-3 py-2 rounded-md text-sm font-medium"
                            activeClassName="bg-neutral-700"
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/trending"
                            className="hover:bg-neutral-700 px-3 py-2 rounded-md text-sm font-medium"
                            activeClassName="bg-neutral-700"
                        >
                            Trending
                        </NavLink>
                        <NavLink
                            to="/categories"
                            className="hover:bg-neutral-700 px-3 py-2 rounded-md text-sm font-medium"
                            activeClassName="bg-neutral-700"
                        >
                            Categories
                        </NavLink>
                        <NavLink
                            to="/about"
                            className="hover:bg-neutral-700 px-3 py-2 rounded-md text-sm font-medium"
                            activeClassName="bg-neutral-700"
                        >
                            About us
                        </NavLink>
                        <NavLink
                            to="/contact"
                            className="hover:bg-neutral-700 px-3 py-2 rounded-md text-sm font-medium"
                            activeClassName="bg-neutral-700"
                        >
                            Contact
                        </NavLink>
                    </div>
                    <div className="flex items-center">
                        <div className="relative mr-3">
                            <button onClick={toggleSearch} className="focus:outline-none">
                                <FaSearch className="text-gray-300 hover:text-white" size={22} />
                            </button>
                            {showSearch && (
                                <input
                                    type="search"
                                    placeholder="Search"
                                    className="absolute right-0 top-0 -translate-y-2 mr-8 bg-white text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 px-10 py-2 w-48 md:w-64"
                                    onBlur={() => setShowSearch(false)}
                                    autoFocus
                                />
                            )}
                        </div>
                        <Link to="/cart" className="mr-3 text-gray-300 hover:text-white">
                            <FaCartPlus size={22} />
                        </Link>
                        <Link to="/profile" className="mr-3 text-gray-300 hover:text-white">
                            <FaUser size={22} />
                        </Link>
                    </div>
                    <div className="flex md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-500 focus:outline-none"
                        >
                            <svg
                                className={`${showMenu ? 'hidden' : 'block'} h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                            <svg
                                className={`${showMenu ? 'block' : 'hidden'} h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className={`${showMenu ? 'block' : 'hidden'} md:hidden`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <NavLink
                        exact
                        to="/"
                        className="hover:bg-neutral-700 block px-3 py-2 rounded-md text-base font-medium"
                        activeClassName="bg-neutral-700"
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/trending"
                        className="hover:bg-neutral-700 block px-3 py-2 rounded-md text-base font-medium"
                        activeClassName="bg-neutral-700"
                    >
                        Trending
                    </NavLink>
                    <NavLink
                        to="/categories"
                        className="hover:bg-neutral-700 block px-3 py-2 rounded-md text-base font-medium"
                        activeClassName="bg-neutral-700"
                    >
                        Categories
                    </NavLink>
                    <NavLink
                        to="/about"
                        className="hover:bg-neutral-700 block px-3 py-2 rounded-md text-base font-medium"
                        activeClassName="bg-neutral-700"
                    >
                        About us
                    </NavLink>
                    <NavLink
                        to="/contact"
                        className="hover:bg-neutral-700 block px-3 py-2 rounded-md text-base font-medium"
                        activeClassName="bg-neutral-700"
                    >
                        Contact
                    </NavLink>
                </div>
            </div>
        </nav>
    );
}

export default Header;
