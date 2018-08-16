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
        public IActionResult Create(MovieReservation reservation)
        {
            if (reservation != null)
            {
                var movie = _context.Movies.Include(x => x.Seats).ThenInclude(x => x.User).FirstOrDefault(x => x.Id == reservation.movieId);
                var seat = movie.Seats.FirstOrDefault(x => x.Id == reservation.seatId);

                //var seat = (from x in _context.Movies.Find(reservation.movieId).Seats
                //    where x.Id == reservation.seatId
                //    select x).FirstOrDefault();
                if (seat != null)
                {
                    seat.User = reservation.user;
                    seat.Reserved = true;
                    _context.SaveChanges();
                    return Ok();
                }

                return NotFound();
            }

            return BadRequest();
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
