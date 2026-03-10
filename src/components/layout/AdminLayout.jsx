import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AdminLayout() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();        // wait for logout
      navigate("/");         // redirect to homepage
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Admin Header */}
      <nav className="bg-gray-800 shadow-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            
            {/* Left Side */}
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link
                  to="/admin"
                  className="text-xl font-bold text-white tracking-wider"
                >
                  SHOE<span className="text-indigo-400">ADMIN</span>
                </Link>
              </div>

              <div className="ml-6 flex items-center space-x-4">
                <Link
                  to="/admin"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Dashboard
                </Link>

                {/* Redirects to dashboard instead of public store */}
                <Link
                  to="/store"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors inline-flex items-center"
                >
                  View Public Store
                  <svg
                    className="ml-1 w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 
                      002 2h10a2 2 0 002-2v-4M14 4h6m0 
                      0v6m0-6L10 14"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center">
              <div className="ml-3 relative flex items-center space-x-4">
                <div className="flex flex-col items-end">
                  <span className="text-sm font-medium text-white">
                    {currentUser?.username}
                  </span>
                  <span className="text-xs text-indigo-400 capitalize">
                    {currentUser?.role}
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  className="bg-gray-900 text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors border border-gray-700"
                >
                  Logout
                </button>
              </div>
            </div>

          </div>
        </div>
      </nav>

      {/* Admin Content Area */}
      <main className="flex-1 overflow-y-auto w-full">
        <Outlet />
      </main>
    </div>
  );
}