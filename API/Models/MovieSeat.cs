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
        public string reservedBy { get; set; } // user which has reserved the seat
    }
}
