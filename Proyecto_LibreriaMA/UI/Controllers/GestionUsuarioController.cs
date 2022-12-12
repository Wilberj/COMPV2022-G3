using CAPA_NEGOCIO.MODEL;
using CAPA_NEGOCIO.SECURITY;
using Microsoft.AspNetCore.Mvc;

namespace UI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class GestionUsuarioController : Controller
    {

        public GestionUsuarioController()
        {
            AuthNetCore.loginIN("sa", "1234");
        }
        [HttpPost]
        public Object Saveusuario(DatosUsuarios ent)
        {
            ent.idusuario = (Int32)ent.Save();
            return ent;
        }
        public Object ChargeUsuario(ViewGestionUsuarios ent)
        {
            return ent.Get<ViewGestionUsuarios>();
        }
        public Object UpdateDatosusuarios(DatosUsuarios ent)
        {
            return ent.Update("idusuario");
        }
     

    }
}
