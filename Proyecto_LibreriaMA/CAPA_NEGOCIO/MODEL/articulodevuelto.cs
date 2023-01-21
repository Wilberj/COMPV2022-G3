using CAPA_DATOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAPA_NEGOCIO.MODEL
{
    public class InformeArticuloDevueltoEjemplo1
    {

        public string? nombrearticulo { get; set; }
        //public DateTime? fechafactura { get; set;}
        //public string? descripcionarticulo { get; set; }

        // public int? iddetallefactura { get; set; }


        //public int? idfactura { get; set; }
        //public int? idarticulo { get; set; }
        public Decimal? CantidadDevuelta { get; set; }
        //public Decimal? TotalVenta { get; set; }

        //public int? idtamanoxarticulo { get; set; }
        //public Decimal? cantidadventa { get; set; }

        public List<String>? Params { get; set; }

        public Object TakeInformeArticuloDevuelto(InformeArticuloDevueltoEjemplo1 Inst)
        {
            try
            {
                List<Object> SqlParams = new List<Object>();
                SqlParams.Add(Convert.ToDateTime(Params[0]));
                SqlParams.Add(Convert.ToDateTime(Params[1]));
                var Informe = SqlADOConexion.SQLM.TakeListWithProcedure<InformeArticuloDevueltoEjemplo1>(
                    "usp_informeArticuloMasDevuelto", Inst, SqlParams);
                return Informe;
            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}
