using CAPA_NEGOCIO.MODEL;
using CAPA_NEGOCIO.SECURITY;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;



namespace UI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class GestionVentaController : Controller
    {
        public GestionVentaController()
        {
            AuthNetCore.loginIN("sa", "1234");
        }
        [HttpPost]

        public Object ChargeArticulosVenta(ViewListArticuloVenta ent)
        {
            return ent.Get<ViewListArticuloVenta>();
        }

        public Object SaveFactura(Factura ent)
        {
            return ent.SaveFactura();
        }
        public Object ChargeDevVentas(ViewListFactura ent)
        {

            return ent.Get<ViewListFactura>();
        }
        public Object ChargeDetaDevVenta(viewDetalleDevolucionVenta ent)
        {

            return ent.Get<viewDetalleDevolucionVenta>();
        }
        public Object ChargeTableDetalleVenta(ViewTableDetalleVenta ent)
        {

            return ent.Get<ViewTableDetalleVenta>();
        }
        public Object SaveDevolucionventa(DevolucionVenta ent)
        {
            return ent.SaveDevolucionventa();
        }
        public Object SaveDetalleDevolucionventa(DevolucionVenta ent)
        {
            return ent.SaveDetalleDevolucionventa();
        }

        public Object DevolucionVentaList(DevolucionVenta ent)
        {
            return ent.Get<DevolucionVenta>();
        }
        public Object ChargeVentaList(Factura ent)
        {
            return ent.Get<Factura>();
        }
        public Object ChargeDevoVentaList(ViewDevolDetalleVenta ent)
        {
            return ent.Get<ViewDevolDetalleVenta>();
        }
    }
}
