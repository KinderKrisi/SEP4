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
        

        public MovieController(CinemaContext context)
        {
            _context = context;

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
                _context.Movies.Add(movie);
                _context.SaveChanges();
            }
        }

        [HttpGet]
        public ActionResult<List<Movie>> GetAll()
        {
            return _context.Movies.Include(x => x.Seats).ToList();
        }

        [HttpGet("{id}", Name = "GetMovie")]
        public ActionResult<Movie> GetById(long id)
        {
            var item = _context.Movies.Find(id);
            if (item == null)
            {
                return NotFound();
            }
            return item;
        }

        [HttpPost]
        public IActionResult Create(Movie movieFe)
        {
            var movie = CreateMovie(movieFe);
            _context.Movies.Add(movie);
            _context.SaveChanges();

            return CreatedAtRoute("GetMovie", new Movie { Id = movie.Id }, movie);
        }

        private Movie CreateMovie(Movie movieFe)
        {
            var movie = new Movie()
            {
                Name = movieFe.Name,
                Language = movieFe.Language,
                Length = movieFe.Length,
                Price = movieFe.Price,
                Seats = CreateSeats(),
                StartTime = movieFe.StartTime
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
    }
}