using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    public class CommonModel
    {
        public class DropDownlist
        {
            public long ID { get; set; }
            public string? Name { get; set; }
            public string? Other { get; set; }

        }
        public class GetDropDownResponse
        {
            public string? Values { get; set; }
            public string? Doctype { get; set; }
            public long LoginID { get; set; }
            public string? IPAddress { get; set; }

        }
        public class ChangeStatusModel
        {
            public long ID { get; set; }
            public string? TableName { get; set; }
            public string? Proc {  get; set; }
        }
        public class PostResponse
        {
            public string ViewAsString { get; set; }
            public bool Status { get; set; }
            public int StatusCode { get; set; }
            public string SuccessMessage { get; set; }
            public string RedirectURL { get; set; }
            public long ID { get; set; }
            public string AdditionalMessage { get; set; }
        }
    }
    
}
