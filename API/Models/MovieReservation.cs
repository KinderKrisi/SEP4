using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class MovieReservation
    {
        public long MovieId { get; set; }
        public long SeatId { get; set; }
        public long UserId { get; set; }
        public bool WantParking { get; set; }
        public DateTime StarDate { get; set; }
        public DateTime EndDate { get; set; }

        public List<ParkingPlace> ParkingPlaces { get; set; }
    }
}
