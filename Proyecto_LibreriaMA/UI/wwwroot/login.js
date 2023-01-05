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
          <div class="divlogo">
           <img src="../image/logoLM.png" class="logo">         
            </div>
          </body>
            </html>
			`,
        })
    );
};
