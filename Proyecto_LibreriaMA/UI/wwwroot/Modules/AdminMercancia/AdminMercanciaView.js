import { TableComponent } from "../../CoreComponents/TableComponent.js";
import { AdministracionMercancias } from "../../Model/DatabaseModel.js";
import { AjaxTools, Render } from "../utility.js";


window.onload = async () => {
    AppMain.append(Render.Create({ tagName: "h1",
    innerText: "Administracion Mercancia", class: "header1" })
    );

    // AppMain.append(Render.Create({
    //     class: "FormContainer2",
    //     children: [
    //         {
    //             tagName: 'input', type: 'button',
    //             className: 'btn',
    //             value: 'Ingresar nueva compra', onclick: async () => {
    //                 //cargar vists
    //                 window.location = "./ViewCrearCompra"
    //             }
    //         }
    //     ]
    // }))
    AppMain.append(Render.Create({
        class: "FormContainer2",
        children: [
            {
                tagName: 'input', type: 'button',
                className: 'btn',
                value: 'Ingresar Existencias a bodega', onclick: async () => {
                    //cargar vists
                    window.location = "../GestionBodega/GestionBodegaView"
                }
            }
        ]
    }))
    const MisArticulos =
        await AjaxTools.PostRequest("../api/GestionCompra/AdminMercancia")
    AppMain.append(new TableComponent({
        Dataset: MisArticulos, 
        ModelObject: new AdministracionMercancias(
        ),
        Functions: [    
            {
                name: "Detalles", action: async(Articulos) =>{
                    //Cargar detalle
                }
            }
        ]
    }))    
}