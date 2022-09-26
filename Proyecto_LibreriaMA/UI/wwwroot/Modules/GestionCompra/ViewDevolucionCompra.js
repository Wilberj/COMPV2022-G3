import { FormComponet } from "../../CoreComponents/FormComponent.js";
import { ModalComponent } from "../../CoreComponents/ModalComponent.js";
import { TableComponentCompra } from "./Components/TableComponentCompra.js";
import { Articulos, CompraProductos, DetalleCompraProductos, DetalleDevolucionCompra, DevolucionCompra } from "../../Model/DatabaseModel.js";
import { ViewArticuloCompra } from "../../Model/ViewDatabaseModel.js";
import { AjaxTools, Render } from "../utility.js";
import { AgregarArticuloCompra } from "./Components/AgregarArticuloCompra.js";
import { AgregarDetalleCompra } from "./Components/AgregarDetalle.js";
import { TableComponent } from "../../CoreComponents/TableComponent.js";
import { AgregarCompraDevolucion } from "./Components/AgregarCompraDevolucion.js";
import { AgregarDetallDevolucion } from "./Components/AgregarDetalleDevolucion.js";


window.onload = async () => {
    const Dataset = []
    const DetalleDevCompra = [];
    const NewDevolucionCompra = {
        DetalleDevCompra: DetalleDevCompra
    }
    AppMain.append(Render.Create({
        tagName: "h1",
        innerText: "Gestion devoluciones compra", class: "header1"
    })
    );
    AppMain.append(Render.Create({
        class: "FormContainer2",
        children: [
            {
                tagName: 'input', type: 'button',
                className: 'btn',
                value: 'Guardar registro', onclick: async () => {
                    const response =
                        await AjaxTools.PostRequest("../api/GestionCompra/SaveDevolucionCompra",
                            NewDevolucionCompra);
                    // (new AgregarArticuloCompra((articulos) => {

                    //     if (DetalleCompraProductos.filter(x => x.idarticulo == articulos.idarticulo).length > 0) {
                    //         alert("Ya existe el articulo")
                    //         return;
                    //     }
                    //     DetalleCompraProductos.push(articulos);
                    //     console.log(DetalleCompraProductos);
                    //     Modal.Close();
                    //     TableCompraArticulos.DrawTableComponent();
                    // }));
                    // console.log(NuevaCompra);
                    if (response == true) {
                        AppMain.append(
                            new ModalComponent(
                                Render.Create({
                                    tagName: "h1",
                                    innerText: "Devolucion Completada",
                                }),

                                // window.location.reload()
                            )

                        );

                    }

                },
            },
        ]
    })
    );
    const FormDevolucionCompra = new FormComponet({
        EditObject: NewDevolucionCompra,
        Model: new DevolucionCompra({
            idcompra: { type: "number", hidden: true },
            idproveedor: { type: "number", hidden: true }
        })
    })
    const Table = new TableComponent({
        ModelObject: new ViewArticuloCompra(),
        Dataset: Dataset,
        Functions: [
            {
                name: "Remover",
                action: async (Dato) => {
                    const Datof = Dataset.find((x) => x.idproveedor == Dato.idproveedor);
                    if (Datof != null) {
                        Dataset.splice(Dataset.indexOf(Datof), 1);
                        Table.DrawTableComponent();
                    }
                },
            },
        ],
    });
    Table.filter.append(
        Render.Create({
            tagName: 'input', type: 'button',
            className: 'btn_primary', value: 'Anadir ', onclick: async () => {
                //code

                const Modal = new ModalComponent

                    (new AgregarCompraDevolucion((articulo) => {

                        if (Dataset.length > 0) {
                            alert("Solo puede seleccionar una compra")
                            return;
                        }
                        Dataset.push(articulo);
                        Modal.Close();
                        // console.log(NewDevolucionCompra);
                        Table.DrawTableComponent();
                        NewDevolucionCompra.idcompra = Dataset[0].idcompra
                        NewDevolucionCompra.idproveedor = Dataset[0].idproveedor
                    }));
                AppMain.append(Modal)


            }
        })
    )
    AppMain.append(FormDevolucionCompra, Table);

    const TableDetalleDevCompra = new TableComponent({
        ModelObject: new DetalleDevolucionCompra(),
        Dataset: DetalleDevCompra,
        Functions: [
            {
                name: "eliminar", action: async (detaeli) => {
                    const detalleelimina = DetalleDevCompra.find(x => x.idarticulo == detaeli.idarticulo)
                    if (detalleelimina != null) {
                        DetalleDevCompra.splice(DetalleDevCompra.indexOf(detaeli), 1);
                        TableDetalleDevCompra.DrawTableComponent();
                    }
                }
            }
        ]
    });

    TableDetalleDevCompra.filter.append(
        Render.Create({
            tagName: 'input', type: 'button',
            className: 'btn_primary', value: 'Anadir detalle', onclick: async () => {
                const Modal = new ModalComponent

                    (new AgregarDetallDevolucion((compra) => {

                        if (DetalleDevCompra.filter((x) => x.idadmimercancias == compra.idadmimercancias).length > 0) {
                            alert("El Detalle ya existes")
                            return;
                        }

                        DetalleDevCompra.push(compra);
                        // ConvertirMedida.push(DetalleCompra.ConvertirMedida);
                        console.log(compra);
                        console.log(DetalleDevCompra);

                        Modal.Close();
                        TableDetalleDevCompra.DrawTableComponent();
                    }));
                AppMain.append(Modal)
            }
        })
    )
    AppMain.append(Render.Create({
        tagName: "h3",
        innerText: "Agregar detalles", class: "header1"
    })
    );
    AppMain.append(TableDetalleDevCompra);
}

