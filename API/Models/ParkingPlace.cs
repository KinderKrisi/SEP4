using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class ParkingPlace
    {
        public long Id { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public long UserId { get; set; }
        public bool Reserved { get; set; }

        [NotMapped]
        public double StartTimeMill => StartDate.ToUniversalTime().Subtract(
            new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)
        ).TotalMilliseconds;

        [NotMapped]
        public double EndTimeMill => EndDate.ToUniversalTime().Subtract(
            new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)
        ).TotalMilliseconds;
    }
}