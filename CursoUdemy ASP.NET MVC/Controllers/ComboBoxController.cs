using CursoUdemy_ASP.NET_MVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CursoUdemy_ASP.NET_MVC.Controllers
{
    public class ComboBoxController : Controller
    {
        // GET: ComboBox
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult llenarComboPersona()
        {
            List<Persona> listaPersona = new List<Persona>
            {
                new Persona(1,"Alvaro"),
                new Persona(2, "Alberto"),
                new Persona(3, "Angel")
            };
            return Json(listaPersona, JsonRequestBehavior.AllowGet);
        }
    }
}