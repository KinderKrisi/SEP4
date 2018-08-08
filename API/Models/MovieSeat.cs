using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class MovieSeat
    {
        public long id { get; set; }
        public int row { get; set; }
        public int seatNumber { get; set; }
        public bool reserved { get; set; }
        public User user { get; set; } // user which has reserved the seat

        public MovieSeat(int row, int seatNumber, bool reserved)
        {
            this.row = row;
            this.seatNumber = seatNumber;
            this.reserved = reserved;
            this.user = user;

        }
    }
}
