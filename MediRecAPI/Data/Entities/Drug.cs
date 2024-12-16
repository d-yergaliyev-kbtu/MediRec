namespace MediRecAPI.Data.Entities;

public class Drug
{
    public int Id { get; set; }
    public string Name { get; set; }
    
    public ICollection<DrugReview> Reviews { get; set; }
}