namespace MediRecAPI.Data.Entities;

public class DrugReview
{
    public int Id { get; set; }
    public string DrugName { get; set; }
    public string Condition { get; set; }
    public string Review { get; set; }
    public double Rating { get; set; }
    public int UsefulCount { get; set; }
    public DateTime? Date { get; set; }
    
    public int DrugId { get; set; }
    public Drug Drug { get; set; }
}