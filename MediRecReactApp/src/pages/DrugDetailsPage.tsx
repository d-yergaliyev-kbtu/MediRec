import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DrugModel } from "../types/DrugModel.tsx";
import { API_ENDPOINTS } from "../config/api.ts";
import BackButton from "../components/BackButton.tsx";
import DrugReviews from "../components/DrugReviews.tsx";
import DrugReviewsSummary from "../components/DrugReviewsSummary.tsx";

function DrugDetailPage() {
    const { id } = useParams<{ id: string }>(); // Retrieve the 'id' parameter from the URL
    const [drug, setDrug] = useState<DrugModel | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDrug = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${API_ENDPOINTS.GET_DRUGS_BASE}/${id}`);
                setDrug(response.data);
            } catch (err) {
                console.error("Error fetching drug data", err);
                setError("Failed to fetch drug data.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchDrug();
        }
    }, [id]);

    if (loading) {
        return <div className="p-4 text-center">Loading...</div>;
    }

    if (error) {
        return <div className="p-4 text-center text-red-500">{error}</div>;
    }

    if (!drug) {
        return <div className="p-4 text-center text-gray-500">No drug found.</div>;
    }

    return (
        <div className="p-6">

            <BackButton/>

            <h1 className="my-8 text-5xl font-bold mb-4">{drug.name}</h1>

            <div className="mt-8 mb-12 text-xl text-blue-600">
                Rating: <strong>{parseFloat(drug.averageRating.toFixed(2))} / 10</strong>
            </div>

            <DrugReviewsSummary drugId={parseInt(id || "0", 10)}/>

            <DrugReviews drugId={parseInt(id || "0", 10)} reviewsCount={drug.reviewsCount}/>
        </div>
    );
}

export default DrugDetailPage;