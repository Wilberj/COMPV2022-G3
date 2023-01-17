using CAPA_NEGOCIO.MODEL;
using CAPA_NEGOCIO.SECURITY;
using Microsoft.AspNetCore.Mvc;
using static CAPA_NEGOCIO.MODEL.GraficoCompra;
using static CAPA_NEGOCIO.MODEL.GraficoFactura;

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
        public Object TakeInformeVentaGrafico(BarrasFactura ObjInst)
        {
            return ObjInst.TakeInforVentGraf(ObjInst);
        }
        public Object TakeInformecompraGrafico(Barrascompra ObjInst)
        {
            return ObjInst.TakeInforcompraGraf(ObjInst);
        }
    }
}
