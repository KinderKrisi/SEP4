using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

            if (result != null) return true;
            return false;
        }

        // TODO: JWT token not working - cannot append header with authorization fix this isue once header is succesfully passed
        [HttpPost("token")]
        public IActionResult Token()
        {
            var header = Request.Headers["Authorization"];
            if (header.ToString().StartsWith("Basic"))
            {
                var credValue = header.ToString().Substring("Basic ".Length).Trim();
                var userNameandPassEnc = Encoding.UTF8.GetString(Convert.FromBase64String(credValue)); // admin: pass
                var userNameAndPass = userNameandPassEnc.Split(":");

                //check in the DB user name and pass exist
                if (CheckUser(userNameAndPass[0], userNameAndPass[1]))
                {
                    var claimsData = new[] {new Claim(ClaimTypes.Name, userNameAndPass[0])};
                    var key = new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes("sxdcfgvbjhnmasaesrxedtcfvygbuhnijhbgvyfctdrxsxecrvtbynasuvtaug"));
                    var signCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);
                    var token = new JwtSecurityToken(
                        "http://localhost:4200",
                        "http://localhost:4200",
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

        [HttpGet(Name = "Login")]
        public ActionResult<User> Login(string email, string password)
        {
            var user = _context.Users.Include(x => x.MovieSeats).FirstOrDefault(x => x.Email == email);
            if (user == null) return NotFound("user cannot be found");

            if (user.Password == password)
            {
                var _user = new User
                {
                    Email = user.Email,
                    FirstName = user.FirstName,
                    MovieSeats = user.MovieSeats,
                    Id = user.Id,
                    LastName = user.LastName,
                    Role = user.Role,
                    PhoneNumber = user.PhoneNumber
                };
                return Ok(_user);
            }

            return BadRequest("wrong request");
        }
    }
}