using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    public class UserModel : BaseModel
    {
        public string? EmployeeCode { get; set; }
        public string? EmployeeName { get; set; }
        public string? UserName { get; set; }
        public string? Password { get; set; }
        public string? FatherName { get; set; }
        public string? DOB { get; set; }
        public int GenderID { get; set; }
        public int DesignationID { get; set; }
        public int DepartmentID { get; set; }
        public string? DOJ { get; set; }
        public string? Address { get; set; }
        public string? PAN { get; set; }
        public string? EmailID { get; set; }
        public string? UAN { get; set; }
        public string? ESIC { get; set; }
        public int CountryID { get; set; }
        public int RegionID { get; set; }
        public int StateID { get; set; }
        public int CityID { get; set; }
        public string? Location { get; set; }
        public int PinCode { get; set; }
        public string? AddressLine1 { get; set; }
        public string? AddressLine2 { get; set; }
        public string? BranchName { get; set; }
        public string? BankName { get; set; }
        public string? AccountNumber { get; set; }
        public string? IFSC { get; set; }
    }
}
