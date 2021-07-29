using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CursoUdemy_ASP.NET_MVC.Controllers
{
    public class SeccionController : Controller
    {
        // GET: Seccion
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult listarSeccion()
        {
            DataClasses1DataContext bd = new DataClasses1DataContext();
            var lista = bd.Seccion.Where(p => p.BHABILITADO.Equals(1))
                .Select(p => new
                {
                    p.IIDSECCION,
                    p.NOMBRE
                });
            return Json(lista, JsonRequestBehavior.AllowGet);
        }
    }
}