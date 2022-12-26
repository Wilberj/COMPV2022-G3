import { TableComponent } from "../../CoreComponents/TableComponent.js";
import { DevolucionCompra } from "../../Model/DatabaseModel.js";
import { AjaxTools, Render } from "../utility.js"

window.onload = async () => {
    AppMain.append(Render.Create({
        tagName: "h1",
    innerText: "Gestion devolucion de compras", class: "header1" 
    }));
    AppMain.append(Render.Create({
        class: "FormContainer2",
        children: [

            {
                tagName: 'input', type: 'button',
                className: 'button_top',
                value: 'Ingresar nueva devolucion', onclick: async () => {
                    //cargar vists
                    window.location = "./ViewDevolucionCompra"

                }
            }
       
        ]
    }))
    //esta vista es de lo de adminstracion ..se podria cambiar luego vemos
    const MisArticulos =
     await AjaxTools.PostRequest("../api/GestionCompra/DevCompraList");
    AppMain.append(new TableComponent({
        Dataset: MisArticulos, 
        ModelObject: new DevolucionCompra(
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