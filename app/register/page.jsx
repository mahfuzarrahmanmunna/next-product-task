// app/register/page.jsx
"use client";

import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import Slider from "react-slick"; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import RegisterForm from "./components/RegisterForm";

export default function RegisterPage() {
    const sliderImages = [
        "https://i.ibb.co.com/dstxKxrF/barnard-68-b68-black-cloud.webp",
        "https://i.ibb.co.com/xWLJJQk/3317639459-ecfcc634cd-b.jpg",
        "https://i.ibb.co.com/Z16y261q/potw1638a-1200x509.webp",
    ];

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 700,
        autoplay: true,
        autoplaySpeed: 4000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
    };

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-gray-900 text-white">
            {/* Left Side - Image Slider */}
            <div className="w-full lg:w-1/2">
                <Slider {...sliderSettings}>
                    {sliderImages.map((src, index) => (
                        <div key={index} className="h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-screen relative">
                            <Image
                                width={1600}
                                height={900}
                                src={src}
                                alt={`slide-${index}`}
                                className="w-full h-full object-cover rounded-none lg:rounded-r-3xl"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4 sm:p-6 md:p-10 lg:p-12">
                                <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                                    Capturing Moments
                                </h2>
                                <p className="mt-2 text-gray-300 text-xs sm:text-sm md:text-base lg:text-lg">
                                    Creating memories you'll never forget
                                </p>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>

            {/* Right Side - Register Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10">
                <div className="w-full max-w-md bg-gray-800 p-6 sm:p-8 rounded-2xl lg:rounded-3xl shadow-xl relative overflow-hidden">
                    <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-white">Create an Account</h1>
                    <p className="text-xs sm:text-sm mb-6 text-gray-400">
                        Already have an account?{" "}
                        <Link href="/login" className="text-purple-400 hover:underline">
                            Log in
                        </Link>
                    </p>

                    <RegisterForm />

                    {/* Social Login */}
                    <div className="mt-6 flex items-center gap-2 text-xs sm:text-sm text-gray-400">
                        <div className="flex-grow border-t border-gray-600"></div>
                        <span>or register with</span>
                        <div className="flex-grow border-t border-gray-600"></div>
                    </div>

                    <div className="mt-4 flex flex-col sm:flex-row gap-3">
                        <button className="w-full flex items-center justify-center gap-2 bg-white text-black py-2 rounded-lg shadow-sm hover:shadow-md transition text-sm sm:text-base">
                            <FcGoogle className="text-lg sm:text-xl" /> Google
                        </button>
                        <button className="w-full flex items-center justify-center gap-2 bg-black text-white py-2 rounded-lg shadow-sm hover:shadow-md transition text-sm sm:text-base">
                            <FaApple className="text-lg sm:text-xl" /> Apple
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
