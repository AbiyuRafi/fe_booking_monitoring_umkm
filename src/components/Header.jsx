import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Header = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: "Yakin ingin keluar?",
      text: "Anda akan diarahkan ke halaman login.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#012970",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, keluar!",
      cancelButtonText: "Batal"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        Swal.fire({
          icon: "success",
          title: "Berhasil Keluar",
          text: "Anda berhasil keluar.",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          navigate("/login");
        });
      }
    });
  };

  return (
    <header
      id="header"
      className="header fixed-top d-flex align-items-center bg-white shadow-sm"
      style={{ height: "60px", padding: "0 1.5rem", zIndex: 1000 }}
    >
      {/* Logo & Sidebar Toggle */}
      <div className="d-flex align-items-center justify-content-between me-3">
        <a href="#" className="logo d-flex align-items-center text-decoration-none">
          <img src="/assets/img/logo.png" alt="Logo" style={{ height: "40px" }} />
          <span className="d-none d-lg-block fw-bold ms-2 text-dark">TemuKonsultan</span>
        </a>
        <i className="bi bi-list toggle-sidebar-btn ms-3 fs-4 text-dark cursor-pointer"></i>
      </div>

      {/* Search Bar */}
      <div className="search-bar d-none d-md-block ms-3">
        <form className="search-form d-flex align-items-center" method="POST" action="#">
          <input
            type="text"
            name="query"
            placeholder="Search"
            title="Enter search keyword"
            className="form-control form-control-sm"
          />
          <button type="submit" className="btn btn-sm btn-light ms-2" title="Search">
            <i className="bi bi-search"></i>
          </button>
        </form>
      </div>

      {/* Navbar Right */}
      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center list-unstyled mb-0">
          <li className="nav-item dropdown pe-3">
            <a
              className="nav-link nav-profile d-flex align-items-center pe-0 text-decoration-none"
              href="#"
              data-bs-toggle="dropdown"
            >
              <img
                src="/assets/img/profile-img.jpg"
                alt="Profile"
                className="rounded-circle"
                style={{ width: "32px", height: "32px", objectFit: "cover" }}
              />
              <span className="d-none d-md-block dropdown-toggle ps-2 text-dark">
                {userName || "Guest"}
              </span>
            </a>

            {/* Dropdown Menu */}
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
              <li className="dropdown-header text-center">
                <strong>{userName || "Guest"}</strong>
                <div className="text-muted small">User</div>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li>
                <button
                  className="dropdown-item d-flex align-items-center"
                  onClick={handleLogout}
                >
                  <i className="bi bi-box-arrow-right me-2"></i>
                  <span>Sign Out</span>
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
