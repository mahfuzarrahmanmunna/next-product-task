"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import {
    Tag,
    ShoppingCart,
    CheckCircle,
    Star,
    Truck,
    ArrowLeftCircle,
} from "lucide-react";
import { motion } from "framer-motion";

const ProductDetailsPage = () => {
    const router = useRouter();
    const { id } = useParams(); // Assumes route: /products/[id]
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/products/${id}`);
                if (!res.ok) throw new Error("Product not found");
                const data = await res.json();
                setProduct(data);
            } catch (err) {
                console.error(err);
                toast.error("❌ Failed to load product");
                router.push("/products");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id, router]);

    useEffect(() => {
        // Fetch related products (example: same category)
        const fetchRelated = async () => {
            if (!product?.category) return;
            try {
                const res = await fetch(`/api/products?category=${product.category}`);
                if (!res.ok) return;
                const data = await res.json();
                setRelatedProducts(data.filter(p => p._id !== product._id).slice(0, 4)); // max 4
            } catch (err) {
                console.error(err);
            }
        };
        fetchRelated();
    }, [product]);

    if (loading) return <p className="text-center mt-10 text-gray-500">Loading...</p>;
    if (!product) return null;

    const price = parseFloat(product?.price) || 0;
    const discount = parseFloat(product?.discount) || 0;
    const finalPrice =
        discount > 0
            ? (price * (1 - discount / 100)).toFixed(2)
            : price.toFixed(2);

    return (
        <div className="max-w-7xl mx-auto py-10 px-6">
            <Toaster position="top-center" />

            {/* Breadcrumb */}
            <nav className="text-sm text-gray-500 mb-6">
                <span onClick={() => router.push("/")} className="hover:underline cursor-pointer">Home</span> /{" "}
                <span onClick={() => router.push("/products")} className="hover:underline cursor-pointer">Products</span> /{" "}
                <span className="text-gray-800 dark:text-gray-200">{product?.name}</span>
            </nav>

            {/* Main Product Info */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col md:flex-row gap-10 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
            >
                <div className="md:w-1/2 flex justify-center items-center">
                    <img
                        src={product?.image || "/placeholder.png"}
                        alt={product?.name || "Product"}
                        className="rounded-2xl object-cover max-h-[400px] w-full"
                    />
                </div>

                <div className="md:w-1/2 flex flex-col gap-5">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                        {product?.name || "Unnamed Product"}
                    </h1>

                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {product?.description || "No description available."}
                    </p>

                    {/* Price */}
                    <div className="flex items-center gap-4 mt-2">
                        <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">${finalPrice}</span>
                        {discount > 0 && price > 0 && (
                            <span className="text-red-500 line-through">${price.toFixed(2)}</span>
                        )}
                        {product?.status === "active" && (
                            <CheckCircle className="text-green-500" size={20} title="Active" />
                        )}
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1 text-yellow-500 mt-1">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={16} fill="#facc15" />
                        ))}
                        <span className="text-sm text-gray-500 dark:text-gray-300 ml-2">(12 reviews)</span>
                    </div>

                    {/* Stock & Info */}
                    <div className="flex flex-wrap gap-3 text-sm text-gray-700 dark:text-gray-300 mt-2">
                        {product?.category && (
                            <span className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                <Tag size={14} /> {product.category}
                            </span>
                        )}
                        {product?.brand && <span>Brand: {product.brand}</span>}
                        {product?.sku && <span>SKU: {product.sku}</span>}
                        {product?.stock != null && (
                            <span>
                                {product.stock > 0 ? (
                                    <span className="text-green-600 font-medium">In stock: {product.stock}</span>
                                ) : (
                                    <span className="text-red-500">Out of stock</span>
                                )}
                            </span>
                        )}
                    </div>

                    {/* Tags */}
                    {product?.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                            {product.tags.map((tag, idx) => (
                                <span
                                    key={idx}
                                    className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded-full"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Delivery info */}
                    <div className="flex items-center gap-2 text-sm mt-4 text-gray-600 dark:text-gray-300">
                        <Truck size={18} className="text-indigo-600" />
                        <span>Free delivery within 3-5 business days</span>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 mt-6 flex-col sm:flex-row">
                        <button
                            onClick={() => toast.success("🛒 Added to cart")}
                            className="flex-1 bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition font-medium flex items-center justify-center gap-2"
                        >
                            <ShoppingCart size={18} /> Add to Cart
                        </button>

                        <button
                            onClick={() => router.back()}
                            className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition font-medium flex items-center justify-center gap-2"
                        >
                            <ArrowLeftCircle size={18} /> Go Back
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Features / Specifications */}
            <section className="mt-12 bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
                <h2 className="text-2xl font-bold mb-4">Specifications</h2>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                    {product?.specifications?.length > 0 ? (
                        product.specifications.map((spec, idx) => <li key={idx}>{spec}</li>)
                    ) : (
                        <li>No specifications provided.</li>
                    )}
                </ul>
            </section>

            {/* Customer Reviews */}
            <section className="mt-12">
                <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow mb-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="font-medium">User {i + 1}</span>
                                <div className="flex gap-1 text-yellow-500">
                                    {[...Array(5)].map((_, j) => (
                                        <Star key={j} size={14} fill="#facc15" />
                                    ))}
                                </div>
                            </div>
                            <span className="text-sm text-gray-500 dark:text-gray-300">2 days ago</span>
                        </div>
                        <p className="mt-2 text-gray-700 dark:text-gray-300">
                            This is a sample review for this product. Highly recommended!
                        </p>
                    </div>
                ))}
            </section>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <section className="mt-12">
                    <h2 className="text-2xl font-bold mb-6">Related Products</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {relatedProducts.map((item) => (
                            <div key={item._id} className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 flex flex-col">
                                <img src={item.image || "/placeholder.png"} alt={item.name} className="h-40 object-cover rounded-lg mb-2" />
                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">{item.name}</h3>
                                <span className="text-indigo-600 font-bold mt-1">${item.price || 0}</span>
                                <button
                                    onClick={() => router.push(`/products/${item._id}`)}
                                    className="mt-auto bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition text-sm"
                                >
                                    View
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* FAQ Section */}
            <section className="mt-12 bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
                <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                    <li>
                        <strong>Q: What is the return policy?</strong>
                        <p>A: You can return the product within 14 days of purchase.</p>
                    </li>
                    <li>
                        <strong>Q: Does it come with a warranty?</strong>
                        <p>A: Yes, it includes a 1-year manufacturer warranty.</p>
                    </li>
                    <li>
                        <strong>Q: Is delivery free?</strong>
                        <p>A: Free delivery is available for all orders within the country.</p>
                    </li>
                </ul>
            </section>

        </div>
    );
};

export default ProductDetailsPage;
