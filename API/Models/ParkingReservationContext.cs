using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace API.Models
{
    public class ParkingReservationContext : DbContext
    {
        public ParkingReservationContext(DbContextOptions<ParkingReservationContext> options) : base(options)
        {
        }

        public DbSet<ParkingReservation> Reservations { get; set; }
    }
}
