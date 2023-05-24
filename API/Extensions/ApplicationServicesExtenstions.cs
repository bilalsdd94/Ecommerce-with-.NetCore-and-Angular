// using API.Errors;
// using Core.Interfaces;
// using Infrastructure;
// using Infrastructure.Data;
// using Microsoft.AspNetCore.Mvc;
// using Microsoft.EntityFrameworkCore;
// using Microsoft.OpenApi.Models;
// using StackExchange.Redis;
// //not using this class due to .net change will use it some other time
// namespace API.Extensions
// {
//     public static class ApplicationServicesExtenstions
//     {
//         public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config){
            
//             services.AddScoped<IProductRepository,ProductRepository>();   
//             services.AddScoped(typeof(IGenericRepository<>),(typeof(GenericRepository<>)));
//             services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
//             services.AddControllers();
//             services.AddDbContext<StoreContext>(x =>
//                 x.UseSqlite(config.GetConnectionString("DefaultConnection")));   

//             services.AddSingleton<IConnectionMultiplexer>(c => 
//             {
//                 var options = ConfigurationOptions.Parse(config.GetConnectionString("Redis"));
//                 return ConnectionMultiplexer.Connect(options);
//             });

//             services.AddSwaggerGen(c =>
//             {
//                 c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
//             });
//             services.Configure<ApiBehaviorOptions>(options => {
//                 options.InvalidModelStateResponseFactory = actionContext => 
//                 {
//                     var errors = actionContext.ModelState
//                         .Where(e => e.Value.Errors.Count > 0)
//                         .SelectMany(x => x.Value.Errors)
//                         .Select(x => x.ErrorMessage).ToArray();

//                     var errorResponse = new ApiValidationErrorResponse{
//                         Errors = errors
//                     };
//                     return new BadRequestObjectResult(errorResponse);
//                 };
//             });
            
//             return services;
//         }
//     }
// }