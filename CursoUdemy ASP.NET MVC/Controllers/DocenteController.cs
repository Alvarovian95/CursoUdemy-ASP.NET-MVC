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
            //var lista = (from docente in bd.Docente
            //             where docente.BHABILITADO.Equals(1)
            //             select new
            //             {
            //                 docente.IIDDOCENTE,
            //                 docente.NOMBRE,
            //                 docente.APPATERNO,
            //                 docente.APMATERNO,
            //                 docente.EMAIL
            //             }).ToList();


            //EXPRESION LAMBA
            var lista = bd.Docente.Where(p => p.BHABILITADO.Equals(1)).Select(
                p => new
                {
                    p.IIDDOCENTE,
                    p.NOMBRE,
                    p.APPATERNO,
                    p.APMATERNO,
                    p.EMAIL
                }).ToList();
                

            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult filtrarDocentePorModalidad(int iidmodaldiad)
        {
            DataClasses1DataContext bd = new DataClasses1DataContext();          

            var lista = bd.Docente.Where(p => p.BHABILITADO.Equals(1)
            && p.IIDMODALIDADCONTRATO.Equals(iidmodaldiad)).Select(
                p => new
                {
                    p.IIDDOCENTE,
                    p.NOMBRE,
                    p.APPATERNO,
                    p.APMATERNO,
                    p.EMAIL
                }).ToList();


            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult listarModalidadContrato()
        {
            DataClasses1DataContext bd = new DataClasses1DataContext();
            var lista = bd.ModalidadContrato.Where(p => p.BHABILITADO.Equals(1)).
                Select(p => new
                {
                    IID = p.IIDMODALIDADCONTRATO,
                    p.NOMBRE
                }).ToList();

            return Json(lista, JsonRequestBehavior.AllowGet);
        }

    }
}