import { FormComponet } from "../../../CoreComponents/FormComponent.js";
import { ModalComponent } from "../../../CoreComponents/ModalComponent.js";
import { DetalleDevolucionVenta } from "../../../Model/DatabaseModel.js";
import { AjaxTools, Render } from "../../../Modules/utility.js";
import { DatoEdit } from "../ModalViewRefactura.js";

class EditDevolucion extends HTMLElement {
    constructor(action = () => { }) {
        super();
        this.Dataset = [];
        this.AdminMercas = {};

        // this.dataAdminMerca = [];
        this.action = action;
        this.NewDevolucionVenta = {};

        this.NewDevolucionVenta.DetalleDevventas = [DatoEdit];

        this.NewDevolucionVenta.DetalleDevventas[0].AdminMercas = [this.AdminMercas];


        this.Draw();
    }
    connectedCallback() { }
    Draw = async () => {
        this.Devolucionventalist = await AjaxTools.PostRequest("../api/GestionVenta/DevolucionVentaList");
        this.last = this.Devolucionventalist[this.Devolucionventalist.length - 1];
        this.NewDevolucionVenta.DetalleDevventas[0].iddevolucionventa = this.last.iddevolucionventa
        this.NewDevolucionVenta.DetalleDevventas.cantidad = this.NewDevolucionVenta.DetalleDevventas.cantidadventa
        this.NewDevolucionVenta.DetalleDevventas.cantidadadevolver = this.NewDevolucionVenta.DetalleDevventas[0].cantidadventa

        this.Form = new FormComponet({
            Model: new DetalleDevolucionVenta({
                iddevolucionventa: {hidden: true},
                idadmimercancias: {hidden: true},       
                cantidad: {hidden: true},     
                cantidadadevolver: {type: "number"}
            }),
            EditObject: this.NewDevolucionVenta.DetalleDevventas

        }),
            this.append(this.Form);

        console.log(DatoEdit);

        console.log(this.NewDevolucionVenta.DetalleDevventas);
        this.append(
            Render.Create({
                className: "FormContainer2",
                children: [
                    {
                        tagName: "input",
                        type: "button",
                        className: "btnagregar",
                        value: "Guardar Cambios",
                        onclick: async () => {
                            this.AdminMercas.idadmimercancias = this.NewDevolucionVenta.DetalleDevventas[0].idadmimercancias
                            this.NewDevolucionVenta.DetalleDevventas.idadmimercancias =  this.AdminMercas.idadmimercancias 

                            this.NewDevolucionVenta.DetalleDevventas.existenciasarticulounidad =  parseInt(this.NewDevolucionVenta.DetalleDevventas.cantidadadevolver)+ parseInt( this.NewDevolucionVenta.DetalleDevventas[0].existenciasarticulounidad );
                            this.NewDevolucionVenta.DetalleDevventas[0].existenciasarticulounidad = this.NewDevolucionVenta.DetalleDevventas.existenciasarticulounidad
                            
                            this.AdminMercas.existenciasarticulounidad = this.NewDevolucionVenta.DetalleDevventas[0].existenciasarticulounidad
                            this.NewDevolucionVenta.DetalleDevventas.cantidad = this.NewDevolucionVenta.DetalleDevventas.cantidadadevolver
                            this.NewDevolucionVenta.DetalleDevventas[0].cantidad = this.NewDevolucionVenta.DetalleDevventas.cantidad

                            this.NewDevolucionVenta.DetalleDevventas.cantidadventa = parseInt(this.NewDevolucionVenta.DetalleDevventas[0].cantidadventa) - parseInt(this.NewDevolucionVenta.DetalleDevventas.cantidadadevolver) 
                            this.NewDevolucionVenta.DetalleDevventas[0].cantidadventa =  this.NewDevolucionVenta.DetalleDevventas.cantidadventa
                            console.log(this.NewDevolucionVenta);
                        
                            await AjaxTools.PostRequest("../api/GestionVenta/SaveDetalleDevolucionventa",
                            this.NewDevolucionVenta
                            );

                    
                            this.action(this.NewDevolucionVenta, console.log(this.NewDevolucionVenta));
                        },
                    },
                ],
            })
        );
    };

}
customElements.define('w-editdevo', EditDevolucion);
export { EditDevolucion };