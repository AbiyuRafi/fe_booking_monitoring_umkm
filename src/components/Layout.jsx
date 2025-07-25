import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
    return (
        <div>
        <Header />
        <div className="d-flex" style={{ marginTop: "60px" }}>
            <Sidebar />
            <main style={{ padding: "1.5rem", marginLeft: "250px", width: "100%" }}>
            {children}
            </main>
        </div>
        </div>
    );
}
