using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    public class BrandingTypeModel : BaseModel
    {
        public string? Code { get; set; }
        public string? Name { get; set; }
        public string? Specification { get; set; }
        public string? Rate { get; set; }
        public int Priority { get; set; }
    }
}
