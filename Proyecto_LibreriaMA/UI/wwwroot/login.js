import { Render } from "./Modules/utility.js";
window.onload = async () => {
    Login.append(
        Render.Create({
            tagName: "h1",
            innerHTML: `
			<!DOCTYPE html>
            <html lang="en">

            <head>

            <title>Card</title>
            <link rel="stylesheet" href="./css/login.css" />

          </head>
          
          <body>
          <div id="title">
          <h4>Libreria Maria Auxiliadora</h4>
            </div>
            <div id="card">
              <div id="card-content">
                <div id="card-title">
                  <h2>LOGIN</h2>
                  <div class="underline-title"></div>
                </div>
                <form method="post" class="form">
                  <label for="user-email" style="padding-top:13px">
                      &nbsp;Email
                    </label>
                  <input id="user-email" class="form-content" type="email" name="email" autocomplete="on" required />
                  <div class="form-border"></div>
                  <label for="user-password" style="padding-top:22px">&nbsp;Password
                    </label>
                  <input id="user-password" class="form-content" type="password" name="password" required />
                  <div class="form-border"></div>
                 
                  <input id="submit-btn" type="submit" name="submit" value="LOGIN" />
                </form>
              </div>
            </div>
          </body>
            </html>
			`,
        })
    );
};
