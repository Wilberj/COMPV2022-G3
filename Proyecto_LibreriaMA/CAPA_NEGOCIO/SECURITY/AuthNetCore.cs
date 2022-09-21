using CAPA_DATOS;
using CAPA_NEGOCIO.MODEL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAPA_NEGOCIO.SECURITY
{
    public class AuthNetCore
    {
        static public UserModel User;
        static public bool VerifyAuthenticate()
        {
            if (SqlADOConexion.SQLM == null)
            {
                SqlADOConexion.SQLM = null;
                return false;
            }
            return true;
        }

        static public bool loginIN(string user, string password)
        {
            try
            {
                SqlADOConexion.IniciarConexion(user, password);
                User = new UserModel(
                    new DatosUsuarios() { nombreusuario = user }.FindObject<DatosUsuarios>()
                    );
                return true;
            }
            catch(Exception)
            {
                return false;
            }
        }
    }
    public class UserModel
    {
        public UserModel(DatosUsuarios DatosUsuarios)
        {
            this.user = DatosUsuarios.nombreusuario;
            this.success = true;
            this.UserId = DatosUsuarios.idusuario;
            this.Roles = new List<string> { "ADMIN", "VENDEDOR" };
        }
        public string user { get; set; }
        public int? UserId { get; set; }
        public bool success { get; set; }
        public List<String> Roles { get; set; }
    }

}
