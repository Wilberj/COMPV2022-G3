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
        public string? nombrebodega { get; set; }
        public Decimal? preciocompraunidad { get; set; }
        public Decimal? precioventa { get; set; }
        public int? idadmimercancias { get; set; }
        public int? idcompra { get; set; }
        public int? iddetallecompra { get; set; }
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
        public int? existenciasarticulounidad { get; set; }
        public string? nombrearticulo { get; set; }
    }

}
