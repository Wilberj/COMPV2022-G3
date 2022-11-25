import { FormComponet } from "../../../CoreComponents/FormComponent.js";
import { ModalComponent } from "../../../CoreComponents/ModalComponent.js";
import { TableComponent } from "../../../CoreComponents/TableComponent.js";
import { Articulos, DetalleDevolucionVenta, DetalleFactura } from "../../../Model/DatabaseModel.js";
import { ViewAdminMercancia, ViewArticuloCompra, ViewCompra, ViewDevolucionCompra } from "../../../Model/ViewDatabaseModel.js";
import { AgregarArticulosDañados } from "../../GestionArticulos/AgregarArticulosDañados.js";
import { AgregarAdminDetalleDevCompra } from "../../GestionCompra/Components/AgregarAdminDetalleDevCompra.js";
import { AjaxTools, Render } from "../../utility.js";
import { AgregarAdminDetalleDevVenta } from "./AgregaradminDetalleDevVenta.js";

//este es el detalle devolucion
class AgregarFacturaDevolucion extends HTMLElement {
    constructor(action = () => { }) {
        super();
        this.Dataset = [];
        this.Dtemporal = [];
        this.DetalleDevFactura = {};
        //con adminsracion 
        this.DetalleDevFactura.AdminMercas = this.Dataset;
        this.action = action;
        this.Draw();
    }
    connectedCallback() { }
    Draw = async () => {
        this.formdevFactura = new FormComponet({
            Model: new DetalleDevolucionVenta({
                iddevolucionventa: { type: "number", hidden: true },
                idadmimercancias: { type: "number", hidden: true },
                devolucionUnidad: { type: "checkbox", },
                devolucionUnidadOrigen: { type: "checkbox", }
            }),
            EditObject: this.DetalleDevFactura
        }),
            this.Table = new TableComponent({
                ModelObject: new ViewAdminMercancia(),
                Dataset: this.Dataset,
                Functions: [
                    {
                        name: "Remover",
                        action: async (Dato) => {
                            const Datof = this.Dataset.find((x) => x.idadmimercancias == Dato.idadmimercancias);
                            if (Datof != null) {
                                this.Dataset.splice(this.Dataset.indexOf(Datof), 1);
                                this.Table.DrawTableComponent();
                            }
                        },
                    },
                ],

            });
        this.Table.filter.append(Render.Create({
            tagName: 'input', type: 'button',
            className: 'btnagregar', value: 'Anadir Articulo a ingresar nuevamente', onclick: async () => {
                const Modal = new ModalComponent
                    (new AgregarAdminDetalleDevVenta((articulo) => {
                        if (this.Dataset.length > 0) {
                            alert("Ya existe el articulo")
                            return;
                        }
                        this.Dataset.push(articulo);
                        Modal.Close();
                        console.log(this.Dataset);
                        this.Table.DrawTableComponent();
                    }));
                AppMain.append(Modal)
            }
        }))

        this.append(this.formdevFactura, this.Table)
        this.append(Render.Create({
            className: "FormContainer2",
            children: [
                {
                    tagName: "input",
                    type: "button",
                    className: "btnagregar",
                    value: "Agregar Informacion Al Detalle",
                    onclick: async () => {
                        if (this.DetalleDevFactura.cantidad == null || this.DetalleDevFactura.descripciondevolucion == null) {
                            alert("Falta rellenar campos")
                            console.log("pjo a esto");
                            return;
                        }else{
                            if(this.Dataset[0] == null){
                                alert("Escoge antes el articulo")
                                console.log("pjo a esto");
                                return;
                            }
                        }
                        this.DetalleDevFactura.idadmimercancias = this.Dataset[0].idadmimercancias;
                        this.DetalleDevFactura.iddetallefactura = this.Dataset[0].iddetallefactura;
                        this.DetalleDevFactura.activo = false
                        if (this.DetalleDevFactura.devolucionUnidad == true) {
                            // this.Dataset[0].existenciasarticulounidad = this.DetalleDevFactura.cantidad + this.Dataset[0].existenciasarticulounidad;
                            // NuevaFactura.totalventa = parseInt(NuevaFactura.subtotalventa) + parseInt(NuevaFactura.iva) - parseInt(NuevaFactura.descuentofactura)
                            this.Dataset[0].existenciasarticulounidad = parseInt(this.Dataset[0].existenciasarticulounidad) + parseInt(this.DetalleDevFactura.cantidad)
                        }
                        if (this.DetalleDevFactura.devolucionUnidadOrigen == true) {
                            this.Dataset[0].existenciasarticuloorigen = parseInt(this.Dataset[0].existenciasarticuloorigen) + parseInt(this.DetalleDevFactura.cantidad);
                            this.Dataset[0].existenciasarticulounidad = parseInt(this.Dataset[0].existenciasarticulounidad) + parseInt(this.DetalleDevFactura.Cantidadunidadtotal);
                            this.DetalleDevFactura.cantidadunidad = this.DetalleDevFactura.Cantidadunidadtotal

                        }
                        console.log(this.DetalleDevolucionVenta)
                        //this.NuevoBodegaxExiste.existenciasarticuloorigen = this.Dataset[0].existenciasarticuloorigen
                        //this.DetalleDevFactura.existenciasarticulounidad = this.Dataset[0].existenciasarticulounidad
                        this.action(this.DetalleDevFactura, this.Dataset, this.AdminMercas);


                        //console.log(this.DetalleDevFactura.IdArticulo = JSON.parse(JSON.stringify(articulo.IdArticulo)));
                    }
                }
            ]
        }))
    }

}
customElements.define('w-agregardevolucionfactura', AgregarFacturaDevolucion)
export { AgregarFacturaDevolucion };