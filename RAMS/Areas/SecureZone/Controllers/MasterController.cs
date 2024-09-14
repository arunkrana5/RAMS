using COMMON;
using DAL;
using INTERFACE;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages;
using MODEL;
using Newtonsoft.Json;
using System.Diagnostics.Metrics;
using System.Net;
using System.Reflection;

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
        public IActionResult AddUser(int? id)
        {
            string RoleName = ClsApplicationSetting.GetSessionValue("RoleName");
            if (String.IsNullOrEmpty(RoleName))
            {
                return RedirectToAction("PageNotFound", "Account", new { Area = "Authentication" });
            }
            else
            {
                ViewBag.ID = Convert.ToInt32(id);
                return View();
            }
        }
        public IActionResult Users()
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
        public string ExecuteUser(UserModel objModel)
        {
            try
            {
                objModel.IPAddress = ClsApplicationSetting.GetIPAddress();
                objModel.CreatedBy = Convert.ToInt32(ClsApplicationSetting.GetSessionValue("LoginID"));
                objModel.Password = ClsCommon.Encrypt(objModel.Password);
                string str = JsonConvert.SerializeObject(master.ExecuteUsers(objModel));
                return str;
            }
            catch (Exception)
            {
                return "";
            }
        }
        [HttpPost]
        public string GetEmployeeByID(GetResponse objModel)
        {
            try
            {
                objModel.IPAddress = ClsApplicationSetting.GetIPAddress();
                objModel.LoginID = Convert.ToInt32(ClsApplicationSetting.GetSessionValue("LoginID"));
                string str = JsonConvert.SerializeObject(master.GetEMP(objModel));
                return str;
            }
            catch (Exception)
            {
                return "";
            }
        }

        [HttpPost]
        public JsonResult GetEmployeeList(DataTableModel objModel)
        {
            try
            {
                objModel.IPAddress = ClsApplicationSetting.GetIPAddress();
                objModel.SearchText = Request.Form["search[value]"];
                objModel.sortColumn = Convert.ToInt32(Request.Form["order[0][column]"]);
                objModel.sortOrder = Request.Form["order[0][dir]"];
                objModel.LoginID = Convert.ToInt64(ClsApplicationSetting.GetSessionValue("LoginID"));
                var Result = master.GetEmployeeList(objModel);
                int recordTotal = Result.Count > 0 ? Result.Select(x => x.TotalCount).FirstOrDefault() : 0;
                return Json(new
                {
                    draw = objModel.draw,
                    recordsFiltered = recordTotal,
                    recordsTotal = recordTotal,
                    aaData = Result
                });
            }
            catch (Exception)
            {
                return Json(new
                {
                    draw = objModel.draw,
                    recordsFiltered = 0,
                    recordsTotal = 0,
                    aaData = ""
                });
            }
        }

        #endregion

        #region CommonMaster

        public IActionResult Country()
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
        public IActionResult AddCountry(int? id)
        {
            ViewBag.CountryID = Convert.ToInt32(id);
            return View();
        }
        public IActionResult Region()
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
        public IActionResult AddRegion(int? id)
        {
            ViewBag.ID = Convert.ToInt32(id);
            return View();
        }
        public IActionResult State()
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
        public IActionResult AddState(int? id)
        {
            ViewBag.ID = Convert.ToInt32(id);
            return View();
        }
        public IActionResult City()
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
        public IActionResult AddCity(int? id)
        {
            ViewBag.ID = Convert.ToInt32(id);
            return View();
        }
        public IActionResult Area()
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
        public IActionResult AddArea(int? id)
        {
            ViewBag.ID = Convert.ToInt32(id);
            return View();
        }
        public IActionResult Department()
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
        public IActionResult AddDepartment(int? id)
        {
            ViewBag.ID = Convert.ToInt32(id);
            return View();
        }
        public IActionResult Designation()
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
        public IActionResult AddDesignation(int? id)
        {
            ViewBag.ID = Convert.ToInt32(id);
            return View();
        }
        public IActionResult DocumentType()
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
        public IActionResult AddDocumentType(int? id)
        {
            ViewBag.ID = Convert.ToInt32(id);
            return View();
        }

        public IActionResult Role()
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
        public IActionResult AddRole(int? id)
        {
            ViewBag.ID = Convert.ToInt32(id);
            return View();
        }

        public IActionResult DealerType()
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
        public IActionResult AddDealerType(int? id)
        {
            ViewBag.ID = Convert.ToInt32(id);
            return View();
        }

        public IActionResult DealerCategory()
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
        public IActionResult AddDealerCategory(int? id)
        {
            ViewBag.ID = Convert.ToInt32(id);
            return View();
        }

        [HttpPost]
        public string ExecuteMaster(MasterModel objModel)
        {
            try
            {
                objModel.IPAddress = ClsApplicationSetting.GetIPAddress();
                objModel.CreatedBy = Convert.ToInt32(ClsApplicationSetting.GetSessionValue("LoginID"));
                string str = JsonConvert.SerializeObject(master.ExecuteMaster(objModel));
                return str;
            }
            catch (Exception)
            {
                return "";
            }
        }
        #endregion

        #region Branding Type Master
        public IActionResult BrandingType()
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
        public IActionResult AddBrandingType(int? id)
        {
            ViewBag.ID = Convert.ToInt32(id);
            return View();
        }

        [HttpPost]
        public string ExecuteBrandingType(BrandingTypeModel objModel)
        {
            try
            {
                objModel.IPAddress = ClsApplicationSetting.GetIPAddress();
                objModel.CreatedBy = Convert.ToInt32(ClsApplicationSetting.GetSessionValue("LoginID"));
                string str = JsonConvert.SerializeObject(master.ExecuteBrandingType(objModel));
                return str;
            }
            catch (Exception)
            {
                return "";
            }
        }
        #endregion

        #region DealerMaster

        public IActionResult Dealers()
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
        public IActionResult AddDealer(int? id)
        {
            ViewBag.ID = Convert.ToInt32(id);
            return View();
        }

        [HttpPost]
        public JsonResult ExecuteDealers(DealerModel.Add model)
        {
            CommonModel.PostResponse Result = new CommonModel.PostResponse();
            Result.SuccessMessage = "Dealer Can't Update";
            JsonData jsonData;
            try
            {
                model.LoginID = Convert.ToInt32(ClsApplicationSetting.GetSessionValue("LoginID"));
                model.IPAddress = ClsApplicationSetting.GetIPAddress();
                Result = master.fnSetDealer(model);
                if (Result.ID > 0 && Result.Status)
                {
                    model.DealerID = Result.ID;
                    Result = master.fnSetDealerMapping(model);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            jsonData = new JsonData() { status = Result.Status, message = Result.SuccessMessage, Data = Result };
            return Json(jsonData);
        }
        public JsonResult GetDealerList(DataTableModel param)
        {

            param.SearchText = Request.Form["search[value]"];
            param.sortColumn = Convert.ToInt32(Request.Form["order[0][column]"]);
            param.sortOrder = Request.Form["order[0][dir]"];
            param.LoginID = Convert.ToInt32(ClsApplicationSetting.GetSessionValue("LoginID"));
            var Result = master.GetDealerList(param);
            int recordTotal = Result.Count > 0 ? Result.Select(x => x.TotalCount).FirstOrDefault() : 0;
            return Json(new
            {
                draw = param.draw,
                recordsFiltered = recordTotal,
                recordsTotal = recordTotal,
                aaData = Result
            });

        }
        [HttpPost]
        public string GetDealerByID(GetResponse objModel)
        {
            try
            {
                objModel.IPAddress = ClsApplicationSetting.GetIPAddress();
                objModel.LoginID = Convert.ToInt32(ClsApplicationSetting.GetSessionValue("LoginID"));
                string str = JsonConvert.SerializeObject(master.GetDealer(objModel));
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
