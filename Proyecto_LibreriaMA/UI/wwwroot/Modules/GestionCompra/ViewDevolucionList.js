import { ModalComponent } from "../../CoreComponents/ModalComponent.js";
import { TableComponent } from "../../CoreComponents/TableComponent.js";
import { DevolucionCompra } from "../../Model/DatabaseModel.js";
import { ViewDevolucionesCompras } from "../../Model/ViewDatabaseModel.js";
import { AjaxTools, Render } from "../utility.js"
import { TableDevolCompra } from "./Components/TableDevolCompra.js";


class devolvito{

}
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
     await AjaxTools.PostRequest("../api/GestionCompra/Devolcompra");
    AppMain.append(new TableComponent({
        Dataset: MisArticulos, 
        ModelObject: new ViewDevolucionesCompras(
        ),
        Functions: [    
            {
                name: "Detalles", action: async(detalledevol) =>{
                    //Cargar detalle
                    devolvito = detalledevol
                    console.log("detalle Escogido", detalledevol);

                    const Modal = new ModalComponent(
                        new TableDevolCompra()
                    );
                    AppMain.append(Modal)
                }
            }
        ]
    }))    
}
export {devolvito}