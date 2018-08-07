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
    public class MovieSeatController : ControllerBase
    {

        private readonly MovieSeatContext _context;

        public MovieSeatController(MovieSeatContext context)
        {
            _context = context;

            if (_context.Seats.Count() == 0)
            {
                // CREATE 4 ROWS WITH 5 SEATS
                for (int i = 0; i < 4; i++)
                {
                    for (int j = 0; j < 5; j++)
                    {
                        int nextSeat = j + 1;
                        int rowNumber = i + 1;
                        _context.Seats.Add(new MovieSeat { seatNumber = nextSeat, row = rowNumber, reserved = false, reservedBy = "" });
                        _context.SaveChanges();
                    }
                }

            }
        }

        [HttpGet]
        public ActionResult<List<MovieSeat>> getAll()
        {
            return _context.Seats.ToList();
        }

        [HttpGet("{id}", Name = "GetSeat")]
        public ActionResult<MovieSeat> GetById(long id)
        {
            var item = _context.Seats.Find(id);
            if (item == null)
            {
                return NotFound();
            }
            return item;
        }

        [HttpPut("{id}")]
        public IActionResult Update(long id, MovieSeat seat)
        {
            var _seat = _context.Seats.Find(id);
            if (_seat == null)
            {
                return NotFound();
            }
            if (seat.reservedBy != "")
            {
                _seat.reserved = true;
            }
            else
            {
                _seat.reserved = false;
            }

            _seat.reservedBy = seat.reservedBy;
      
            _context.Seats.Update(_seat);
            _context.SaveChanges();
            return NoContent();
        }
    }
}