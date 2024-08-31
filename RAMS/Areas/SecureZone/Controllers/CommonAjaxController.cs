using Microsoft.AspNetCore.Mvc;

namespace RAMS.Areas.SecureZone.Controllers
{
    [Area("SecureZone")]
    public class CommonAjaxController : Controller
    {
        [HttpPost]
        public JsonResult GetDateTimeJson()
        {
            string MyTime = DateTime.Now.ToString("dddd, dd-MMM-yyyy hh:mm:ss tt");
            return Json(MyTime);
        }
    }
}
