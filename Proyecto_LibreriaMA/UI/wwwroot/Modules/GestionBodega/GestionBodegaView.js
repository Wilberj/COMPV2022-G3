import { TableComponent } from "../../CoreComponents/TableComponent.js";
import { ViewArticulosDanados } from "../../Model/ViewDatabaseModel.js";
import { AjaxTools, Render } from "../utility.js";

window.onload = async () => {
    AppMain.append(Render.Create({ tagName: "h1",
    innerText: "Gestion de BodegaxExistencias", class: "header1" })
    );

    AppMain.append(Render.Create({
        class: "FormContainer2",
        children: [
            {
                tagName: 'input', type: 'button',
                className: 'btn',
                value: 'Ingresar Existencia', onclick: async () => {
                    //cargar vists
                   window.location = "./ViewCrearBodegaxExistencias"
                }
            }
        ]
    }));

    const ArticulosDana = 
        await AjaxTools.PostRequest("../api/GestionCompra/ChargeArticulosDanados")

        AppMain.append(new TableComponent({
            Dataset:ArticulosDana,
            ModelObject: new ViewArticulosDanados()
        }))
    }