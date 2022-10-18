import { TableComponent } from "../../CoreComponents/TableComponent.js";
import { ViewListArticuloVenta } from "../../Model/ViewDatabaseModel.js";
import {AjaxTools} from "../utility.js";

class ViewrticuloVenta extends HTMLElement {
    constructor(action = ()=>{}){
        super();
        this.Dataset = [];
        this.action = action;
       
        this.Draw();
    }
    connectedCallback() { }

   
    Draw = async ()=> { 
       
        this.Dataset = await AjaxTools.PostRequest("../api/GestionVenta/ChargeArticulosVenta")
        this.Table = new TableComponent({
            ModelObject : new ViewListArticuloVenta(),
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
customElements.define('w-articulosventa',ViewrticuloVenta)
export {ViewrticuloVenta};