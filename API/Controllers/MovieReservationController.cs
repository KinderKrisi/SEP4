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
                var movie = _context.Movies.Include(x => x.Seats).FirstOrDefault(x => x.Id == reservation.MovieId);
                var seat = movie.Seats.FirstOrDefault(x => x.Id == reservation.SeatId);

                //var seat = (from x in _context.Movies.Find(reservation.movieId).Seats
                //    where x.Id == reservation.seatId
                //    select x).FirstOrDefault();
                if (seat != null)
                {
                    seat.UserId = reservation.UserId;
                    seat.Reserved = true;
                    _context.SaveChanges();

                    //TODO: fix sending multiple request fro parking reservation from one user -> on Front End
                    if (reservation.WantParking)
                    {
                        var parking = _context.Parking.FirstOrDefault(x => x.Reserved == false);

                        if (parking != null)
                        {
                            parking.UserId = reservation.UserId;
                            parking.StartDate = reservation.StarDate.AddMinutes(-30);
                            parking.EndDate = reservation.EndDate.AddMinutes(30);
                            parking.Reserved = true;

                            _context.SaveChanges();

                            return NoContent();

                        }

                        return CreatedAtRoute("getMovieAndParking", reservation);
                    }

                    return NoContent();
                }

                return CreatedAtRoute("getMovie", reservation);
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

                return NotFound("No reservation for a movie");
            }

            return BadRequest();
        }
    }
}
