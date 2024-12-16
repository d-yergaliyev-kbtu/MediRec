import React from "react";

const Navbar: React.FC = () => {
    return (
        <nav className="bg-green-600 text-white py-4 px-6 flex items-center justify-between">
            {/* Left Section - Tabs */}
            <div className="flex space-x-6">
                <a href="/about-us"  className="text-white hover:text-gray-300 text-lg font-medium">
                    About Us
                </a>
                <a href="/my-reviews" className="text-white hover:text-gray-300 text-lg font-medium">
                    My Reviews
                </a>
            </div>

            {/* Center Section - Search Bar */}
            <div className="w-1/3">
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full py-2 px-4 rounded bg-gray-700 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Right Section - Profile Image */}
            <div>
                <img
                    src="https://via.placeholder.com/40" // Replace with dynamic image URL
                    alt="Profile"
                    className="w-10 h-10 rounded-full border-2 border-blue-500"
                />
            </div>
        </nav>
    );
};

export default Navbar;
