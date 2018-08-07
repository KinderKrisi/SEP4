using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace API.Models
{
    public class MovieSeatContext : DbContext
    {
        public MovieSeatContext(DbContextOptions<MovieSeatContext> options) : base(options)
        {

        }

        public DbSet<MovieSeat> Seats { get; set; }
    }
}
