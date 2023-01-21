using CAPA_NEGOCIO.MODEL;
using CAPA_NEGOCIO.SECURITY;
using Microsoft.AspNetCore.Mvc;


namespace UI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class InformesArticuloDevueltoController : Controller
    {
       public InformesArticuloDevueltoController()
        {
            AuthNetCore.loginIN("sa", "1234");
        }
        [HttpPost]
        public object TakeInformeArticuloDevueltoEjemplo1(InformeArticuloDevueltoEjemplo1 ObjInst)
        {
            return ObjInst.TakeInformeArticuloDevuelto(ObjInst);
        }
    }
}
