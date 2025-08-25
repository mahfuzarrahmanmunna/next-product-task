// components/Navbar.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { signIn, signOut } from "next-auth/react"

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="z-50 sticky top-0 bg-white/30 dark:bg-gray-900/30 backdrop-blur-md shadow-lg">
            <div className="relative">
                <div className="absolute inset-0 rounded-none border-[3px] border-transparent 
                    before:content-[''] before:absolute before:inset-0 before:rounded-none 
                    before:border-[3px] before:border-transparent 
                    before:bg-[conic-gradient(var(--tw-gradient-stops))] 
                    before:from-indigo-500 before:via-purple-500 before:to-pink-500 
                    before:animate-[spin_6s_linear_infinite] 
                    before:-z-10 before:blur-[2px]">
                </div>

                <div className="relative bg-white/30 dark:bg-gray-900/30 backdrop-blur-md shadow-lg">
                    <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                        <Link
                            href="/"
                            className="text-3xl font-extrabold relative inline-block text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text"
                        >
                            NextMart
                        </Link>

                        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
                            <NavLink href="/">Home</NavLink>
                            <NavLink href="/products">Products</NavLink>
                            <NavLink href="/add-products">Add Products</NavLink>
                        </div>

                        <div className="hidden md:flex items-center gap-4">
                            <button
                                onClick={() => signIn()}
                                className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition hover:scale-105 shadow-md"
                            >
                                Register
                            </button>
                        </div>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden p-2 rounded-lg text-gray-800 dark:text-gray-200 hover:bg-gray-200/30 dark:hover:bg-gray-800/40 transition"
                            aria-label="Toggle Menu"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>

                    {isOpen && (
                        <div className="md:hidden px-4 py-4 space-y-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md animate-fade-in-down">
                            <MobileLink href="/" onClick={() => setIsOpen(false)}>Home</MobileLink>
                            <MobileLink href="/products" onClick={() => setIsOpen(false)}>Products</MobileLink>
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    signIn("google");
                                }}
                                className="w-full text-left px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                            >
                                Register
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

// --- Reusable NavLink ---
function NavLink({ href, children }) {
    return (
        <Link
            href={href}
            className="relative px-3 py-2 rounded-md text-gray-800 dark:text-gray-200 hover:text-blue-500 transition duration-300 before:absolute before:inset-0 before:rounded-md before:border before:border-transparent hover:before:border-blue-500 hover:before:shadow-[0_0_0_2px_rgba(59,130,246,0.5)] before:transition-all"
        >
            {children}
        </Link>
    );
}

// --- Reusable MobileLink ---
function MobileLink({ href, children, onClick }) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className="block text-gray-800 dark:text-gray-100 px-3 py-2 rounded-md hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-800 transition"
        >
            {children}
        </Link>
    );
}
