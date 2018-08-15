using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class MovieReservation
    {
        public long movieId { get; set; }
        public long seatId { get; set; }
        public User user { get; set; }
    }
}
