using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

   // [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly CinemaContext _context;

        public UserController(CinemaContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<List<User>> GetAll()
        {
            return Ok(_context.Users.Include(x => x.MovieSeats).ToList());
        }
        
        [HttpGet("{id}", Name = "GetUser")]
        public ActionResult<User> GetById(long id)
        {
            var item = _context.Users.Find(id);
            if (item == null)
            {
                return NotFound();
            }
            return Ok(_context.Users.Include(x => x.MovieSeats).FirstOrDefault(x => x.Id == id));
        }

        [HttpPost]
        public IActionResult Create(User user)
        {
             user.Role = "user";
            _context.Users.Add(user);
            _context.SaveChanges();

            return CreatedAtRoute("GetUser", new User { Id = user.Id }, user);
        }
        [HttpPut("{id}")]
        public IActionResult Update(long id, User user)
        {
            var _user = _context.Users.Find(id);
            if (_user == null)
            {
                return NotFound();
            }
            if(user.Email != null) { 
            _user.Email = user.Email;
            }

            if (user.Password != null)
            {
             _user.Password = user.Password;
            }

            if (user.FirstName != null)
            {
             _user.FirstName = user.FirstName;
            }

            if (user.LastName != null)
            {
                _user.LastName = user.LastName;
            }
            if(user.PhoneNumber != null) { 
            _user.PhoneNumber = user.PhoneNumber;
            }
      
            _context.Users.Update(_user);
            _context.SaveChanges();
            return NoContent();
        }
        [HttpDelete("{id}")]
        public ActionResult<Movie> DeleteUser(long id)
        {
            var item = _context.Users.Find(id);
            if (item == null)
            {
                return NotFound("item with this id was not found");
            }

            _context.Users.Remove(item);
            _context.SaveChanges();
            return Ok();
        }

    }
}