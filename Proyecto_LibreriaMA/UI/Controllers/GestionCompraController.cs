using CAPA_NEGOCIO.MODEL;
using CAPA_NEGOCIO.SECURITY;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;



namespace UI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class GestionCompraController : Controller
    {
        public GestionCompraController()
        {
            AuthNetCore.loginIN("sa", "1234");
        }
        [HttpPost]
        public Object MisArticulos(ViewCompra ent)
        {
            ent.idusuario = AuthNetCore.User.UserId;
            return ent.Get<ViewCompra>();
        }
        public Object AdminMercancia(ViewAdminMercancia ent)
        {
            return ent.Get<ViewAdminMercancia>();
        }
        public Object ChargeArticulos(ViewCompra ent)
        {
            return new ViewArticuloCompra().Get<ViewArticuloCompra>();
        }
        public Object ChargeDevCompra(ViewDevolucionCompra ent)
        {
           
            return ent.Get<ViewDevolucionCompra>();
        }
        public Object ChargeDetalleDevCompra(ViewDetalleDevolucion ent)
        {

            return ent.Get<ViewDetalleDevolucion>();
        }

        public Object ChargeDetalleCompra(DetalleCompraProductos ent)
        {

            return ent.Get<DetalleCompraProductos>();
        }

        public Object ChargeArticulosDanados(ViewArticulosDanados ent)
        {

            return ent.Get<ViewArticulosDanados>();
        }
        public Object SaveCompra(CompraProductos ent)
        {
            return ent.SaveCompra();
        }
        public Object SaveDevolucionCompra(DevolucionCompra ent)
        {
            return ent.SaveDevolucionCompra();
        }
        public Object SaveArtidanado(ArticulosDanados ent)
        {
            return ent.SaveArtiDanado();
        }
        public Object DevCompraList(DevolucionCompra ent)
        {

            return ent.Get<DevolucionCompra>();
        }
        public Object Devolcompra(ViewDevolucionesCompras ent)
        {

            return ent.Get<ViewDevolucionesCompras>();
        }
        public Object DevolDetallecompra(Viewdevoldetallecompra ent)
        {

            return ent.Get<Viewdevoldetallecompra>();
        }
        public Object Backdevolcompra(Viewbackcompra ent)
        {

            return ent.Get<Viewbackcompra>();
        }
        //  public Object GetAdministracionMercancias(AdministracionMercancias ent)
        // {
        //     return ent.Get<AdministracionMercancias>();
        // }
        //  public Object UpdateAdministracionMercancias(AdministracionMercancias ent)
        // {
        //     return ent.Update("idadmimercancias");
        // }
        //public Object SaveBodegaxArticulo(BodegaxArticulo ent)
        //{
        //    return ent.SaveBodegaxArticulo();
        //}
    }
}
