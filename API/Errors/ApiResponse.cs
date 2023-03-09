using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Errors
{
    public class ApiResponse
    {
        public ApiResponse(int statusCode, string message = null)
        {
            StatusCode = statusCode;
            Message = message ?? GetDefaultMessagePerStatusCode(statusCode);
        }
 

        public int StatusCode { get; set; } 
        public string Message { get; set; }


        private string GetDefaultMessagePerStatusCode(int statusCode)
        {
            return statusCode switch{
                400 => "A bad request, you have made",
                401 => "Authorized, you are not",
                404 => "Resource found, It was not",
                500 => "Errors at dark side",
                _ => null
            };
        }        
    }
}