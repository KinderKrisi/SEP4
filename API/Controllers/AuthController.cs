using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly CinemaContext _context;

        public AuthController(CinemaContext context)
        {
            _context = context;

            if (_context.Users.Count() == 0)
            {
                _context.Users.Add(new User { Email = "mail@m.com", Password = "martin", FirstName = "Martin", LastName = "Krisko", PhoneNumber = "71398977", Role = "admin" });
                _context.SaveChanges();
            }
        }
        /*
        [HttpGet(Name = "login")]
        public ActionResult<bool> LoginResult(string email, string password)
        {
            var result = CheckUser(email, password);
            return result;
        }
        */

        private bool CheckUser(string email, string password)
        {
            var result = _context.Users.FirstOrDefault(x => x.Email == email && x.Password == password);

            if (result != null)
            {
                return true;
            }
            return false;
        }
        
        [HttpPost("token")]
        public IActionResult Token()
        {
            //string tokenString = "test";
            var header = Request.Headers["Authorization"];
            if (header.ToString().StartsWith("Basic"))
            {
                var credValue = header.ToString().Substring("Basic ".Length).Trim();
                var userNameandPassEnc = Encoding.UTF8.GetString(Convert.FromBase64String(credValue)); // admin: pass
                var userNameAndPass = userNameandPassEnc.Split(":");

                //check in the DB user name and pass exist
                if (CheckUser(userNameAndPass[0], userNameAndPass[1]))
                {
                    var claimsData = new[] { new Claim(ClaimTypes.Name, userNameAndPass[0]) };
                    var key = new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes("sxdcfgvbjhnmasaesrxedtcfvygbuhnijhbgvyfctdrxsxecrvtbynasuvtaug"));
                    var signCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);
                    var token = new JwtSecurityToken(
                        issuer: "http://localhost:4200",
                        audience: "http://localhost:4200",
                        expires: DateTime.Now.AddMinutes(1),
                        claims: claimsData,
                        signingCredentials: signCredentials
                    );
                    var tokenString = new JwtSecurityTokenHandler().WriteToken(token);
                    return Ok(tokenString);
                }
            }

            return BadRequest("wrong request");
        }
    }
}