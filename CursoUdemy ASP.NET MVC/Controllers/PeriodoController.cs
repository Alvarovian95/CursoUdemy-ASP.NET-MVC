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
                 .Select(p => new { p.IIDPERIODO, p.NOMBRE, FECHAINICIO = ((DateTime)p.FECHAINICIO).ToShortDateString(), FECHAFIN = ((DateTime)p.FECHAFIN).ToShortDateString() })).ToList();

            return Json(lista, JsonRequestBehavior.AllowGet);
        }


        public JsonResult buscarPeriodoPorNombre(string nombrePeriodo)
        {
            DataClasses1DataContext bd = new DataClasses1DataContext();
            var lista = (bd.Periodo.Where(p => p.BHABILITADO.Equals(1) && p.NOMBRE.Contains(nombrePeriodo))
                 .Select(p => new
                 {
                     p.IIDPERIODO,
                     p.NOMBRE,
                     FECHAINICIO = ((DateTime)p.FECHAINICIO).ToShortDateString(),
                     FECHAFIN = ((DateTime)p.FECHAFIN).ToShortDateString()
                 })).ToList();

            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public int eliminar(Periodo periodo)
        {
            DataClasses1DataContext bd = new DataClasses1DataContext();
            int nregistrosAfectados = 0;

            try
            {
                int idperiodo = periodo.IIDPERIODO;
                Periodo obj = bd.Periodo.Where(p => p.IIDPERIODO.Equals(idperiodo)).First();
                obj.BHABILITADO = 0;
                bd.SubmitChanges();
                nregistrosAfectados = 1;
            }
            catch (Exception ex)
            {
                nregistrosAfectados = 0;
            }
            return nregistrosAfectados;
        }

        public JsonResult recuperarInformacion(int id)
        {
            DataClasses1DataContext bd = new DataClasses1DataContext();
            var lista = bd.Periodo.Where(p => p.IIDPERIODO.Equals(id)).Select(p => new
            {
                p.IIDPERIODO,
                p.NOMBRE,
                FECHAINICIOCADENA = ((DateTime)p.FECHAINICIO).ToShortDateString(),
                FECHAFINCADENA = ((DateTime)p.FECHAFIN).ToShortDateString()
            }
                );
            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public int guardarDatos(Periodo oPeriodo)
        {
            DataClasses1DataContext bd = new DataClasses1DataContext();
            int nregistrosAfectados = 0;
            try
            {
                int idPeriodo = oPeriodo.IIDPERIODO;
                if(idPeriodo >= 1)
                {
                    //EDITAR
                    Periodo obj = bd.Periodo.Where(p => p.IIDPERIODO.Equals(idPeriodo)).First();
                    obj.NOMBRE = oPeriodo.NOMBRE;
                    obj.FECHAINICIO = oPeriodo.FECHAINICIO;
                    obj.FECHAFIN = oPeriodo.FECHAFIN;
                    bd.SubmitChanges();
                    nregistrosAfectados = 1;
                }
                else
                {
                    //NUEVO
                    bd.Periodo.InsertOnSubmit(oPeriodo);
                    bd.SubmitChanges();
                    nregistrosAfectados = 1;
                }
            }
            catch(Exception ex)
            {
                nregistrosAfectados = 0;
            }
            return nregistrosAfectados;
        }
    }
}