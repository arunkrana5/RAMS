using MODEL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace INTERFACE
{
    public interface ICommonUpload
    {
        /// <summary>
        /// Get Document Config By FormID
        /// </summary>
        /// <returns></returns>
        CommonUploadEntity GetDocumentConfigByID(CommonUploadEntity CommonUpload);

        List<CommonUploadEntity> GetDocumentConfigByFormIDList(CommonUploadEntity commonUpload);

        CommonUploadEntity GetDocumentConfigByDocumentAndForm(CommonUploadEntity obj);
        CommonUploadEntity GetDocumentByID(CommonUploadEntity obj);

        int ExecuteDocumentUploadEntry(CommonUploadEntity obj);
        IEnumerable<UploadedDocumentList> GetUploadedDocumentsList(CommonUploadEntity ds);
        VerifyDocumentUpload VerifyDocumentUpload(CommonUploadEntity ds);
    }
}
