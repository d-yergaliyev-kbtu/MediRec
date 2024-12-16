namespace MediRecAPI.Models;

public class DrugModel
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int ReviewsCount { get; set; }
    public double AverageRating { get; set; }
}