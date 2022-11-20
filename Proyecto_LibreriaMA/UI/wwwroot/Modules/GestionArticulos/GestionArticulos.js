import { TableComponent } from "../../CoreComponents/TableComponent.js";
import { ViewArticulosDanados, ViewCompra, ViewGestionArticulos } from "../../Model/ViewDatabaseModel.js";
import { AjaxTools, Render } from "../utility.js";
//import {ArticulosDanados} from "../../Model/DatabaseModel.js";


window.onload = async () => {
    AppMain.append(Render.Create({
        tagName: "h1",
        innerText: "Gestion de Articulos", class: "header1"
    })
    );

    AppMain.append(Render.Create({
        class: "FormContainer2",
        children: [
            {
                tagName: 'input', type: 'button',
                className: 'button_top',
                value: 'Ingresar Nuevo Articulo', onclick: async () => {
                    //cargar vists
                    window.location = "./ViewCrearArticulos"
                }
            },
            {
                tagName: 'input', type: 'button',
                className: 'button_top',
                value: 'Ingresar Articulo Dañado', onclick: async () => {
                    //cargar vists
                    window.location = "./ViewCrearArticulosDanados"
                }
            }
        ]

    }));
    
    const ArticulosDana =
        await AjaxTools.PostRequest("../api/AdminMercancia/ChargeArticulos")

    AppMain.append(new TableComponent({
        Dataset: ArticulosDana,
        ModelObject: new ViewGestionArticulos()
    }))

}