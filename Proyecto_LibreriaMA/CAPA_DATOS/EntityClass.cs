namespace CAPA_DATOS
{
    public class EntityClass
    {
        public List<T> Get<T>()
        {
            var Data = SqlADOConexion.SQLM.TakeList<T>(this);
            return Data;
        }

        public List<T> Get<T>(string condition)
        {
            var Data = SqlADOConexion.SQLM.TakeList<T>(this, condition);
            return Data;
        }

        public T FindObject<T>()
        {
            var Data = SqlADOConexion.SQLM.TakeObject<T>(this);
            return Data;
        }
    

        public object Save()
        {
            return SqlADOConexion.SQLM.InsertObject(this);

        }

        public bool Update(string Id)
        {
            SqlADOConexion.SQLM.UpdateObject(this, Id);
            return true;

        }
        public bool Update(string[] Id)
        {
            SqlADOConexion.SQLM.UpdateObject(this, Id);
            return true;

        }
        public bool Delete()
        {
            SqlADOConexion.SQLM.Delete(this);
            return true;
        }
    }
}
