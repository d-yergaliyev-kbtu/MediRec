using MediRecAPI.Data;
using MediRecAPI.Data.DataSeed;
using MediRecAPI.Data.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<DrugRepository>();
builder.Services.AddScoped<DrugReviewRepository>();

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

var sqlConnectionString = builder.Configuration.GetConnectionString("LocalPostgresConnection");

builder.Services.AddDbContext<AppDbContext>(options =>
    {
        options.UseNpgsql(sqlConnectionString);
    }
);

var app = builder.Build();

var solutionRoot = Directory.GetParent(AppContext.BaseDirectory).Parent.Parent.Parent.Parent.FullName;
var trainDatasetCsvFilePath = Path.Combine(solutionRoot, "dataset", "drugsComTrain_raw.csv");

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    DatabaseSeeder.SeedDataFromCsv(context, trainDatasetCsvFilePath);
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("AllowAll");
app.MapControllers();
app.UseHttpsRedirection();

app.Run();