// src/admin/AdminLayout.jsx
import React from "react";
import { CirclePlus } from 'lucide-react';
import { useNavigate } from "react-router-dom";


const AdminLayout = ({ children }) => {
    const navigate = useNavigate()
    const handleIconClick = () => {
        navigate('/admin/create-user')
    }
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex-shrink-0">
        <div className="p-4 text-2xl font-bold border-b border-gray-700">Admin</div>
        <nav className="flex flex-col p-4 space-y-2">
          <a href="/admin/dashboard" className="hover:bg-gray-700 p-2 rounded">Dashboard</a>
          <a href="/admin" className="hover:bg-gray-700 p-2 rounded">Users</a>
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col bg-gray-100">
        {/* Navbar */}
        <header className="bg-white shadow py-4 px-5 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Admin Panel</h1>
          <div><CirclePlus onClick={handleIconClick} /></div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>

        {/* Footer */}
        <footer className="bg-white shadow p-4 text-center text-sm text-gray-600">
          © 2025 Admin System
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;
