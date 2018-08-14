using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class MovieSeat
    {
        public long Id { get; set; }
        public int Row { get; set; }
        public int SeatNumber { get; set; }
        public bool Reserved { get; set; }
        public User User { get; set; } // user which has reserved the seat

        public Movie Movie { get; set; }
    }
}
