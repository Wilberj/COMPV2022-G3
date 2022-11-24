import { Render } from "./Modules/utility.js";
window.onload = async () => {
    Login.append(
        Render.Create({
            /*agName: "h1",*/
            innerHTML: `
			<!DOCTYPE html>
            <html lang="en">

            <head>

            <title>LibreriaMA</title>
         

          </head>
          
          <body>
          <div id="title" class="Divtitulo">
           <h4 class="titulo1">Bienvenido</h4>
          <h4 class="titulo1">Libreria Maria Auxiliadora</h4>
         
            </div>
          </body>
            </html>
			`,
        })
    );
};
