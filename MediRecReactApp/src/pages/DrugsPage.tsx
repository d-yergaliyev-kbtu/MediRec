import {useEffect, useState} from "react";
import {Drug} from "../types/Drug.tsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {API_ENDPOINTS} from "../config/api.ts";

function DrugsPage() {
    const navigate = useNavigate();
    const [data, setData] = useState<Drug[]>([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(15);
    const [totalPages, setTotalPages] = useState(1);
    const [sortColumn, setSortColumn] = useState<keyof Drug | null>('reviewsCount');
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
    const [searchQuery, setSearchQuery] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    API_ENDPOINTS.GET_DRUGS,
                    { params: { pageNumber, pageSize, sortColumn, sortDirection, searchQuery },
                });
                setData(response.data.items);
                setTotalPages(Math.ceil(response.data.totalRowCount / pageSize));
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetchData();
    }, [pageNumber, pageSize, sortColumn, sortDirection, searchQuery]);

    const handleSort = (column: keyof Drug) => {
        if (sortColumn === column) {
            setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
        } else {
            setSortColumn(column);
            setSortDirection("asc");
        }
    };

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setPageNumber(page);
        }
    };

    const handlePageSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value, 10);
        if (value > 0) { // Ensure pageSize is a positive number
            setPageSize(value);
            setPageNumber(1); // Reset to the first page when pageSize changes
        }
    };

    const handleSearchQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        setPageNumber(1);
    };

    const renderPageNumbers = () => {
        const pages = [];

        if (pageNumber > 1) {
            pages.push(pageNumber - 1, pageNumber - 1);
        }

        pages.push(pageNumber);

        for (let i = 1; i <= 3; i++) {
            if (pageNumber + i <= totalPages) {
                pages.push(pageNumber + i);
            }
        }

        if (pageNumber + 3 < totalPages) {
            pages.push("...");
            pages.push(totalPages);
        }

        return pages
            .filter((page, index, self) => self.indexOf(page) === index && typeof page === "number")
            .map((page) => (
                <button key={page} onClick={() => handlePageChange(page as number)}
                        className={`p-2 text-blue-500 text-lg cursor-pointer hover:bg-gray-300 hover:underline
                        ${page === pageNumber ? 'font-bold underline' : ''}`}>
                    {page}
                </button>
            ));
    };

    return (
        <div className={`px-6 py-6`}>
            <h1 className={`pl-2 mb-10 text-5xl font-semibold`}>Drugs</h1>
            <div className={`flex flex-col w-1/2`}>

                <div className="my-6 min-w-96">
                    <input
                        id="searchQuery" type="text" value={searchQuery} onChange={handleSearchQueryChange}
                        className="p-3 border border-blue-700 rounded min-w-96 placeholder-gray-700"
                        placeholder="Search drugs..."
                    />
                </div>

                <table className={``}>
                    <thead>
                    <tr>
                        <th className={`px-4 min-w-96 text-left py-2 text-xl`}
                            onClick={() => handleSort("name")} style={{cursor: "pointer"}}>
                            Drug Name {sortColumn === "name" ? (sortDirection === "asc" ? "\u2191" : "\u2193") : null}
                        </th>
                        <th className={`px-4 text-left py-2 text-xl`}
                            onClick={() => handleSort("reviewsCount")} style={{cursor: "pointer"}}>
                            Reviews {sortColumn === "reviewsCount" ? (sortDirection === "asc" ? "\u2191" : "\u2193") : null}
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((row) => (
                        <tr onClick={() => navigate(`/drug/${row.id}`)}
                            className={`group cursor-pointer hover:bg-gray-200`}
                            key={row.id}>
                            <td className={`px-4 py-2 text-lg group-hover:text-blue-600`}>{row.name}</td>
                            <td className={`px-4 py-2 text-lg`}>{row.reviewsCount}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className="flex mt-3 items-center justify-between">
                    <div className="flex space-x-2">{renderPageNumbers()}</div>
                    <div>
                        <label htmlFor="pageSize" className="mr-2 text-lg">
                            Page Size:
                        </label>
                        <input
                            id="pageSize"
                            type="number"
                            value={pageSize}
                            onChange={handlePageSizeChange}
                            className="p-2 border border-gray-300 rounded w-20 text-center"
                            min={1}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DrugsPage;