using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace API.Models
{
    public class MovieContext : DbContext
    {

        public MovieContext(DbContextOptions<MovieContext> options) : base(options)
        {

        }

        public DbSet<Movie> Movies { get; set; }

        public DbSet<MovieSeat> MovieSeats{get; set;}
        public DbSet<User> Users { get; set; }
        public DbSet<ParkingReservation> Reservations { get; set; }

    }
}
