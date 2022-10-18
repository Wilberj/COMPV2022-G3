import { FormComponet } from "../../CoreComponents/FormComponent.js";
import { ModalComponent } from "../../CoreComponents/ModalComponent.js";
//import { TableComponentCompra } from "./Components/TableComponentCompra.js";
import { Articulos, CompraProductos, DetalleCompraProductos, DetalleDevolucionCompra, DetalleDevolucionVenta, DevolucionCompra, DevolucionVenta } from "../../Model/DatabaseModel.js";
import { AjaxTools, Render } from "../utility.js";
//import { AgregarArticuloCompra } from "./Components/AgregarArticuloCompra.js";
//import { AgregarDetalleCompra } from "./Components/AgregarDetalle.js";
import { TableComponent } from "../../CoreComponents/TableComponent.js";
import { ViewArticuloCompra } from "../../Model/ViewDatabaseModel.js";
import { AgregarCompraDevolucion } from "../GestionCompra/Components/AgregarCompraDevolucion.js";
import { AgregarFacturaDevolucion } from "./Components/AgregarFacturaDevolucion.js";
import { AgregarVentaDevolucion } from "./Components/AgregarVentaDevolucion.js";
//import { AgregarCompraDevolucion } from "./Components/AgregarCompraDevolucion.js";
//import { AgregarDetallDevolucion } from "./Components/AgregarDetalleDevolucion.js";
//import { ViewArticuloCompra } from "../../Model/ViewDatabaseModel.js";


window.onload = async () => {
    const Dataset = []
    const DetalleDevFactura = [];
    const Updateventa = [];
    const NewDevolucionVenta = {
       // DetalleDevventa: DetalleDevFactura
        //aqui iria el DetalleDevFactura
       // y el Updateventa paara guardarlo e actualizar
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
                className: 'btn',
                value: 'Guardar registro', onclick: async () => {
                   
                },
            },
        ]
    })
    );
    const FormDevolucionFactura = new FormComponet({
        Model: new DevolucionVenta()
    });
    const Table = new TableComponent({
        //cambiar vista
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
    Table.filter.append(Render.Create({
        tagName: 'input', type: 'button',
        className: 'btn_primary', value: 'Anadir ', onclick: async () => {
            const Modal = new ModalComponent
                ( new AgregarVentaDevolucion((DetalleDev) => {
                    if (Dataset.length > 0) {
                        alert("Solo puede seleccionar una compra")
                        return;
                    }
                    Dataset.push(DetalleDev);
                    //NewDevolucionVenta.idcompra = Updateventa[0].idcompra
                  //  Identificador.id = JSON.parse(JSON.stringify(DetalleDev.idcompra))
                    Modal.Close();
                    console.log(Dataset);
                    Table.DrawTableComponent();
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
            const Modal = new ModalComponent
                (new AgregarFacturaDevolucion((venta) => {
                    if (DetalleDevFactura.filter((x) => x.idadmimercancias == compra.idadmimercancias).length > 0) {
                        alert("El Detalle ya existes")
                        return;
                    }
                    DetalleDevFactura.push(venta);
                    console.log(venta);
                    console.log(DetalleDevFactura);
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
