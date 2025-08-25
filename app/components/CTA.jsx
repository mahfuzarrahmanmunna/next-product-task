// components/CTA.jsx
"use client";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const CTA = () => {
    return (
        <section className="relative overflow-hidden py-20 md:py-28 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            {/* Decorative background with gradient + blur */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-400/30 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-300/30 rounded-full blur-3xl"></div>
            </div>

            <motion.div
                className="relative max-w-5xl mx-auto px-6 text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                {/* Title */}
                <motion.h2
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-snug"
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    Ready to{" "}
                    <span className="bg-gradient-to-r from-yellow-300 to-orange-400 text-transparent bg-clip-text">
                        Explore More
                    </span>{" "}
                    Products?
                </motion.h2>

                {/* Description */}
                <motion.p
                    className="mb-10 text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-200 max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    Login now and start managing your favorite products seamlessly.
                    Enjoy a faster, smoother experience designed just for you.
                </motion.p>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    <Link
                        href="/login"
                        className="inline-block px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl shadow-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 hover:scale-105 transform transition-all duration-300"
                    >
                        Get Started 🚀
                    </Link>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default CTA;
