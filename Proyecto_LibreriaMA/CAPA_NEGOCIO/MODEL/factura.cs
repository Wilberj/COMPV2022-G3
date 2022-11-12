using CAPA_DATOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAPA_NEGOCIO.MODEL
{
    public class facturaejemplo1
    {
        public string? nombrecliente { get; set; }
        public string? nombrearticulo { get; set; }
        public DateTime? fechafactura { get; set;}
        //  public string? descripcionarticulo { get; set; }

        // public int? iddetallefactura { get; set; }

        public int? idfactura { get; set; }

        // public int? idtamanoxarticulo { get; set; }
        public Decimal? cambio { get; set; }
        public Decimal? cantidadventa { get; set; }
        public Decimal? pagototal { get; set; }
        public Decimal? subtotalventa { get; set; }
        public Decimal? iva { get; set; } 
        public Decimal? totalventa { get; set; }

        public List<String>? Params { get; set; }

        public Object TakeFactura(facturaejemplo1 Inst)
        {
            try
            {
                List<Object> SqlParams = new List<Object>();
                var informe = SqlADOConexion.SQLM.TakeListWithProcedure<facturaejemplo1>(
                    "usp_facturaventa", Inst, SqlParams);
                return informe;
            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}
