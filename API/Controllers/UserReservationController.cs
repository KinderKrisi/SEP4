using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserReservationController : ControllerBase
    {
        private readonly CinemaContext _context;

        public UserReservationController(CinemaContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public ActionResult GetUserReservations(long id)
        {
            //Get movies where user with ID has reserved seats
            var movies = _context.Movies.Include(x => x.Seats).ThenInclude(x => x.User).ToList();
            var parkings = _context.Parking.Include(x => x.User).Where(x=> x.User != null).ToList();

            var result = FindReservedByUser(id, movies, parkings);

            if (result.ReservedMovies.Count > 0)
            {
                return Ok(result);
            }

            return NotFound("There is no reservations for this user");
        }

        private UserReservation FindReservedByUser(long userId, List<Movie> movies, List<ParkingPlace> parking)
        {
            var reservedSeats = new List<MovieSeat>();
            var reservedMovies = new List<Movie>();
            

            foreach (var movie in movies)
            {
                foreach (var seat in movie.Seats)
                {
                    if (seat.Reserved == true && seat.User.Id == userId)
                    {
                        reservedSeats.Add(seat);
                        if (!reservedMovies.Contains(movie))
                        {
                            reservedMovies.Add(movie);
                        }
                    }
                }
            }

            var reservedParkingPlaces = new List<ParkingPlace>();
            if (parking.Count > 0)
            {
                reservedParkingPlaces = parking.FindAll(x => x.User.Id == userId).ToList();
            }

            var result = new UserReservation()
            {
                ParkingPlaces = reservedParkingPlaces,
                ReservedMovies = reservedMovies,
                ReservedMovieSeats = reservedSeats,
                UserId = userId
            };

            return result;
        }
    }
}