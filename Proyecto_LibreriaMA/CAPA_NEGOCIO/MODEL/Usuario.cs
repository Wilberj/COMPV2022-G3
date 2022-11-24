using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAPA_NEGOCIO.MODEL
{
    public class Usuario
    {
        public int? idusuario { get; set; }
        public string? contrasena { get; set; }
        public string? cedula { get; set; }
        public string? nombreusuario { get; set; }
        public string? apellidousuario { get; set; }
        public string? direccionusuario { get; set; }
        public int? telefonousuario { get; set; }
        public string? email { get; set; }
        public bool? activo { get; set; }
        // public int? idroles { get; set; }

        public Rol idroles { get; set; }
    }
}
