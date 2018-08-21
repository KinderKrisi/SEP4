namespace API.Models
{
    public class MovieSeat
    {
        public long Id { get; set; }
        public int Row { get; set; }
        public int SeatNumber { get; set; }
        public bool Reserved { get; set; }
        public long UserId { get; set; }

        public Movie Movie { get; set; }
    }
}