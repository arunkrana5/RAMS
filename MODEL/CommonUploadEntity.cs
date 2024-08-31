using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    public class CommonUploadEntity
    {
        public int ID { get; set; }
        public int CompanyID { get; set; }
        public string? ReferenceID { get; set; }
        public string? ReferenceName { get; set; }
        public int FormID { get; set; }
        public int ModuleID { get; set; }
        public string? FolderName { get; set; }
        public string? FileName { get; set; }
        public string? Mode { get; set; }
        public string? FormName { get; set; }
        public string? DocumentName { get; set; }
        public string? DocumentCode { get; set; }
        public decimal DocumentSize { get; set; }
        public int DocumentID { get; set; }

        public int CreatedBy { get; set; }
        public int ModifiedBy { get; set; }
        public string? Remarks { get; set; }

        public string? ModuleCode { get; set; }

        public int IsActive { get; set; }

        public int IsDeleted { get; set; }

    }

    public class DocumentList : BaseModel
    {
        public string? DocumentName { get; set; }
        public string? DocumentCode { get; set; }
        public decimal DocumentSize { get; set; }
        public int IsMandatory { get; set; }
    }

    public class UploadedDocumentList : DocumentList
    {
        public string? FileName { get; set; }
        public string? FolderName { get; set; }
        public int DocumentID { get; set; }
        public string? Remarks { get; set; }
    }

    public class VerifyDocumentUpload : CommonUploadEntity
    {

    }
}
