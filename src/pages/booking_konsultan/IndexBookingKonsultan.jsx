import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BookingMasuk = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBookings = async () => {
        try {
            const token = localStorage.getItem("accessToken");

            const response = await axios.get(
                `${import.meta.env.VITE_REACT_APP_API_URL}/api/bookings/konsultan`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setBookings(response.data.data);
        } catch (error) {
            console.error("Gagal mengambil data bookings:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    return (
        <div className="container py-4">
            <div className="pagetitle">
                <h1>Booking Masuk</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/dashboard/konsultan">Home</Link></li>
                        <li className="breadcrumb-item active">Booking Masuk</li>
                    </ol>
                </nav>
            </div>

            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Data Booking Masuk</h5>

                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Tanggal</th>
                                    <th>Jam</th>
                                    <th>UMKM</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((booking, index) => (
                                    <tr key={booking.id}>
                                        <td>{index + 1}</td>
                                        <td>{booking.schedule?.date}</td>
                                        <td>{booking.schedule?.time}</td>
                                        <td>{booking.umkm?.name || '-'}</td>
                                        <td>
                                            <span className={`badge ${booking.status === 'pending' ? 'bg-warning' : 'bg-success'}`}>
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

export default BookingMasuk;
