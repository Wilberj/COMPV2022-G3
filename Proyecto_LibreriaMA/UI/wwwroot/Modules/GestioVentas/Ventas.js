import { ModalComponent } from "../../CoreComponents/ModalComponent.js";
import { TableComponent } from "../../CoreComponents/TableComponent.js";
import { Factura } from "../../Model/DatabaseModel.js";
import { ViewAdminMercancia, viewdevolventa, viewdevolventav } from "../../Model/ViewDatabaseModel.js";
import { AjaxTools, Render } from "../utility.js"
import { TableDetalleVenta } from "./Components/TableDetalleV.js";
class lolito {

}

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
    // const MisArticulos = await AjaxTools.PostRequest("../api/GestionVenta/ChargeVentaList")
    const DetalleV = await AjaxTools.PostRequest("../api/GestionVenta/ChargeDevVentas");
    // const Detalles = await AjaxTools.PostRequest("../api/GestionCompra/ChargeDetalleCompra");
    AppMain.append(new TableComponent({
        Dataset: DetalleV, 
        ModelObject: new viewdevolventav(
        ),
        Functions: [    
            {
                name: "Detalles", action: async (lol) => {
                    lolito = lol
                    console.log("aaaa factura", lol );
                    
                        const Modal = new ModalComponent( 

                            new TableDetalleVenta()
                        );
                        
                    AppMain.append(Modal)
                    
    }}]
    }))    
}
export { lolito };