import React from "react";
import { Link } from "react-router-dom";
import {IconPillFilled} from "@tabler/icons-react";

const Sidebar: React.FC = () => {
    return (
        <div className="w-80 h-full bg-gray-800 text-white p-4">

            <div className="p-6 ">
                <h1 className="text-2xl font-bold">MediRec</h1>
            </div>


            <nav className="flex-grow">
                <ul className="mt-4 space-y-2 px-4">
                    <li className="flex gap-2 py-2 px-4 rounded hover:bg-gray-700">
                        <IconPillFilled/>
                        <Link to="/drugs">Drugs</Link>
                    </li>
                </ul>
            </nav>

            <div className="p-4 ">
                <p className="text-xs text-gray-400">© {new Date().getFullYear()} My App</p>
            </div>
        </div>
    );
};

export default Sidebar;
