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
    constructor (action = () =>{}){
       super();
       this.Dataset = [];
       this.DetalleDevFactura = {};
       //con adminsracion 
       //this.DetalleDevFactura.AdminMercas = this.Dataset;
       this.action = action;
       this.Draw(); 
    }
    connectedCallback() { }
    Draw = async () =>{
        this.formdevFactura = new FormComponet({
            Model: new DetalleDevolucionVenta({
                iddevolucionventa : { type: "number",hidden:true },
                idadmimercancias: { type: "number",hidden:true },
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
            className: 'btn_primary', value: 'Anadir Articulo a ingresar nuevamente', onclick: async () => {
                const Modal = new ModalComponent
                (new AgregarAdminDetalleDevVenta((articulo) =>{
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
        this.append(this.formdevFactura,this.Table)
        this.append(Render.Create({
            className: "FormContainer2",
                children: [
                    {
                        tagName: "input",
                        type: "button",
                        className: "btn_primary",
                        value: "Agregar Informacion Al Detalle",
                        onclick: async () => {

                                this.DetalleDevFactura.idadmimercancias = this.Dataset[0].idadmimercancias
                            this.action(this.DetalleDevFactura,this.Dataset,console.log(this.DetalleDevFactura))
                        }
                    }
                ]
        }))
    }
       
}
customElements.define('w-agregardevolucionfactura', AgregarFacturaDevolucion)
export {AgregarFacturaDevolucion};