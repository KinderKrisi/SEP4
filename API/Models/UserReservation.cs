using System.Collections.Generic;

namespace API.Models
{
    public class UserReservation
    {
        public long UserId { get; set; }
        public List<Movie> ReservedMovies { get; set; }
        public List<MovieSeat> ReservedMovieSeats { get; set; }
        public List<ParkingPlace> ParkingPlaces { get; set; }
    }
}