import React, { useState } from "react";
import axios from "axios";
import authConfig from "../config/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const Login = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
        const response = await axios.post(authConfig.loginEndpoint, form);
        const token = response.data.result.token;
        const user = response.data.result.user;

        if (!token) throw new Error("Token tidak ditemukan");


        localStorage.setItem(authConfig.storageTokenKeyName, token);
        localStorage.setItem("userRole", user.role);
        localStorage.setItem("userName", user.name);
        localStorage.setItem("userRole", user.role);

        if (user.role === "admin") {
            navigate("/dashboard/admin");
        } else if (user.role === "umkm") {
            navigate("/dashboard/umkm");
        } else if (user.role === "konsultan") {
            navigate("/dashboard/konsultan");
        } else {
            setError("Role tidak dikenal");
        }

    } catch (err) {
        console.error("Login error:", err);
        setError("Email atau password salah atau token tidak valid");
    } finally {
        setLoading(false);
    }
};



    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-white">
            <div
                className="login-container w-100"
                style={{
                    maxWidth: "400px",
                    padding: "20px",
                    background: "white",
                    borderRadius: "8px",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                    textAlign: "center"
                }}
            >
                <h3 className="login-title fw-bold mb-4" style={{ color: "#000000" }}>
                    Silakan Masuk
                </h3>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3 text-start">
                        <label htmlFor="email" className="form-label" style={{ color: "#000000" }}>
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            required
                            autoFocus
                            value={form.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4 text-start">
                        <label htmlFor="password" className="form-label" style={{ color: "#000000" }}>
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            required
                            value={form.password}
                            onChange={handleChange}
                        />
                    </div>

                    {error && <div className="text-danger mb-3">{error}</div>}

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        style={{ backgroundColor: "#012970", border: "none" }}
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Login"}
                    </button>
                    <div className="mt-3 text-center">
                    <span style={{ color: "#000000" }}>
                        Belum punya akun?{" "}
                        <Link to="/register" className="text-primary text-decoration-none fw-semibold">
                        Daftar di sini
                        </Link>
                    </span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
