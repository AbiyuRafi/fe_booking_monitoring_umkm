import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const BookingCreate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [schedule, setSchedule] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchSchedule = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_REACT_APP_API_URL}/api/schedule/available`
            );
            const selected = response.data.data.find((item) => item.id === id);
            setSchedule(selected);
        } catch (error) {
            console.error("Gagal mengambil data schedule:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleBooking = async () => {
        const token = localStorage.getItem("accessToken");

        try {
            await axios.post(
                `${import.meta.env.VITE_REACT_APP_API_URL}/api/bookings`,
                { schedule_id: id },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            Swal.fire({
                icon: "success",
                title: "Booking berhasil!",
                text: "Silakan menunggu konfirmasi dari konsultan.",
            });

            navigate("/dashboard/umkm");
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Gagal booking",
                text: error?.response?.data?.message || "Terjadi kesalahan.",
            });
        }
    };

    useEffect(() => {
        fetchSchedule();
    }, []);

    if (loading) return <div className="text-center mt-5">Memuat data jadwal...</div>;
    if (!schedule) return <div className="text-center mt-5 text-danger">Jadwal tidak ditemukan atau sudah dibooking.</div>;

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow-lg border-0 mt-5">
                        <div className="card-header text-white d-flex align-items-center justify-content-between" style={{ backgroundColor: "#012970" }}>
                            <h5 className="mb-2">Konfirmasi Booking</h5>
                            <i className="bi bi-calendar-check-fill fs-4"></i>
                        </div>
                        <div className="card-body">
                            <p className="mb-2 mt-5"><strong>Tanggal:</strong> {schedule.date}</p>
                            <p className="mb-2"><strong>Jam:</strong> {schedule.time}</p>
                            <p className="mb-4"><strong>Konsultan:</strong> {schedule.konsultan?.name}</p>

                            <div className="d-grid">
                                <button
                                    className="btn btn-lg"
                                    onClick={handleBooking}
                                style={{ backgroundColor: "#a9a019ff", color: "white" }}>
                                    <i className="bi bi-check-circle-fill me-2"></i>
                                    Konfirmasi Booking
                                </button>
                            </div>
                        </div>
                        <div className="card-footer text-muted text-end">
                            Pastikan jadwal yang dipilih sudah sesuai.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingCreate;
