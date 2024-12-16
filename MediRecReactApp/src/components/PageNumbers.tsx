type PaginationProps = {
    pageNumber: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

function PageNumbers({ pageNumber, totalPages, onPageChange }: PaginationProps) {
    const getPageNumbers = () => {
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

        return pages.filter(
            (page, index, self) => self.indexOf(page) === index && typeof page === "number"
        );
    };

    return (
        <div className="flex space-x-2">
            {getPageNumbers().map((page, index) => (
                <button
                    key={index}
                    onClick={() => onPageChange(page as number)}
                    className={`p-2 text-blue-500 text-lg cursor-pointer hover:bg-gray-300 hover:underline ${
                        page === pageNumber ? "font-bold underline" : ""
                    }`}
                >
                    {page}
                </button>
            ))}
        </div>
    );
}

export default PageNumbers;