using COMMON;
using DAL;
using INTERFACE;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting.Internal;
using MODEL;

namespace RAMS.Areas.SecureZone.Controllers
{
    [Area("SecureZone")]
    public class UploadDownloadController : Controller
    {
        ICommonUpload commonupload;
        private readonly IWebHostEnvironment _hostingEnvironment;
        public UploadDownloadController(IWebHostEnvironment hostingEnvironment)
        {
            commonupload = new CommonUploadDAL();
            _hostingEnvironment = hostingEnvironment;
        }
        [HttpPost]
        public ContentResult ProcessDownload(int id, string fileType = "Default", string ExportedFileName = "MyFile")
        {
            try
            { 

                CommonUploadEntity upEntity = new CommonUploadEntity(); 

                upEntity.Mode = "FETCH_DMS_DOCUMENT_BYID";
                upEntity.ID = id;

                VerifyDocumentUpload VerifyUpload = new VerifyDocumentUpload();
                VerifyUpload = commonupload.VerifyDocumentUpload(upEntity);

                //here FormName is Folder Name in SQL Query
                //string basePath = ClsApplicationSetting.GetWebConfigValue("DocumentBasePath");
                var basePath = _hostingEnvironment.WebRootPath;
                string filePath = basePath +"/Attachments/" +Convert.ToString(VerifyUpload.FormName) + "/" + Convert.ToString(VerifyUpload.FileName);

                //Read the File as Byte Array.
                byte[] bytes = System.IO.File.ReadAllBytes(filePath);
                ExportedFileName = ExportedFileName.Split('.')[0];

                //Convert File to Base64 string and send to Client.
                string base64 = Convert.ToBase64String(bytes, 0, bytes.Length) + "####" + ExportedFileName + Path.GetExtension(filePath);

                return Content(base64);

            }
            catch (Exception Ex)
            {
                throw;
            }
        }

        [HttpPost]
        public JsonResult VerifyDocument(int id)
        {
            try
            {
                int isExcel = 0;
                string base64 = "";

                CommonUploadEntity upEntity = new CommonUploadEntity(); 

                upEntity.Mode = "FETCH_DMS_DOCUMENT_BYID";
                upEntity.ID = id;

                VerifyDocumentUpload VerifyUpload = new VerifyDocumentUpload();
                VerifyUpload = commonupload.VerifyDocumentUpload(upEntity);

                if (VerifyUpload.ID > 0)
                {

                    string extension = Path.GetExtension(VerifyUpload.FileName);
                    if (extension.Contains("xls"))
                    {
                        //here FormName is Folder Name in SQL Query
                        //string basePath = ClsApplicationSetting.GetWebConfigValue("DocumentBasePath");
                        var basePath = _hostingEnvironment.WebRootPath;
                        string filePath = basePath +"/Attachments/" + Convert.ToString(VerifyUpload.FormName) + "/" + Convert.ToString(VerifyUpload.FileName);

                        //Read the File as Byte Array.
                        byte[] bytes = System.IO.File.ReadAllBytes(filePath);

                        //Convert File to Base64 string and send to Client.
                        base64 = Convert.ToBase64String(bytes, 0, bytes.Length);

                        isExcel = 1;
                    }
                    JsonData jsonData = new JsonData() { status = true, message = "Request Completed Successfully", Data = base64 };
                    return Json(jsonData);
                }
                else
                {
                    JsonData jsonData = new JsonData() { status = false, message = "Document Not Found", Data = base64 };
                    return Json(jsonData);
                }

            }
            catch (Exception Ex)
            {
                throw;
            }
        }

