using Microsoft.AspNetCore.Mvc;

namespace RAMS.Areas.SecureZone.Controllers
{
    [Area("SecureZone")]
    public class MasterController : Controller
    {
        public IActionResult AddCountry()
        {
            return View();
        }
        public IActionResult Country()
        {
            return View();
        }
    }
}
