import {useEffect, useState} from "react";
import axios from "axios";
import {API_ENDPOINTS} from "../config/api.ts";
import {IconLoader2} from "@tabler/icons-react";

type DrugReviewsSummaryProps = {
    drugId: number;
};

function DrugReviewsSummary({ drugId }: DrugReviewsSummaryProps) {
    const [reviewSummary, setReviewSummary] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchReviewsSummary = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${API_ENDPOINTS.GET_DRUGS_BASE}/${drugId}/Reviews/Summary`);

                setReviewSummary(response.data);
            } catch (err) {
                console.error("Error fetching reviews", err);
            } finally {
                setLoading(false);
            }
        };

        if (drugId) {
            fetchReviewsSummary();
        }
    }, [drugId]);

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Reviews Summary</h2>
            {!loading
                ?
                <div className={`lg:w-full xl:w-2/3 p-4 border border-red-600 rounded-md shadow`}>
                    <p>{reviewSummary}</p>
                </div>
                :
                <IconLoader2 className={`animate-spin`}/>
            }
        </div>
    );
}

export default DrugReviewsSummary;