import { FormComponet } from "../../CoreComponents/FormComponent.js";
import { ModalComponent } from "../../CoreComponents/ModalComponent.js";
import { TableComponent } from "../../CoreComponents/TableComponent.js";
import { AjaxTools, Render } from "../utility.js";
import { DetalleDevolucionVenta, DetalleFactura, Factura } from "../../Model/DatabaseModel.js";
import { ViewAdminMercancia } from "../../Model/ViewDatabaseModel.js";
import { ViewrticuloVenta } from "./ViewListArticuloVenta.js";
import { FacturaDevolucion } from "./ViewDevolucionventa.js";
import { AgregarDetalleVenta } from "./AgregarDetalleVenta.js";

class Agregar extends HTMLElement {
    constructor(action = () => { }) {
        super();
        this.Dataset = [];
        this.Devolucionventalist = [];

        this.action = action;

        this.Facturas = FacturaDevolucion;
        this.Detalles = [];
        this.NewDevolucionVenta = {};
        this.NewDevolucionVenta.Updateventa = [this.Facturas];
        this.DetalleDevventa = {}
        this.NewDevolucionVenta.DetalleDevventas = [this.DetalleDevventa]
///////////////////////////////////////////
        this.Total = [];
         this.TotalSuma = 0; 
         this.iva = 0; 
         this.totalventa = 0

        this.NuevaFactura = {};
        this.NuevaFactura.DetallVenta = [];




        this.Draw();

    }

