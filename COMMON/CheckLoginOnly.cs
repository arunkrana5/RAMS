using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace COMMON
{
	public class CheckLoginOnly : ActionFilterAttribute
	{
		//public override void OnActionExecuting(ActionExecutingContext filterContext)
		//{
		//	HttpContextAccessor httpContextAccessor = new HttpContextAccessor();
		//	long LoginID = 0;
		//	long.TryParse(ClsApplicationSetting.GetSessionValue("LoginID"), out LoginID);

		//	string[] Requestedsrc = null;
		//	string actionName = (string)filterContext.RouteData.Values["action"];

		//	if (httpContextAccessor.HttpContext.Request.Method == "GET")
		//	{
		//		Requestedsrc = ClsApplicationSetting.DecryptQueryString(httpContextAccessor.HttpContext.Request.QueryString["src"]);
		//	}
		//	else
		//	{
		//		if (filterContext.!= null)
		//		{
		//			Requestedsrc = ClsApplicationSetting.DecryptQueryString(filterContext.Controller.ValueProvider.GetValue("src").AttemptedValue);
		//		}
		//	}

		//	if (HttpContext.Current.Session["LoginID"] == null)
		//	{
		//		string ReturnURL = HttpContext.Current.Request.Url.AbsoluteUri;
		//		HttpContext.Current.Response.Redirect("~/Accounts/Login?ReturnURL=" + ClsCommon.Encrypt(ReturnURL));
		//	}
		//	else if (ClsApplicationSetting.GetWebConfigValue("AllowMultipleLogin") != "true" && !Common_SPU.fnGetSessionExists(filterContext.HttpContext.Session.SessionID.ToString(), LoginID).Status)
		//	{
		//		HttpContext.Current.Response.Redirect("/Accounts/Logout");
		//	}

		//}
	}
}
