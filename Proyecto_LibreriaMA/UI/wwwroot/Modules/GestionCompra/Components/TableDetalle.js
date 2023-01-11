import { TableComponent } from "../../../CoreComponents/TableComponent.js";
import { VerDetalleCompra, Viewbackcompra, ViewDetalleDevolucion } from "../../../Model/ViewDatabaseModel.js";
import { AjaxTools, Render } from "../../../Modules/utility.js";
import { lolito } from "../Compra.js";

class TableDetalleCompra extends HTMLElement {
    constructor(action = () => { }) {
        super();
        this.Dataset = [];
        this.Detalles = []

        this.Draw();
    }
    connectedCallback() { }
    Draw = async () => {
        this.Detalles = await AjaxTools.PostRequest("../api/GestionCompra/ChargeDetalleCompra");

        this.append(Render.Create({ id: "TabContainer" }));
    
        TabContainer.innerHTML = "";
         this.TableDetalle = new TableComponent({
            ModelObject: new Viewbackcompra(),
            Dataset: this.Detalles.filter((compra) => {
                if (compra.idcompra == lolito.idcompra) {
                    console.log("todos detalles",this.Detalles);
                }
                return compra.idcompra == lolito.idcompra
            })
        });

        TabContainer.append(this.TableDetalle) 
    };
}
customElements.define('w-detalletable', TableDetalleCompra);
export { TableDetalleCompra };