using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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
                _context.Movies.Add(new Movie {name = "Henry Peter", length = 165, language = "english"});
                _context.Movies.Add(new Movie { name = "Henry Peter 2", length = 150, language = "english" });
                _context.Movies.Add(new Movie { name = "Henry Peter 3", length = 178, language = "english" });
                _context.Movies.Add(new Movie { name = "Henry Peter 4", length = 160, language = "english" });
                _context.Movies.Add(new Movie { name = "Henry Peter 5", length = 178, language = "english" });
                _context.Movies.Add(new Movie { name = "Henry Peter 6", length = 160, language = "english" });
                _context.Movies.Add(new Movie { name = "Henry Peter 7", length = 178, language = "english" });
                _context.Movies.Add(new Movie { name = "Henry Peter 7.5", length = 160, language = "english" });
                _context.SaveChanges();
            }
        }

        [HttpGet]
        public ActionResult<List<Movie>> GetAll()
        {
            return _context.Movies.ToList();
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
            _movie.name = _movie.name;
            _movie.length = movie.length;
            _movie.language = movie.language;

            _context.Movies.Update(_movie);
            _context.SaveChanges();
            return NoContent();
        }
    }
}