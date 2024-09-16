using COMMON;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages;
using MODEL;
using static MODEL.CommonModel;
using System.Net;

namespace RAMS.Areas.SecureZone.Controllers
{
	[Area("SecureZone")]
	public class DashboardController : Controller
	{
        public IActionResult Index()
		{
			string RoleName = ClsApplicationSetting.GetSessionValue("RoleName");
			string EName= ClsApplicationSetting.GetSessionValue("EMPName");
			string ECode= ClsApplicationSetting.GetSessionValue("EMPCode");
			string DCode= ClsApplicationSetting.GetSessionValue("DealerCode");
			string DName= ClsApplicationSetting.GetSessionValue("DealerName");
            if (String.IsNullOrEmpty(RoleName))
			{
				return RedirectToAction("PageNotFound","Account",new {Area="Authentication"});
			}
			else if (!String.IsNullOrEmpty(RoleName))
			{
				ViewBag.Name = EName; 
				ViewBag.Code = ECode; 
				ViewBag.DCode = DCode; 
				ViewBag.DName = DName; 
                return View("Index");
			}
			else
			{
				return RedirectToAction("PageNotFound", "Account", new { Area = "Authentication" });
			} 
		}
        public IActionResult MarkAttendence()
        {
			GetResponse getResponse = new GetResponse();
            long EMPID = 0;
            long.TryParse(ClsApplicationSetting.GetSessionValue("EMPID"), out EMPID);
            MarkAttendence result = new MarkAttendence();
            getResponse.Doctype = "Attendence";
            result.AttendenceStatusList = Common_SPU.GetAttendenceStatus(getResponse);
			ViewBag.StatusList = result.AttendenceStatusList;
            return PartialView(result);
        }
        [HttpPost]

        public IActionResult MarkAttendence(MarkAttendence Modal, string Command)
        {
            PostResponse Result = new PostResponse();
            long EMPID = 0;
            long.TryParse(ClsApplicationSetting.GetSessionValue("EMPID"), out EMPID);

            string PhysicalPath = ClsApplicationSetting.GetPhysicalPath("SSREntry");
            Result.SuccessMessage = "Attendence Can't Update";
            if (!string.IsNullOrEmpty(Modal.Flag_Doctype) && string.IsNullOrEmpty(Modal.Flag_Reason.Trim()))
            {
                Result.SuccessMessage = Modal.Flag_Doctype + " Reason is mandiatory";
                ModelState.AddModelError("Flag_Reason", Result.SuccessMessage);
            }
            else if ((Modal.StatusID == 1 || Modal.StatusID == 2) && string.IsNullOrEmpty(Modal.ImageBase64String))
            {
                Result.SuccessMessage = "Image is mandiatory";
                ModelState.AddModelError("ImageBase64String", Result.SuccessMessage);
            }
            ModelState.Remove("Command");
            if (ModelState.IsValid)
            {
                Modal.LoginID = Convert.ToInt64(ClsApplicationSetting.GetSessionValue("LoginID"));
                Modal.IPAddress = ClsApplicationSetting.GetIPAddress();
                Modal.EMPID = EMPID;
                if (!string.IsNullOrEmpty(Modal.ImageBase64String))
                {
                    FileResponse attachModal = new FileResponse();
                    attachModal.ImageBase64String = Modal.ImageBase64String;
                    attachModal.LoginID = Modal.LoginID;
                    attachModal.IPAddress = Modal.IPAddress;
                    attachModal.ID = Modal.AttachmentID;
                    attachModal.Doctype = ClsApplicationSetting.GetWebConfigValue("Role");
                    var Attach = ClsApplicationSetting.UploadCameraImage(attachModal);
                    Modal.AttachmentID = Attach.ID;
                    if (!Attach.Status)
                    {
                        Result.SuccessMessage = Attach.SuccessMessage;
                        return Json(Result);
                    }
                }
                Result = Common_SPU.fnSetAttendenceLog(Modal);
                if (Result.Status)
                {
                    TempData["Success"] = "Y";
                    TempData["SuccessMsg"] = "Attendence marked Successfully";
                    ClsApplicationSetting.SetSessionValue("AttendenceStatus", Result.AdditionalMessage);
                }


            }
            return Json(Result);

        }
    }
}
