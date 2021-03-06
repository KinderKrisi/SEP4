﻿using System;
using System.Linq;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
                            var startdate = DateTimeOffset.FromUnixTimeMilliseconds(reservation.StartDate).UtcDateTime;
                            var enddate = DateTimeOffset.FromUnixTimeMilliseconds(reservation.EndDate).UtcDateTime;

                            parking.UserId = reservation.UserId;
                            parking.StartDate = startdate;
                            parking.EndDate = enddate;
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

                if (seats.Count > 0) return Ok(seats);

                return NotFound("No reservation for a movie");
            }

            return BadRequest();
        }
    }
}