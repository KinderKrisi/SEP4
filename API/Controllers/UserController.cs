using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

   // [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly UserContext _context;

        public UserController(UserContext context)
        {
            _context = context;

            if (_context.Users.Count() == 0)
            {
                _context.Users.Add(new User { email = "mail@m.com", password = "martin",firstName = "Martin", lastName = "Krisko", phoneNumber = "71398977", admin = true });
                _context.SaveChanges();
            }
        }

        [HttpGet]
        public ActionResult<List<User>> GetAll()
        {
            return _context.Users.ToList();
        }

        [HttpGet("{id}", Name = "GetUser")]
        public ActionResult<User> GetById(long id)
        {
            var item = _context.Users.Find(id);
            if (item == null)
            {
                return NotFound();
            }
            return item;
        }
        [HttpPost]
        public IActionResult Create(User user)
        {
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
            if(user.email != null) { 
            _user.email = user.email;
            }

            if (user.password != null)
            {
             _user.password = user.password;
            }

            if (user.firstName != null)
            {
             _user.firstName = user.firstName;
            }

            if (user.lastName != null)
            {
                _user.lastName = user.lastName;
            }
            if(user.phoneNumber != null) { 
            _user.phoneNumber = user.phoneNumber;
            }

            _context.Users.Update(_user);
            _context.SaveChanges();
            return NoContent();
        }

    }
}