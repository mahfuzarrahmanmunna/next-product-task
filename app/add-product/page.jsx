"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const AddProductPage = () => {
    const router = useRouter();
    const [imageUploading, setImageUploading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (data) => {
        if (!data.image[0]) {
            alert("❌ Please select an image");
            return;
        }

        setImageUploading(true);

        try {
            const formData = new FormData();
            formData.append("image", data.image[0]);

            // Upload image to ImgBB
            const res = await fetch(
                `https://api.imgbb.com/1/upload?key=f2f3f75de26957d089ecdb402788644c`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            const result = await res.json();
            const imageUrl = result.data.url;

            // Prepare final product data
            const productData = {
                name: data.name,
                description: data.description,
                price: parseFloat(data.price),
                image: imageUrl,
            };

            // Send product data to your API
            const productRes = await fetch("/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(productData),
            });

            if (productRes.ok) {
                alert("✅ Product added successfully!");
                reset();
                router.push("/products");
            } else {
                alert("❌ Failed to add product");
            }
        } catch (err) {
            console.error(err);
            alert("❌ Image upload failed");
        } finally {
            setImageUploading(false);
        }
    };

    return (
        <div className={`max-w-4xl mx-auto my-12 from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800`}>

            <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
                Add New Product
            </h1>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 p-6 rounded-xl shadow-md bg-white dark:bg-gray-800"
            >
                {/* Product Name */}
                <div>
                    <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
                        Product Name
                    </label>
                    <input
                        type="text"
                        {...register("name", { required: "Product name is required" })}
                        className="w-full border px-3 py-2 rounded-lg focus:ring focus:outline-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                </div>

                {/* Description */}
                <div>
                    <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
                        Description
                    </label>
                    <textarea
                        {...register("description", {
                            required: "Description is required",
                            minLength: { value: 10, message: "At least 10 characters" },
                        })}
                        className="w-full border px-3 py-2 rounded-lg focus:ring focus:outline-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                    />
                    {errors.description && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.description.message}
                        </p>
                    )}
                </div>

                {/* Price */}
                <div>
                    <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
                        Price ($)
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        {...register("price", {
                            required: "Price is required",
                            min: { value: 1, message: "Price must be at least $1" },
                        })}
                        className="w-full border px-3 py-2 rounded-lg focus:ring focus:outline-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                    />
                    {errors.price && (
                        <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
                    )}
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
                        Product Image
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        {...register("image", { required: "Image is required" })}
                        className="w-full text-gray-900 dark:text-gray-100"
                    />
                    {errors.image && (
                        <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
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
        </div >
    );
};

export default AddProductPage;
