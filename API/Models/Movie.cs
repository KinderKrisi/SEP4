using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class Movie
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public int Length { get; set; }
        public string Language { get; set; }
        public DateTime StartTime { get; set; }

        [NotMapped] public DateTime EndTime => StartTime.AddMinutes(Length);

        //public MovieSeats Seats { get; set; }
        [NotMapped]
        public double StartTimeMill => StartTime.ToUniversalTime().Subtract(
            new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)
        ).TotalMilliseconds;

        [NotMapped]
        public double EndTimeMill => EndTime.ToUniversalTime().Subtract(
            new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)
        ).TotalMilliseconds;

        public ICollection<MovieSeat> Seats { get; set; } = new HashSet<MovieSeat>();
        public double Price { get; set; }
    }
}