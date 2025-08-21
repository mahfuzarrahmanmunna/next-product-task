import Link from 'next/link';
import React, { useState } from 'react';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        agree: false,
    });
    return (
        <div>
            <form className="space-y-4">
                {/* Name */}
                <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-gray-700/50 placeholder-gray-400 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition"
                />

                {/* Email */}
                <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-gray-700/50 placeholder-gray-400 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition"
                />

                {/* Password */}
                <input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                    }
                    className="w-full bg-gray-700/50 placeholder-gray-400 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition"
                />

                {/* Terms */}
                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        checked={formData.agree}
                        onChange={(e) =>
                            setFormData({ ...formData, agree: e.target.checked })
                        }
                        className="form-checkbox text-purple-600"
                    />
                    <label className="text-gray-300 text-sm">
                        I agree to the{" "}
                        <Link href="#" className="text-purple-400 underline">
                            Terms & Conditions
                        </Link>
                    </label>
                </div>

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