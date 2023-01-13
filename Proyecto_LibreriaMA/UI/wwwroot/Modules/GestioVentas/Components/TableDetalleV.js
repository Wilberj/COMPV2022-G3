import { TableComponent } from "../../../CoreComponents/TableComponent.js";
import { ViewTableDetalleVenta } from "../../../Model/ViewDatabaseModel.js";
import { AjaxTools, Render } from "../../../Modules/utility.js";
import { lolito } from "../Ventas.js";

class TableDetalleVenta extends HTMLElement {
    constructor(action = () => { }) {
        super();
        this.Dataset = [];
        this.Detalles = []

        this.Draw();
    }
    connectedCallback() { }
    Draw = async () => {
        this.Detalles = await AjaxTools.PostRequest("../api/GestionVenta/ChargeTableDetalleVenta");

        this.append(Render.Create({ id: "TabContainer" }));
    
        TabContainer.innerHTML = "";
         this.TableDetalle = new TableComponent({
            ModelObject: new ViewTableDetalleVenta(),
            Dataset: this.Detalles.filter((venta) => {
                if (venta.idfactura == lolito.idfactura) {
                    console.log("todos detalles",this.Detalles);
                }
                return venta.idfactura == lolito.idfactura
            })
        });

        TabContainer.append(this.TableDetalle) 
    };
}
customElements.define('w-detalletable', TableDetalleVenta);
export { TableDetalleVenta };