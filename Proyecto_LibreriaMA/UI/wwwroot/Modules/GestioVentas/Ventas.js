﻿import { TableComponent } from "../../CoreComponents/TableComponent.js";
import { Factura } from "../../Model/DatabaseModel.js";
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
                value: 'Ingresar nueva Venta', onclick: async () => {
                    //cargar vists
                    window.location = "./ViewCrearVenta"
                }
            },
            {
                tagName: 'input', type: 'button',
                className: 'button_top',
                value: 'Gestion devolucion', onclick: async () => {
                    //cargar vists
                    // window.location = "./ViewDevolucionVenta"
                    window.location = "./ViewDevolucionList"
                }
            }
       
        ]
    }))
    //esta vista es de lo de adminstracion ..se podria cambiar luego vemos
    const MisArticulos =
        await AjaxTools.PostRequest("../api/GestionVenta/ChargeVentaList")
    AppMain.append(new TableComponent({
        Dataset: MisArticulos, 
        ModelObject: new Factura(
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