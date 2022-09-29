import { TableComponent } from "../../CoreComponents/TableComponent.js";
import { ViewArticulosDanados, ViewCompra } from "../../Model/ViewDatabaseModel.js";
import { AjaxTools, Render } from "../utility.js";
//import {ArticulosDanados} from "../../Model/DatabaseModel.js";


window.onload = async () => {
    AppMain.append(Render.Create({
        tagName: "h1",
        innerText: "Gestion de Articulos", class: "header1"
    })
    );
    AppMain.append(Render.Create({
        tagName: "h4",
        innerText: "ARTICULOS DAÑADOS", class: "header4"
    })
    );

    AppMain.append(Render.Create({
        class: "FormContainer2",
        children: [
            {
                tagName: 'input', type: 'button',
                className: 'btn',
                value: 'Ingresar Nuevo Registro', onclick: async () => {
                    //cargar vists
                    window.location = "./ViewCrearArticulosDanados"
                }
            }
        ]

    }));
    const ArticulosDana =
        await AjaxTools.PostRequest("../api/GestionCompra/ChargeArticulosDanados")

    AppMain.append(new TableComponent({
        Dataset: ArticulosDana,
        ModelObject: new ViewArticulosDanados()
    }))

}