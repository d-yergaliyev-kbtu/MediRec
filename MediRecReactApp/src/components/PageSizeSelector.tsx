type PageSizeSelectorProps = {
    pageSize: number;
    onPageSizeChange: (size: number) => void;
};

function PageSizeSelector({ pageSize, onPageSizeChange }: PageSizeSelectorProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        if (value > 0) {
            onPageSizeChange(value);
        }
    };

    return (
        <div>
            <label htmlFor="pageSize" className="mr-2">
                Page Size:
            </label>
            <input
                id="pageSize"
                type="number"
                min="1"
                value={pageSize}
                onChange={handleChange}
                className="p-1 border border-gray-300 rounded w-20 text-center"
            />
        </div>
    );
}

export default PageSizeSelector;
