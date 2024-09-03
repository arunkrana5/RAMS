using COMMON;
using DAL;
using INTERFACE;
using Microsoft.AspNetCore.Mvc;
using MODEL;
using Newtonsoft.Json;

namespace RAMS.Areas.SecureZone.Controllers
{
    [Area("SecureZone")]
    public class MasterController : Controller
    {
        IMastersHelper master;
        public MasterController()
        {
            master = new MasterDAL();
        }
        #region UserMaster
        public IActionResult AddUser()
        {
            return View();
        }
        public IActionResult Users()
        {
            return View();
        }
        [HttpPost]
        public string ExecuteUser(UserModel objModel)
        {
            return "";
        }

        #endregion

        #region CommonMaster

        public IActionResult Country()
        {
            return View();
        }
        public IActionResult AddCountry()
        {
            return View();
        }
        public IActionResult Region()
        {
            return View();
        }
        public IActionResult AddRegion()
        {
            return View();
        }
        public IActionResult State()
        {
            return View();
        }
        public IActionResult AddState()
        {
            return View();
        }
        public IActionResult City()
        {
            return View();
        }
        public IActionResult AddCity()
        {
            return View();
        }
        public IActionResult Area()
        {
            return View();
        }
        public IActionResult AddArea()
        {
            return View();
        }
        public IActionResult Department()
        {
            return View();
        }
        public IActionResult AddDepartment()
        {
            return View();
        }
        public IActionResult Designation()
        {
            return View();
        }
        public IActionResult AddDesignation()
        {
            return View();
        }
        public IActionResult DocumentType()
        {
            return View();
        }
        public IActionResult AddDocumentType()
        {
            return View();
        }

        [HttpPost]
        public string ExecuteMaster(MasterModel objModel)
        {
            try
            {
                objModel.IPAddress = ClsApplicationSetting.GetIPAddress();
                string str = JsonConvert.SerializeObject(master.ExecuteMaster(objModel));
                return str;
            }
            catch (Exception)
            {
                return "";
            }
            
        }

        #endregion
    }
}
