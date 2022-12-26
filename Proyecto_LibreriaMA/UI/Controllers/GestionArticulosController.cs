using CAPA_NEGOCIO.MODEL;
using CAPA_NEGOCIO.SECURITY;
using Microsoft.AspNetCore.Mvc;

namespace UI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class GestionArticulosController : Controller
    {
        public GestionArticulosController()
        {
            AuthNetCore.loginIN("sa", "1234");
        }
        [HttpPost]
        public Object UpdateArticulos(Articulos ent)
        {
            return ent.Update("idarticulo");
        }

    }
}
