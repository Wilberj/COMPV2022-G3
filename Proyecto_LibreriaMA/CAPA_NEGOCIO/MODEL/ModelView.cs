﻿using CAPA_DATOS;
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
        public string? nombrearticulo { get; set; }
        public string? nombreunidad { get; set; }

        public int? existenciasarticuloorigen { get; set; }
        public int? existenciasarticulounidad { get; set; }
        public Decimal? preciocompraunidad { get; set; }
        public Decimal? precioventa { get; set; }

   
    }

}
