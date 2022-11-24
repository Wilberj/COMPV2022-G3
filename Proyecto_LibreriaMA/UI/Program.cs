using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();
builder.Services.AddControllers().SetCompatibilityVersion(CompatibilityVersion.Latest).AddJsonOptions(JsonOptions =>
                    JsonOptions.JsonSerializerOptions.PropertyNamingPolicy = null);
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(option =>
    {
        option.LoginPath = "/Acceso/Index";
        option.ExpireTimeSpan = TimeSpan.FromMinutes(20);
        option.AccessDeniedPath = "/Pages/Privacy";
    });
        

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();


app.UseEndpoints(endpoins =>
{
    endpoins.MapRazorPages();
    endpoins.MapControllers();
    endpoins.MapControllerRoute(
      name: "default",
     pattern: "{controller=Acceso}/{action=Index}"
     );

}
);

app.MapRazorPages();
app.MapControllers();

app.Run();
