using CAPA_DATOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAPA_NEGOCIO.MODEL
{
    public class InformeCompraEjemplo1
    {

        public int? idcompra { get; set; }
        public DateTime? fechacompra { get; set; }
        public string? nombreproveedor { get; set; }
        public Decimal? subtotalcompra { get; set; }
        public Decimal? iva { get; set; }

        public Decimal? totalcompra { get; set; }

        public List<String>? Params { get; set; }

        public Object TakeInformeCompra(InformeCompraEjemplo1 Inst)
        {
            try
            {
                List<Object> SqlParams = new List<Object>();
                SqlParams.Add(Convert.ToDateTime(Params[0]));
                SqlParams.Add(Convert.ToDateTime(Params[1]));
                var Informe = SqlADOConexion.SQLM.TakeListWithProcedure<InformeCompraEjemplo1>(
                    "usp_informeCompras", Inst, SqlParams);
                return Informe;
            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}
