using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class MovieSeats
    {

        public long id { get; set; }
        public List<MovieSeat> seats { get; set; }

        public MovieSeats()
        {
            this.seats = new List<MovieSeat>();
            for (int i = 0; i < 4; i++)
            {
                for (int j = 0; j < 5; j++)
                {
                    int nextSeat = j + 1;
                    int rowNumber = i + 1;
                    this.seats.Add(new MovieSeat(nextSeat, rowNumber, false));
                }
            }

        }
    }

}
