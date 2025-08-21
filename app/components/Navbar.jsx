// components/Navbar.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn, signOut } from "next-auth/react";
import { Menu, X } from "lucide-react";

const Navbar = ({ session }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 w-full z-50 bg-white/30 dark:bg-gray-900/30 backdrop-blur-md border-b border-white/20 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo */}
                <Link
                    href="/"
                    className="text-2xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
                >
                    MyStore
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    <Link href="/" className="hover:text-blue-500 transition">
                        Home
                    </Link>
                    <Link href="/products" className="hover:text-blue-500 transition">
                        Products
                    </Link>
                    {session && (
                        <Link
                            href="/dashboard/add-product"
                            className="hover:text-blue-500 transition"
                        >
                            Add Product
                        </Link>
                    )}
                </div>

                {/* Auth Buttons (Desktop) */}
                <div className="hidden md:flex">
                    {session ? (
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                {session.user?.name}
                            </span>
                            <button
                                onClick={() => signOut()}
                                className="px-3 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm shadow-md"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => signIn("google")}
                            className="px-4 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm shadow-md"
                        >
                            Login
                        </button>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden p-2 rounded-md hover:bg-white/20 dark:hover:bg-gray-700/30 transition"
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Dropdown */}
            {isOpen && (
                <div className="md:hidden bg-white/80 dark:bg-gray-900/80 backdrop-blur-md px-4 py-3 space-y-4 shadow-md">
                    <Link
                        href="/"
                        className="block hover:text-blue-500 transition"
                        onClick={() => setIsOpen(false)}
                    >
                        Home
                    </Link>
                    <Link
                        href="/products"
                        className="block hover:text-blue-500 transition"
                        onClick={() => setIsOpen(false)}
                    >
                        Products
                    </Link>
                    {session && (
                        <Link
                            href="/dashboard/add-product"
                            className="block hover:text-blue-500 transition"
                            onClick={() => setIsOpen(false)}
                        >
                            Add Product
                        </Link>
                    )}
                    <div>
                        {session ? (
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    signOut();
                                }}
                                className="w-full text-left px-3 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white text-sm shadow-md"
                            >
                                Logout
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    signIn("google");
                                }}
                                className="w-full text-left px-3 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white text-sm shadow-md"
                            >
                                Login
                            </button>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
