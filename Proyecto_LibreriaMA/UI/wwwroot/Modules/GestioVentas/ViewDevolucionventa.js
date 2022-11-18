import { FormComponet } from "../../CoreComponents/FormComponent.js";
import { ModalComponent } from "../../CoreComponents/ModalComponent.js";
import { DetalleDevolucionVenta, DevolucionVenta } from "../../Model/DatabaseModel.js";
import { AjaxTools, Render } from "../utility.js";
import { TableComponent } from "../../CoreComponents/TableComponent.js";
import { viewdevolventa } from "../../Model/ViewDatabaseModel.js";
import { AgregarFacturaDevolucion } from "./Components/AgregarFacturaDevolucion.js";
import { AgregarVentaDevolucion } from "./Components/AgregarVentaDevolucion.js";

class IdentificadorFactura {
    id;
}


window.onload = async () => {
    const Dataset = {}
    const DetalleDevFactura = [];
    const DetalleFactura = [];
    const Updateventa = [];//necesaria para actualziar admin
    const NewDevolucionVenta = {
        DetalleDevventa: DetalleDevFactura,
        DetalleFactura: DetalleFactura,

        Updateventa: Updateventa

    }
    AppMain.append(Render.Create({
        tagName: "h1",
        innerText: "Gestion devoluciones venta", class: "header1"
    })
    );
    AppMain.append(Render.Create({
        class: "FormContainer2",
        children: [
            {
                tagName: 'input', type: 'button',
                className: 'button_top',
                value: 'Guardar registro', onclick: async () => {
                    if (DetalleDevFactura[0] == null) {
                        alert("Debe tener un Detalle Devolucion")
                        console.log("detalle eeehh");
                        return;
                    } else {
                        if (Updateventa[0] == null) {
                            alert("Debe tener una factura")
                            console.log("detalle eeehh");
                            return;
                        }
                    }


                    console.log(NewDevolucionVenta);
                    const response =
                        await AjaxTools.PostRequest("../api/GestionVenta/SaveDevolucionventa",
                            NewDevolucionVenta, Updateventa



                        );
                    if (response == true) {
                        AppMain.append(
                            new ModalComponent(
                                Render.Create({
                                    tagName: "h1",
                                    innerText: "devolucion guardada",
                                }),

                            )

                        );

                    }
                },
            },
        ]
    })
    );
    const FormDevolucionFactura = new FormComponet({
        EditObject: NewDevolucionVenta,
        Model: new DevolucionVenta({
            idfactura: { type: "number", hidden: true }
        })
    });
    const Table = new TableComponent({
        //cambiar vista
        ModelObject: new viewdevolventa(),
        Dataset: Updateventa,
        Functions: [
            {
                name: "Remover",
                action: async (Dato) => {
                    const Datof = Updateventa.find((x) => x.idfactura == Dato.idfactura);
                    if (Datof != null) {
                        Updateventa.splice(Updateventa.indexOf(Datof), 1);
                        Table.DrawTableComponent();
                    }
                },
            },
        ],
    });
    Table.filter.append(Render.Create({
        tagName: 'input', type: 'button',
        className: 'btn_primary', value: 'Anadir ', onclick: async () => {
            const Modal = new ModalComponent
                (new AgregarVentaDevolucion((DetalleDev) => {
                    if (Updateventa.length > 0) {
                        alert("Solo puede seleccionar una venta")
                        return;
                    }
                    Updateventa.push(DetalleDev);
                    //NewDevolucionVenta.idcompra = Updateventa[0].idcompra
                    //  Identificador.id = JSON.parse(JSON.stringify(DetalleDev.idcompra))
                    Modal.Close();
                    console.log(Updateventa);
                    Table.DrawTableComponent();
                    NewDevolucionVenta.idfactura = Updateventa[0].idfactura
                    IdentificadorFactura.id = JSON.parse(JSON.stringify(DetalleDev.idfactura))
                    console.log(IdentificadorFactura.id);
                    console.log(DetalleDev);

                }))
            AppMain.append(Modal)
        }
    })
    )
    AppMain.append(FormDevolucionFactura, Table)
    
    const TableDetalleDevFactura = new TableComponent({
        ModelObject: new DetalleDevolucionVenta(),
        Dataset: DetalleDevFactura,
        Functions: [
            {
                name: "eliminar", action: async (detaeli) => {
                    const detalleelimina = DetalleDevFactura.find(x => x.idarticulo == detaeli.idarticulo)
                    if (detalleelimina != null) {
                        DetalleDevFactura.splice(DetalleDevFactura.indexOf(detaeli), 1);
                        TableDetalleDevFactura.DrawTableComponent();
                    }
                }
            }
        ]

    });
    TableDetalleDevFactura.filter.append(Render.Create({
        tagName: 'input', type: 'button',
        className: 'btn_primary', value: 'Anadir detalle', onclick: async () => {
            if (Updateventa[0] == null) {
                alert("Debe tener una factura")
                console.log("detalle eeehh");
                return;
            }
            const Modal = new ModalComponent
                (new AgregarFacturaDevolucion((venta) => {
                    if (DetalleDevFactura.filter((x) => x.idadmimercancias == compra.idadmimercancias).length > 0) {
                        alert("El Detalle ya existes")
                        return;
                    }
                    DetalleDevFactura.push(venta);
                    console.log(venta);
                    console.log(DetalleDevFactura);
                    Dataset.activo = DetalleDevFactura[0].activo
                    Dataset.iddetallefactura = DetalleDevFactura[0].iddetallefactura
                    DetalleFactura.push(Dataset);

                    console.log(Dataset);
                    Modal.Close();
                    TableDetalleDevFactura.DrawTableComponent();



                }))
            AppMain.append(Modal)

        }
    }))
    AppMain.append(Render.Create({
        tagName: "h3",
        innerText: "Agregar detalles", class: "header1"
    })
    );
    AppMain.append(TableDetalleDevFactura);

}
export { IdentificadorFactura }