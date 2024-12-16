using System.Linq.Expressions;
using MediRecAPI.Models;
using MediRecAPI.RequestModels;
using Microsoft.EntityFrameworkCore;

namespace MediRecAPI.Data.Repositories;

public class DrugRepository
{
    private readonly AppDbContext _context;

    public DrugRepository(AppDbContext context)
    {
        _context = context;
    }

    public DrugModel? GetDrugById(int id)
    {
        var drug = _context.Drugs
            .Where(x => x.Id == id)
            .Select(drug => new DrugModel
            {
                Id = drug.Id,
                Name = drug.Name,
            })
            .FirstOrDefault();

        if (drug != null)
        {
            var reviews = _context.DrugReviews.Where(review => review.DrugId == drug.Id);
            drug.ReviewsCount = reviews.Count();
            drug.AverageRating = reviews.Average(review => review.Rating);
        }
        
        return drug;
    }
    
    public PaginationResult<DrugModel> GetDrugs(BasePageRequest pageRequest)
    {
        var query = _context.Drugs
            .Select(drug => new DrugModel
            {
                Id = drug.Id,
                Name = drug.Name,
                ReviewsCount = _context.DrugReviews.Count(review => review.DrugId == drug.Id)
            });

        if (!string.IsNullOrEmpty(pageRequest.SearchQuery))
        {
            query = query.Where(x =>  x.Name.Contains(pageRequest.SearchQuery)); 
        }
        
        query = pageRequest.SortDirection.ToLower() == "asc"
            ? query.OrderBy(GetSortExpression(pageRequest.SortColumn))
            : query.OrderByDescending(GetSortExpression(pageRequest.SortColumn));

        var items = query
            .Skip((pageRequest.PageNumber - 1) * pageRequest.PageSize)
            .Take(pageRequest.PageSize)
            .ToList();

        var totalRowCount = query.Count();

        return new PaginationResult<DrugModel>()
        {
            Items = items,
            TotalRowCount = totalRowCount,
        };
    }
    
    private static Expression<Func<DrugModel, object>> GetSortExpression(string sortColumn)
    {
        return sortColumn.ToLower() switch
        {
            "name" => x => x.Name,
            "reviewscount" => x => x.ReviewsCount,
            _ => x => x.Id, // Default sort by Id if no match
        };
    }
}