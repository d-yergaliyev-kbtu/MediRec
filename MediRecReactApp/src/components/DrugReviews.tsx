import {useEffect, useState} from "react";
import {DrugReviewModel} from "../types/DrugReviewModel.tsx";
import axios from "axios";
import {API_ENDPOINTS} from "../config/api.ts";
import DrugReviewCard from "./DrugReviewCard.tsx";
import PageNumbers from "./PageNumbers.tsx";
import PageSizeSelector from "./PageSizeSelector.tsx";
import SortSelector, {SortOption} from "./SortSelector.tsx";

const sortOptions: SortOption[] = [
    { label: "Most Recent", value: { sortColumn: "date", sortDirection: "desc" } },
    { label: "Oldest", value: { sortColumn: "date", sortDirection: "asc" } },
    { label: "Higher Rating", value: { sortColumn: "rating", sortDirection: "desc" } },
    { label: "Lower Rating", value: { sortColumn: "rating", sortDirection: "asc" } },
];

type PaginatedDrugReviewsProps = {
    drugId: number;
};

function DrugReviews({ drugId }: PaginatedDrugReviewsProps) {
    const [reviews, setReviews] = useState<DrugReviewModel[]>([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [sortColumn, setSortColumn] = useState<string>("date");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${API_ENDPOINTS.GET_DRUGS_BASE}/${drugId}/Reviews`, {
                    params: {
                        pageNumber,
                        pageSize,
                        sortColumn,
                        sortDirection
                    },
                });
                setReviews(response.data.items);
                setTotalPages(Math.ceil(response.data.totalRowCount / pageSize));
            } catch (err) {
                console.error("Error fetching reviews", err);
            } finally {
                setLoading(false);
            }
        };

        if (drugId) {
            fetchReviews();
        }
    }, [drugId, pageNumber, pageSize, sortColumn, sortDirection]);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setPageNumber(page);
        }
    };

    const handleSortChange = (column: string, direction: "asc" | "desc") => {
        setSortColumn(column);
        setSortDirection(direction);
        setPageNumber(1); // Reset to the first page on sort change
    };

    return (
        <div className="mt-6 w-2/3">
            <h2 className="text-2xl font-semibold mb-4">Drug Reviews</h2>

            <div className="flex justify-between items-center mb-4">
                <PageNumbers pageNumber={pageNumber} totalPages={totalPages} onPageChange={handlePageChange}/>

                <div className={`flex gap-4`}>
                    <SortSelector sortOptions={sortOptions} selectedSort={{ sortColumn, sortDirection }} onSortChange={handleSortChange}/>
                    <PageSizeSelector pageSize={pageSize} onPageSizeChange={(pageSize) => setPageSize(pageSize)}/>
                </div>
            </div>

            {loading ? (
                <div>Loading reviews...</div>
            ) : reviews.length === 0 ? (
                <div>No reviews available.</div>
            ) : (
                <div className="space-y-4">
                    {reviews.map((review) => (
                        <DrugReviewCard key={review.id} review={review}/>
                    ))}
                </div>
            )}

            <div className="flex justify-between items-center mt-4">
                <PageNumbers pageNumber={pageNumber} totalPages={totalPages} onPageChange={handlePageChange}/>

                <div className={`flex gap-4`}>
                    <SortSelector sortOptions={sortOptions} selectedSort={{sortColumn, sortDirection}}
                                  onSortChange={handleSortChange}/>
                    <PageSizeSelector pageSize={pageSize} onPageSizeChange={(pageSize) => setPageSize(pageSize)}/>
                </div>
            </div>
        </div>
    );
}

export default DrugReviews;
