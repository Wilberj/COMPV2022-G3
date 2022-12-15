import { TableComponent } from "../../CoreComponents/TableComponent.js";
import { DevolucionVenta } from "../../Model/DatabaseModel.js";
import { ViewAdminMercancia } from "../../Model/ViewDatabaseModel.js";
import { AjaxTools, Render } from "../utility.js"

window.onload = async () => {
    AppMain.append(Render.Create({
        tagName: "h1",
    innerText: "Gestion de ventas", class: "header1" 
    }));
    AppMain.append(Render.Create({
        class: "FormContainer2",
        children: [

            {
                tagName: 'input', type: 'button',
                className: 'button_top',
                value: 'Ingresar nueva devolucion', onclick: async () => {
                    //cargar vists
                    window.location = "./ViewDevolucionVenta"

                }
            }
       
        ]
    }))
    //esta vista es de lo de adminstracion ..se podria cambiar luego vemos
    const MisArticulos =
     await AjaxTools.PostRequest("../api/GestionVenta/DevolucionVentaList");
    AppMain.append(new TableComponent({
        Dataset: MisArticulos, 
        ModelObject: new DevolucionVenta(
        ),
        // Functions: [    
        //     {
        //         name: "Detalles", action: async(Articulos) =>{
        //             //Cargar detalle
        //         }
        //     }
        // ]
    }))    
}