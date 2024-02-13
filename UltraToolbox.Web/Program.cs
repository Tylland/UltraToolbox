
var options = new WebApplicationOptions();

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
//builder.Services.AddChecksumService();
//builder.Services.ConfigureSegmentProfileRepository(builder.Configuration);

builder.Services.AddControllers()
    .AddJsonOptions(opt => opt.JsonSerializerOptions.PropertyNamingPolicy = null);

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactCorsPolicy", builder =>
    {
        builder.WithOrigins("http://localhost:5173") // Adjust to match your React app's URL
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors("ReactCorsPolicy"); // Apply CORS policy


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();

app.UseAuthorization();

app.UseStaticFiles();
//app.MapFallbackToFile("dist/index.html");

app.MapControllers();


app.Run();
