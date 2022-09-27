import { FormComponet } from "../../CoreComponents/FormComponent.js";
import { TableComponent } from "../../CoreComponents/TableComponent.js";
import { ArticulosDanados } from "../../Model/DatabaseModel.js";
import { ViewArticulosDanados } from "../../Model/ViewDatabaseModel.js";
import {AjaxTools} from "../utility.js";

class AgregarArticulosDañados extends HTMLElement {
    constructor(action = ()=>{}){
        super();
        this.Dataset = [];
        this.action = action;
       
        this.Draw();
    }
    connectedCallback() { }

   
    Draw = async ()=> { 
       
        this.Dataset = await AjaxTools.PostRequest("../api/GestionCompra/ChargeArticulosDanados")
        this.Table = new TableComponent({
            ModelObject : new ViewArticulosDanados(),
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
customElements.define('w-agregararticulodanado',AgregarArticulosDañados)
export {AgregarArticulosDañados};