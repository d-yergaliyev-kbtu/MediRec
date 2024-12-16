import {ChevronLeftIcon} from "@heroicons/react/24/solid";

export default function BackButton() {
    return (
        <div onClick={() => window.history.back()}
            className="group flex items-center gap-2 cursor-pointer">

            <ChevronLeftIcon className={`size-8 text-gray-600 group-hover:text-blue-600 transition-transform group-hover:-translate-x-2`}/>

            <span className={`text-gray-600 group-hover:text-blue-600 text-lg font-semibold`}>Go Back</span>
        </div>
    );
}