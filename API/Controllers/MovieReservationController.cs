using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieReservationController : ControllerBase
    {
        private readonly CinemaContext _context;

        public MovieReservationController(CinemaContext context)
        {
            _context = context;
        }
        [HttpPost]
        public IActionResult Create(long movieId, long seatId, User user)
        {

            var seat = (from x in _context.Movies.Find(movieId).Seats
                where x.Id == seatId select x).FirstOrDefault();
            if (seat != null)
            {
                seat.User = user;
                seat.Reserved = true;
                _context.SaveChanges();
                return Ok();
            }
            return NotFound();
        }

        [HttpGet("{id}", Name = "GetReservationsForMovie")]
        public ActionResult<Movie> GetById(long id)
        {
            if (_context.Movies.Find(id) != null)
            {
                var seats = (from x in _context.Movies.Find(id).Seats
                    where x.Reserved
                    select x).ToList();

                if (seats.Count > 0)
                {
                    return Ok(seats);
                }

                return NoContent();
            }

            return BadRequest();
        }
    }
}
