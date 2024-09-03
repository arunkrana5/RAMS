using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    public class MasterModel
    {
        public int ID { get; set; }
        public string? TableName { get; set; }
        public string? Code { get; set; }
        public string? Name { get; set; }
        public int Priority { get; set; }
        public int GroupID { get; set; }
        public int CountryID { get; set; }
        public int RegionID { get; set; }
        public int StateID { get; set; }
        public int CityID { get; set; }
        public int IsActive { get; set; }
        public string? Proc { get; set; }
        public int CreatedBy { get; set; }
        public string? IPAddress { get; set; }
    }
}
