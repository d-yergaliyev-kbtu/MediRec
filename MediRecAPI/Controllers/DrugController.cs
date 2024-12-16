using MediRecAPI.Data.Repositories;
using MediRecAPI.Models;
using MediRecAPI.RequestModels;
using Microsoft.AspNetCore.Mvc;

namespace MediRecAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class DrugController : ControllerBase
{
    private readonly DrugRepository _drugRepository;
    private readonly DrugReviewRepository _drugReviewRepository;

    public DrugController(
        DrugRepository drugRepository, 
        DrugReviewRepository drugReviewRepository)
    {
        _drugRepository = drugRepository;
        _drugReviewRepository = drugReviewRepository;
    }

    [HttpGet("List")]
    public IActionResult GetDrugs([FromQuery] BasePageRequest pageRequest)
    {
        pageRequest.SortColumn ??= "reviewsCount";
        pageRequest.SortDirection ??= "desc";
        
        var result = _drugRepository.GetDrugsWithReviewCountsAsync(pageRequest);
        return Ok(result);
    }

    [HttpGet("{id:int}")]
    public IActionResult GetDrugById(int id)
    {
        var drug = _drugRepository.GetDrugById(id);
        if (drug == null)
        {
            return NotFound();
        }

        return Ok(drug);
    }
    
    [HttpGet("{id:int}/Reviews")]
    public IActionResult GetDrugReviews(int id, [FromQuery] BasePageRequest pageRequest)
    {
        pageRequest.SortColumn ??= "date";
        pageRequest.SortDirection ??= "desc";
        
        var reviews = _drugReviewRepository.GetDrugReviews(id, pageRequest); 
        return Ok(reviews);
    }
}