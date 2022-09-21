using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace CAPA_DATOS
{
    public class SqlServerGDatos : GDatosAbstract
    {
        public SqlServerGDatos(string ConexionString)
        {
            SQLMCon = CrearConexion(ConexionString);
        }
        protected override string BuildDeleteQuery(object Inst)
        {
            /*throw new NotImplementedException();*/
            string TableName = Inst.GetType().Name;
            string ConditionString = "";
            Type _type = Inst.GetType();
            PropertyInfo[] lst = _type.GetProperties();
            int index = 0;
            foreach (PropertyInfo oProperty in lst)
            {
                string AtributeName = oProperty.Name;
                var AtributeValue = oProperty.GetValue(Inst);
                if (AtributeValue != null)
                {
                    WhereConstruction(ref ConditionString, ref index, AtributeName, AtributeValue);
                }
            }
            ConditionString = ConditionString.TrimEnd(new char[] { '0', 'R' });
            string strQuery = "DELETE FROM " + TableName + ConditionString;
            return strQuery;
        }

        protected override string BuildInsertQueryByObject(object Inst)
        {
            /* throw new NotImplementedException();*/
            string ColumnNames = "";
            string Values = "";
            Type _type = Inst.GetType();
            PropertyInfo[] lst = _type.GetProperties();
            List<EntityProps> entityProps = DescribeEntity(Inst.GetType().Name);
            foreach (PropertyInfo oProperty in lst)
            {
                string AtributeName = oProperty.Name;
                var AtributeValue = oProperty.GetValue(Inst);
                var EntityProp = entityProps.Find(e => e.COLUMN_NAME == AtributeName);
                if (AtributeValue != null && EntityProp != null)
                {
                    switch (EntityProp.DATA_TYPE)
                    {
                        case "nvarchar":
                        case "varchar":
                        case "char":
                            ColumnNames = ColumnNames + AtributeName.ToString() + ",";
                            Values = Values + "'" + AtributeValue.ToString() + "',";
                            break;
                        case "int":
                        case "float":
                        case "decimal":
                        case "bigint":
                        case "money":
                        case "smallint":
                            ColumnNames = ColumnNames + AtributeName.ToString() + ",";
                            Values = Values + "'" + AtributeValue.ToString() + "',";
                            break;
                        case "bit":
                            ColumnNames = ColumnNames + AtributeName.ToString() + ",";
                            Values = Values + (AtributeValue.ToString() == "True" ? "1" : "0") + ",";
                            break;
                        case "datetime":
                        case "date":
                            ColumnNames = ColumnNames + AtributeName.ToString() + ",";
                            Values = Values + "'" + ((DateTime)AtributeValue).ToString("yyyy/MM/dd HH:mm:ss") + "',";
                            break;
                    }

                }
                else continue;
            }
            ColumnNames = ColumnNames.TrimEnd(',');
            Values = Values.TrimEnd(',');
            return "INSERT INTO " + Inst.GetType().Name + "(" + ColumnNames + ") VALUES (" + Values + ") SELECT SCOPE_IDENTITY()";
        }

        protected override string BuildUpdateQueryByObject(object Inst, string[] WhereProps)
        {
            /* throw new NotImplementedException();*/
            string TableName = Inst.GetType().Name;
            string Values = "";
            string Conditions = "";
            Type _type = Inst.GetType();
            PropertyInfo[] lst = _type.GetProperties();
            List<EntityProps> entityProps = DescribeEntity(Inst.GetType().Name);
            int index = 0;
            foreach (PropertyInfo oProperty in lst)
            {
                string AtributeName = oProperty.Name;
                var AtributeValue = oProperty.GetValue(Inst);
                var EntityProp = entityProps.Find(e => e.COLUMN_NAME == AtributeName);
                if (AtributeValue != null && EntityProp != null)
                {
                    if ((from O in WhereProps where O == AtributeName select O).ToList().Count == 0)
                    {
                        Values = BuildSetsForUpdate(Values, AtributeName, AtributeValue, EntityProp);
                    }
                    else WhereConstruction(ref Conditions, ref index, AtributeName, AtributeValue);
                }
                else continue;
            }
            Values = Values.TrimEnd(',');
            string srtQuery = "UPDATE " + TableName + " SET " + Values + Conditions;
            return srtQuery;
        }

        protected override string BuildUpdateQueryByObject(object Inst, string WhereProp)
        {
            /*       throw new NotImplementedException();*/
            string TableName = Inst.GetType().Name;
            string Values = "";
            string Conditions = "";
            Type _type = Inst.GetType();
            PropertyInfo[] lst = _type.GetProperties();
            List<EntityProps> entityProps = DescribeEntity(Inst.GetType().Name);
            int index = 0;
            foreach (PropertyInfo oProperty in lst)
            {
                string AtributeName = oProperty.Name;
                var AtributeValue = oProperty.GetValue(Inst);
                var EntityProp = entityProps.Find(e => e.COLUMN_NAME == AtributeName);
                if (AtributeValue != null && EntityProp != null)
                {
                    if (WhereProp != AtributeName)
                    {
                        Values = BuildSetsForUpdate(Values, AtributeName, AtributeValue, EntityProp);
                    }
                    else WhereConstruction(ref Conditions, ref index, AtributeName, AtributeValue);
                }
                else continue;
            }
            Values = Values.TrimEnd(',');
            string srtQuery = "UPDATE " + TableName + " SET " + Values + Conditions;
            return srtQuery;
        }

        protected override IDbCommand ComandoSql(string comandoSql, IDbConnection connection)
        {
            /*  throw new NotImplementedException();*/
            var con = new SqlCommand(comandoSql, (SqlConnection)connection);
            return con;
        }

        protected override IDbConnection CrearConexion(string cadena)
        {
            /*throw new NotImplementedException();*/
            return new SqlConnection(cadena);
        }

        protected override IDataAdapter CrearDataAdapterSql(string comandoSql, IDbConnection connection)
        {
            /* throw new NotImplementedException();*/
            var da = new SqlDataAdapter((SqlCommand)ComandoSql(comandoSql, connection));
            return da;
        }

        protected override IDataAdapter CrearDataAdapterSql(IDbCommand comandoSql)
        {
            /*throw new NotImplementedException();*/
            var da = new SqlDataAdapter((SqlCommand)comandoSql);
            return da;
        }

        protected override List<EntityProps> DescribeEntity(string entityName)
        {
            /*throw new NotImplementedException();*/
            string DescribeQuery = @"SELECT COLUMN_NAME, IS_NULLABLE, DATA_TYPE
                                    from [INFORMATION_SCHEMA].[COLUMNS]
                                    WHERE [TABLE_NAME] ='" + entityName
                                    + "' order by [ORDINAL_POSITION] ";
            DataTable Table = TraerDatosSQL(DescribeQuery);
            return ConvertDataTable<EntityProps>(Table, new EntityProps());

        }

        private protected override DataTable BuildTable(object Inst, ref string CondSQL)
        {
            /*throw new NotImplementedException();*/
            string ConditionString = "";
            string Columns = "";
            Type _type = Inst.GetType();
            PropertyInfo[] lst = _type.GetProperties();
            int index = 0;
            List<EntityProps> entityProps = DescribeEntity(Inst.GetType().Name);
            foreach (PropertyInfo oProperty in lst)
            {
                string AtributeName = oProperty.Name;
                var EntityProp = entityProps.Find(e => e.COLUMN_NAME == AtributeName);
                if (EntityProp != null)
                {
                    var AtributeValue = oProperty.GetValue(Inst);
                    Columns = Columns + AtributeName + ",";
                    if (AtributeValue != null)
                    {
                        WhereConstruction(ref ConditionString, ref index, AtributeName, AtributeValue);
                    }
                }
            }
            ConditionString = ConditionString.TrimEnd(new char[] { '0', 'R' });
            if (ConditionString == "" && CondSQL != "")
            {
                ConditionString = " WHERE ";
            }
            else if (ConditionString != null && CondSQL != "")
            {
                ConditionString = ConditionString + " AND ";
            }
            Columns = Columns.TrimEnd(',');
            string queryString = "SELECT " + Columns + " FROM " + Inst.GetType().Name + ConditionString + CondSQL;
            DataTable Table = TraerDatosSQL(queryString);
            return Table;
        }

        private static string BuildSetsForUpdate(string Values, string AtributeName, object AtributeValue, EntityProps EntityProp)
        {
            switch (EntityProp.DATA_TYPE)
            {
                case "nvarchar":
                case "varchar":
                case "char":

                    Values = Values + AtributeName + "= '" + AtributeValue.ToString() + "',";
                    break;
                case "int":
                case "float":
                case "decimal":
                case "bigint":
                case "money":
                case "smallint":
                    Values = Values + AtributeName + "= " + AtributeValue.ToString() + ",";
                    break;
                case "datetime":
                case "date":
                    Values = Values + AtributeName + "= '" + ((DateTime)AtributeValue).ToString("yyyy/MM/dd HH:mm:ss") + "',";
                    break;
            }
            return Values;

        }

        private static void WhereConstruction(ref string CondicionString, ref int index, string AtributeName, object AtributeValue)
        {
            if (AtributeValue.GetType() == typeof(string) && AtributeValue.ToString().Length < 200)
            {
                WhereOrAnd(ref CondicionString, ref index);
                CondicionString = CondicionString + AtributeName + " LIKE '%" + AtributeValue.ToString() + "%'";
            }
            else if (AtributeValue.GetType() == typeof(DateTime))
            {
                WhereOrAnd(ref CondicionString, ref index);
                CondicionString = CondicionString + AtributeName
                    + "= '" + ((DateTime)AtributeValue).ToString("yyyy/MM/dd HH:mm:ss") + "' ";
            }
            else if (AtributeValue.GetType() == typeof(int)
                || AtributeValue.GetType() == typeof(Double)
                || AtributeValue.GetType() == typeof(Decimal)
                || AtributeValue.GetType() == typeof(int?))
            {
                WhereOrAnd(ref CondicionString, ref index);
                CondicionString = CondicionString + AtributeName + "=" + AtributeValue.ToString() + " ";
            }
        }

        private static void WhereOrAnd(ref string CondicionString, ref int index)
        {
            if (index == 0)
            {
                CondicionString = " WHERE ";
                index++;
            }
            else
            {
                CondicionString = CondicionString + " AND ";
            }
        }

    }
}