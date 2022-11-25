using CAPA_NEGOCIO.MODEL;
using CAPA_NEGOCIO.SECURITY;
using Microsoft.AspNetCore.Mvc;


namespace UI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class InformesCompraController : Controller
    {
       public InformesCompraController()
        {
            AuthNetCore.loginIN("sa", "1234");
        }
        [HttpPost]
        public object TakeInformeCompraEjemplo1(InformeCompraEjemplo1 ObjInst)
        {
            return ObjInst.TakeInformeCompra(ObjInst);
        }
    }
}
