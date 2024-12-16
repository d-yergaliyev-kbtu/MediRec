namespace MediRecAPI.RequestModels;

public class BasePageRequest
{
    public int PageNumber { get; set; } = 1;
    public int PageSize { get; set; } = 10;
    public string? SortColumn { get; set; }
    public string? SortDirection { get; set; }
    public string? SearchQuery { get; set; }
}