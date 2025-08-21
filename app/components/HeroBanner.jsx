// components/HeroBanner.jsx
"use client";

import Image from "next/image";
import Link from "next/link";

export default function HeroBanner() {
    return (
        <section className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
            <div className="max-w-7xl mx-auto px-6 lg:px-12  grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

                {/* Left Content */}
                <div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
                        Discover Amazing Products <br />
                        with <span className="text-blue-600">NextShop</span>
                    </h1>
                    <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
                        Browse our latest collection and manage your own products easily with authentication powered by NextAuth.js.
                    </p>

                    <div className="mt-8 flex gap-4">
                        <Link
                            href="/products"
                            className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
                        >
                            View Products
                        </Link>
                        <Link
                            href="/login"
                            className="px-6 py-3 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-semibold shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                        >
                            Login
                        </Link>
                    </div>
                </div>

                {/* Right Image */}
                <div className="relative w-full h-[350px] lg:h-[450px]">
                    <Image
                        src="https://i.ibb.co.com/5WNWg6PX/pexels-emrecan-2079438.jpg" // <- Replace with your own image in public folder
                        alt="Hero Banner"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            </div>
        </section>
    );
}
