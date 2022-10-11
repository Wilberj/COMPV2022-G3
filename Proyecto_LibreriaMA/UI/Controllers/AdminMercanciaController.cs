using CAPA_NEGOCIO.MODEL;
using CAPA_NEGOCIO.SECURITY;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace UI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AdminMercanciaController : Controller
    {
        public AdminMercanciaController()
        {
            AuthNetCore.loginIN("sa", "1234");
        }
        [HttpPost]

        public Object SaveAdministracionMercancias(AdministracionMercancias ent)
        {
            ent.idadmimercancias = (Int32)ent.Save();
            return ent;
        }
        public Object GetAdministracionMercancias(AdministracionMercancias ent)
        {
            return ent.Get<AdministracionMercancias>();
        }
        public Object UpdateAdministracionMercancias(AdministracionMercancias ent)
        {
            return ent.Update("idadmimercancias");
        }
    }
}
