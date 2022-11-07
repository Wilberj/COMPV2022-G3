import { TableComponent } from "../../../CoreComponents/TableComponent.js";
import { ViewDetalleDevolucion } from "../../../Model/ViewDatabaseModel.js";
import { AjaxTools, Render } from "../../utility.js";
import { Identificador } from "../ViewDevolucionCompra.js";

class AgregarAdminDetalleDevCompra extends HTMLElement {
    constructor(action = () => { }) {
        super();
        this.Dataset = [];
        this.action = action;
        this.Draw();
    }
    connectedCallback() { }
    Draw = async () => {
        this.Dataset = await AjaxTools.PostRequest("../../api/GestionCompra/ChargeDetalleDevCompra")
        this.Table = new TableComponent({
            ModelObject: new ViewDetalleDevolucion(),
            Dataset: this.Dataset.filter(compra => {
                return compra.idcompra == Identificador.id;
                
            }),
             Functions: [
                 {
                     name: 'Agregar', action: async (Dato) => {
                         this.action(Dato);
                         console.log(this.Dataset);
                     }
                 }
             ]
        });
        
     this.Table.filter.append(
         Render.Create({
             tagName: 'input', type: 'button',
             className: 'btn_primary', value: 'Anadir detalle', onclick: async (data) => {


            data = this.Dataset.filter(compra => {
                return compra.idcompra == Identificador.id;
                
            })
            this.action(data)
            console.log(data);

            //   AppMain.append(Modal)
             }
         })
     )
        console.log("lololol");
        console.log(this.Dataset);
        this.append(this.Table);
    }
}
customElements.define('w-agregardevolucioncompraadmin', AgregarAdminDetalleDevCompra);
export { AgregarAdminDetalleDevCompra };