using System.Linq.Expressions;
using MediRecAPI.Data.Entities;
using MediRecAPI.Models;
using MediRecAPI.RequestModels;
using Microsoft.EntityFrameworkCore;

namespace MediRecAPI.Data.Repositories;

public class DrugReviewRepository
{
    private readonly AppDbContext _context;

    public DrugReviewRepository(AppDbContext context)
    {
        _context = context;
    }

    public PaginationResult<DrugReviewModel> GetDrugReviews(int drugId, BasePageRequest pageRequest)
    {
        var query = _context.DrugReviews
            .Where(dr => dr.DrugId == drugId)
            .Select(drugReview => new DrugReviewModel()
            {
                Id = drugReview.Id,
                DrugName = drugReview.DrugName,
                Review = drugReview.Review,
                Condition = drugReview.Condition,
                Rating = drugReview.Rating,
                UsefulCount = drugReview.UsefulCount,
                Date = drugReview.Date
            });

        if (!string.IsNullOrEmpty(pageRequest.SearchQuery))
        {
            query = query.Where(x => x.Review.Contains(pageRequest.SearchQuery)); 
        }
        
        query = pageRequest.SortDirection.ToLower() == "asc"
            ? query.OrderBy(GetSortExpression(pageRequest.SortColumn))
            : query.OrderByDescending(GetSortExpression(pageRequest.SortColumn));

        var items = query
            .Skip((pageRequest.PageNumber - 1) * pageRequest.PageSize)
            .Take(pageRequest.PageSize)
            .ToList();

        var totalRowCount = query.Count();

        return new PaginationResult<DrugReviewModel>()
        {
            Items = items,
            TotalRowCount = totalRowCount,
        };
        
    }
    
    private static Expression<Func<DrugReviewModel, object>> GetSortExpression(string sortColumn)
    {
        return sortColumn.ToLower() switch
        {
            "review" => x => x.Review,
            "date" => x => x.Date,
            _ => x => x.Id, // Default sort by Id if no match
        };
    }
}