using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class Reservation
    {
        public long Id { get; set; }
        public string place { get; set; }
        public string plate { get; set; }
    }
}
