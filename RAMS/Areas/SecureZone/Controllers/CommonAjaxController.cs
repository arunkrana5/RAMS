using COMMON;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages;
using static MODEL.CommonModel;
using System.Net;
using MODEL;
using Newtonsoft.Json;
using System.Diagnostics.Metrics;
using DAL;
using INTERFACE;

namespace RAMS.Areas.SecureZone.Controllers
{
    [Area("SecureZone")]
    public class CommonAjaxController : Controller
    {
        ICommonHelper status;
        public CommonAjaxController()
        {
            status = new CommonDAL();
        }
        [HttpPost]
        public JsonResult GetDateTimeJson()
        {
            string MyTime = DateTime.Now.ToString("dddd, dd-MMM-yyyy hh:mm:ss tt");
            return Json(MyTime);
        }
        [HttpPost]
        public JsonResult GetDropDownListJson(GetDropDownResponse Modal)
        {
            List<DropDownlist> Result = new List<DropDownlist>();
            Result = Common_SPU.GetDropDownList(Modal);
            return Json(Result);
        }
        [HttpPost]
        public string CommonChangeStatus(ChangeStatusModel objModel)
        {
            try
            {
                string str = JsonConvert.SerializeObject(status.ChangeStatus(objModel));
                return str;
            }
            catch (Exception)
            {
                return "";
            }
        }
    }
}
