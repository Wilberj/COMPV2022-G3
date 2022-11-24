using Microsoft.AspNetCore.Mvc;
using CAPA_NEGOCIO.MODEL;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
namespace UI.Controllers
{
    public class AccesoController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> Index(string Nombre, string Contrasena)
        // string Nombre, string Contraseña datos para poder ingresar
        {

            Usuario objeto = new LogUser().EncontrarUsuario(Nombre, Contrasena);

            //validar si no existe o es null
            if (objeto.nombreusuario != null)
            {
                var claims = new List<Claim>()
                {
                    new Claim(ClaimTypes.Name, objeto.nombreusuario),
                    new Claim("nombreusuario", objeto.nombreusuario)
                };
                claims.Add(new Claim(ClaimTypes.Role, objeto.idroles));

                var claimsIndetity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

                await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIndetity));

                return RedirectToAction("Inicio", "Inicio");
            }
            return View();
        }
        public async Task<IActionResult> Salir()

        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return RedirectToAction("Inicio", "Inicio");
        }
    }
}
