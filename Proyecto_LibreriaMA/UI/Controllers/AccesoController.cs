using Microsoft.AspNetCore.Mvc;
using CAPA_NEGOCIO.MODEL;

namespace UI.Controllers
{
    public class AccesoController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Index(string Nombre, string Contrasena)
        // string Nombre, string Contraseña datos para poder ingresar
        {

            Usuario objeto = new LogUser().EncontrarUsuario(Nombre, Contrasena);

            //validar si no existe o es null
            if (objeto.nombreusuario != null)
            {
                return RedirectToAction("ViewCrearCompra", "GestionCompras");
            }
            return View();
        }
    }
}
