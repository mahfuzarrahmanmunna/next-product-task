"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { BadgeCheck, Tag, ShoppingCart } from "lucide-react";

const AllProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("/api/products");
                const data = await res.json();
                setProducts(data);
            } catch (err) {
                console.error(err);
                toast.error("❌ Failed to load products");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="max-w-7xl mx-auto py-12 px-6">
            <Toaster position="top-center" />
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">
                🛍️ All Products
            </h1>

            {loading ? (
                <p className="text-center text-gray-500">Loading products...</p>
            ) : products.length === 0 ? (
                <p className="text-center text-gray-500">No products found</p>
            ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {products.map((product, index) => (
                        <motion.div
                            key={product._id || index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition overflow-hidden"
                        >
                            {/* Product Image */}
                            <div className="relative w-full h-56 overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                                {product.discount > 0 && (
                                    <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                        -{product.discount}%
                                    </span>
                                )}
                                {product.status === "inactive" && (
                                    <span className="absolute top-3 right-3 bg-gray-600 text-white text-xs px-3 py-1 rounded-full">
                                        Inactive
                                    </span>
                                )}
                            </div>

                            {/* Card Content */}
                            <div className="p-5 flex flex-col gap-3">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
                                    {product.name}
                                </h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                                    {product.description}
                                </p>

                                {/* Category & Brand */}
                                <div className="flex items-center justify-between text-sm">
                                    <span className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400">
                                        <Tag size={14} /> {product.category}
                                    </span>
                                    {product.brand && (
                                        <span className="text-gray-500 dark:text-gray-400">
                                            {product.brand}
                                        </span>
                                    )}
                                </div>

                                {/* Price Section */}
                                <div className="flex items-center justify-between mt-2">
                                    <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                                        ${product.price}
                                    </p>
                                    {product.discount > 0 && (
                                        <p className="text-sm text-red-500 line-through">
                                            ${(product.price / (1 - product.discount / 100)).toFixed(2)}
                                        </p>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="flex gap-3 mt-4">
                                    <Link
                                        href={`/products/${product._id}`}
                                        className="flex-1 bg-indigo-600 text-white text-center py-2 rounded-xl hover:bg-indigo-700 transition text-sm font-medium"
                                    >
                                        View
                                    </Link>
                                    <button
                                        onClick={() => toast.success("🛒 Added to cart")}
                                        className="px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                                    >
                                        <ShoppingCart size={18} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllProductsPage;
