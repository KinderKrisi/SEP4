using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ParkingReservationController : ControllerBase
    {
        private readonly MovieContext _context;

        public ParkingReservationController(MovieContext context)
        {
            _context = context;

            if (_context.Reservations.Count() == 0)
            {
                _context.Reservations.Add(new ParkingReservation { place = "A5", plate = "QWERTY" });
                _context.SaveChanges();
            }
        }
        [HttpGet]
        public ActionResult<List<ParkingReservation>> GetAll()
        {
            return _context.Reservations.ToList();
        }
        [HttpGet("{id}", Name = "GetReservation")]
        public ActionResult<ParkingReservation> GetById(long id)
        {
            var item = _context.Reservations.Find(id);
            if (item == null)
            {
                return NotFound();
            }
            return item;
        }
        [HttpPost]
        public IActionResult Create(ParkingReservation res)
        {
            _context.Reservations.Add(res);
            _context.SaveChanges();

            return CreatedAtRoute("GetParkingReservation", new ParkingReservation { id = res.id }, res);
        }
        [HttpPut("{id}")]
        public IActionResult Update(long id, ParkingReservation res)
        {
            var _reservation = _context.Reservations.Find(id);
            if (_reservation == null)
            {
                return NotFound();
            }
            _reservation.place = res.place;
            _reservation.plate = res.plate;

            _context.Reservations.Update(_reservation);
            _context.SaveChanges();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            var _reservation = _context.Reservations.Find(id);
            if (_reservation == null)
            {
                return NotFound();
            }
            _context.Reservations.Remove(_reservation);
            _context.SaveChanges();
            return NoContent();
        }
    }
}