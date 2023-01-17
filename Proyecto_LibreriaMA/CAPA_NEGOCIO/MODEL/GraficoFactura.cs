using CAPA_DATOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAPA_NEGOCIO.MODEL
{
    public class GraficoFactura
    {
       
            public class BarrasFactura
            {

                public string? mes { get; set; } //Faltaba por alguna razón
                public int? cantidad { get; set; }

                public Object TakeInforVentGraf(BarrasFactura Inst)
                {

                    try
                    {

                        List<Object> SqlParams = new List<Object>();
                        SqlADOConexion.IniciarConexion("sa", "1234");
                        var InformeVen = SqlADOConexion.SQLM.TakeListWithProcedure<BarrasFactura>(
                            "SP_BackVentas", Inst, SqlParams);
                        return InformeVen;
                    }
                    catch (Exception)
                    {
                        throw;
                    }

                }

            }
        }
    
}
