import { TableComponent } from "../../../CoreComponents/TableComponent.js";
import { ViewArticuloCompra, ViewCompra, ViewDevolucionCompra } from "../../../Model/ViewDatabaseModel.js";
import { AjaxTools } from "../../utility.js";

class AgregarCompraDevolucion extends HTMLElement  {
    constructor(action = () =>{}) {  
        super();
        this.Dataset = [];
        this.DetalleCompra = []
        this.action = action; 
        this.Draw();
        }
        connectedCallback() { }
        Draw = async () => {
            
            this.Dataset = await AjaxTools.PostRequest("../api/GestionCompra/ChargeDevCompra")
            this.Table = new TableComponent({
                // ModelObject: new ViewDevolucionCompra(),
                Dataset: this.Dataset,
                
                Functions: [
                    {
                        name: 'Agregar', action: async(Dato) =>{
                            Dato.activo = false
                            // Dato.iva = 100
                            this.action(Dato);
                            console.log(Dato);
                            

                            Dato.DetalleCompra = this.DetalleCompra
                        }
                    }
                ]
            });
            this.append(this.Table); 
        }
    }
    customElements.define('w-agregardevolucioncompra', AgregarCompraDevolucion);
    export  {AgregarCompraDevolucion};