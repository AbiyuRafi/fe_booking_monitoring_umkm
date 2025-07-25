import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BookingList = () => {
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchSchedules = async () => {
        try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/schedule/available`);
        setSchedules(response.data.data);
        } catch (error) {
        console.error("Gagal mengambil data jadwal tersedia:", error);
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        fetchSchedules();
    }, []);

    return (
        <div className="container py-4">
        <div className="pagetitle">
            <h1>Jadwal Tersedia</h1>
            <nav>
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/dashboard/umkm">Home</Link></li>
                <li className="breadcrumb-item active">Booking</li>
            </ol>
            </nav>
        </div>

        <div className="card">
            <div className="card-body">
            <h5 className="card-title">Jadwal Konsultan yang Tersedia</h5>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="table table-striped">
                <thead>
                    <tr>
                    <th>No</th>
                    <th>Tanggal</th>
                    <th>Jam</th>
                    <th>Nama Konsultan</th>
                    <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {schedules.map((schedule, index) => (
                    <tr key={schedule.id}>
                        <td>{index + 1}</td>
                        <td>{schedule.date}</td>
                        <td>{schedule.time}</td>
                        <td>{schedule.konsultan?.name || '-'}</td>
                        <td>
                        <Link
                            to={`/booking/schedule/${schedule.id}`}
                            className="btn btn-sm text-white"
                            style={{ backgroundColor: "#012970" }}
                        >
                            Booking
                        </Link>
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

export default BookingList;
