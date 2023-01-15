using CAPA_DATOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAPA_NEGOCIO.MODEL
{
    public class ViewCompra : EntityClass
    {
        public int? idcompra { get; set; }
        public int? idarticulo { get; set; }
        public string? nombrearticulo { get; set; }
        public string? descripcionarticulo { get; set; }
        public bool? activo { get; set; }
        public string? nombrecategoria { get; set; }
        public string? nombremarca { get; set; }
        public int? iddetallecompra { get; set; }
        public string? nombreusuario { get; set; }
        public DateTime? fechadeingreso { get; set; }
        public int? idusuario { get; set; }
    }
    public class ViewArticuloCompra : EntityClass
    {
        public string? nombrearticulo { get; set; }
        public int? idarticulo { get; set; }
        public int? idtamanoxarticulo { get; set; }
        public string? nombretamano { get; set; }
        public bool? activo { get; set; }
        public string? descripcionarticulo { get; set; }
        public string? nombrecategoria { get; set; }
        public string? nombremarca { get; set; }

    }
  public class ViewAdminMercancia : EntityClass
    {
        public string? nombreunidad { get; set; }
        public int? existenciasarticuloorigen { get; set; }
        public string? nombrearticulo { get; set; }
        public int? existenciasarticulounidad { get; set; }
        public int? UnidadxOrigen { get; set; }
        public string? nombrebodega { get; set; }
        public Decimal? preciocompraunidad { get; set; }
        public Decimal? precioventa { get; set; }
        public int? idadmimercancias { get; set; }
        public int? idcompra { get; set; }
        /*public int? iddetallecompra { get; set; }*/
        public int? idbodega { get; set; }
        public int? idconvertir { get; set; }
        public int? idtamanoxarticulo { get; set; }

    }
    public class ViewDevolucionCompra : EntityClass
    {
        public int? idcompra { get; set; }
        public int? idproveedor { get; set; }
        public DateTime? fechacompra { get; set; }
        public string? nombreproveedor { get; set; }
        public string? nombreusuario { get; set; }
        public Decimal? totalcompra { get; set; }
        public bool? activo { get; set; }



    }
    public class ViewArticulosDanados : EntityClass
    {
        public int? idtamanoxarticulo { get; set; }
        /*public int? idusuario { get; set; }
        public string? nombreusuario { get; set; }*/
        public int? existenciasarticulounidad { get; set; }
        public int? idadmimercancias { get; set; }
        public int? existenciasarticuloorigen { get; set; }
        public string? nombrearticulo { get; set; }
        public int? idarticulo { get; set; }
    }


    public class ViewDetalleDevolucion : EntityClass
    {
        public string? nombrearticulo { get; set; }
        public Decimal? preciocompra { get; set; }
        public Decimal? cantidadcompra { get; set; }
        public int? idcompra { get; set; }
        public int? iddetallecompra { get; set; }
        public int? idadmimercancias { get; set; }
        public Decimal? preciocompraunidad { get; set; }
        public int? existenciasarticuloorigen { get; set; }
        public int? existenciasarticulounidad { get; set; }
    }
    public class Vieadminbodega : EntityClass
    {
        public int? idadmimercancias { get; set; }
        public Decimal? preciocompraunidad { get; set; }
        public Decimal? precioventa { get; set; }
        public int? existenciasarticuloorigen { get; set; }
        public int? existenciasarticulounidad { get; set; }
        public string? nombrearticulo { get; set; }
        public int? idbodega { get; set; }
        public string? nombrebodega { get; set; }
        public int? idcompra { get; set; }
        public int? idconvertir { get; set; }
        public int? idtamanoxarticulo { get; set; }

        public string? nombreunidad { get; set; }
        public int? iddetallecompra { get; set; }
    }
    public class ViewListArticuloVenta : EntityClass
    {
        public int? idadmimercancias { get; set; }
        public int? idtamanoxarticulo { get; set; }
        public Decimal? precioventa { get; set; }
        public int? existenciasarticuloorigen { get; set; }
        public int? UnidadxOrigen { get; set; }
        public int? existenciasarticulounidad { get; set; }
        public string? nombrearticulo { get; set; }
    }

    public class ViewListFactura : EntityClass
    {
        public int? idfactura { get; set; }
        public DateTime? fechafactura { get; set; }
        public string? nombrecliente { get; set; }
        public string? nombreusuario { get; set; }
        public int? idusuario { get; set; }
        public decimal? totalventa { get; set; }
        public bool? activo { get; set; }

    }


    public class viewDetalleDevolucionVenta : EntityClass
    {
        public int? idadmimercancias { get; set; }
        public string? nombrearticulo { get; set; }
        public int? idtamanoxarticulo { get; set; }
        public int? idfactura { get; set; }
        public int? existenciasarticuloorigen { get; set; }
        public int? existenciasarticulounidad { get; set; }
        public Decimal? precioventa { get; set; }
        public int? iddetallefactura { get; set; }
        public Decimal? cantidadventa { get; set; }
        public bool? activo { get; set; }

    }
    public class ViewGestionArticulos : EntityClass
    {
        public int? idarticulo { get; set; }
        public string? nombrecategoria { get; set; }
        public string? nombrearticulo { get; set; }
        public string? descripcionarticulo { get; set; }
        public string? nombretamano { get; set; }
        public int? idtamano { get; set; }
        public int? idtamanoxarticulo { get; set; }
        public string? nombremarca { get; set; }
        public string? color { get; set; }
        public bool? activo { get; set; }
        public DateTime? fechadeingreso { get; set; }
        public int? idcategoria { get; set; }
        public int? idmarca { get; set; }
        public int? idmaterial { get; set; }

    }
    public class ViewGestionUsuarios : EntityClass
    {
        public string? nombreusuario { get; set; }
        public string? apellidousuario { get; set; }
        public string? contrasena { get; set; }
        public string? email { get; set; }
        public string? descripcion { get; set; }
        public int? idusuario { get; set; }
        public int? telefonousuario { get; set; }
        public string? cedula { get; set; }
        public string? direccionusuario { get; set; }
        public int? idroles { get; set; }
        public bool? activo { get; set; }
    }
    public class ViewDevolucionesCompras : EntityClass
    {
        public int? iddevolucioncompra { get; set; }
        public int? idproveedor { get; set; }
        public string? Fechadevolucioncompra { get; set; }
        public string? descripciondevolucion { get; set; }
        public int? idcompra { get; set; }
        public string? nombreproveedor { get; set; }
    }
    public class Viewdevoldetallecompra : EntityClass
    {
        // public int? iddetalledevolucioncompra { get; set; }
      
        public int? iddevolucioncompra { get; set; }
        public int? idcompra { get; set; }
      public int? iddetallecompra { get; set; }
        public string? nombrearticulo { get; set; }
        public Decimal? preciocompra { get; set; }
        public Decimal? cantidadcompra { get; set; }

    }
    public class Viewbackcompra : EntityClass
    {
        public int? iddetallecompra { get; set; }
        public int? idcompra { get; set; }
        public int? idarticulo { get; set; }
        public string? nombrearticulo { get; set; }
        public Decimal? preciocompra { get; set; }
        public Decimal? cantidadcompra { get; set; }
        public int? idtamanoxarticulo { get; set; }
        public string? nombretamano { get; set; }
        public string? nombremarca { get; set; }
        public int? idconvertir { get; set; }
        public string? nombreunidad { get; set; }
    }
    public class ViewDevolDetalleVenta : EntityClass
    {
        public string? nombrearticulo { get; set; }
        public int? idtamanoxarticulo { get; set; }
        public int? idadmimercancias { get; set; }
        public int? cantidad { get; set; }
        public int? idfactura { get; set; }
        public int? iddetallefactura { get; set; }
        public int? iddevolucionventa { get; set; }
    }
    public class ViewTableDetalleVenta : EntityClass
    {
        public int? idadmimercancias { get; set; }
        public string? nombrearticulo { get; set; }
        public string? nombremarca { get; set; }

        public string? nombretamano { get; set; }
        public int? idtamanoxarticulo { get; set; }
        public int? idfactura { get; set; }
        public int? existenciasarticuloorigen { get; set; }
        public int? existenciasarticulounidad { get; set; }
        public Decimal? precioventa { get; set; }
        public int? iddetallefactura { get; set; }
        public Decimal? cantidadventa { get; set; }
        public bool? activo { get; set; }

    }

}
