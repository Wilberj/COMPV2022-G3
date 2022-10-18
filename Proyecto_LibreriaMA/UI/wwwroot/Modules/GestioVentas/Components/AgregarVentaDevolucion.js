import { TableComponent } from "../../../CoreComponents/TableComponent.js";
import { ViewArticuloCompra, ViewCompra, ViewDevolucionCompra, viewdevolventa } from "../../../Model/ViewDatabaseModel.js";
import { AjaxTools } from "../../utility.js";


class AgregarVentaDevolucion extends HTMLElement {
    constructor(action = () =>{}){
        super();
        this.Dataset = [];
        this.action = action;
        this.Draw();
    }
    connectedCallback() { }
    Draw = async () => {
        this.Dataset = await AjaxTools.PostRequest("../api/GestionVenta/ChargeDevVentas")
        this.Table = new TableComponent({
            ModelObject : new viewdevolventa(),
            Dataset: this.Dataset,
            Functions: [
                {
                    name: 'Agregar', action: async(Dato) =>{
                        this.action(Dato);
                        console.log(Dato);
                    }
                }
            ]
        });
        this.append(this.Table);
    }
}
customElements.define('w-agregardevolucionventa', AgregarVentaDevolucion)
export { AgregarVentaDevolucion}