        public IActionResult ViewDocument(int id, string fileType = "Default", string ExportedFileName = "MyFile")
        {
            try
            {
                CommonUploadEntity upEntity = new CommonUploadEntity(); 

                upEntity.Mode = "FETCH_DMS_DOCUMENT_BYID";
                upEntity.ID = id;

                VerifyDocumentUpload VerifyUpload = new VerifyDocumentUpload();
                VerifyUpload = commonupload.VerifyDocumentUpload(upEntity);

                //here FormName is Folder Name in SQL Query
                //string basePath = ClsApplicationSetting.GetWebConfigValue("DocumentBasePath");
                var basePath = _hostingEnvironment.WebRootPath;
                string filePath = basePath +"/Attachments/" + Convert.ToString(VerifyUpload.FormName) + "/" + Convert.ToString(VerifyUpload.FileName);

                //Read the File as Byte Array.
                byte[] bytes = System.IO.File.ReadAllBytes(filePath);

                Response.Headers.Add("Content-Disposition", "inline");

                var fstream = new FileStream(filePath, FileMode.Open, FileAccess.Read);

                return new FileStreamResult(fstream, ClsApplicationSetting.GetMimeType(Path.GetExtension(VerifyUpload.FileName)));

            }
            catch (Exception Ex)
            {
                throw;
            }
        }
        [HttpPost]
        [RequestFormLimits(ValueLengthLimit = int.MaxValue, MultipartBodyLengthLimit = int.MaxValue)]
        public JsonResult ProcessUpload()
        {
            try
            {

                CommonUploadEntity upEntity = new CommonUploadEntity(); 
                CommonUploadEntity documentConfig = new CommonUploadEntity();


                int isError = 0;
                string msg = "File Uploaded";

                string ReferenceID = "";
                int FormID = 0;
                string ModuleCode = "";

                foreach (string key in Request.Form.Keys)
                {
                    if (key.Contains("ReferenceID"))
                    {
                        ReferenceID = Convert.ToString(Request.Form[key]);
                    }
                    if (key.Contains("FormID"))
                    {
                        FormID = Convert.ToInt32(Request.Form[key]);
                    }
                    if (key.Contains("ModuleCode"))
                    {
                        ModuleCode = Convert.ToString(Request.Form[key]);
                    }
                }

                string message = "";
                string errorTR = "";
                //ReferenceID = "1";
                if (!string.IsNullOrEmpty(ReferenceID) && FormID != 0 && ModuleCode != "")
                {
                    foreach (IFormFile upload in Request.Form.Files)
                    {
                        if (isError == 0)
                        {
                            string fileName = upload.FileName;
                            string fileIndex = upload.Name.Split("_")[1];
                            //get document Id from POST Request
                            string formKey = "documentID_" + fileIndex;
                            int documentID = Convert.ToInt32(Request.Form[formKey]);
                            formKey = "remarks_" + fileIndex;
                            string remarks = Convert.ToString(Request.Form[formKey]);

                            //fetch Document Config according to form and Document

                            upEntity.Mode = "FETCH_DOCUMENT_CONFIG_DATA_BY_DOCUMENT_AND_FORM";
                            upEntity.FormID = FormID;
                            upEntity.DocumentID = documentID;
                            upEntity.ModuleCode = ModuleCode;


                            documentConfig = commonupload.GetDocumentConfigByDocumentAndForm(upEntity);

                            if (documentConfig.DocumentID > 0)
                            {
                                //check file size allowed
                                if (upload.Length <= (Convert.ToInt32(documentConfig.DocumentSize) * 1024 * 1024))
                                {
                                    //check for allowed extenesions also in future

                                    //string folderPath = ClsApplicationSetting.GetWebConfigValue("DocumentBasePath");
                                    var basePath = _hostingEnvironment.WebRootPath;
                                    string folderPath = basePath + "/Attachments";
                                    upEntity = new CommonUploadEntity();
                                    upEntity.FolderName = documentConfig.FolderName.ToUpper().Replace(" ", "_");
                                    folderPath = folderPath + "/" + upEntity.FolderName + "/";

                                    string directoryName = Path.GetDirectoryName(folderPath);
                                    if (directoryName.Length > 0)
                                    {
                                        Directory.CreateDirectory(directoryName);

                                    }
                                    Guid guid = Guid.NewGuid();
                                    upEntity.FileName = upEntity.FolderName + "_" + guid.ToString() + Path.GetExtension(upload.FileName);
                                    upEntity.Remarks = remarks;
                                    using (var fileStream = new FileStream(folderPath + upEntity.FileName, FileMode.Create))
                                    {
                                        upload.CopyTo(fileStream);

                                        upEntity.ReferenceID = ReferenceID;
                                        upEntity.ReferenceName = documentConfig.FormName;
                                        upEntity.ModuleCode = ModuleCode;
                                        upEntity.FormID = documentConfig.FormID;
                                        upEntity.DocumentID = documentConfig.DocumentID;
                                        upEntity.Mode = "INSERT_NEW_DOCUMENT";
                                        int i = commonupload.ExecuteDocumentUploadEntry(upEntity);
                                        message = "File(s) Uploaded Successfully";
                                    } 
                                }
                                else
                                {
                                    isError = 1;
                                    message = "File: " + upload.FileName + ", of Type: " + Path.GetExtension(upload.FileName) + ", Exceeds File Size: " + Convert.ToString(documentConfig.DocumentSize) + " MB";
                                    errorTR = fileIndex;
                                }

                            }
                            else
                            {
                                isError = 1;
                                message = "Unable to Process File: " + upload.FileName + ", For this Form";
                                errorTR = fileIndex;
                            }


                        }

                    }

                }
                else
                {
                    isError = 1;
                    message = "Unable to Process Document Upload for mentioned Reference";
                }


                JsonData jsonData = new JsonData() { status = !Convert.ToBoolean(isError), message = message, Data = errorTR };
                return Json(jsonData);

            }
            catch (Exception Ex)
            {
                throw;
            }



        }
        [HttpPost]
        public JsonResult GetDocumentConfigByFormID(CommonUploadEntity cu)
        {
            List<CommonUploadEntity> documentConfig = new List<CommonUploadEntity>();
            try
            {
                CommonUploadEntity upEntity = new CommonUploadEntity();

                upEntity.Mode = "FETCH_DOCUMENT_CONFIG_DATA";
                upEntity.FormID = cu.FormID;
                upEntity.ModuleCode = cu.ModuleCode;
                documentConfig = commonupload.GetDocumentConfigByFormIDList(upEntity);

            }
            catch (Exception ex)
            {
                throw;
            }

            JsonData jsonData = new JsonData() { status = true, message = "Request Completed Succesfully", Data = documentConfig };
            return Json(jsonData);
        }

