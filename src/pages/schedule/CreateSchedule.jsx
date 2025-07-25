import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const ScheduleCreate = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        date: "",
        time: "",
        konsultan_id: "",
    });

    const [konsultans, setKonsultans] = useState([]);

    const fetchKonsultans = async () => {
        try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/users/konsultan`);
        setKonsultans(response.data.result || []);
        } catch (error) {
        console.error("Gagal mengambil data konsultan:", error);
        }
    };

    useEffect(() => {
        fetchKonsultans();
    }, []);

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/api/schedule`, formData);
        Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "Jadwal berhasil dibuat!",
            confirmButtonColor: "#012970",
        }).then(() => {
            navigate("/index/schedule");
        });
        } catch (error) {
        console.error("Gagal membuat schedule:", error);
        Swal.fire({
            icon: "error",
            title: "Gagal",
            text: error.response?.data?.message || "Terjadi kesalahan.",
            confirmButtonColor: "#d33",
        });
        }
    };

    return (
        <div className="container py-4">
        <div className="pagetitle">
            <h1>Tambah Schedule</h1>
            <nav>
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="/">Home</a></li>
                <li className="breadcrumb-item"><a href="/dashboard/schedules">Schedules</a></li>
                <li className="breadcrumb-item active">Tambah</li>
            </ol>
            </nav>
        </div>

        <div className="card">
            <div className="card-body">
            <h5 className="card-title">Form Tambah Schedule</h5>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                <label className="form-label">Tanggal</label>
                <input
                    type="date"
                    className="form-control"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                />
                </div>
                <div className="mb-3">
                <label className="form-label">Jam</label>
                <input
                    type="time"
                    className="form-control"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                />
                </div>
                <div className="mb-3">
                <label className="form-label">Pilih Konsultan</label>
                <select
                    className="form-select"
                    name="konsultan_id"
                    value={formData.konsultan_id}
                    onChange={handleChange}
                    required
                >
                    <option value="">-- Pilih Konsultan --</option>
                    {konsultans.map((konsultan) => (
                    <option key={konsultan.id} value={konsultan.id}>
                        {konsultan.name}
                    </option>
                    ))}
                </select>
                </div>
                <button type="submit" className="btn text-white" style={{ backgroundColor: "#012970" }}>
                Simpan
                </button>
                <button type="button" className="btn text-white ms-2" style={{ backgroundColor: "#d90429" }} onClick={() => navigate("/index/schedule")}>
                Batal
                </button>
            </form>
            </div>
        </div>
        </div>
    );
};

export default ScheduleCreate;
