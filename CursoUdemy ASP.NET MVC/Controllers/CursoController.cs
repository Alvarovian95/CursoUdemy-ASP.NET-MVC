using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CursoUdemy_ASP.NET_MVC.Controllers
{
    public class CursoController : Controller
    {
        // GET: Curso
        public ActionResult Index()
        {
            return View();
        }

        public string mensaje()
        {
            return "Bienvenido al curso ASP.NET MVC";
        }

        public string saludo(string nombre)
        {
            return "Hola como estas " + nombre;
        }

        public string nombreCompleto(string nombre, string apellido)
        {
            return "Hola como estas " + nombre + " " + apellido;
        }

        public JsonResult listarCursos()
        {
            DataClasses1DataContext bd = new DataClasses1DataContext();
            var lista = bd.Curso.Where(p => p.BHABILITADO.Equals(1))
                .Select(p => new { p.IIDCURSO, p.NOMBRE, p.DESCRIPCION });
            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult buscarCursoPorNombre(string nombre)
        {
            DataClasses1DataContext bd = new DataClasses1DataContext();
            var lista = bd.Curso.Where(p => p.BHABILITADO.Equals(1) &&
            p.NOMBRE.Contains(nombre))
               .Select(p => new { p.IIDCURSO, p.NOMBRE, p.DESCRIPCION });
            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult recuperarDatos(int id)
        {
            DataClasses1DataContext bd = new DataClasses1DataContext();
            var lista = bd.Curso.Where(p => p.BHABILITADO.Equals(1)
            && p.IIDCURSO.Equals(id))
             .Select(p => new { p.IIDCURSO, p.NOMBRE, p.DESCRIPCION });
            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public int guardarDatos(Curso curso)
        {
            DataClasses1DataContext bd = new DataClasses1DataContext();
            int nregistrosAfectados = 0;
            try
            {
                //NUEVO
                if (curso.IIDCURSO == 0)
                {
                    curso.NOMBRE = curso.NOMBRE.ToUpper();
                    curso.DESCRIPCION = curso.DESCRIPCION.ToUpper();

                    bd.Curso.InsertOnSubmit(curso);
                    bd.SubmitChanges();
                    nregistrosAfectados = 1;
                }
                //EDITAR
                else
                {

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