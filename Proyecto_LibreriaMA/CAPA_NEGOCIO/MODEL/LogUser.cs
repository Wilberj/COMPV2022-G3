using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace CAPA_NEGOCIO.MODEL
{
    public class LogUser
    {
        public Usuario EncontrarUsuario(string Nombre, string Contrasena)
        {
            Usuario objeto = new Usuario();

            using (SqlConnection conexion = new SqlConnection("Data Source=(local);Initial Catalog=LibreriaMA2; Integrated Security=true"))
            {

                string query = "select nombreusuario,contrasena,idroles from DatosUsuarios where nombreusuario = @pNombre and contrasena = @pContrasena";

                SqlCommand cmd = new SqlCommand(query, conexion);
                cmd.Parameters.AddWithValue("@pNombre", Nombre);
                cmd.Parameters.AddWithValue("@pContrasena", Contrasena);
                cmd.CommandType = CommandType.Text;

                conexion.Open();


                using (SqlDataReader dr = cmd.ExecuteReader())
                {
                    while (dr.Read())
                    {
                        objeto = new Usuario()
                        {
                            nombreusuario = dr["nombreusuario"].ToString(),
                            contrasena = dr["contrasena"].ToString(),
                            idroles = dr["idroles"].ToString(),
                        };
                    }
                }


            }
            return objeto;


        }

    }
}
