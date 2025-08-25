// components/Footer.jsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { Github, Twitter, Linkedin } from "lucide-react"; // optional icons

const Footer = () => {
    return (
        <footer className="relative py-10 bg-gray-900 text-gray-400 dark:bg-gray-950 dark:text-gray-300">
            <motion.div
                className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                {/* Left Side: Branding */}
                <motion.p
                    className="text-sm sm:text-base text-gray-400 dark:text-gray-400"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    © {new Date().getFullYear()} <span className="font-semibold text-white">My Product App</span>.
                    All rights reserved.
                </motion.p>

                {/* Right Side: Navigation + Social */}
                <motion.div
                    className="flex flex-col sm:flex-row items-center gap-6"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    {/* Links */}
                    <div className="flex gap-6">
                        {["Blog", "Support", "Contact"].map((item, i) => (
                            <a
                                key={i}
                                href="#"
                                className="relative text-sm sm:text-base hover:text-white transition-colors duration-300"
                            >
                                {item}
                                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        ))}
                    </div>

                    {/* Social Icons */}
                    <div className="flex gap-4 text-gray-400">
                        <a href="#" className="hover:text-white transition-colors duration-300">
                            <Github size={20} />
                        </a>
                        <a href="#" className="hover:text-white transition-colors duration-300">
                            <Twitter size={20} />
                        </a>
                        <a href="#" className="hover:text-white transition-colors duration-300">
                            <Linkedin size={20} />
                        </a>
                    </div>
                </motion.div>
            </motion.div>
        </footer>
    );
};

export default Footer;
