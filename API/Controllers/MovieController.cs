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

        private readonly MovieContext _context;
        

        public MovieController(MovieContext context)
        {
            _context = context;

            if (_context.Movies.Count() == 0)
            {
                _context.Movies.Add(new Movie {name = "Henry Peter", length = 165, language = "english", startTime = DateTime.Now, price = 150, seats = new List<MovieSeat>()
                {
                    new MovieSeat()
                    {
                        reserved = true,
                        row = 1,
                        seatNumber = 1,
                    }
                }});
                _context.Movies.Add(new Movie { name = "Henry Peter 2", length = 165, language = "english", startTime = DateTime.Now,  price = 150 });
                _context.Movies.Add(new Movie { name = "Henry Peter 3", length = 165, language = "english", startTime = DateTime.Now,  price = 150 });
                _context.Movies.Add(new Movie { name = "Henry Peter 4", length = 165, language = "english", startTime = DateTime.Now,  price = 150 });
                _context.Movies.Add(new Movie { name = "Henry Peter 5", length = 165, language = "english", startTime = DateTime.Now,  price = 150 });
                _context.SaveChanges();
            }
        }

        [HttpGet]
        public ActionResult<List<Movie>> GetAll()
        {
            return _context.Movies.Include(x => x.seats).ToList();
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
        public IActionResult Create(Movie movie)
        {
            _context.Movies.Add(movie);
            _context.SaveChanges();

            return CreatedAtRoute("GetMovie", new Movie { id = movie.id }, movie);
        }

        [HttpPut("{id}")]
        public IActionResult Update(long id, Movie movie)
        {
            var _movie = _context.Movies.Find(id);
            if (_movie == null)
            {
                return NotFound();
            }
            if(movie.name != null)
            { 
            _movie.name = movie.name;
            }
            if(movie.length != 0) { 
            _movie.length = movie.length;
            }
            if(movie.language != null) { 
            _movie.language = movie.language;
            }

            if (movie.startTime != null)
            {
                _movie.startTime = movie.startTime;
            }
           
            if(movie.price != 0) { 
                _movie.price = movie.price;
            }

            if (movie.seats != null)
            {
                _movie.seats = movie.seats;
            }

            _context.Movies.Update(_movie);
            _context.SaveChanges();
            return NoContent();
        }
    }
}