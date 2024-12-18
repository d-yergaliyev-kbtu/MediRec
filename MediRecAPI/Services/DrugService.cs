using MediRecAPI.Models;

namespace MediRecAPI.Services;

public class DrugService
{
    private readonly HttpClient _httpClient;

    public DrugService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<string> GetDrugReviewsSummaryAsync(int drugId, CancellationToken cancellationToken)
    {
        var response = await _httpClient.GetFromJsonAsync<DrugReviewsSummaryModel>($"http://localhost:8889/summarize_reviews/{drugId}", cancellationToken);

        return response.Summary;
    }
}