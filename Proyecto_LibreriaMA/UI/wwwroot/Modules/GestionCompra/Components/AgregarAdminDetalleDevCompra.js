import { TableComponent } from "../../../CoreComponents/TableComponent.js";
import { ViewDetalleDevolucion } from "../../../Model/ViewDatabaseModel.js";
import { AjaxTools } from "../../utility.js";
import { Identificador } from "../ViewDevolucionCompra.js";

class AgregarAdminDetalleDevCompra extends HTMLElement  {
    constructor(action = () =>{}) {  
        super();
        this.Dataset = [];
        this.action = action; 
        this.Draw();
        }
        connectedCallback() { }
        Draw = async () => {
            this.Dataset = await AjaxTools.PostRequest("../api/GestionCompra/ChargeArticulosDanados")
            this.Table = new TableComponent({
                ModelObject: new ViewDetalleDevolucion(),
                Dataset: this.Dataset.filter(compra => {
                    return compra.idcompra == Identificador.id;
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
            this.append(this.Table); 
        }
    }
    customElements.define('w-agregardevolucioncompraadmin', AgregarAdminDetalleDevCompra);
    export  {AgregarAdminDetalleDevCompra};