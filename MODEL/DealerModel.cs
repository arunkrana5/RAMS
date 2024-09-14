using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static MODEL.CommonModel;

namespace MODEL
{
    public class DealerModel
    {
        public class List
        {
            public int RowNum { get; set; }
            public long DealerID { get; set; }
            public string? DealerCode { get; set; }
            public string? DealerName { get; set; }
            public string? EmailID { get; set; }
            public string? Phone { get; set; }
            public string? DealerType { get; set; }
            public string? DealerCategory { get; set; }
            public string? StateName { get; set; }
            public string? BranchName { get; set; }
            public string? BranchCode { get; set; }
            public string? CityName { get; set; }
            public string? AreaName { get; set; }
            public string? Address { get; set; }
            public string? RegionName { get; set; }
            public string? BillingCode { get; set; }
            public string? BillingName { get; set; }
            public string? PinCode { get; set; }
            public string? Latitude { get; set; }
            public string? Longitude { get; set; }
            public bool IsActive { get; set; }
            public int Priority { get; set; }
            public string? CreatedBy { get; set; }
            public string? CreatedDate { get; set; }
            public string? ModifiedDate { get; set; }
            public string? ModifiedBy { get; set; }
            public string? IPAddress { get; set; }
            public int TotalCount { get; set; }
        }
        public class Add
        {

            public long DealerID { get; set; }
            public string? DealerCode { get; set; }
            public string? DealerName { get; set; }
            public string? EmailID { get; set; }
            public string? Phone { get; set; }
            public long BranchID { get; set; }
            public long StateID { get; set; }
            public long CityID { get; set; }
            public long AreaID { get; set; }
            public long RegionID { get; set; }
            public string? Address { get; set; }
            public string? PinCode { get; set; }
            public string? Latitude { get; set; }
            public string? Longitude { get; set; }
            public string? BillingCode { get; set; }
            public string? BillingName { get; set; }
            public long DealerTypeID { get; set; }
            public long DealerCategoryID { get; set; }
            public bool IsActive { get; set; }
            public int Priority { get; set; }
            public long LoginID { get; set; }
            public string? IPAddress { get; set; }
            public int[]? UserID { get; set; }
            public string? EMP { get; set; }
            public string? RSM { get; set; }
            public string? BSM { get; set; }
            public string? ASM { get; set; }
            public string? TL { get; set; }
            public string? RMM { get; set; }
            public string? BMM { get; set; }
            public string? Inhouse { get; set; }
            public string? Others { get; set; }
            public List<DropDownlist>? RegionList { get; set; }
            public List<DropDownlist>? StateList { get; set; }
            public List<DropDownlist>? BranchList { get; set; }
            public List<DropDownlist>? CityList { get; set; }
            public List<DropDownlist>? AreaList { get; set; }
            public List<DropDownlist>? DealerCategoryList { get; set; }
            public List<DropDownlist>? DealerTypeList { get; set; }
            public List<DropDownlist>? NSMList { get; set; }
            public List<DropDownlist>? RSMList { get; set; }
            public List<DropDownlist>? BSMList { get; set; }
            public List<DropDownlist>? ASMList { get; set; }
            public List<DropDownlist>? TLList { get; set; }
            public List<DropDownlist>? BMMList { get; set; }
            public List<DropDownlist>? RMMList { get; set; }
            public List<DropDownlist>? InhouseList { get; set; }
            public List<DropDownlist>? OtherList { get; set; }
        }
    }

    public class DealerSearch
    {
        public string? DealerCode { get; set; }
        public string? DealerName { get; set; }
        public long DealerTypeID { get; set; }
        public long DealerCategoryID { get; set; }
        public long RegionID { get; set; }
        public long StateID { get; set; }
        public long BranchID { get; set; }
        public long CityID { get; set; }
        public long AreaID { get; set; }
        public string? PinCode { get; set; }
        public long LoginID { get; set; }
        public string? IPAddress { get; set; }
        public List<DropDownlist> RegionList { get; set; } = new List<DropDownlist>();
        public List<DropDownlist> BranchList { get; set; } = new List<DropDownlist>();
        public List<DropDownlist> StateList { get; set; } = new List<DropDownlist>();
        public List<DropDownlist> CityList { get; set; } = new List<DropDownlist>();
        public List<DropDownlist> AreaList { get; set; } = new List<DropDownlist>();
        public List<DropDownlist> DealerTypeList { get; set; } = new List<DropDownlist>();
        public List<DropDownlist> DealerCategoryList { get; set; } = new List<DropDownlist>();
    }
}
