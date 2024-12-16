import React from "react";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
    return (
        <div className="w-64 h-full bg-gray-800 text-white p-4">
            {/* Logo or Brand */}
            <div className="p-6 bg-green-800">
                <h1 className="text-2xl font-bold">MediRec</h1>
            </div>

            {/* Navigation Links */}
            <nav className="flex-grow">
                <ul className="mt-4 space-y-2 px-4">
                    <li>
                        <Link to="/" className="block py-2 px-4 rounded hover:bg-gray-700">Home</Link>
                    </li>
                    <li>
                        <Link to="/drugs" className="block py-2 px-4 rounded hover:bg-gray-700">Drugs</Link>
                    </li>
                    <li>
                        <Link to="/about-us" className="block py-2 px-4 rounded hover:bg-gray-700">About Us</Link>
                    </li>
                    <li>
                        <Link to="/my-reviews" className="block py-2 px-4 rounded hover:bg-gray-700">My Reviews</Link>
                    </li>
                    <li>
                        <Link to="/contact" className="block py-2 px-4 rounded hover:bg-gray-700">Contact</Link>
                    </li>
                </ul>
            </nav>

            {/* Footer Section */}
            <div className="p-4 bg-green-800">
                <p className="text-xs text-gray-400">© {new Date().getFullYear()} My App</p>
            </div>
        </div>
    );
};

export default Sidebar;
