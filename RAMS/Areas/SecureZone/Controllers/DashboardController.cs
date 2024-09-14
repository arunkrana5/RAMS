using COMMON;
using Microsoft.AspNetCore.Mvc;
using MODEL;

namespace RAMS.Areas.SecureZone.Controllers
{
	[Area("SecureZone")]
	public class DashboardController : Controller
	{
        public IActionResult Index()
		{
			string RoleName = ClsApplicationSetting.GetSessionValue("RoleName");
			if (String.IsNullOrEmpty(RoleName))
			{
				return RedirectToAction("PageNotFound","Account",new {Area="Authentication"});
			}
			else if (!String.IsNullOrEmpty(RoleName))
			{
				return View("Index");
			}
			else
			{
				return RedirectToAction("PageNotFound", "Account", new { Area = "Authentication" });
			} 
		}
        public ActionResult MarkAttendence()
        {
			GetResponse getResponse = new GetResponse();
            long EMPID = 0;
            long.TryParse(ClsApplicationSetting.GetSessionValue("EMPID"), out EMPID);
            MarkAttendence result = new MarkAttendence();
            getResponse.Doctype = "Attendence";
            result.AttendenceStatusList = Common_SPU.GetAttendenceStatus(getResponse);
            return PartialView(result);
        }
    }
}
