import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
    const navigate = useNavigate();
    const role = localStorage.getItem("userRole");

    const handleBack = () => {
        if (role === "admin") {
        navigate("/dashboard/admin");
        } else if (role === "umkm") {
        navigate("/dashboard/umkm");
        } else if (role === "konsultan") {
        navigate("/dashboard/konsultan");
        } else {
        navigate("/login");
        }
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light text-center">
        <h1 className="display-1 fw-bold" style={{ color: "#012970" }}>403</h1>
        <h3 className="mb-2 text-dark">Akses Ditolak</h3>
        <p className="text-muted mb-4">
            Anda tidak memiliki izin untuk mengakses halaman ini.
        </p>
        <button
            onClick={handleBack}
            className="btn btn-primary"
            style={{ backgroundColor: "#012970", border: "none" }}
        >
            Kembali ke Halaman Sebelumnya
        </button>
        </div>
    );
};

export default Unauthorized;
