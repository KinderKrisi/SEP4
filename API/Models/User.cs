using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class User
    {
        public long Id { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string phoneNumber { get; set; }
        public string role { get; set; }
        public ICollection<MovieSeat> MovieSeats { get; set; } = new HashSet<MovieSeat>();
    }
}
