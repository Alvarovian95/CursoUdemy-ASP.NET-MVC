using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CursoUdemy_ASP.NET_MVC.Controllers
{
    public class PeriodoController : Controller
    {
        // GET: Periodo
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult listarPeriodo()
        {
            DataClasses1DataContext bd = new DataClasses1DataContext();
           var lista = (bd.Periodo.Where(p => p.BHABILITADO.Equals(1))
                .Select(p => new { p.IIDPERIODO, p.NOMBRE, FECHAINICIO = ((DateTime) p.FECHAINICIO).ToShortDateString(), FECHAFIN = ((DateTime) p.FECHAFIN).ToShortDateString() })).ToList();

            return Json(lista, JsonRequestBehavior.AllowGet);
        }


        public JsonResult buscarPeriodoPorNombre(string nombrePeriodo)
        {
            DataClasses1DataContext bd = new DataClasses1DataContext();
            var lista = (bd.Periodo.Where(p => p.BHABILITADO.Equals(1) && p.NOMBRE.Contains(nombrePeriodo))
                 .Select(p => new { 
                     p.IIDPERIODO, 
                     p.NOMBRE, 
                     FECHAINICIO = ((DateTime)p.FECHAINICIO).ToShortDateString(), 
                     FECHAFIN = ((DateTime)p.FECHAFIN).ToShortDateString() 
                 })).ToList();

            return Json(lista, JsonRequestBehavior.AllowGet);
        }
    }
}