import {DrugReviewModel} from "../types/DrugReviewModel.tsx";

type DrugReviewCardProps = {
    review: DrugReviewModel;
};

function DrugReviewCard({ review }: DrugReviewCardProps) {
    return (
        <div className="p-6 border border-gray-400 shadow rounded-lg bg-white">

            <div className="flex">
                <div className="text-gray-500 mb-2">
                    {new Date(review.date).toLocaleDateString()}
                </div>
            </div>

            <div className="text-gray-800">{review.review}</div>

            <div className="mt-2 text-right text-blue-600">
                Rating: <strong>{parseFloat(review.rating.toFixed(2))}</strong>
            </div>
        </div>
    );
}

export default DrugReviewCard;