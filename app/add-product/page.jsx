"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

const AddProductPage = () => {
    const router = useRouter();
    const [imageUploading, setImageUploading] = useState(false);
    const [preview, setPreview] = useState(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (data) => {
        if (!data.image[0]) {
            toast.error("❌ Please select an image");
            return;
        }

        setImageUploading(true);

        try {
            const formData = new FormData();
            formData.append("image", data.image[0]);

            // Upload image
            const res = await fetch(
                `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
                { method: "POST", body: formData }
            );

            const result = await res.json();
            if (!result.success) throw new Error("Image upload failed");

            const imageUrl = result.data.url;

            // Final product data
            const productData = {
                name: data.name,
                description: data.description,
                price: parseFloat(data.price),
                image: imageUrl,
                category: data.category,
                stock: parseInt(data.stock),
                brand: data.brand,
                sku: data.sku,
                discount: parseFloat(data.discount) || 0,
                tags: data.tags ? data.tags.split(",").map((t) => t.trim()) : [],
                status: data.status,
            };

            const productRes = await fetch("/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(productData),
            });

            const responseData = await productRes.json();

            if (productRes.ok) {
                toast.success("✅ Product added successfully!");
                reset();
                setPreview(null);
                router.push("/products");
            } else {
                toast.error(`❌ ${responseData.message}`);
            }
        } catch (err) {
            console.error(err);
            toast.error("❌ Something went wrong");
        } finally {
            setImageUploading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto my-12">
            <Toaster position="top-center" />
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
                Add New Product
            </h1>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 p-6 rounded-xl shadow-md bg-white dark:bg-gray-800"
            >
                {/* Product Name */}
                <div>
                    <label className="block mb-1 font-medium">Product Name</label>
                    <input
                        type="text"
                        {...register("name", { required: "Product name is required" })}
                        className="w-full border px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700"
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>

                {/* Description */}
                <div>
                    <label className="block mb-1 font-medium">Description</label>
                    <textarea
                        {...register("description", {
                            required: "Description is required",
                            minLength: { value: 10, message: "At least 10 characters" },
                        })}
                        className="w-full border px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700"
                    />
                    {errors.description && (
                        <p className="text-red-500 text-sm">{errors.description.message}</p>
                    )}
                </div>

                {/* Price */}
                <div>
                    <label className="block mb-1 font-medium">Price ($)</label>
                    <input
                        type="number"
                        step="0.01"
                        {...register("price", {
                            required: "Price is required",
                            min: { value: 1, message: "Price must be at least $1" },
                        })}
                        className="w-full border px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700"
                    />
                    {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
                </div>

                {/* Category */}
                <div>
                    <label className="block mb-1 font-medium">Category</label>
                    <select
                        {...register("category", { required: "Category is required" })}
                        className="w-full border px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700"
                    >
                        <option value="">Select category</option>
                        <option value="electronics">Electronics</option>
                        <option value="clothing">Clothing</option>
                        <option value="books">Books</option>
                        <option value="accessories">Accessories</option>
                    </select>
                    {errors.category && (
                        <p className="text-red-500 text-sm">{errors.category.message}</p>
                    )}
                </div>

                {/* Stock Quantity */}
                <div>
                    <label className="block mb-1 font-medium">Stock Quantity</label>
                    <input
                        type="number"
                        {...register("stock", {
                            required: "Stock quantity is required",
                            min: { value: 0, message: "Stock cannot be negative" },
                        })}
                        className="w-full border px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700"
                    />
                    {errors.stock && <p className="text-red-500 text-sm">{errors.stock.message}</p>}
                </div>

                {/* Brand */}
                <div>
                    <label className="block mb-1 font-medium">Brand</label>
                    <input
                        type="text"
                        {...register("brand")}
                        placeholder="Optional"
                        className="w-full border px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700"
                    />
                </div>

                {/* SKU */}
                <div>
                    <label className="block mb-1 font-medium">SKU / Product Code</label>
                    <input
                        type="text"
                        {...register("sku")}
                        placeholder="Optional"
                        className="w-full border px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700"
                    />
                </div>

                {/* Discount */}
                <div>
                    <label className="block mb-1 font-medium">Discount (%)</label>
                    <input
                        type="number"
                        step="0.01"
                        {...register("discount")}
                        placeholder="Optional"
                        className="w-full border px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700"
                    />
                </div>

                {/* Tags */}
                <div>
                    <label className="block mb-1 font-medium">Tags (comma separated)</label>
                    <input
                        type="text"
                        {...register("tags")}
                        placeholder="e.g. new, sale, trending"
                        className="w-full border px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700"
                    />
                </div>

                {/* Status */}
                <div>
                    <label className="block mb-1 font-medium">Status</label>
                    <select
                        {...register("status", { required: "Status is required" })}
                        className="w-full border px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700"
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block mb-1 font-medium">Product Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        {...register("image", { required: "Image is required" })}
                        onChange={(e) => {
                            if (e.target.files[0]) {
                                setPreview(URL.createObjectURL(e.target.files[0]));
                            }
                        }}
                        className="w-full text-gray-900 dark:text-gray-100"
                    />
                    {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
                    {preview && (
                        <img
                            src={preview}
                            alt="Preview"
                            className="mt-2 w-32 h-32 object-cover rounded-lg"
                        />
                    )}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={isSubmitting || imageUploading}
                    className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
                >
                    {isSubmitting || imageUploading ? "Adding..." : "Add Product"}
                </button>
            </form>
        </div>
    );
};

export default AddProductPage;
