import {useEffect, useState} from "react";
import {DrugModel} from "../types/DrugModel.tsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {API_ENDPOINTS} from "../config/api.ts";
import PageNumbers from "../components/PageNumbers.tsx";
import PageSizeSelector from "../components/PageSizeSelector.tsx";

function DrugsPage() {
    const navigate = useNavigate();
    const [data, setData] = useState<DrugModel[]>([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(15);
    const [totalPages, setTotalPages] = useState(1);
    const [sortColumn, setSortColumn] = useState<keyof DrugModel | null>('reviewsCount');
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

    const handleSort = (column: keyof DrugModel) => {
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

    const handleSearchQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        setPageNumber(1);
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

                {data.length <= 15 ?
                    (<></>) :
                    (
                        <div className="flex mb-3 items-center justify-between">
                            <PageNumbers pageNumber={pageNumber} totalPages={totalPages}
                                         onPageChange={handlePageChange}/>
                            <PageSizeSelector pageSize={pageSize}
                                              onPageSizeChange={(pageSize) => setPageSize(pageSize)}/>
                        </div>
                    )
                }

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
                    <PageNumbers pageNumber={pageNumber} totalPages={totalPages} onPageChange={handlePageChange}/>
                    <PageSizeSelector pageSize={pageSize} onPageSizeChange={(pageSize) => setPageSize(pageSize)}/>
                </div>
            </div>
        </div>
    );
}

export default DrugsPage;