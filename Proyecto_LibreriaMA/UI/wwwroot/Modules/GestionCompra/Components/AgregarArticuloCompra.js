import { TableComponent } from "../../../CoreComponents/TableComponent.js";
import { ViewArticuloCompra } from "../../../Model/ViewDatabaseModel.js";
import { AjaxTools } from "../../utility.js";

class AgregarArticuloCompra extends HTMLElement {
    constructor(action = () =>{}) {  
        super();
        this.Dataset = [];
        this.action = action; 
        this.Draw();
        }
        connectedCallback() { }
        Draw = async () => {
            this.Dataset = await AjaxTools.PostRequest("../api/GestionCompra/ChargeArticulos")
            this.Table = new TableComponent({
                ModelObject: new ViewArticuloCompra(),
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
    customElements.define('w-agregararticulocompra', AgregarArticuloCompra);
    export  {AgregarArticuloCompra};