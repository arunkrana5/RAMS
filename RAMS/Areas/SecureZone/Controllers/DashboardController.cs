using COMMON;
using Microsoft.AspNetCore.Mvc;

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
				return View("Index");
			}
			else if (!String.IsNullOrEmpty(RoleName))
			{
				return View("Index");
			}
			else
			{
				return View("Index");
			} 
		}
	}
}
