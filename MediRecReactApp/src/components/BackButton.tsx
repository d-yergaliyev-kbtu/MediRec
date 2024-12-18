import {IconChevronLeft} from "@tabler/icons-react";

export default function BackButton() {
    return (
        <div onClick={() => window.history.back()}
             className="group flex items-center gap-2 cursor-pointer">

            {/*text-gray-600 group-hover:text-blue-600 transition-transform group-hover:-translate-x-2*/}
            <IconChevronLeft size={32} />

            <span className={`text-gray-600 group-hover:text-blue-600 text-lg font-semibold`}>Go Back</span>
        </div>
    );
}