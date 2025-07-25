import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

    export default function AdminDashboard() {
        const [stats, setStats] = useState({
            umkm: 0,
            konsultan: 0,
            booking: {
            weekly: 0,
            monthly: 0,
            },
        });

    useEffect(() => {
        const fetchData = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/dashboard/admin`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            });
            setStats(res.data);
        } catch (err) {
            console.error("Gagal mengambil data dashboard:", err);
        }
        };

        fetchData();
    }, []);

    const userChartData = {
        labels: ["UMKM", "Konsultan"],
        datasets: [
        {
            label: "Jumlah User",
            data: [stats.umkm, stats.konsultan],
            backgroundColor: ["#36b9cc", "#f6c23e"],
            borderRadius: 5,
        },
        ],
    };

    const bookingChartData = {
        labels: ["Booking Mingguan", "Booking Bulanan"],
        datasets: [
        {
            label: "Jumlah Booking",
            data: [stats.booking.weekly, stats.booking.monthly],
            backgroundColor: ["#4e73df", "#1cc88a"],
            borderRadius: 5,
        },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
        legend: {
            display: false,
        },
        },
    };

    return (
        <div>
        <h2 className="mb-4 fw-bold">Dashboard Admin</h2>

        <div className="row mb-4">
            <div className="col-md-4">
            <div className="card shadow-sm">
                <div className="card-body">
                <h5 className="card-title">Total UMKM</h5>
                <p className="card-text fs-4 fw-semibold">{stats.umkm}</p>
                </div>
            </div>
            </div>

            <div className="col-md-4">
            <div className="card shadow-sm">
                <div className="card-body">
                <h5 className="card-title">Total Konsultan</h5>
                <p className="card-text fs-4 fw-semibold">{stats.konsultan}</p>
                </div>
            </div>
            </div>

            <div className="col-md-4">
            <div className="card shadow-sm">
                <div className="card-body">
                <h5 className="card-title">Booking Bulan Ini</h5>
                <p className="card-text fs-4 fw-semibold">{stats.booking.monthly}</p>
                </div>
            </div>
            </div>
        </div>

        
        <div className="card shadow-sm mb-4">
            <div className="card-body">
            <h5 className="card-title">Grafik Jumlah UMKM dan Konsultan</h5>
            <Bar data={userChartData} options={chartOptions} />
            </div>
        </div>

        <div className="card shadow-sm">
            <div className="card-body">
            <h5 className="card-title">Grafik Booking Mingguan dan Bulanan</h5>
            <Bar data={bookingChartData} options={chartOptions} />
            </div>
        </div>
        </div>
    );
}
