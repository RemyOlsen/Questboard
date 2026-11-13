using Microsoft.EntityFrameworkCore;
using Questboard.Api.Models;

namespace Questboard.Api.Data;

public class AppDbContext : DbContext
{
  public AppDbContext(DbContextOptions<AppDbContext> options) 
    : base (options)
  {  
  }

  public DbSet<Quest> Quests {get; set; }
}