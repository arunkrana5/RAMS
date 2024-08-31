using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    public class VendorModel:BaseModel
    {
        public int FirmTypeID { get; set; }
        public string? GSTNumber { get; set; }
        public string? FirmName { get; set; }
        public string? GSTRegDate { get; set; }
        public string? OwnerName { get; set; }
        public string? Address { get; set; }
        public string? FactoryAddress { get; set; }
        public int ServiceableStateID { get; set; }
        public int BrandingTypeID { get; set; }
        public string? ManagerDetails { get; set; }
        public string? ContactNumber { get; set; }
        public string? City { get; set; }
        public int PinCode { get; set; }
        public string? Latitude { get; set; }
        public string? Longitude { get; set; }
        public string? NameAsPerBank { get; set; }
        public string? AccountNumber { get; set; }
        public string? IFSC { get; set; }
        public string? BankBranch { get; set; }
        public string? MSMENumber { get; set; }
        public bool IsTermsConditionChecked { get; set; }
        public long[] VendorID { get; set; }
    }
}
