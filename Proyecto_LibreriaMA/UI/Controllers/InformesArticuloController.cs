using CAPA_NEGOCIO.MODEL;
using CAPA_NEGOCIO.SECURITY;
using Microsoft.AspNetCore.Mvc;


namespace UI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class InformesArticuloController : Controller
    {
       public InformesArticuloController()
        {
            AuthNetCore.loginIN("sa", "1234");
        }
        [HttpPost]
        public object TakeInformeArticuloEjemplo1(InformeArticuloEjemplo1 ObjInst)
        {
            return ObjInst.TakeInformeArticulo(ObjInst);
        }
    }
}
