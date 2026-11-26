using Microsoft.EntityFrameworkCore;
using Questboard.Api.Data;
using Questboard.Api.DTOs;
using Questboard.Api.Models;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("DefaultConnection")
    )
);
// CORS (Cross-Origin Resource Sharing) configuration
// This allows the frontend application running on a different origin (http://localhost:5173) to access the API without being blocked by the browser's same-origin policy.
builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173") // Frontend origin
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();
app.UseHttpsRedirection(); // Enable HTTPS redirection to ensure secure communication between the client and server.
app.UseCors("Frontend"); // Apply the CORS policy named "Frontend" to allow requests from the specified frontend origin.

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// Add a new endpoint to get all quests from the database
app.MapGet("/api/quests", async (AppDbContext db) =>
{
    // TODO: only return quests for user/team, not all quests in the db
    var quests = await db.Quests.ToListAsync();
    return Results.Ok(quests);
});

// POST to the database
app.MapPost("/api/quests", async (CreateQuestDto request, AppDbContext db) =>
{

    if (string.IsNullOrWhiteSpace(request.Title))
    {
        Console.WriteLine($"Error: Quest title is required");
        return Results.BadRequest("Quest title is required");
    }

    if (request.XpReward <= 0)
    {
        Console.WriteLine($"Error: XP reward must be greater than zero.");
        return Results.BadRequest("XP reward must be greater than zero.");
    }

    var quest = new Quest
    {
        Title = request.Title.Trim(),
        Description = request.Description?.Trim() ?? string.Empty,
        XpReward = request.XpReward,
    };

    Console.WriteLine(quest);
    db.Quests.Add(quest);

    await db.SaveChangesAsync();

    return Results.Created($"/api/quests{quest.Id}", quest);
});

// DELETE
app.MapDelete("api/quests/{id:int}", async (int id, AppDbContext db) =>
{
   var quest = await db.Quests.FindAsync(id);

   if (quest is null)
    {
        return Results.NotFound("Quest not found.");
    }

    db.Quests.Remove(quest);

    await db.SaveChangesAsync();

    return Results.NoContent(); 
});

app.Run();