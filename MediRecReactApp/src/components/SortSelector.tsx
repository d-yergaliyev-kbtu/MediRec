export type SortOption = {
    label: string;
    value: {
        sortColumn: string;
        sortDirection: "asc" | "desc";
    };
};

type SortSelectorProps = {
    sortOptions: SortOption[];
    selectedSort: { sortColumn: string; sortDirection: "asc" | "desc" };
    onSortChange: (sortColumn: string, sortDirection: "asc" | "desc") => void;
};

const SortSelector = ({ sortOptions, selectedSort, onSortChange }: SortSelectorProps) => {
    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = sortOptions.find((option) => option.label === e.target.value);
        if (selectedOption) {
            onSortChange(selectedOption.value.sortColumn, selectedOption.value.sortDirection);
        }
    };

    return (
        <div>
            <label htmlFor="sortSelector" className="mr-2">
                Sort By:
            </label>
            <select
                id="sortSelector"
                value={sortOptions.find(
                    (option) =>
                        option.value.sortColumn === selectedSort.sortColumn &&
                        option.value.sortDirection === selectedSort.sortDirection
                )?.label || ""}
                onChange={handleSortChange}
                className="p-1 border border-gray-300 rounded"
            >
                {sortOptions.map((option) => (
                    <option key={option.label} value={option.label}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SortSelector;