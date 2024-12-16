namespace MediRecAPI.Data.DataSeed;

public class DrugReviewCsvModel
{
    public string drugName { get; set; }
    public string condition { get; set; }
    public string review { get; set; }
    public string date { get; set; }
    public double rating { get; set; }
    public int usefulCount { get; set; }
}