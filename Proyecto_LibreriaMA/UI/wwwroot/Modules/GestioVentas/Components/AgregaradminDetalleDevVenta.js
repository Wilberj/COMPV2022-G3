import { TableComponent } from "../../../CoreComponents/TableComponent.js";
import { ViewArticulosDanados, ViewDetalleDevolucion, viewDetalleDevolucionVenta } from "../../../Model/ViewDatabaseModel.js";
import { AjaxTools } from "../../utility.js";
import { IdentificadorFactura } from "../ViewDevolucionventa.js";

class AgregarAdminDetalleDevVenta extends HTMLElement {
    constructor(action = ()=>{}){
        super();
        this.Dataset = [];
        this.action = action;
        this.Draw();
    }
    connectedCallback() { }
    Draw = async () => {
        this.Dataset = await AjaxTools.PostRequest("../api/GestionVenta/ChargeDetaDevVenta")
        this.Table = new TableComponent({
           ModelObject: new viewDetalleDevolucionVenta(),
           Dataset: this.Dataset.filter(factura => {
            return factura.idfactura == IdentificadorFactura.id;
        }),
            Functions: [
                {
                    name: 'Agregar', action: async(Dato) =>{
                        this.action(Dato);
                        console.log(this.Dataset);
                    }
                }
            ]
        });
        this.append(this.Table)
    }

}
customElements.define('w-agregardevolucionventadmin', AgregarAdminDetalleDevVenta)
export {AgregarAdminDetalleDevVenta}