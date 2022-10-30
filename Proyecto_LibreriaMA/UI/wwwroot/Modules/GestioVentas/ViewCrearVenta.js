import { FormComponet } from "../../CoreComponents/FormComponent.js";
import { ModalComponent } from "../../CoreComponents/ModalComponent.js";
import { DetalleFactura, Factura } from "../../Model/DatabaseModel.js";
import { AjaxTools, Render } from "../utility.js";
import { TableComponent } from "../../CoreComponents/TableComponent.js";
import { AgregarDetalleVenta } from "./AgregarDetalleVenta.js";

window.onload = async () => {
    const DetallVenta = [];
    const Total = [];
    var suma = 0;
    const NuevaFactura = {
        DetallVenta: DetallVenta
    }
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
                    if (NuevaFactura.descuentofactura == null || NuevaFactura.idestado == null) {
                        alert("Falta rellenar campos")
                        console.log("pjo a esto");
                        return;
                    } else {
                        if (DetallVenta[0] == null) {
                            alert("Debe tener un Detalle Venta")
                            console.log("detalle eeehh");
                            return;
                        }
                    }

                    console.log(NuevaFactura);
                    const response =
                        await AjaxTools.PostRequest("../api/GestionVenta/SaveFactura",
                            NuevaFactura,

                            Total.forEach(function (tot) {
                                suma += tot;
                            }),
                            console.log(suma),
                            NuevaFactura.subtotalventa = suma,
                            NuevaFactura.iva = NuevaFactura.subtotalventa * 0.15,
                            NuevaFactura.totalventa = parseInt(NuevaFactura.subtotalventa) + parseInt(NuevaFactura.iva) - parseInt(NuevaFactura.descuentofactura)
                        );
                    if (response == true) {
                        AppMain.append(
                            new ModalComponent(
                                Render.Create({
                                    tagName: "h1",
                                    innerText: "Factura",
                                }),

                                // //                 // window.location.reload()
                            )

                        );

                    }

                },
            },
        ]
    })
    );
    const dataC = await AjaxTools.PostRequest("../api/MantenimientoCatalogos/GetDatosUsuarios")
    const FormVentaProduutos = new FormComponet({
        EditObject: NuevaFactura,
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
        Dataset: DetallVenta,
        Functions: [
            {
                name: "eliminar", action: async (detaeli) => {
                    const detalleelimina = DetallVenta.find(x => x.idtamanoxarticulo == detaeli.idtamanoxarticulo)
                    if (detalleelimina != null) {
                        DetallVenta.splice(
                            DetallVenta.indexOf(detaeli), 1);
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
                (new AgregarDetalleVenta((venta) => {
                    if (DetallVenta.filter((x) => x.idtamanoxarticulo == venta.idtamanoxarticulo).length > 0) {
                        alert("El Detalle ya existe")
                        return;
                    }
                    DetallVenta.push(venta);
                    Total.push(venta.totaldetalle)
                    // ConvertirMedida.push(DetalleCompra.ConvertirMedida);
                    console.log(venta.totaldetalle);
                    console.log(Total);
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