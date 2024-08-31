using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Security.Principal;
using MODEL;
using COMMON;
using INTERFACE;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages;
using System.Net;
using DAL;

namespace RAMS.Areas.Authentication.Controllers
{
    [Area("Authentication")]
    public class AccountController : Controller
    {
        IAccountsHelper Account;
        long LoginID = 0;
        string IPAddress = "";
        public AccountController()
        {
            //long.TryParse(ClsApplicationSetting.GetSessionValue("LoginID"), out LoginID);
            IPAddress = ClsCommon.GetIPAddress();
            Account = new AccountDAL();
        }
        public IActionResult Login(string ReturnURL)
        {
            ClsApplicationSetting.ClearSessionValues();
            ViewBag.ReturnURL = ReturnURL;
			BaseModel Modal = new BaseModel();
			return View(Modal);
		}

        [HttpPost]
        public JsonResult Login(LoginModel Modal, string Command)
        {
            JsonData jsonData = new JsonData();
            if (ModelState.IsValid)
            {
                if (Command == "Submit")
                {
                    ClsApplicationSetting setting = new ClsApplicationSetting();
                    Modal.IPAddress = ClsCommon.GetIPAddress();
                    Modal.SessionID = HttpContext.Session.Id;
                    BaseModel result = Account.GetLogin(Modal);
                    if (result.status)
                    {
						ClsApplicationSetting.SetSessionValue("LoginID", result.LoginID.ToString());
                        ClsApplicationSetting.SetSessionValue("UserID", result.UserID.ToString());
                        ClsApplicationSetting.SetSessionValue("RoleID", result.RoleID.ToString());
                        ClsApplicationSetting.SetSessionValue("RoleName", result.RoleName.ToString());
                        ClsApplicationSetting.SetSessionValue("EMPID", result.EMPID.ToString());
                        ClsApplicationSetting.SetSessionValue("EMPName", result.EMPName.ToString());
                        ClsApplicationSetting.SetSessionValue("EMPCode", result.EMPCode.ToString());
                        ClsApplicationSetting.SetSessionValue("Phone", result.Phone.ToString());
                        ClsApplicationSetting.SetSessionValue("Email", result.Email.ToString());
						ClsApplicationSetting.SetSessionValue("Gender", result.Gender.ToString());
                        jsonData = new JsonData() { status = true, message = "", Data = result };
                    }
                    else
                    { 
                        jsonData = new JsonData() { status = false, message = result.Message, Data = result };
                    }

                }
            }
            return Json(jsonData);

        }
    }
}
