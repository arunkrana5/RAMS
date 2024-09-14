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
        IPJPHelper pjp;
        public TransactionController()
        {
            vendor = new VendorDAL();
            pjp = new PJPDAL();
        }
        public IActionResult PJP()
        {
            string RoleName = ClsApplicationSetting.GetSessionValue("RoleName");
            if (String.IsNullOrEmpty(RoleName))
            {
                return RedirectToAction("PageNotFound", "Account", new { Area = "Authentication" });
            }
            else
            {
                return View();
            }
        }
        public IActionResult PJPPlanList()
        {
            string RoleName = ClsApplicationSetting.GetSessionValue("RoleName");
            if (String.IsNullOrEmpty(RoleName))
            {
                return RedirectToAction("PageNotFound", "Account", new { Area = "Authentication" });
            }
            else
            {
                return View();
            }
        }
        public IActionResult NewVendor(int? id)
        {
            string RoleName = ClsApplicationSetting.GetSessionValue("RoleName");
            if (String.IsNullOrEmpty(RoleName))
            {
                return RedirectToAction("PageNotFound", "Account", new { Area = "Authentication" });
            }
            else
            {
                ViewBag.ID = Convert.ToInt64(id);
                return View();
            }
        }
        public IActionResult VendorList()
        {
            string RoleName = ClsApplicationSetting.GetSessionValue("RoleName");
            if (String.IsNullOrEmpty(RoleName))
            {
                return RedirectToAction("PageNotFound", "Account", new { Area = "Authentication" });
            }
            else
            {
                return View();
            }
        }
        public IActionResult EnrollmentStatus()
        {
            string RoleName = ClsApplicationSetting.GetSessionValue("RoleName");
            if (String.IsNullOrEmpty(RoleName))
            {
                return RedirectToAction("PageNotFound", "Account", new { Area = "Authentication" });
            }
            else
            {
                return View();
            }
        }
        public IActionResult Attendance()
        {
            string RoleName = ClsApplicationSetting.GetSessionValue("RoleName");
            if (String.IsNullOrEmpty(RoleName))
            {
                return RedirectToAction("PageNotFound", "Account", new { Area = "Authentication" });
            }
            else
            {
                return View();
            }
        }
        public IActionResult ProjectList()
        {
            string RoleName = ClsApplicationSetting.GetSessionValue("RoleName");
            if (String.IsNullOrEmpty(RoleName))
            {
                return RedirectToAction("PageNotFound", "Account", new { Area = "Authentication" });
            }
            else
            {
                return View();
            }
        }
        public IActionResult NewTask()
        {
            string RoleName = ClsApplicationSetting.GetSessionValue("RoleName");
            if (String.IsNullOrEmpty(RoleName))
            {
                return RedirectToAction("PageNotFound", "Account", new { Area = "Authentication" });
            }
            else
            {
                return View();
            }
        }
        public IActionResult TaskList()
        {
            string RoleName = ClsApplicationSetting.GetSessionValue("RoleName");
            if (String.IsNullOrEmpty(RoleName))
            {
                return RedirectToAction("PageNotFound", "Account", new { Area = "Authentication" });
            }
            else
            {
                return View();
            }
        }
        [HttpPost]
        public string ExecuteVendor(VendorModel objModel)
        {
            try
            {
                objModel.CreatedBy = Convert.ToInt32(ClsApplicationSetting.GetSessionValue("LoginID"));
                objModel.IPAddress = ClsApplicationSetting.GetIPAddress();
                string str = JsonConvert.SerializeObject(vendor.ExecuteVendor(objModel));
                return str;
            }
            catch (Exception)
            {
                return "";
            } 
        }
        [HttpPost]
        public string ExecutePJPPlan(PJPPlanModel objModel)
        {
            try
            {
                objModel.CreatedBy = Convert.ToInt32(ClsApplicationSetting.GetSessionValue("LoginID"));
                objModel.IPAddress = ClsApplicationSetting.GetIPAddress();
                string str = JsonConvert.SerializeObject(pjp.ExecutePJPPlan(objModel));
                return str;
            }
            catch (Exception)
            {
                return "";
            } 
        }
    }
}
