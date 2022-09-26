using CAPA_NEGOCIO.MODEL;
using CAPA_NEGOCIO.SECURITY;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace UI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class MantenimientoCatalogosController : ControllerBase
    {
        public MantenimientoCatalogosController()
        {
            AuthNetCore.loginIN("sa", "1234");
        }
        [HttpPost]
        public Object GetCategoria(Categoria ent)
        {
            return ent.Get<Categoria>();
        }
        public Object SaveCategoria(Categoria ent)
        {
            ent.idcategoria = (Int32)ent.Save();
            return ent;
        }
        public Object UpdateCategoria(Categoria ent)
        {
            return ent.Update("idcategoria");
        }
         public Object GetCompraProductos(CompraProductos ent)
         {
             return ent.Get<CompraProductos>();
         }
        /*    public Object SaveCompraProductos(CompraProductos ent)
            {

                ent.Get < DatosUsuarios> (  );
                ent.Get <Proveedor> (  );
                ent.Get<Estado> ( );


           ent.idcompra = (Int32)ent.Save();

               return ent;
           }
           public Object UpdateCompraProductos(CompraProductos ent)
           {
               return ent.Update("idcompra");
           }*/
        public Object GetMarca(Marca ent)
        {
            return ent.Get<Marca>();
        }
        public Object SaveMarca(Marca ent)
        {
            ent.idmarca = (Int32)ent.Save();
            return ent;
        }
        public Object UpdateMarca(Marca ent)
        {
            return ent.Update("idmarca");
        }
        public Object GetProveedor(Proveedor ent)
        {
            return ent.Get<Proveedor>();
        }
        public Object SaveProveedor(Proveedor ent)
        {
            ent.idproveedor = (Int32)ent.Save();
            return ent;
        }
        public Object UpdateProveedor(Proveedor ent)
        {
            return ent.Update("idproveedor");
        }
        public Object GetEstado(Estado ent)
        {
            return ent.Get<Estado>();
        }
        public Object SaveEstado(Estado ent)
        {
            ent.idestado = (Int32)ent.Save();
            return ent;
        }
        public Object UpdateEstado(Estado ent)
        {
            return ent.Update("idestado");
        }
        public Object GetDatosUsuarios(DatosUsuarios ent)
        {
            return ent.Get<DatosUsuarios>();
        }
        public Object SaveDatosUsuarios(DatosUsuarios ent)
        {
            ent.idusuario = (Int32)ent.Save();
            return ent;
        }
        public Object UpdateDatosUsuarios(DatosUsuarios ent)
        {
            return ent.Update("idusuario");
        }
       /* public Object GetDetalleCompraProductos(DetalleCompraProductos ent)
        {
            return ent.Get<DetalleCompraProductos>();
        }
        public Object SaveDetalleCompraProductos(DetalleCompraProductos ent)
        {
            ent.iddetallecompra = (Int32)ent.Save();
            return ent;
        }
        public Object UpdateDetalleCompraProductos(DetalleCompraProductos ent)
        {
            return ent.Update("iddetallecompra");
        }*/
        public Object GetArticulos(Articulos ent)
        {
            return ent.Get<Articulos>();
        }
        public Object SaveArticulos(Articulos ent)
        {
            ent.idarticulo = (Int32)ent.Save();
            return ent;
        }
        public Object UpdateArticulos(Articulos ent)
        {
            return ent.Update("idarticulo");
        }
        public Object GetTipoMaterial(TipoMaterial ent)
        {
            return ent.Get<TipoMaterial>();
        }
        public Object SaveTipoMaterial(TipoMaterial ent)
        {
            ent.idmaterial = (Int32)ent.Save();
            return ent;
        }
        public Object UpdateTipoMaterial(TipoMaterial ent)
        {
            return ent.Update("idmaterial");
        }
        public Object GetBodega(Bodega ent)
        {
            return ent.Get<Bodega>();
        }
        public Object SaveBodega(Bodega ent)
        {
            ent.idbodega = (Int32)ent.Save();
            return ent;
        }
        public Object UpdateBodega(Bodega ent)
        {
            return ent.Update("idbodega");
        }
        public Object GetUnidades(Unidades ent)
        {
            return ent.Get<Unidades>();
        }
        public Object SaveUnidades(Unidades ent)
        {
            ent.idunidadmedida = (Int32)ent.Save();
            return ent;
        }
        public Object UpdateUnidades(Unidades ent)
        {
            return ent.Update("idunidadmedida");
        }
        public Object GetConvertirMedida(ConvertirMedida ent)
        {
            return ent.Get<ConvertirMedida>();
        }
        public Object SaveConvertirMedida(ConvertirMedida ent)
        {
            ent.idconvertir = (Int32)ent.Save();
            return ent;
        }
        public Object UpdateConvertirMedida(ConvertirMedida ent)
        {
            return ent.Update("idconvertir");
        }
        public Object GetTamano(Tamano ent)
        {
            return ent.Get<Tamano>();
        }
        public Object SaveTamano(Tamano ent)
        {
            ent.idtamano = (Int32)ent.Save();
            return ent;
        }
        public Object UpdateTamano(Tamano ent)
        {
            return ent.Update("idtamano");
        }
        public Object GetTamanoxArticulo(TamanoxArticulo ent)
        {
            return ent.Get<TamanoxArticulo>();
        }
        public Object SaveTamanoxArticulo(TamanoxArticulo ent)
        {
            ent.idtamanoxarticulo = (Int32)ent.Save();
            return ent;
        }
        public Object UpdateTamanoxArticulo(TamanoxArticulo ent)
        {
            return ent.Update("idtamanoxarticulo");
        }
    }

}
