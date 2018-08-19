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
    public class MovieController : ControllerBase
    {

        private readonly CinemaContext _context;
        
        // TODO: Move db initialization from the constructor of this controller with config file or separate function
        public MovieController(CinemaContext context)
        {
            _context = context;

            if (!_context.Movies.Any())
            {
                fillDatabase();
            }
        }

        [HttpGet]
        public ActionResult<List<Movie>> GetAll()
        {
            return Ok(_context.Movies.Include(x => x.Seats).ToList());
        }

        [HttpGet("{id}", Name = "GetMovie")]
        public ActionResult<Movie> GetById(long id)
        {
            var item = _context.Movies.Find(id);
            if (item == null)
            {
                return NotFound("item with this id was not found");
            }
            return Ok(_context.Movies.Include(x=> x.Seats).FirstOrDefault(x => x.Id == id));
        }

        [HttpPost]
        public IActionResult Create(MovieDTO movieFe)
        {
            var request = Request;
            var movie = CreateMovie(movieFe);
            _context.Movies.Add(movie);
            _context.SaveChanges();

            return CreatedAtRoute("CreateMovie", new Movie { Id = movie.Id }, movie);
        }

        [HttpPut("{id}")]
        public IActionResult Update(long id, Movie movie)
        {
            var _movie = _context.Movies.Find(id);
            if (_movie == null)
            {
                return NotFound();
            }
            if(movie.Name != null)
            { 
            _movie.Name = movie.Name;
            }
            if(movie.Length != 0) { 
            _movie.Length = movie.Length;
            }
            if(movie.Language != null) { 
            _movie.Language = movie.Language;
            }

            if (movie.StartTime != null)
            {
                _movie.StartTime = movie.StartTime;
            }
           
            if(movie.Price != 0) { 
                _movie.Price = movie.Price;
            }

            if (movie.Seats != null)
            {
                _movie.Seats = movie.Seats;
            }

            _context.Movies.Update(_movie);
            _context.SaveChanges();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public ActionResult<Movie> DeleteMovie(long id)
        {
            var item = _context.Movies.Find(id);
            if (item == null)
            {
                return NotFound("item with this id was not found");
            }

            _context.Movies.Remove(item);
            _context.SaveChanges();
            return Ok(_context.Movies.Include(x => x.Seats).FirstOrDefault(x => x.Id == id));
        }

        private Movie CreateMovie(MovieDTO movieFe)
        {
            var startdate = DateTimeOffset.FromUnixTimeMilliseconds(movieFe.StartTimeMill).UtcDateTime;
            var movie = new Movie()
            {
                Name = movieFe.Name,
                Language = movieFe.Language,
                Length = movieFe.Length,
                Price = movieFe.Price,
                Seats = CreateSeats(),
                StartTime = startdate
            };

            return movie;
        }

        private List<MovieSeat> CreateSeats()
        {
            var seats = new List<MovieSeat>();

            for (int row = 1; row <= 5; row++)
            {
                for (int seat = 1; seat <= 4; seat++)
                {
                    seats.Add(new MovieSeat() { Reserved = false, Row = row, SeatNumber = seat });
                }
            }

            return seats;
        }

        private void fillDatabase()
        {
            if (!_context.Movies.Any())
            {

                var movie = new Movie()
                {
                    Name = "Henry Peter",
                    Length = 165,
                    Language = "english",
                    StartTime = DateTime.Now,
                    Price = 150,
                    Seats = CreateSeats()
                };
                var movie2 = new Movie()
                {
                    Name = "Henry Peter2",
                    Length = 165,
                    Language = "english",
                    StartTime = DateTime.Now,
                    Price = 150,
                    Seats = CreateSeats()
                };
                _context.Movies.Add(movie);
                _context.Movies.Add(movie2);
                _context.SaveChanges();
            }
            if (!_context.Users.Any())
            {
                _context.Users.Add(new User { Email = "martin@m.com",
                    Password = "martin",
                    FirstName = "Martin",
                    LastName = "Krisko",
                    PhoneNumber = "71398977",
                    Role = "admin" });
                _context.Users.Add(new User()
                {
                    Email = "miroslav@m.com",
                    Password = "miroslav",
                    FirstName = "Miroslav",
                    LastName = "Fratric",
                    PhoneNumber = "71398977",
                    Role = "admin"
                });
                _context.Users.Add(new User()
                {
                    Email = "user1@m.com",
                    Password = "123456",
                    FirstName = "User1",
                    LastName = "LastUser1",
                    PhoneNumber = "71398977",
                    Role = "user"
                });
                _context.Users.Add(new User()
                {
                    Email = "user2@m.com",
                    Password = "123456",
                    FirstName = "User2",
                    LastName = "LastUser2",
                    PhoneNumber = "71398977",
                    Role = "user"
                });
                _context.SaveChanges();
            }

            if (!_context.Parking.Any())
            {
                for (int i = 0; i < 30; i++)
                {
                    _context.Parking.Add(new ParkingPlace()
                        { Reserved = false }
                    );
                }

                _context.SaveChanges();
            }
        }
    }
}