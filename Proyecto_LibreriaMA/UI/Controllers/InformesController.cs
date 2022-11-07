using CAPA_NEGOCIO.MODEL;
using CAPA_NEGOCIO.SECURITY;
using Microsoft.AspNetCore.Mvc;


namespace UI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class InformesController : Controller
    {
       public InformesController()
        {
            AuthNetCore.loginIN("sa", "1234");
        }
        [HttpPost]
        public object TakeInformeEjemplo1(InformeEjemplo1 ObjInst)
        {
            return ObjInst.TakeInforme(ObjInst);
        }
    }
}
