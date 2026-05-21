import { useState } from "react";
import { api } from "../services/api";
import { setToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    async function handleLogin(e) {
        e.preventDefault();

        try {
            setLoading(true);
            const res = await api.post("/auth/login", {
                email: formData.email.trim().toLowerCase(),
                password: formData.password
            });

            if (res.success) {
                setToken(res.token);
                navigate("/dashboard");
            } else {
                alert(res.message);
            }
        } catch (err) {
            alert("Server error : " + err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-purple-50">

            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md border border-purple-100">

                <h2 className="text-2xl font-semibold text-center text-purple-700 mb-6">
                    Login
                </h2>

                <form onSubmit={handleLogin} className="space-y-4">

                    {/* email */}
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

                    {/* password */}
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

                    {/* buttons */}
                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
                        disabled={loading || !formData.email || !formData.password}
                    >
                        Log In
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/register")}
                        className="w-full border border-purple-600 text-purple-700 py-2 rounded-md hover:bg-purple-50 transition"
                    >
                        Sign Up
                    </button>

                </form>
            </div>
        </div>
    );
}