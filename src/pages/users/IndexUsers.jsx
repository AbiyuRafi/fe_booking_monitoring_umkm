import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ManagementUser = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/users`);
            setUsers(response.data.result || []);

        } catch (error) {
        console.error("Gagal mengambil data user:", error);
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="container py-4">
        <div className="pagetitle">
            <h1>Manajemen User</h1>
            <nav>
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/dashboard/admin">Home</Link></li>
                <li className="breadcrumb-item active">Users</li>
            </ol>
            </nav>
        </div>

        <div className="card">
            <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="card-title">Data User</h5>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="table table-striped">
                <thead>
                    <tr>
                    <th>No</th>
                    <th>Nama</th>
                    <th>Email</th>
                    <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                    <tr key={user.id}>
                        <td>{index + 1}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
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

export default ManagementUser;
