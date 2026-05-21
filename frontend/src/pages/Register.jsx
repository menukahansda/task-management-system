import { useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
        confirm: false
    });
    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        const { name, type, checked, value } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        try{
            if (!formData.confirm) {
                alert("You must agree to Terms and Privacy Policy");
                return;
            }
            setLoading(true);
            const res = await api.post("/auth/register", {
                email: formData.email.trim().toLowerCase(),
                username: formData.username,
                password: formData.password
            });
            if (res.success) {
                alert("Registration successful! Please log in.");
                navigate("/login");
            } else {
                alert("Registration failed: " + res.message);
            }
        } catch (err) {
            alert("Server error: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-purple-50">
            
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md border border-purple-100">

                <h2 className="text-2xl font-semibold text-center text-purple-700 mb-6">
                    Sign Up
                </h2>

                <form onSubmit={handleRegister} className="space-y-4">

                    <div>
                        <label className="text-xs uppercase text-gray-600">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border-b border-gray-300 focus:border-purple-600 outline-none py-2"
                        />
                    </div>

                    <div>
                        <label className="text-xs uppercase text-gray-600">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full border-b border-gray-300 focus:border-purple-600 outline-none py-2"
                        />
                    </div>

                    <div>
                        <label className="text-xs uppercase text-gray-600">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full border-b border-gray-300 focus:border-purple-600 outline-none py-2"
                        />
                    </div>

                    {/* checkbox */}
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <input
                            type="checkbox"
                            name="confirm"
                            checked={formData.confirm}
                            onChange={handleChange}
                            className="accent-purple-600"
                        />
                        <span>
                            I agree to Terms and Privacy Policy
                        </span>
                    </div>

                    {/* buttons */}
                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="w-full border border-purple-600 text-purple-700 py-2 rounded-md hover:bg-purple-50 transition"
                    >
                        Log In
                    </button>
                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
                        disabled={loading || !formData.email || !formData.username || !formData.password || !formData.confirm}
                    >
                        {loading ? "Creating account..." : "Sign Up"}
                    </button>
                </form>
            </div>
        </div>
    );
}