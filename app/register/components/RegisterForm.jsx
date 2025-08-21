"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";

const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // Form submit handler
    const onSubmit = (data) => {
        console.log("Form Data:", data);
        // TODO: call API or NextAuth signUp logic here
    };

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
            >
                {/* Name */}
                <div>
                    <input
                        type="text"
                        placeholder="Your Name"
                        {...register("name", { required: "Name is required" })}
                        className="w-full bg-gray-700/50 placeholder-gray-400 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition"
                    />
                    {errors.name && (
                        <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                                message: "Enter a valid email",
                            },
                        })}
                        className="w-full bg-gray-700/50 placeholder-gray-400 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition"
                    />
                    {errors.email && (
                        <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                    )}
                </div>

                {/* Password */}
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters",
                            },
                        })}
                        className="w-full bg-gray-700/50 placeholder-gray-400 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition"
                    />
                    {errors.password && (
                        <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
                    )}
                </div>

                {/* Terms */}
                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        {...register("agree", {
                            required: "You must agree to terms",
                        })}
                        className="form-checkbox text-purple-600"
                    />
                    <label className="text-gray-300 text-sm">
                        I agree to the{" "}
                        <Link href="#" className="text-purple-400 underline">
                            Terms & Conditions
                        </Link>
                    </label>
                </div>
                {errors.agree && (
                    <p className="text-red-400 text-sm mt-1">{errors.agree.message}</p>
                )}

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:scale-105 transition transform text-white font-semibold rounded-lg shadow-lg"
                >
                    Create Account
                </button>
            </form>
        </div>
    );
};

export default RegisterForm;
