using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class Movie
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public int Length { get; set; }
        public string Language { get; set; }
        public DateTime StartTime { get; set; }

        [NotMapped]
        public DateTime EndTime => StartTime.AddMinutes(Length);
        //public MovieSeats Seats { get; set; }

        public ICollection<MovieSeat> Seats { get; set; } = new HashSet<MovieSeat>();
        public double Price { get; set; }
        
    }
}
