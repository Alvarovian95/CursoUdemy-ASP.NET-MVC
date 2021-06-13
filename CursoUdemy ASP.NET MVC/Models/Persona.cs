using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CursoUdemy_ASP.NET_MVC.Models
{
    public class Persona
    {
        public Persona(int idPersona, string nombre, string apellido1)
        {
            this.idPersona = idPersona;
            this.nombre = nombre;
            this.apellido1 = apellido1;
        }


        public Persona(int idPersona, string nombre)
        {
            this.idPersona = idPersona;
            this.nombre = nombre;
        
        }

        public int idPersona { get; set; }
        public string nombre { get; set; }
        public string apellido1 { get; set; }
    }
}