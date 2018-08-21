using System.Collections.Generic;
using System.Linq;
using API.Models;
using Microsoft.AspNetCore.Mvc;

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
            return Ok(_context.Parking.ToList());
        }

        [HttpDelete("{id}")]
        public ActionResult<Movie> DeleteUserFromParking(long id)
        {
            var item = _context.Parking.Find(id);
            if (item == null) return NotFound("item with this id was not found");

            item.Reserved = false;
            item.UserId = 0;
            _context.SaveChanges();
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult Update(long id, ParkingPlace parking)
        {
            var slot = _context.Parking.Find(id);
            if (slot == null) return NotFound("Parking slot was not found");

            if (parking.UserId > 0) slot.UserId = parking.UserId;

            if (parking.StartDate != null) slot.StartDate = parking.StartDate;

            if (parking.EndDate != null) slot.EndDate = parking.EndDate;

            if (parking.Reserved != null) slot.Reserved = parking.Reserved;

            _context.Parking.Update(slot);
            _context.SaveChanges();
            return NoContent();
        }
    }
}