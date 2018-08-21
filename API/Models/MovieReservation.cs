using System.Collections.Generic;

namespace API.Models
{
    public class MovieReservation
    {
        public long MovieId { get; set; }
        public long SeatId { get; set; }
        public long UserId { get; set; }
        public bool WantParking { get; set; }
        public long StartDate { get; set; }
        public long EndDate { get; set; }

        public List<ParkingPlace> ParkingPlaces { get; set; }
    }
}