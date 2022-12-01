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
                value: 'Ingresar devolucion', onclick: async () => {
                    //cargar vists
                    window.location = "./ViewDevolucionCompra"
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
                console.log(lol );
                    const Modal = new ModalComponent()     
                    AppMain.append(Render.Create({ id: "TabContainer" }));

                    TabContainer.innerHTML = "";
                    const TableDetalle = new TableComponent({
                        ModelObject: new ViewDetalleDevolucion(),
                        Dataset: Detalles.filter((compra) => {
                            if (compra.idcompra == Detalles.idcompra) {
                                console.log(Detalles);


                            }
                            return compra.idcompra == Detalles.idcompra
                        })

                    });
                    console.log(Detalles);

                    TabContainer.append(TableDetalle)
                    
                    AppMain.append(Modal);
                    
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