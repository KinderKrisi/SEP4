using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class ParkingReservation
    {
        public long Id { get; set; }
        public string ParkingPlace { get; set; }
        public string LicencePlate { get; set; }
        public User User { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }

        //TODO rework model to store history of parking place
    }
}
