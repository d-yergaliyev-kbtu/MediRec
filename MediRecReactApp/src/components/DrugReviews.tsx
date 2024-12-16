import {useEffect, useState} from "react";
import {DrugReview} from "../types/DrugReview.tsx";
import axios from "axios";
import {API_ENDPOINTS} from "../config/api.ts";

type PaginatedDrugReviewsProps = {
    drugId: number;
};

function DrugReviews({ drugId }: PaginatedDrugReviewsProps) {
    const [reviews, setReviews] = useState<DrugReview[]>([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${API_ENDPOINTS.GET_DRUGS_BASE}/${drugId}/Reviews`, {
                    params: {
                        pageNumber,
                        pageSize,
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
    }, [drugId, pageNumber, pageSize]);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setPageNumber(page);
        }
    };

    const renderPageNumbers = () => {
        const pages = [];
        if (pageNumber > 1) {
            pages.push(pageNumber - 1);
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

        return pages.map((page, index) => (
            <button
                key={index}
                onClick={() => handlePageChange(page as number)}
                className={`p-2 text-blue-500 cursor-pointer hover:bg-gray-300 ${
                    page === pageNumber ? "font-bold underline" : ""
                }`}
            >
                {page}
            </button>
        ));
    };

    return (
        <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-4">Drug Reviews</h2>
            {loading ? (
                <div>Loading reviews...</div>
            ) : reviews.length === 0 ? (
                <div>No reviews available.</div>
            ) : (
                <div className="space-y-4">
                    {reviews.map((review) => (
                        <div key={review.id} className="p-4 border border-gray-300 rounded shadow-sm">
                            <div className="text-sm text-gray-500 mb-2">
                                {new Date(review.date).toLocaleDateString()}
                            </div>
                            <div className="text-gray-800">{review.review}</div>
                            <div className="mt-2 text-right text-blue-600">
                                Rating: <strong>{review.rating}</strong>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div className="flex justify-between items-center mt-4">
                <div className="flex space-x-2">{renderPageNumbers()}</div>
                <div>
                    <label htmlFor="pageSize" className="mr-2">
                        Page Size:
                    </label>
                    <input
                        id="pageSize"
                        type="number"
                        min="1"
                        value={pageSize}
                        onChange={(e) => setPageSize(parseInt(e.target.value, 10))}
                        className="p-1 border border-gray-300 rounded w-20 text-center"
                    />
                </div>
            </div>
        </div>
    );
}

export default DrugReviews;