        [HttpPost]
        public JsonResult ProcessDelete(string AttachmentID)
        {
            string msg = "Unable to Process";
            int i = 0;
            try
            {
                CommonUploadEntity upEntity = new CommonUploadEntity(); 
                upEntity.ID = Convert.ToInt32(AttachmentID);
                upEntity.Mode = "GET_DOCUMENT_BY_ID";

                CommonUploadEntity doc = commonupload.GetDocumentByID(upEntity);

                if (doc.ID > 0)
                {
                    upEntity.Mode = "DELETE_FILE_BYID";
                    i = commonupload.ExecuteDocumentUploadEntry(upEntity);
                    if (i == 4)
                    {
                        //string folderPath = ClsApplicationSetting.GetWebConfigValue("DocumentBasePath");
                        var basePath = _hostingEnvironment.WebRootPath;
                        string folderPath = basePath + "/Attachments";
                        string FolderName = doc.FolderName.ToUpper().Replace(" ", "_");
                        folderPath = folderPath + "/" + upEntity.FolderName + "/" + doc.FileName;
                        System.IO.File.Delete(folderPath);
                    }
                    msg = "";
                }
                else
                {
                    msg = "Invalid Document";
                }



            }
            catch (Exception ex)
            {
                throw;
            }
            JsonData jsonData = new JsonData() { status = true, message = msg, Data = i };
            return Json(jsonData);
        }

        [HttpPost]

        public JsonResult GetPreviousUploadedDocList(string ReferenceID, int FormID, string ModuleName)
        {
            JsonData jsonData = new JsonData();
            try
            {


                string msg = "Unable to Process Request";
                if (ReferenceID != null)
                {
                    CommonUploadEntity upEntity = new CommonUploadEntity(); 
                    List<UploadedDocumentList> doclist = new List<UploadedDocumentList>();

                    upEntity.Mode = "GET_UPLOADED_DOCUMENT_LIST_BY_FORM_MODULE";
                    upEntity.FormID = FormID;
                    upEntity.ModuleCode = ModuleName;
                    upEntity.ReferenceID = ReferenceID;
                    doclist = commonupload.GetUploadedDocumentsList(upEntity).ToList();
                    jsonData = new JsonData() { status = true, Data = doclist, message = "Request Completed Successfully", error = "0" };
                    return Json(jsonData);
                }
                else
                {
                    jsonData = new JsonData() { status = true, Data = "", message = "Madatory Fields Missing", error = "0" };
                    return Json(jsonData);
                }


            }
            catch (Exception Ex)
            {
                //UTILITY.Logger.LogError(Ex, HttpContext);
            }

            jsonData = new JsonData() { status = true, Data = "", message = "Unable to Process your request", error = "0" };
            return Json(jsonData);

        }
    }
}
