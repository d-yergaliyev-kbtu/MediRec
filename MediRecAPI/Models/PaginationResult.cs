namespace MediRecAPI.Models;

public class PaginationResult<T>
{
    public IEnumerable<T> Items { get; set; }
    public int TotalRowCount { get; set; }
}