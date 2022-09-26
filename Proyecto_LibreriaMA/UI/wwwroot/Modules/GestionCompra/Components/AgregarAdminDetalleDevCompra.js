import { TableComponent } from "../../../CoreComponents/TableComponent.js";
import { ViewAdminMercancia, ViewArticuloCompra, ViewCompra, ViewDevolucionCompra } from "../../../Model/ViewDatabaseModel.js";
import { AjaxTools } from "../../utility.js";

class AgregarAdminDetalleDevCompra extends HTMLElement  {
    constructor(action = () =>{}) {  
        super();
        this.Dataset = [];
        this.action = action; 
        this.Draw();
        }
        connectedCallback() { }
        Draw = async () => {
            this.Dataset = await AjaxTools.PostRequest("../api/GestionCompra/AdminMercancia")
            this.Table = new TableComponent({
                ModelObject: new ViewAdminMercancia(),
                Dataset: this.Dataset,
                Functions: [
                    {
                        name: 'Agregar', action: async(Dato) =>{
                            this.action(Dato);
                        }
                    }
                ]
            });
            this.append(this.Table); 
        }
    }
    customElements.define('w-agregardevolucioncompraadmin', AgregarAdminDetalleDevCompra);
    export  {AgregarAdminDetalleDevCompra};