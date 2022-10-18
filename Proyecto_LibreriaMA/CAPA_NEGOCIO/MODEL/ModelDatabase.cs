using CAPA_DATOS;
using CAPA_NEGOCIO.SECURITY;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAPA_NEGOCIO.MODEL
{
    public class AdministracionMercancias : EntityClass
    {
        public int? idadmimercancias { get; set; }
        public int? idtamanoxarticulo { get; set; }
        public int? idconvertir { get; set; }
        public Decimal? preciocompraunidad { get; set; }
        public Decimal? precioventa { get; set; }
        public int? existenciasarticuloorigen { get; set; }
        public int? existenciasarticulounidad { get; set; }
        public int? idbodega { get; set; }

        //public List<AdministracionMercancias> AdminMercas { get; set; }
        public Object SaveAdminNuevo()
        {
            this.idadmimercancias = (Int32)this.Save();

            //Updateadmin();

            this.UpdateAdminMerca();

            return true;
        }


        public Object UpdateAdminMerca()
        {
        //    if (this.AdminMercas != null)
        //    {
        //        foreach (var AdminMercas in this.AdminMercas)
        //        {
                 // this.idadmimercancias = this.idadmimercancias;
                  this.Update("idadmimercancias");
           
            //        }
            //    }
            return true;
        }

    }


    public class Articulos : EntityClass
    {
        public int? idarticulo { get; set; }
        public string? nombrearticulo { get; set; }
        public string? descripcionarticulo { get; set; }
        public bool? activo { get; set; }
        public DateTime? fechadeingreso { get; set; }
        public string? color { get; set; }
        public int? idcategoria { get; set; }
        public int? idmarca { get; set; }
        public int? idmaterial { get; set; }
    }

    public class ArticulosDanados : EntityClass
    {
        public int? idarticulosdanados { get; set; }
        public int? idtamanoxarticulo { get; set; }
        public int? cantidaddanadaorigen { get; set; }
        public int? cantidaddanadaunidad { get; set; }
        public int? idusuario { get; set; }
        public int? idbodega { get; set; }
        public string descripcionarticulodanado { get; set; }
        public List<AdministracionMercancias> AdminMercas { get; set; }
        public Object SaveArtiDanado()
        {
            this.idarticulosdanados = (Int32)this.Save();

            this.UpdateAdminMerca();

            // UpdateAdminMerca();

            return true;
        }
        public Object UpdateAdminMerca()
        {
            if (this.AdminMercas != null)
            {
                foreach (var AdminMercas in this.AdminMercas)
                {
                    AdminMercas.idtamanoxarticulo = this.idtamanoxarticulo;
                    AdminMercas.Update("idadmimercancias");
                }
            }
            return true;
        }

    }

    public class Bodega : EntityClass
    {
        public int? idbodega { get; set; }
        public string? nombrebodega { get; set; }
        public string? Descripcion { get; set; }
        public bool? activo { get; set; }
    }
    //public class BodegaxArticulo : EntityClass
    //{
    //    public int? idbodegaxarticulo { get; set; }
    //    public int? idtamanoxarticulo { get; set; }
    //    public int? idbodega { get; set; }
    //    public int? Cantidadorigen { get; set; }
    //    public int? Cantidadunidad { get; set; }
    //    public List<AdministracionMercancias> AdminMercas { get; set; }
    //    public Object SaveBodegaxArticulo()
    //    {
    //        this.idbodegaxarticulo = (Int32)this.Save();

    //        this.UpdateAdminMerca();

    //        // UpdateAdminMerca();

    //        return true;
    //    }

    //    public Object UpdateAdminMerca()
    //    {
    //        if (this.AdminMercas != null)
    //        {
    //            foreach (var AdminMercas in this.AdminMercas)
    //            {
    //                AdminMercas.idtamanoxarticulo = this.idtamanoxarticulo;
    //                AdminMercas.Update("idadmimercancias");
    //            }
    //        }
    //        return true;
    //    }
    //}
    /*public class BodegaxArticulo : EntityClass
    {
        public int? idbodegaxarticulo { get; set; }
        public int? idarticulo { get; set; }
        public int? idbodega { get; set; }
    }*/

    public class Categoria : EntityClass
    {
        public int? idcategoria { get; set; }
        public string? nombrecategoria { get; set; }
        public string? descripcioncategoria { get; set; }
        public bool? activo { get; set; }
    }

    public class CompraProductos : EntityClass
    {
        public int? idcompra { get; set; }
        public DateTime? fechacompra { get; set; }
        public int? idusuario { get; set; }
        public decimal? subtotalcompra { get; set; }
        public decimal? iva { get; set; }
        public decimal? descuentocompra { get; set; }
        public decimal? totalcompra { get; set; }
        public int? idproveedor { get; set; }
        public int? idestado { get; set; }
        public bool? activo { get; set; }

        public List<DetalleCompraProductos> DetalleCompra { get; set; }



        /*public List<DatosUsuarios> Usuario { get; set; }*/

        public Object SaveCompra() 
        {
            this.idcompra = (Int32)this.Save();
            if (this.DetalleCompra != null)
            {
                foreach (var DetalleCompra in this.DetalleCompra)
                {
                    DetalleCompra.idcompra = this.idcompra;
                    DetalleCompra.iddetallecompra = (Int32)DetalleCompra.Save();   
                    DetalleCompra.SaveConvertMedida();
                    DetalleCompra.SaveTamanoxArt();
                    DetalleCompra.SaveAdminMercanciaComp();
                }

            }

            /* if (this.Usuario == null)
             {
                 this.Usuario = new List<DatosUsuarios>();
            }
             if (AuthNetCore.User.Roles.Find(r => r == "VENDEDOR") != null)
             {
                 Usuario.Add(new DatosUsuarios() { idcompra = this.idcompra, idusuario = AuthNetCore.User.UserId }); 
             }
             foreach (var Usuario in this.Usuario)
             {
                 Usuario.idcompra = this.idcompra;
                 Usuario.Save();
             }*/
            return true;
        }

    }

    //public class Configuracion : EntityClass
    //{
    //    public int? idconfiguracion { get; set; }
    //    public string? nombre { get; set; }
    //    public string? direccion { get; set; }
    //    public int? telefono { get; set; }
    //}

    public class ConvertirMedida : EntityClass
    {
        public int? idconvertir { get; set; }
        public int? idunidadmedida { get; set; }
        public int? idarticulo { get; set; }
        public decimal? cantidad { get; set; }
    }

    public class DatosUsuarios : EntityClass
    {
        public int? idusuario { get; set; }
        public string? contrasena { get; set; }
        public string? cedula { get; set; }
        public string? nombreusuario { get; set; }
        public string? apellidousuario { get; set; }
        public string? direccionusuario { get; set; }
        public int? telefonousuario { get; set; }
        public string? email { get; set; }
        public bool? activo { get; set; }
    }

    public class DetalleCompraProductos : EntityClass
    {
        public int? iddetallecompra { get; set; }
        public int? idcompra { get; set; }
        public int? idarticulo { get; set; }
        public decimal? preciocompra { get; set; }
        public decimal? cantidadcompra { get; set; }
        public decimal? descuentocompra { get; set; }
        public List<Articulos> Articulos { get; set; }
        public List<Unidades> Unidades { get; set; }
        public List<ConvertirMedida> ConvertMedida { get; set; }
        public List<Tamano> Tamanos { get; set; }
        public List<TamanoxArticulo> TamanoxArt { get; set; }
        public List<AdministracionMercancias> AdminMercanciaComp { get; set; }

        public Object SaveArticulos()
        {
            if (this.Articulos != null)
            {
                foreach (var Articulos in this.Articulos)
                {
                    Articulos.idarticulo = this.idarticulo;
                   /* Articulos.idarticulo = (Int32)Articulos.Save();*/
                }
            }
            return true;
        }
        public Object SaveUnidades()
        {
            if (this.Unidades != null)
            {
                foreach (var Unidades in this.Unidades)
                {
                    Unidades.idunidadmedida = this.iddetallecompra;
                    /* Articulos.idarticulo = (Int32)Articulos.Save();*/
                }
            }
            return true;
        }
        public Object SaveTamano()
        {
            if (this.Tamanos != null)
            {
                foreach (var Tamanos in this.Tamanos)
                {
                    Tamanos.idtamano = this.iddetallecompra;
                    /* Articulos.idarticulo = (Int32)Articulos.Save();*/
                }
            }
            return true;
        }
        public Object SaveConvertMedida()
        {
            if (this.ConvertMedida != null)
            {
                foreach (var ConvertMedida in this.ConvertMedida)
                {
                   /*ConvertMedida.idconvertir = this.iddetallecompra;*/
                    ConvertMedida.idconvertir = (Int32)ConvertMedida.Save();
                }
            }
            return true;
        }
        public Object SaveTamanoxArt()
        {
            if (this.TamanoxArt != null)
            {
                foreach (var TamanoxArt in this.TamanoxArt)
                {
                    TamanoxArt.iddetallecompra = this.iddetallecompra;
                    TamanoxArt.idtamanoxarticulo = (Int32)TamanoxArt.Save();
                }
            }
            return true;
        }
        public Object SaveAdminMercanciaComp()
        {
            if (this.AdminMercanciaComp != null)
            {
                foreach (var AdminMercanciaComp in this.AdminMercanciaComp)
                {
                    foreach (var ConvertMedida in this.ConvertMedida)
                    {
                        AdminMercanciaComp.idconvertir = ConvertMedida.idconvertir;
                    }
                    foreach (var TamanoxArt in this.TamanoxArt)
                    {
                         AdminMercanciaComp.idtamanoxarticulo = TamanoxArt.idtamanoxarticulo;


                    }

                    AdminMercanciaComp.idadmimercancias = (Int32)AdminMercanciaComp.Save();
                }
            }
            return true;
        }
    }

    public class DetalleFactura : EntityClass
    {
        public int? iddetallefactura { get; set; }
        public int? idfactura { get; set; }
        public int? idtamanoxarticulo { get; set; }
        public decimal? precioventa { get; set; }
        public decimal? cantidadventa { get; set; }
        public decimal? descuentoventa { get; set; }
        public List<AdministracionMercancias> AdminMercaVenta { get; set; }
        public Object UpdateAdminMerca()
        {
            if (this.AdminMercaVenta != null)
            {
                foreach (var AdminMercaVenta in this.AdminMercaVenta)
                {
                    AdminMercaVenta.idtamanoxarticulo = this.idtamanoxarticulo;
                    AdminMercaVenta.Update("idadmimercancias");
                }
            }
            return true;
        }
    }


    public class DetalleDevolucionVenta : EntityClass
    {
        public int? iddetalledevolucion { get; set; }
        public int? iddevolucion { get; set; }
        public int? idadmimercancias { get; set; }
        public int? cantidad { get; set; }
        public string? descripciondevolucion { get; set; }
    }

    public class DevolucionCompra : EntityClass
    {
        public int? iddevolucioncompra { get; set; }
        public int? idproveedor { get; set; }
        public int? idcompra { get; set; }
        public DateTime? Fechadevolucioncompra { get; set; }
        public List<DetalleDevolucionCompra> DetalleDevCompra { get; set; }
        public List<CompraProductos> UpdateCompra { get; set; }

        public Object SaveDevolucionCompra()
        {
            this.iddevolucioncompra = (Int32)this.Save();
            if (this.DetalleDevCompra != null)
            {
                foreach (var DetalleDevCompra in this.DetalleDevCompra)
                {
                    DetalleDevCompra.iddevolucioncompra = this.iddevolucioncompra;
                    DetalleDevCompra.iddetalledevolucioncompra = (Int32)DetalleDevCompra.Save();
                }
                foreach (var UpdateCompra in this.UpdateCompra)
                {
                    UpdateCompra.idcompra = this.idcompra;
                    UpdateCompra.Update("idcompra");
                }

            }

            return true;
        }
    }
    public class DetalleDevolucionCompra : EntityClass
    {
        public int? iddetalledevolucioncompra { get; set; }
        public int? iddevolucioncompra { get; set; }
        public int? idadmimercancias { get; set; }
        public int? cantidad { get; set; }
        public int? cantidadunidad { get; set; }
        public string? descripciondevolucion { get; set; }
        public List<AdministracionMercancias> AdminMerca { get; set; }


        public Object UpdateAdminMerca()
        {
            if (this.AdminMerca != null)
            {
                foreach (var AdminMerca in this.AdminMerca)
                {
                    AdminMerca.idadmimercancias = this.idadmimercancias;
                    AdminMerca.Update("idadmimercancias");
                }
            }
           
            return true;
        }
    }

    public class DevolucionVenta : EntityClass
    {
        public int? iddevolucion { get; set; }
        public int? idfactura { get; set; }
        public DateTime? Fechadevolucionventa { get; set; }
    }

    public class Estado : EntityClass
    {
        public int? idestado { get; set; }
        public string? nombreestado { get; set; }
        public bool? activo { get; set; }
    }

    public class Factura : EntityClass
    {
        public int? idfactura { get; set; }
        public DateTime? fechafactura { get; set; }
        public string? nombrecliente { get; set; }
        public decimal? totalventa { get; set; }
        public decimal? subtotalventa { get; set; }
        public decimal? iva { get; set; }
        public int? idusuario { get; set; }
        public int? idestado { get; set; }
        public decimal? descuentofactura { get; set; }
        public List<DetalleFactura> DetallVenta { get; set; }
        public Object SaveFactura()
        {
            this.idfactura = (Int32)this.Save();
            if (this.DetallVenta != null)
            {
                foreach (var DetallVenta in this.DetallVenta)
                {
                    DetallVenta.idfactura = this.idfactura;
                    DetallVenta.idfactura = (Int32)DetallVenta.Save();
                    DetallVenta.UpdateAdminMerca();
                }

            }

            /* if (this.Usuario == null)
             {
                 this.Usuario = new List<DatosUsuarios>();
            }
             if (AuthNetCore.User.Roles.Find(r => r == "VENDEDOR") != null)
             {
                 Usuario.Add(new DatosUsuarios() { idcompra = this.idcompra, idusuario = AuthNetCore.User.UserId }); 
             }
             foreach (var Usuario in this.Usuario)
             {
                 Usuario.idcompra = this.idcompra;
                 Usuario.Save();
             }*/
            return true;
        }

    
}

    public class Marca : EntityClass
    {
        public int? idmarca { get; set; }
        public string? nombremarca { get; set; }
        public bool? activo { get; set; }
    }

    public class Proveedor : EntityClass
    {
        public int? idproveedor { get; set; }
        public string? nombreproveedor { get; set; }
        public int? telefonoproveedor { get; set; }
        public string? descripcionproveedor { get; set; }
        public bool? activo { get; set; }
    }

    public class Tamano : EntityClass
    {
        public int? idtamano { get; set; }
        public string? nombretamano { get; set; }
        public bool? activo { get; set; }
    }

    public class TamanoxArticulo : EntityClass
    {
        public int? idtamanoxarticulo { get; set; }
        public int? idtamano { get; set; }
        public int? idarticulo { get; set; }
        public int? iddetallecompra { get; set; }

    }

    public class TipoMaterial : EntityClass
    {
        public int? idmaterial { get; set; }
        public string? nombrematerial { get; set; }
        public bool? activo { get; set; }
    }

    public class Unidades : EntityClass
    {
        public int? idunidadmedida { get; set; }
        public string? nombreunidad { get; set; }
        public string? descripcionunidad { get; set; }
        public bool? activo { get; set; }
    }

}
