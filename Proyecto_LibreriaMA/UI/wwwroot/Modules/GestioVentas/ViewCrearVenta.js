import { FormComponet } from "../../CoreComponents/FormComponent.js";
import { ModalComponent } from "../../CoreComponents/ModalComponent.js";
import { DetalleFactura, Factura } from "../../Model/DatabaseModel.js";
import { AjaxTools, Render } from "../utility.js";
import { TableComponent } from "../../CoreComponents/TableComponent.js";
import { AgregarDetalleVenta } from "./AgregarDetalleVenta.js";
import { ModalComponentventa } from "../../CoreComponents/ModalComponentFactura.js";


window.onload = async () => {
    const DetallVenta = [];
    const Total = [];
    var suma = 0;
    var dolarito = 0;
    var cantidad_dolar = 0;
    let TotalSuma, iva, totalventa

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
                className: 'button_topp',
                value: 'Guardar Venta', onclick: async () => {
                    if (NuevaFactura.descuentofactura == null) {
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
                    if (NuevaFactura.Cordoba == true) {
                        NuevaFactura.subtotalventa = TotalSuma,
                            NuevaFactura.iva = iva,
                            NuevaFactura.totalventa = totalventa - parseInt(NuevaFactura.descuentofactura)
                        NuevaFactura.cambio = NuevaFactura.pagototal - NuevaFactura.totalventa

                    } else {
                        if (NuevaFactura.Dolares == true) {
                            dolarito = NuevaFactura.CambioDolar //35 cs vale el dolar
                            console.log(dolarito);
                            cantidad_dolar = NuevaFactura.pagototal * dolarito //aqui tengo 35*20 = 700 pot ejemplo
                            console.log("35 * el pago del cliente", cantidad_dolar);

                            NuevaFactura.subtotalventa = TotalSuma,
                            NuevaFactura.iva = iva,
                            NuevaFactura.totalventa = totalventa - parseInt(NuevaFactura.descuentofactura)
                            NuevaFactura.cambio = cantidad_dolar - NuevaFactura.totalventa
                            NuevaFactura.pagototal = cantidad_dolar
                        }
                    }

                    console.log(NuevaFactura);
                   // const response =
                 //       //await AjaxTools.PostRequest("../api/GestionVenta/SaveFactura",
                          //  NuevaFactura,


                      //  );
                    //if (response == true) {
                        AppMain.append(
                            new ModalComponentventa(
                                Render.Create({
                                    tagName: "h5",
                                    innerText: "Factura Realizada",
                                    children: [
                                        {
                                            tagName: 'input', type: 'button',
                                            className: 'botonventa1',
                                            value: 'Generar Factura', onclick: async () => {
                                                window.location = "./viewFactura1"

                                            }
                                        }
                                    ]
                                }),

                                // window.location.reload()
                            )

                        );

                   // }

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
            },
            pagototal: { type: "number" },
            cambio: { type: "number", hidden: true },
            subtotalventa: { hidden: true },
            iva: { hidden: true },
            totalventa: { hidden: true },
            activo: { type: "checkbox" },
            Cordoba: { type: "checkbox" },
            Dolares: { type: "checkbox" },
            CambioDolar: { type: "Number" },

        }),



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
                        Total.splice(DetallVenta.indexOf(detaeli.totaldetalle), 1);
                        Total.forEach(function (total) {
                            var sum2 = 0
                            suma += total
                            suma = suma + Total
                            TotalSuma = Total.reduce((a, b) => Number(a) + Number(b), 0);
                            iva = TotalSuma * 0.15;
                            sum2 = TotalSuma
                            totalventa = TotalSuma + iva
                            ///
                            NuevaFactura.totalventa = totalventa
                            NuevaFactura.subtotalventa = sum2
                            NuevaFactura.iva = iva
                            console.log("Tottal suma", TotalSuma);
                            console.log("sum2", sum2);
                            console.log("Tottal subventa", NuevaFactura.subtotalventa);
                            // console.log("este variable suma0",suma);
                            if (TableDetalleVenta != null) {
                                document.getElementById("Subtotal").innerHTML = NuevaFactura.subtotalventa;
                                document.getElementById("IVA").innerHTML = NuevaFactura.iva;
                                document.getElementById("Total").innerHTML = NuevaFactura.totalventa;
                                suma = 0;
                            }
                        })
                        // Total.forEach(function(total){
                        //     suma += total;
                        //     //NuevaFactura.totalventa = Total
                        //   //  NuevaFactura.subtotalventa = NuevaFactura.totalventa 
                        //   NuevaFactura.subtotalventa = suma
                        //   NuevaFactura.totalventa = NuevaFactura.subtotalventa
                        //     console.log("totalventa",NuevaFactura.totalventa);
                        //     console.log("subtotal",NuevaFactura.subtotalventa);
                        //     console.log("suma",suma);


                        // })
                        if (DetallVenta[0] == null) {
                            console.log("este vacio 0");
                            NuevaFactura.totalventa = 0
                            NuevaFactura.subtotalventa = 0
                            NuevaFactura.iva = 0
                            console.log(NuevaFactura.totalventa);
                            if (TableDetalleVenta != null) {
                                document.getElementById("Subtotal").innerHTML = NuevaFactura.subtotalventa;
                                document.getElementById("IVA").innerHTML = NuevaFactura.iva;
                                document.getElementById("Total").innerHTML = NuevaFactura.totalventa;
                                suma = 0;

                            }
                        }

                    }
                    TableDetalleVenta.DrawTableComponent();

                }
            }
        ]
    });
    TableDetalleVenta.filter.append(Render.Create({
        tagName: 'input', type: 'button',
        className: 'btnagregar', value: 'Anadir', onclick: async () => {
            const Modal = new ModalComponent
                (new AgregarDetalleVenta((venta) => {
                    if (DetallVenta.filter((x) => x.idtamanoxarticulo == venta.idtamanoxarticulo).length > 0) {
                        alert("El Detalle ya existe")
                        return;
                    }
                    DetallVenta.push(venta);
                    Total.push(venta.totaldetalle) //cada detalle
                    TotalSuma = Total.reduce((a, b) => Number(a) + Number(b), 0);
                    iva = TotalSuma * 0.15;
                    totalventa = TotalSuma + iva
                    // ConvertirMedida.push(DetalleCompra.ConvertirMedida);
                    console.log(venta.totaldetalle);
                    console.log(Total);
                    if (TableDetalleVenta != null) {
                        document.getElementById("Subtotal").innerHTML = TotalSuma;
                        document.getElementById("IVA").innerHTML = iva;
                        document.getElementById("Total").innerHTML = totalventa;

                    }
                    Modal.Close();
                    TableDetalleVenta.DrawTableComponent();
                }))
            AppMain.append(Modal);
        }
    }))

    AppMain.append(Render.Create({
        tagName: "div",
        innerHTML:
            `  
            <table id="tabla_producto" border="1" class="tableClass1">
            <thead>
            <tr>
            <th>Subtotal</th>
            <th>IVA</th>
            <th>Total</th>
            </tr>
            </thead>
            <tbody>
            <tr>
            <td id="Subtotal"></td>
            <td id="IVA"></td>
            <td id="Total"</td>
            </tr>
            </tbody>
            </table>
            `

    })
    );
    AppMain.append(Render.Create({
        tagName: "h3",
        innerText: "Agregar detalle a la venta", class: "header1"
    })
    );
    AppMain.append(TableDetalleVenta);
}