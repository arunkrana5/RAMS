using COMMON;
using DAL;
using INTERFACE;
using Microsoft.AspNetCore.Mvc;
using MODEL;
using Newtonsoft.Json;

namespace RAMS.Areas.SecureZone.Controllers
{
    [Area("SecureZone")]
    public class TransactionController : Controller
    {
        IVendorsHelper vendor; 
        public TransactionController()
        { 
            vendor = new VendorDAL();
        }
        public IActionResult PJP()
        {
            return View();
        }
        public IActionResult NewVendor(int? id)
        {
            ViewBag.ID = Convert.ToInt64(id);
            return View();
        }
        public IActionResult VendorList()
        {
            return View();
        }
        public IActionResult EnrollmentStatus()
        {
            return View();
        }
        public IActionResult Attendance()
        {
            return View();
        }
        public IActionResult ProjectList()
        {
            return View();
        }
        public IActionResult NewTask()
        {
            return View();
        }
        public IActionResult TaskList()
        {
            return View();
        }
        [HttpPost]
        public string ExecuteVendor(VendorModel objModel)
        { 
            string str = JsonConvert.SerializeObject(vendor.ExecuteVendor(objModel));
            return str;
        }
    }
}
