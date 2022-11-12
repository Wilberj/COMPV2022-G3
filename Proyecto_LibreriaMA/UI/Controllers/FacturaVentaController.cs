using CAPA_NEGOCIO.MODEL;
using CAPA_NEGOCIO.SECURITY;
using Microsoft.AspNetCore.Mvc;

namespace UI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class FacturaVentaController : Controller
    {
        public FacturaVentaController()
        {
            AuthNetCore.loginIN("sa", "1234");
        }
        [HttpPost]
        public object TakeFacturaventa(facturaejemplo1 ObjInst)
        {
            return ObjInst.TakeFactura(ObjInst);
        }
    }
}
