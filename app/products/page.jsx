"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { Tag, ShoppingCart, Star } from "lucide-react";

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
                <div className="flex min-h-screen justify-center items-center">
                    <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-600"></div>
                </div>
            ) : products.length === 0 ? (
                <p className="text-center text-gray-500">No products found</p>
            ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {products.map((product, index) => {
                        const price = parseFloat(product.price) || 0;
                        const discount = parseFloat(product.discount) || 0;
                        const finalPrice = discount
                            ? (price * (1 - discount / 100)).toFixed(2)
                            : price.toFixed(2);

                        return (
                            <motion.div
                                key={product._id || index}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl overflow-hidden transition"
                            >
                                {/* Product Image */}
                                <div className="relative w-full h-56 overflow-hidden">
                                    <img
                                        src={product.image || "/placeholder.png"}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                    {discount > 0 && (
                                        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                            -{discount}%
                                        </span>
                                    )}
                                    {product.status !== "active" && (
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

                                    {/* Rating Example */}
                                    <div className="flex items-center gap-1 text-yellow-500">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={14} fill="#facc15" />
                                        ))}
                                        <span className="text-gray-500 dark:text-gray-400 text-xs ml-2">(12)</span>
                                    </div>

                                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                                        {product.description || "No description available."}
                                    </p>

                                    {/* Category & Brand */}
                                    <div className="flex items-center justify-between text-sm mt-1">
                                        <span className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400">
                                            <Tag size={14} /> {product.category || "General"}
                                        </span>
                                        {product.brand && (
                                            <span className="text-gray-500 dark:text-gray-400">{product.brand}</span>
                                        )}
                                    </div>

                                    {/* Price Section */}
                                    <div className="flex items-center justify-between mt-2">
                                        <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                                            ${finalPrice}
                                        </p>
                                        {discount > 0 && (
                                            <p className="text-sm text-red-500 line-through">
                                                ${price.toFixed(2)}
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
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default AllProductsPage;
