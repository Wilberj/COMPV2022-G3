import { TableComponent } from "../../CoreComponents/TableComponent.js";

import { ViewArticuloCompra, ViewCompra } from "../../Model/ViewDatabaseModel.js";
import { AjaxTools, Render } from "../utility.js";


window.onload = async () => {
    AppMain.append(Render.Create({ tagName: "h1",
    innerText: "Gestion de compras", class: "header1" })
    );

    AppMain.append(Render.Create({
        class: "FormContainer2",
        children: [
            {
                tagName: 'input', type: 'button',
                className: 'button_top',
                value: 'Ingresar nueva compra', onclick: async () => {
                    //cargar vists
                    window.location = "./ViewCrearCompra"
                }
            },
            {
                tagName: 'input', type: 'button',
                className: 'button_top',
                value: 'Ingresar devolucion', onclick: async () => {
                    //cargar vists
                    window.location = "./ViewDevolucionCompra"
                }
            }
        ]
    }))
    const MisArticulos =
        await AjaxTools.PostRequest("../api/GestionCompra/MisArticulos")
    AppMain.append(new TableComponent({
        Dataset: MisArticulos, 
        ModelObject: new ViewCompra(
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