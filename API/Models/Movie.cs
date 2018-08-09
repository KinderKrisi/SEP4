using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class Movie
    {
        public long id { get; set; }
        public string name { get; set; }
        public int length { get; set; }
        public string language { get; set; }
        public DateTime startTime { get; set; }

        [NotMapped]
        public DateTime endTime => startTime.AddMinutes(length);
        //public MovieSeats seats { get; set; }

        public ICollection<MovieSeat> seats { get; set; } = new HashSet<MovieSeat>();
        public double price { get; set; }
        
    }
}
