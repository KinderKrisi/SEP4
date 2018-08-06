using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class User
    {
        public long Id { get; set; }
        public string name { get; set; }
        public string password { get; set; }
        public bool admin { get; set; }
    }
}
