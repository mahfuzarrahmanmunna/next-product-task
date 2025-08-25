"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const AddProductPage = () => {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);

        try {
            // Step 1: Upload image to ImgBB
            const imageFile = data.image[0];
            const formData = new FormData();
            formData.append("image", imageFile);

            const imgBBRes = await fetch(`https://api.imgbb.com/1/upload?key=f2f3f75de26957d089ecdb402788644c`, {
                method: "POST",
                body: formData,
            });

            const imgBBData = await imgBBRes.json();

            if (!imgBBData.success) {
                throw new Error("Image upload failed");
            }

            const imageUrl = imgBBData.data.url;

            // Step 2: Prepare final product data
            const productData = {
                name: data.name,
                description: data.description,
                price: data.price,
                image: imageUrl,
            };

            // Step 3: Submit to your API
            await fetch("/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(productData),
            });

            setLoading(false);
            reset();
            Swal.fire({
                icon: "success",
                title: "Product Added!",
                text: `${data.name} has been added successfully.`,
                timer: 2000,
                showConfirmButton: false,
            });
        } catch (error) {
            console.error(error);
            setLoading(false);
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: "Failed to add product. Try again.",
            });
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold text-center mb-8"
            >
                Add New Product
            </motion.h1>

            <motion.form
                onSubmit={handleSubmit(onSubmit)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4"
                encType="multipart/form-data"
            >
                {/* Product Name */}
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">
                        Product Name
                    </label>
                    <input
                        type="text"
                        {...register("name", { required: true })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.name && <span className="text-red-500 text-sm">Name is required</span>}
                </div>

                {/* Description */}
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">
                        Description
                    </label>
                    <textarea
                        {...register("description", { required: true })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.description && <span className="text-red-500 text-sm">Description is required</span>}
                </div>

                {/* Price */}
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">
                        Price
                    </label>
                    <input
                        type="number"
                        {...register("price", { required: true })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.price && <span className="text-red-500 text-sm">Price is required</span>}
                </div>

                {/* Image Upload */}
                <div className="mb-6">
                    <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">
                        Product Image
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        {...register("image", { required: true })}
                        className="block w-full text-sm text-gray-700 dark:text-gray-200 dark:bg-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    {errors.image && <span className="text-red-500 text-sm">Image is required</span>}
                </div>

                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                    >
                        {loading ? "Adding..." : "Add Product"}
                    </button>
                </div>
            </motion.form>
        </div>
    );
};

export default AddProductPage;
