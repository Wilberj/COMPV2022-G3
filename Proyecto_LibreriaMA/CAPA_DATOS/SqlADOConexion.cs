namespace CAPA_DATOS
{
    public class SqlADOConexion
    {
        private static string UserSQLConexion = "";
        public static SqlServerGDatos SQLM;
        public static string DataBaseName = "LibreriaMA1";
        static string SQLServer = ".";

        static public bool IniciarConexion(string user, string password)
        {
            try
            {
                UserSQLConexion = "Data Source=" + SQLServer +
                    "; Initial Catalog=" + DataBaseName + "; User ID="
                    + user + ";Password=" + password;
                SQLM = new SqlServerGDatos(UserSQLConexion);
                return true;

            }
            catch (Exception)
            {
                return false;
                throw;
            }
        }
    }
}