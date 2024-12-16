using System.Globalization;
using CsvHelper;
using MediRecAPI.Data.Entities;

namespace MediRecAPI.Data.DataSeed;

public class DatabaseSeeder
{
    public static void SeedDataFromCsv(AppDbContext context, string csvFilePath)
    {
        if (!context.Drugs.Any())
        {
            Console.WriteLine("Seeding Drugs table...");

            using var reader = new StreamReader(csvFilePath);
            using var csv = new CsvReader(reader, CultureInfo.InvariantCulture);

            var drugReviewData = csv.GetRecords<DrugReviewCsvModel>().ToList();

            // Extract unique drug names and seed Drugs table
            var uniqueDrugNames = drugReviewData
                .Select(dr => dr.drugName.Trim().ToLower())
                .Distinct();

            foreach (var drugName in uniqueDrugNames)
            {
                context.Drugs.Add(new Drug { Name = drugName });
            }

            context.SaveChanges();
            Console.WriteLine("Drugs table seeding completed.");
        }
        
        if (!context.DrugReviews.Any())
        {
            Console.WriteLine("Seeding DrugReviews table...");

            using var reader = new StreamReader(csvFilePath);
            using var csv = new CsvReader(reader, CultureInfo.InvariantCulture);

            var drugReviewData = csv.GetRecords<DrugReviewCsvModel>().ToList();

            // Create a mapping of DrugName to DrugId
            var drugMap = context.Drugs.ToDictionary(d => d.Name.Trim().ToLower(), d => d.Id);

            foreach (var review in drugReviewData)
            {
                try
                {
                    if (string.IsNullOrWhiteSpace(review.drugName))
                    {
                        Console.WriteLine("Skipping review with missing DrugName.");
                        continue;
                    }
                    
                    if (drugMap.TryGetValue(review.drugName.Trim().ToLower(), out var drugId))
                    {
                        context.DrugReviews.Add(new DrugReview {
                            DrugId = drugId,
                            DrugName = review.drugName,
                            Condition = review.condition,
                            Review = review.review,
                            Rating = double.TryParse(review.rating.ToString(), out var rating) ? rating : 0.0,
                            Date = DateTime.TryParse(review.date, out var date) ? date.ToUniversalTime() : DateTime.UtcNow,
                            UsefulCount = review.usefulCount
                        });
                    }
                    else
                    {
                        Console.WriteLine($"Drug '{review.drugName}' not found.");
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error processing review: {ex.Message}");
                }
            }

            context.SaveChanges();
            Console.WriteLine("DrugReviews table seeding completed.");
        }
    }
}