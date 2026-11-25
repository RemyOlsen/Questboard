using Microsoft.EntityFrameworkCore;
using Questboard.Api.Data;

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
    // TODO: only return quests for user/team, not all quests
    var quests = await db.Quests.ToListAsync();
    return Results.Ok(quests);
});

app.Run();