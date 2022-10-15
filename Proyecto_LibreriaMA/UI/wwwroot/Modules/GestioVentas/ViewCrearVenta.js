import { FormComponet } from "../../CoreComponents/FormComponent.js";
import { ModalComponent } from "../../CoreComponents/ModalComponent.js";
//import { TableComponentCompra } from "./Components/TableComponentCompra.js";
import { Articulos, CompraProductos, DetalleCompraProductos, DetalleFactura, Factura } from "../../Model/DatabaseModel.js";
//import { ViewArticuloCompra } from "../../Model/ViewDatabaseModel.js";
import { AjaxTools, Render } from "../utility.js";
//import { AgregarArticuloCompra } from "./Components/AgregarArticuloCompra.js";
/////import { AgregarDetalleCompra } from "./Components/AgregarDetalle.js";
import { TableComponent } from "../../CoreComponents/TableComponent.js";
import { AgregarDetalleVenta } from "./AgregarDetalleVenta.js";

window.onload = async () => {
        const DetallevenFact = [];
    AppMain.append(Render.Create({
        tagName: "h1",
        innerText: "Gestion de ventas-Ingreso", class: "header1"
    })
    );
    AppMain.append(Render.Create({
        class: "FormContainer2",
        children: [
            {
                tagName: 'input', type: 'button',
                className: 'btn',
                value: 'Guardar Venta', onclick: async () => {
                 
                },
            },
        ]
    })
    );
    const dataC = await AjaxTools.PostRequest("../api/MantenimientoCatalogos/GetDatosUsuarios")
    const FormVentaProduutos = new FormComponet({
        Model: new Factura({
            idusuario: {
                type: "select",
                Dataset: dataC.map((d) => ({ id: d.idusuario, desc: d.nombreusuario }))
            }
        })
    })
    AppMain.append(FormVentaProduutos);

    const TableDetalleVenta = new TableComponent({
        ModelObject: new DetalleFactura(),
        Dataset: DetallevenFact,
        Functions:[
            {
                name: "eliminar", action: async(detaeli)=>{
                    const detalleelimina = DetallevenFact.find(x=>x.idarticulo == detaeli.idarticulo )
                    if(detalleelimina != null){
                        DetallevenFact.splice(
                            DetallevenFact.indexOf(detaeli),1);
                       TableDetalleVenta.DrawTableComponent();
                    }
                }
            }
        ]
    });
    TableDetalleVenta.filter.append(Render.Create({
        tagName: 'input', type: 'button',
        className: 'btn_primary', value: 'Anadir', onclick: async () => {
            const Modal = new ModalComponent
            (new AgregarDetalleVenta((venta)=>{
                if (DetallevenFact.filter((x) => x.idarticulo == compra.idarticulo).length > 0) {
                    alert("El Detalle ya existe")
                    return;
                }
                DetallevenFact.push(venta);
                Modal.Close();
                TableDetalleVenta.DrawTableComponent();
            }))
            AppMain.append(Modal);
        }
    }))
    AppMain.append(Render.Create({
        tagName: "h3",
        innerText: "Agregar detalle a la venta", class: "header1"
    })
    );
    AppMain.append(TableDetalleVenta);
}