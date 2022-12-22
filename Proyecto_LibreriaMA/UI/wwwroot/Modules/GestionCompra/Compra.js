import { TableComponent } from "../../CoreComponents/TableComponent.js";
import { ModalComponent } from "../../CoreComponents/ModalComponent.js";
import { ViewArticuloCompra, ViewCompra, ViewDetalleDevolucion, ViewDevolucionCompra } from "../../Model/ViewDatabaseModel.js";
import { AjaxTools, Render } from "../utility.js";
import { DetalleCompraProductos } from "../../Model/DatabaseModel.js";


window.onload = async () => {
    // const Detalle = await AjaxTools.PostRequest("../api/GestionCompra/ChargeArticulos");
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
                value: 'Gestion devolucion', onclick: async () => {
                    //cargar vists
                    window.location = "./ViewDevolucionList"
                }
            }
        ]
    }))
    // const MisArticulos =
    //     await AjaxTools.PostRequest("../api/GestionCompra/MisArticulos")
    const Detalle = await AjaxTools.PostRequest("../api/GestionCompra/ChargeDevCompra");
    const Detalles = await AjaxTools.PostRequest("../api/GestionCompra/ChargeDetalleCompra");
    AppMain.append(new TableComponent({
        Dataset: Detalle, 
        ModelObject: new ViewDevolucionCompra(
        ),

        Functions: [    
            {
                name: "Detalles", action: async (lol) => {
                    console.log("aaaa factura", lol );
                        const Modal = new ModalComponent( new TableComponent(() => {
                            
                        }));
                        AppMain.append(Render.Create({ id: "TabContainer" }));
    
                        TabContainer.innerHTML = "";
                        const TableDetalle = new TableComponent({
                            ModelObject: new ViewDetalleDevolucion(),
                            Dataset: Detalles.filter((compra) => {
                                if (compra.idcompra == lol.idcompra) {
                                    console.log("todos detalles",Detalles);
    
    
                                }
                                return compra.idcompra == lol.idcompra
                            })
    
                        });
                        console.log("aaaa modal", Detalles);
                        console.log("aaaa modal", Modal);
                       
                        console.log("iiii tsbledetslle", TableDetalle);
    
                        TabContainer.append(TableDetalle) 
                    AppMain.append(Modal)
                    
    }}]
        //                    /***** */

        //             AppMain.append(Render.Create({ id: "TabContainer" }));

        //             TabContainer.innerHTML = "";
        //             const TableDetalle = new TableComponent({
        //                 ModelObject: new ViewDetalleDevolucion(),
        //                 Dataset: Detalle.filter((compra) => {
        //                     compra.activo = false
        //                     if (compra.idcompra == DetalleDev.idcompra) {
        //                         console.log(compra);

        //                         Dataset.push(compra)
        //                         console.log(Dataset);
        //                         console.log(Dataset);
        //                     }
        //                     return compra.idcompra == DetalleDev.idcompra
        //                 })

        //             });
        //             console.log(Detalle);

        //             TabContainer.append(TableDetalle)
        //         }
        //     }
        // ]
    }))    
}