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
    }
}
