using System.Collections.Generic;

namespace API.Models
{
    public class User
    {
        public long Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string Role { get; set; }
        public ICollection<MovieSeat> MovieSeats { get; set; } = new HashSet<MovieSeat>();
    }
}