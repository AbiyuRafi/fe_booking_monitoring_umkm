import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState("");

    useEffect(() => {
        const storedRole = localStorage.getItem("userRole");
        if (!storedRole) {
        navigate("/login");
        } else {
        setRole(storedRole);
        }
    }, [navigate]);

    const linkClass = ({ isActive }) =>
        `nav-link d-flex align-items-center gap-2 py-2 px-3 rounded ${
        isActive ? "text-black" : "text-dark bg-light"
        }`;

    return (
        <aside className="sidebar bg-white shadow" style={{ width: "250px" }}>
        <ul className="sidebar-nav list-unstyled p-3">

            {/*Dashboard */}
            <li className="nav-item mb-2">
            <NavLink to={`/dashboard/${role}`} className={linkClass}>
                <i className="bi bi-grid"></i>
                <span>Dashboard</span>
            </NavLink>
            </li>


            {/* Admin */}
            {role === "admin" && (
            <>
                <li className="nav-item mb-2">
                <NavLink to="/index/schedule" className={linkClass}>
                    <i className="bi bi-calendar2-week"></i>
                    <span>Schedules</span>
                </NavLink>
                </li>
                <li className="nav-item mb-2">
                <NavLink to="/index/booking/admin" className={linkClass}>
                    <i className="bi bi-calendar-check"></i>
                    <span>Manajemen Booking</span>
                </NavLink>
                </li>
                <li className="nav-item mb-2">
                <NavLink to="/index/users" className={linkClass}>
                    <i className="bi bi-people"></i>
                    <span>Manajemen Users</span>
                </NavLink>
                </li>
            </>
            )}

            {/* UMKM */}
            {role === "umkm" && (
            <>
                <li className="nav-item mb-2">
                <NavLink to="/index/booking" className={linkClass}>
                    <i className="bi bi-calendar-plus"></i>
                    <span>Booking Konsultasi</span>
                </NavLink>
                </li>
            </>
            )}

            {/* Konsultan */}
            {role === "konsultan" && (
            <>
                <li className="nav-item mb-2">
                <NavLink to="/index/booking/konsultan" className={linkClass}>
                    <i className="bi bi-calendar3"></i>
                    <span>Booking Masuk</span>
                </NavLink>
                </li>
            </>
            )}

        </ul>
        </aside>
    );
};

export default Sidebar;
