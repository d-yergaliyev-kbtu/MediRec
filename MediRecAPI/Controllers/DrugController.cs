using MediRecAPI.Data.Repositories;
using MediRecAPI.RequestModels;
using MediRecAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace MediRecAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class DrugController : ControllerBase
{
    private readonly DrugRepository _drugRepository;
    private readonly DrugReviewRepository _drugReviewRepository;
    private readonly DrugService _drugService;

    public DrugController(
        DrugRepository drugRepository, 
        DrugReviewRepository drugReviewRepository, 
        DrugService drugService)
    {
        _drugRepository = drugRepository;
        _drugReviewRepository = drugReviewRepository;
        _drugService = drugService;
    }

    [HttpGet("List")]
    public IActionResult GetDrugs([FromQuery] BasePageRequest pageRequest)
    {
        pageRequest.SortColumn ??= "reviewsCount";
        pageRequest.SortDirection ??= "desc";
        
        var result = _drugRepository.GetDrugs(pageRequest);
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

    [HttpGet("{id:int}/Reviews/Summary")]
    public async Task<IActionResult> GetDrugReviewsSummary(int id, CancellationToken cancellationToken)
    {
        var summary = await _drugService.GetDrugReviewsSummaryAsync(id, cancellationToken);
        return Ok(summary);
    }
}