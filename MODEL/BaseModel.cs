namespace MODEL
{
    public class BaseModel
    {
        public long ID { get; set; }
        public bool status { get; set; }
        public long LoginID { get; set; }
        public string? UserID { get; set; }
        public long RoleID { get; set; }
        public string? RoleName { get; set; }
        public long EMPID { get; set; }
        public string? DesignName { get; set; }
        public string? DeptName { get; set; }
        public string? EMPName { get; set; }
        public string? EMPCode { get; set; }
        public string? Phone { get; set; }
        public string? Email { get; set; }
        public string? Gender { get; set; }
        public string? AttendenceStatus { get; set; }

        public long DealerID { get; set; }
        public string? DealerName { get; set; }
        public string? DealerCode { get; set; }
        public string? DealerArea { get; set; }
        public string? DealerAddress { get; set; }
        public string? ImageURL { get; set; }
        public string? CompanyCode { get; set; }
        public string? ConfigToken { get; set; }
        public string? Message { get; set; }
        public string? Mode { get; set; }
    }
}
