using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace COMMON
{
    public class JsonData
    {
        public bool status { get; set; }
        public string? message { get; set; }
        public string? error { get; set; }
        public dynamic? Data { get; set; }
    }
}
