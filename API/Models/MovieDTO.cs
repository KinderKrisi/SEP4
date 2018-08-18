using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class MovieDTO
    {
        public long StartTimeMill { get; set; }
        public string Name { get; set; }
        public string Language { get; set; }
        public int Length { get; set; }
        public int Price { get; set; }
    }
}
