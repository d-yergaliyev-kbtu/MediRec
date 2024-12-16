using MediRecAPI.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace MediRecAPI.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions options) : base(options) { }
    
    public DbSet<Drug> Drugs { get; set; }
    public DbSet<DrugReview> DrugReviews { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<DrugReview>()
            .HasOne(dr => dr.Drug)
            .WithMany(d => d.Reviews)
            .HasForeignKey(dr => dr.DrugId)
            .OnDelete(DeleteBehavior.Cascade);
        
        
    }
}