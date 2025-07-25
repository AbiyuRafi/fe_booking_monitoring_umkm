import React from "react";

export default function KonsultanDashboard() {
    const userName = localStorage.getItem("userName");

    return (
        <div className="container py-4">
        <div className="shadow p-5 rounded bg-white">
            <h2 className="fw-bold mb-3">Dashboard Konsultan</h2>
            <h4 className="text-muted">Selamat Datang, {userName}!</h4>
        </div>
        </div>
    );
}
