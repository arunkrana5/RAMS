using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using static MODEL.CommonModel;

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
        public string? Phone { get; set; }
        public bool IsPJPAutoAssign { get; set; }
    }
    public class EmployeeModel
    {
        public int TotalCount {  get; set; }
        public long EMPID { get; set; }
        public string? EMPCode { get; set; }
        public string? EMPName { get; set; }
        public string? UserID { get; set; }
        public string? Password { get; set; }
        public long RoleID { get; set; }
        public string? Phone { get; set; }
        public string? PAN { get; set; }  
        public string? EmailID { get; set; } 
        public string? FatherName { get; set; } 
        public string? DOB { get; set; } 
        public string? DOJ { get; set; } 
        public int GenderID { get; set; } 
        public long DesignID { get; set; } 
        public long DepartID { get; set; } 
        public long CountryID { get; set; } 
        public long RegionID { get; set; } 
        public long StateID { get; set; } 
        public long CityID { get; set; } 
        public string? Address1 { get; set; }
        public string? Address2 { get; set; }
        public string? Location { get; set; }
        public string? Zipcode { get; set; } 
        public string? AccountNo { get; set; } 
        public string? BankName { get; set; } 
        public string? IFSCCode { get; set; } 
        public string? BankBranch { get; set; } 
        public string? DealerCode { get; set; } 
        public string? DealerName { get; set; } 
        public string? DOLStatus { get; set; } 
        public string? DOL { get; set; } 
        public string? DOLReason { get; set; } 
        public string? Gender { get; set; } 
        public string? DesignName { get; set; } 
        public string? DeptName { get; set; } 
        public string? PaymentMode { get; set; } 
        public long DealerID { get; set; } 
        public bool IsPJPAutoAssign { get; set; }
        public long AttachID { get; set; }
        public int Priority { get; set; }
        public string? UAN { get; set; }
        public string? ESIC { get; set; }
        public long LoginID { get; set; }
        public string? IPAddress { get; set; }
        public bool IsActive { get; set; }
        public List<DropDownlist>? DepartmentList { get; set; }
        public List<DropDownlist>? DesignationList { get; set; }
        public List<DropDownlist>? CountryList { get; set; }
        public List<DropDownlist>? RegionList { get; set; }
        public List<DropDownlist>? StateList { get; set; }
        public List<DropDownlist>? CityList { get; set; }
        public List<DropDownlist>? DealerList { get; set; }
        public List<DropDownlist>? RoleList { get; set; }
    }
    public class GetResponse
    {
        public int Approved { get; set; }
        public long ID { get; set; }
        public long AdditionalID { get; set; }
        public string? Doctype { get; set; }
        public string? Date { get; set; }
        public string? Param1 { get; set; }
        public string? Param2 { get; set; }
        public long LoginID { get; set; }
        public string? IPAddress { get; set; }
        public string? Proc { get; set; }

    }
}
