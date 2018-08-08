using System;
using System.Collections.Generic;
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
        public DateTime endTime;
        public MovieSeats seats { get; set; }
        public double price { get; set; }

        public void setEndTime(int length, DateTime startTime )
        {
            endTime = startTime.AddMinutes(length);
        }

        public DateTime getEndTime()
        {
            return endTime;
        }

    }
}
