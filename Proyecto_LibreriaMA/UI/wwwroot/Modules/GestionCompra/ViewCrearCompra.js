import { FormComponet } from "../../CoreComponents/FormComponent.js";
import { ModalComponent } from "../../CoreComponents/ModalComponent.js";
import { TableComponentCompra } from "./Components/TableComponentCompra.js";
import { Articulos, CompraProductos, DetalleCompraProductos } from "../../Model/DatabaseModel.js";
import { ViewArticuloCompra } from "../../Model/ViewDatabaseModel.js";
import { AjaxTools, Render } from "../utility.js";
import { AgregarArticuloCompra } from "./Components/AgregarArticuloCompra.js";
import { AgregarDetalleCompra } from "./Components/AgregarDetalle.js";
import { TableComponent } from "../../CoreComponents/TableComponent.js";
import { ModalComponentFactura } from "../../CoreComponents/ModalComponenttwo.js";

// class TotalSuma {insaast = 0}

window.onload = async () => {
    const DetalleCompra = [];
    const Total = [];
    var suma = 0;
    // TotalSuma = Total
    let TotalSuma, iva, totalcompra
    // var suma = 0;
    const NuevaCompra = {
        DetalleCompra: DetalleCompra
    }
    AppMain.append(Render.Create({
        tagName: "h1",
        innerText: "Gestion de compras-Ingreso", class: "header1"
    })
    );
    AppMain.append(Render.Create({
        class: "FormContainer2",
        children: [
            {
                tagName: 'input', type: 'button',
                className: 'button_topp',
                value: 'Guardar Compra', onclick: async () => {

                    if (NuevaCompra.descuentocompra == null) {
                        alert("Falta rellenar campos")
                        console.log("pjo a esto");
                        return;
                    } else {
                        if (DetalleCompra[0] == null) {
                            alert("Debe agregar articulos a la compra")
                            console.log("detalle eeehh");
                            return;
                        }
                    }

                    // if (DetalleCompra < 1) {
                    //     alert("Agregue articulos a la compra")
                    //     return;
                    // }
                    // if (this.NuevaCompra.totalcompra == ""){
                    //     alert("El check tiene que estar activo")
                    //     return;
                    // }
                    NuevaCompra.activo = true;

                    const response =
                      await AjaxTools.PostRequest("../api/GestionCompra/SaveCompra",
                            NuevaCompra,

                            // Total.forEach(function (tot) {
                            //     suma += tot;
                            // }),
                            // console.log(suma),
                            NuevaCompra.subtotalcompra = TotalSuma,
                            NuevaCompra.iva = iva,
                            NuevaCompra.totalcompra = totalcompra - parseInt(NuevaCompra.descuentocompra)
                        );
                    if (response == true) {
                        AppMain.append(
                            new ModalComponentFactura(
                                Render.Create({
                                    tagName: "h5",
                                    innerText: "Compra Guardada",
                                }),
                               
                            )

                        );

                    }

                },
            },
        ]
    })
    );
    const data = await AjaxTools.PostRequest("../api/MantenimientoCatalogos/GetProveedor")
    const dataC = await AjaxTools.PostRequest("../api/MantenimientoCatalogos/GetDatosUsuarios")

    const FormCompraProductos = new FormComponet({
        EditObject: NuevaCompra,
        Model: new CompraProductos({
            idproveedor: {
                type: "select",
                Dataset: data.map((d) => ({ id: d.idproveedor, desc: d.nombreproveedor }))
            },
            idusuario: {
                type: "select",
                Dataset: dataC.map((d) => ({ id: d.idusuario, desc: d.nombreusuario }))
            },
            subtotalcompra: {hidden: true},
            iva: {hidden: true},
            totalcompra: {hidden: true},
            activo: {hidden: true}
        })
    })
    AppMain.append(FormCompraProductos);


    //Detalle
    const TableDetalleCompra = new TableComponent({
        ModelObject: new DetalleCompraProductos(),
        Dataset: DetalleCompra,
        Functions: [
            {
                name: "eliminar", action: async (detaeli) => {
                    const detalleelimina = DetalleCompra.find(x => x.idarticulo == detaeli.idarticulo)
                    if (detalleelimina != null) {
                        DetalleCompra.splice(DetalleCompra.indexOf(detaeli), 1);
                        ///////////////////////////
                        
                        Total.splice(DetalleCompra.indexOf(detaeli.totaldetalle), 1);
                        Total.forEach(function (total) {
                            var sum2 = 0
                            suma += total
                            suma = suma + Total
                            TotalSuma = Total.reduce((a, b) => Number(a) + Number(b), 0);
                            iva = TotalSuma * 0.15;
                            sum2 = TotalSuma
                            totalcompra = TotalSuma + iva
                            ///
                            NuevaCompra.totalcompra = totalcompra
                            NuevaCompra.subtotalcompra = sum2
                            NuevaCompra.iva = iva
                            console.log("Tottal suma", TotalSuma);
                            console.log("sum2", sum2);
                            console.log("Tottal subventa", NuevaCompra.subtotalcompra);
                            // console.log("este variable suma0",suma);
                            if (TableDetalleCompra != null) {
                                document.getElementById("Subtotal").innerHTML = NuevaCompra.subtotalcompra;
                                document.getElementById("IVA").innerHTML = NuevaCompra.iva;
                                document.getElementById("Total").innerHTML = NuevaCompra.totalcompra;
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
                        if (DetalleCompra[0] == null) {
                            console.log("este vacio 0");
                            NuevaCompra.totalcompra = 0
                            NuevaCompra.subtotalcompra = 0
                            NuevaCompra.iva = 0
                            console.log(NuevaCompra.totalcompra);
                            if (TableDetalleCompra != null) {
                                document.getElementById("Subtotal").innerHTML = NuevaCompra.subtotalcompra;
                                document.getElementById("IVA").innerHTML = NuevaCompra.iva;
                                document.getElementById("Total").innerHTML = NuevaCompra.totalcompra;
                                suma = 0;

                            }
                        }

                    }
                    TableDetalleCompra.DrawTableComponent();
                }
            }
        ]
    });

    TableDetalleCompra.filter.append(
        Render.Create({
            tagName: 'input', type: 'button',
            className: 'btnagregar', value: 'Anadir', onclick: async () => {
                const Modal = new ModalComponent

                    (new AgregarDetalleCompra((compra) => {

                        if (DetalleCompra.filter((x) => x.idarticulo == compra.idarticulo).length > 0) {
                            alert("El Detalle ya existe")
                            return;
                        }

                        DetalleCompra.push(compra);
                        Total.push(compra.totaldetalle)
                        TotalSuma = Total.reduce((a, b) => Number(a) + Number(b), 0);
                        iva = TotalSuma * 0.15;
                        totalcompra = TotalSuma + iva
                        console.log(TotalSuma)
                        console.log(compra.totaldetalle);
                        console.log(Total);
                        if (TableDetalleCompra != null) {
                            document.getElementById("Subtotal").innerHTML = TotalSuma;
                            document.getElementById("IVA").innerHTML = iva;
                            document.getElementById("Total").innerHTML = totalcompra;

                        }
                        Modal.Close();
                        TableDetalleCompra.DrawTableComponent();
                        console.log(NuevaCompra);

                    }));
                AppMain.append(Modal)
            }
        })
    )
    // AppMain.append(Render.Create({
    //     tagName: "h3",
    //     innerText: "Costos", class: "header1"
    // })
    // );

    AppMain.append(Render.Create({
        tagName: "div",
        innerHTML:
            `<table id="tabla_producto" border="1" class="tableClass1">
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
            <td id="Total"></td>
            </tr>
            </tbody>
            </table>
            `

    })
    );

    AppMain.append(Render.Create({
        tagName: "h3",
        innerText: "Agregar articulos a la compra", class: "header1"
    })
    );
    AppMain.append(TableDetalleCompra);
    //

}

// export {TotalSuma}