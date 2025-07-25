import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ScheduleList = () => {
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchSchedules = async () => {
        try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/schedule`);
        setSchedules(response.data.data); 
        } catch (error) {
        console.error("Gagal mengambil data schedule:", error);
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
            <h1>Schedules</h1>
            <nav>
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/dashboard/admin">Home</Link></li>
                <li className="breadcrumb-item active">Schedules</li>
            </ol>
            </nav>
        </div>

        <div className="card">
            <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="card-title">Data Schedule</h5>
                <Link to="/create/schedule" className="btn text-white" style={{ backgroundColor: "#012970" }}>
                + Tambah Schedule
                </Link>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="table table-striped">
                <thead>
                    <tr>
                    <th>No</th>
                    <th>Tanggal</th>
                    <th>Jam</th>
                    <th>Konsultan</th>
                    <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {schedules.map((schedule, index) => (
                    <tr key={schedule.id}>
                        <td>{index + 1}</td>
                        <td>{schedule.date}</td>
                        <td>{schedule.time}</td>
                        <td>{schedule.konsultan?.name || "-"}</td>
                        <td>
                        <span className={`badge ${schedule.is_booked ? 'bg-danger' : 'bg-success'}`}>
                            {schedule.is_booked ? 'Terbooking' : 'Tersedia'}
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

export default ScheduleList;
