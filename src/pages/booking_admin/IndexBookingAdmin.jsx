import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BookingAdmin = () => {
    const [booking, setbooking] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchbooking = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/bookings`);
            setbooking(response.data.data || []);
        } catch (error) {
            console.error("Gagal mengambil data booking:", error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchbooking();
    }, []);

    return (
        <div className="container py-4">
        <div className="pagetitle">
            <h1>Manajemen booking</h1>
            <nav>
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/dashboard/admin">Home</Link></li>
                <li className="breadcrumb-item active">booking</li>
            </ol>
            </nav>
        </div>

        <div className="card">
            <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="card-title">Data booking</h5>
            </div>
            {loading ? (
        <p>Loading...</p>
        ) : (
        <table className="table table-striped">
            <thead>
            <tr>
                <th>No</th>
                <th>Nama UMKM</th>
                <th>Email</th>
                <th>Tanggal</th>
                <th>Waktu</th>
                <th>Status</th>
            </tr>
            </thead>
            <tbody>
            {booking.map((booking, index) => (
                <tr key={booking.id}>
                <td>{index + 1}</td>
                <td>{booking.umkm?.name || "-"}</td>
                <td>{booking.umkm?.email || "-"}</td>
                <td>{booking.schedule?.date || "-"}</td>
                <td>{booking.schedule?.time || "-"}</td>
                <td>
                    <span className={`badge ${
                    booking.status === 'pending' ? 'bg-warning' :
                    booking.status === 'approved' ? 'bg-success' :
                    booking.status === 'rejected' ? 'bg-danger' : 'bg-secondary'
                    }`}>
                    {booking.status}
                    </span>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        )}
        </div>
        </div>
        </div>
    );
};

export default BookingAdmin;
