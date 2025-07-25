import React, { useState } from "react";
import axios from "axios";
import authConfig from "../config/auth";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "umkm"
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
            const response = await axios.post(authConfig.registerEndpoint, form);
            if (response.status === 201) {
                Swal.fire({
                    title: "Registrasi Berhasil!",
                    text: "Silakan login untuk melanjutkan.",
                    icon: "success",
                    confirmButtonColor: "#012970",
                    confirmButtonText: "OK"
                }).then(() => {
                    navigate("/login");
                });
            }
        } catch (err) {
            console.error("Register error:", err);
            setError(
                err.response?.data?.message ||
                "Terjadi kesalahan saat registrasi"
            );
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-white">
            <div
                className="register-container w-100"
                style={{
                    maxWidth: "400px",
                    padding: "20px",
                    background: "white",
                    borderRadius: "8px",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                    textAlign: "center"
                }}
            >
                <h3 className="fw-bold mb-4" style={{ color: "#000000" }}>
                    Daftar Akun
                </h3>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3 text-start">
                        <label htmlFor="name" className="form-label" style={{ color: "#000000" }}>
                            Nama Lengkap
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            required
                            value={form.name}
                            onChange={handleChange}
                        />
                    </div>

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
                            value={form.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3 text-start">
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

                    <div className="mb-4 text-start">
                        <label htmlFor="role" className="form-label" style={{ color: "#000000" }}>
                            Daftar Sebagai
                        </label>
                        <select
                            className="form-select"
                            id="role"
                            name="role"
                            value={form.role}
                            onChange={handleChange}
                        >
                            <option value="umkm">UMKM</option>
                            <option value="konsultan">Konsultan</option>
                        </select>
                    </div>

                    {error && <div className="text-danger mb-3">{error}</div>}

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        style={{ backgroundColor: "#012970", border: "none" }}
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Daftar"}
                    </button>

                    <div className="mt-3 text-center">
                        <span style={{ color: "#000000" }}>
                            Sudah punya akun?{" "}
                            <Link to="/login" className="text-primary text-decoration-none fw-semibold">
                                Masuk di sini
                            </Link>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
