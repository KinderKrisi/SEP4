using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ParkingController : ControllerBase
    {
        private readonly CinemaContext _context;

        public ParkingController(CinemaContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<List<ParkingPlace>> GetAllParking()
        {
            return Ok(_context.Parking.Include(x => x.User).ToList());
        }

        [HttpPut("{id}")]
        public IActionResult Update(long id, ParkingPlace parking)
        {
            var slot = _context.Parking.Find(id);
            if (slot == null)
            {
                return NotFound("Parking slot was not found");
            }

            if (parking.User != null)
            {
                slot.User = parking.User;
            }

            if (parking.StartDate != null)
            {
                slot.StartDate = parking.StartDate;
            }

            if (parking.EndDate != null)
            {
                slot.EndDate = parking.EndDate;
            }

            if (parking.Reserved != null)
            {
                slot.Reserved = parking.Reserved;
            }

            return NoContent();
        }

    }
}
