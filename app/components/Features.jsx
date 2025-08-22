// components/Features.jsx
"use client";
import React from "react";
import { ShieldCheck, Zap, Database } from "lucide-react"; // Example icons

const features = [
    {
        title: "Fast & Secure",
        desc: "Experience blazing fast performance with enterprise-grade secure authentication and protection.",
        icon: <Zap className="w-10 h-10 text-indigo-500" />,
    },
    {
        title: "Easy to Use",
        desc: "Enjoy a clean, intuitive UI designed for seamless product exploration and management.",
        icon: <ShieldCheck className="w-10 h-10 text-indigo-500" />,
    },
    {
        title: "Reliable Data",
        desc: "Your products are stored safely and fetched from trusted, always-available sources.",
        icon: <Database className="w-10 h-10 text-indigo-500" />,
    },
];

const Features = () => {
    return (
        <section className="py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
                <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 dark:text-gray-100">
                    Why Choose <span className="text-indigo-600">Us?</span>
                </h2>
                <p className="max-w-2xl mx-auto mb-16 text-gray-600 dark:text-gray-300 text-lg">
                    We provide a modern, scalable, and delightful experience tailored to your needs.
                </p>

                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((f, i) => (
                        <div
                            key={i}
                            className="p-8 rounded-3xl bg-white dark:bg-gray-900 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
                        >
                            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-indigo-100 dark:bg-indigo-900">
                                {f.icon}
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                                {f.title}
                            </h3>
                            <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                                {f.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