    connectedCallback() { }
    Draw = async () => {
        console.log(this.NewDevolucionVenta.Updateventa);
        this.Dataset = await AjaxTools.PostRequest("../api/GestionVenta/ChargeDetaDevVenta");
        this.Devolucionventalist = await AjaxTools.PostRequest("../api/GestionVenta/DevolucionVentaList");
        this.last = this.Devolucionventalist[this.Devolucionventalist.length - 1];
        console.log("this.last");

        console.log(this.last);
        console.log(this.Devolucionventalist);
        console.log(this.Facturas);
        this.NuevaFactura.nombrecliente = this.Facturas.nombrecliente
        this.NuevaFactura.idusuario = this.Facturas.idusuario
        this.DetalleDevventa.iddevolucionventa = this.last.iddevolucionventa
        console.log(this.Facturas);
        this.Form = new FormComponet({
            Model: new Factura({
                idusuario: { hidden: true }
            }),
            EditObject: this.NuevaFactura
        }),
        this.Form1 = new FormComponet({
            Model: new DetalleFactura({
                idusuario: { hidden: true }
            }),
            EditObject:  this.NuevaFactura.DetallVenta
        }),
        console.log("LOLOLOLOL",this.NuevaFactura);
            this.Form12 = new FormComponet({
                Model: new DetalleDevolucionVenta({

                }),
                EditObject: this.DetalleDevventa
            }),
            this.append(this.Form, this.Form1);

            this.append(Render.Create({
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
    
            }))
         
            this.Table = new TableComponent({
                ModelObject: new DetalleFactura(),
                Dataset: this.Dataset.filter((factura) => {
                    factura.activo = false
                    if (factura.idfactura == this.Facturas.idfactura) {
                        console.log(factura);
                        this.Detalles.push(factura)
                        console.log("DATOS CALCULADOS");
                        this.Total.push(factura.precioventa * factura.cantidadventa) //cada detalle
                        console.log(this.Total);
                        this.TotalSuma = this.Total.reduce((a, b) => Number(a) + Number(b), 0);
                         this.iva = this.TotalSuma * 0.15;
                         this.totalventa = this.TotalSuma + this.iva
                        // // ConvertirMedida.push(DetalleCompra.ConvertirMedida);
                         console.log(this.TotalSuma);
                         console.log(this.totalventa);
                         if (this.Table == null) {
                            document.getElementById("Subtotal").innerHTML = this.TotalSuma;
                            document.getElementById("IVA").innerHTML = this.iva;
                            document.getElementById("Total").innerHTML = this.totalventa;
    
                        }
                        
                    }
                    return factura.idfactura == this.Facturas.idfactura

                }),

                Functions: [
                    {
                        name: "Remover",
                        action: async (Dato) => {
                            console.log(Dato);

                            // this.NewDevolucionVenta.DetalleDevventas.pushthis.DetalleDevventa(this.DetalleDevventa)


                            var resultado = window.confirm('Estas seguro?');
                            if (resultado === true) {
                                this.DetalleDevventa.AdminMercas = []

                                this.DetalleDevventa.AdminMercas.push(Dato)
                                this.DetalleDevventa.cantidad = this.DetalleDevventa.AdminMercas[0].cantidadventa
                                this.DetalleDevventa.idadmimercancias = this.DetalleDevventa.AdminMercas[0].idadmimercancias
                                // this.DetalleDevventa.AdminMercas[0].idadmimercancias= this.DetalleDevventa.idadmimercancias 
                                this.DetalleDevventa.AdminMercas[0].existenciasarticulounidad = parseInt(this.DetalleDevventa.cantidad + this.DetalleDevventa.AdminMercas[0].existenciasarticulounidad)
                                console.log(this.NewDevolucionVenta);

                                //await AjaxTools.PostRequest("../api/GestionVenta/SaveDetalleDevolucionventa",
                                // this.NewDevolucionVenta
                                // );
                                const Datof = this.Detalles.find((x) => x.iddetallefactura == Dato.iddetallefactura);
                                if (Datof != null) {
                                    this.Detalles.splice(this.Detalles.indexOf(Datof), 1);
                                    this.Table.DrawTableComponent(this.Detalles);
                                }
                                console.log(this.Detalles);
                            } else {
                                return;
                                //this.Table.DrawTableComponent(this.Detalles);

                            }
                            //console.log(this.DetalleDevventa);
                            // await AjaxTools.PostRequest("../api/GestionVenta/SaveDetalleDevolucionventa",
                            // this.NewDevolucionVenta
                            //  );
                            console.log(this.NewDevolucionVenta);
                        },
                    },
                ],
            });
        // this.Table.filter.append(Render.Create({
        //     tagName: 'input', type: 'button',
        //     className: 'btn_primary', value: 'Anadir Articulo a Vender', onclick: async () => {
        //         //code

        //         const Modal = new ModalComponent

        //             (new AgregarDetalleVenta((articulo) => {

        //                 if (this.Detalles.filter((x) => x.idtamanoxarticulo == articulo.idtamanoxarticulo).length > 0) {
        //                     console.log(this.Detalles.filter((x) => x.idtamanoxarticulo == articulo.idtamanoxarticulo).length > 0);
        //                     alert("El Detalle ya existe")
        //                     return;
        //                 }
        //                 this.Detalles.push(articulo);

        //                 // this.DetalleVenta.idarticulo = JSON.parse(JSON.stringify(articulo.idarticulo))
        //                 Modal.Close();
        //                 console.log("este es");
        //                 console.log(this.Dataset);
        //                 this.Table.DrawTableComponent();
        //             }));
        //         AppMain.append(Modal)
        //     }

        // }))

        // this.TableDetalleVenta = new TableComponent({
        //     ModelObject: new DetalleFactura(),
        //     Dataset: this.DetallVenta,
        //     Functions: [
        //         {
        //             name: "eliminar", action: async (detaeli) => {
        //                 const detalleelimina = this.DetallVenta.find(x => x.idtamanoxarticulo == detaeli.idtamanoxarticulo)
        //                 if (detalleelimina != null) {
        //                     // this.DetallVenta.splice(
        //                     //     DetallVenta.indexOf(detaeli), 1);
        //                     //     Total.splice(DetallVenta.indexOf(detaeli.totaldetalle),1);
        //                     //     Total.forEach(function(total){
        //                     //         var sum2=0
        //                     //         suma +=total
        //                     //        suma = suma + Total
        //                     //         TotalSuma = Total.reduce((a, b) => Number(a) + Number(b), 0);
        //                     //         iva = TotalSuma * 0.15;
        //                     //         sum2 =TotalSuma
        //                     //        totalventa = TotalSuma + iva
        //                     //        ///
        //                     //       NuevaFactura.totalventa = totalventa
        //                     //         NuevaFactura.subtotalventa = sum2
        //                     //         NuevaFactura.iva = iva
        //                     //             console.log("Tottal suma",TotalSuma);
        //                     //             console.log("sum2" ,sum2);
        //                     //             console.log("Tottal subventa",NuevaFactura.subtotalventa);
        //                     //       // console.log("este variable suma0",suma);
        //                     //         if (TableDetalleVenta != null) {
        //                     //             document.getElementById("Subtotal").innerHTML = NuevaFactura.subtotalventa;
        //                     //            document.getElementById("IVA").innerHTML = NuevaFactura.iva;
        //                     //             document.getElementById("Total").innerHTML = NuevaFactura.totalventa;
        //                     //             suma = 0;
        //                     //         }
        //                     //     })
        //                     // Total.forEach(function(total){
        //                     //     suma += total;
        //                     //     //NuevaFactura.totalventa = Total
        //                     //   //  NuevaFactura.subtotalventa = NuevaFactura.totalventa 
        //                     //   NuevaFactura.subtotalventa = suma
        //                     //   NuevaFactura.totalventa = NuevaFactura.subtotalventa
        //                     //     console.log("totalventa",NuevaFactura.totalventa);
        //                     //     console.log("subtotal",NuevaFactura.subtotalventa);
        //                     //     console.log("suma",suma);


        //                     // })
        //                     //    if(DetallVenta[0] == null){
        //                     //     console.log("este vacio 0");
        //                     //     NuevaFactura.totalventa = 0
        //                     //     NuevaFactura.subtotalventa = 0
        //                     //     NuevaFactura.iva = 0
        //                     //     console.log(NuevaFactura.totalventa);
        //                     //     if (TableDetalleVenta != null) {
        //                     //         document.getElementById("Subtotal").innerHTML = NuevaFactura.subtotalventa;
        //                     //        document.getElementById("IVA").innerHTML = NuevaFactura.iva;
        //                     //         document.getElementById("Total").innerHTML = NuevaFactura.totalventa;
        //                     //         suma = 0;

        //                     //     }
        //                     // }

        //                 }
        //                 TableDetalleVenta.DrawTableComponent();

        //             }
        //         }
        //     ]
        // });

        // this.TableDetalleVenta.filter.append(Render.Create({
        //     tagName: 'input', type: 'button',
        //     className: 'btnagregar', value: 'Anadir', onclick: async () => {
        //         const Modal = new ModalComponent
        //             (new AgregarDetalleVenta((venta) => {
        //                 if (this.DetallVenta.filter((x) => x.idtamanoxarticulo == venta.idtamanoxarticulo).length > 0) {
        //                     alert("El Detalle ya existe")
        //                     return;
        //                 }
        //                 this.DetallVenta.push(venta);
        //                 // Total.push(venta.totaldetalle) //cada detalle
        //                 // TotalSuma = Total.reduce((a, b) => Number(a) + Number(b), 0);
        //                 // iva = TotalSuma * 0.15;
        //                 // totalventa = TotalSuma + iva
        //                 // // ConvertirMedida.push(DetalleCompra.ConvertirMedida);
        //                 // console.log(venta.totaldetalle);
        //                 // console.log(Total);
        //                 // if (TableDetalleVenta != null) {
        //                 //     document.getElementById("Subtotal").innerHTML = TotalSuma;
        //                 //    document.getElementById("IVA").innerHTML = iva;
        //                 //     document.getElementById("Total").innerHTML = totalventa;

        //                 // }
        //                 Modal.Close();
        //                 this.TableDetalleVenta.DrawTableComponent();
        //             }))
        //         AppMain.append(Modal);
        //     }

        // }))
        this.append(this.Table);
        this.append(Render.Create({
            className: "FormContainer2",
            children: [
                {
                    tagName: "input",
                    type: "button",
                    className: "btn_primary",
                    value: "Guardar",
                    onclick: async () => {
                        console.log(this.DetalleDevventa);
                        const response = true
                        // await AjaxTools.PostRequest("../api/GestionVenta/SaveFactura",
                        //     NuevaFactura,


                        // );
                    if (response == true) {
                        AppMain.append(
                            new ModalComponent(
                                Render.Create({
                                    tagName: "h1",
                                    innerText: "Factura Realizada",
                                    children: [
                                        {
                                            tagName: 'input', type: 'button',
                                            className: 'btn_quinto',
                                            value: 'Generar Factura', onclick: async () => {
                                                window.location = "./viewFactura1"

                                            }
                                        }
                                    ]
                                }),

                                // window.location.reload()
                            )

                        );

                    }
                        console.log(this.NewDevolucionVenta);

                    }
                }

            ]
        }))




    }
}
customElements.define('w-agregar', Agregar)
export { Agregar };