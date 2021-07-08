using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CursoUdemy_ASP.NET_MVC.Controllers
{
    public class DocenteController : Controller
    {
        // GET: Docente
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult listarDocente()
        {
            DataClasses1DataContext bd = new DataClasses1DataContext();
            var lista = (from docente in bd.Docente
                         select new
                         {
                             docente.IIDDOCENTE,
                             docente.NOMBRE,
                             docente.APPATERNO,
                             docente.APMATERNO,
                             docente.EMAIL
                         }).ToList();

            return Json(lista, JsonRequestBehavior.AllowGet);
        }
    }
}