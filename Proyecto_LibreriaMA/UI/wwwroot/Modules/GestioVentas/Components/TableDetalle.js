import { TableComponent } from "../../../CoreComponents/TableComponent.js";
import { ViewDevolDetalleVenta } from "../../../Model/ViewDatabaseModel.js";
import { AjaxTools, Render } from "../../../Modules/utility.js";
import { DetalleDevoVenta } from "../ViewDevolucionList.js";

class TableDetalleDevoVenta extends HTMLElement {
    constructor(action = () => { }) {
        super();
        this.Dataset = [];
        this.Detalles = []

        this.Draw();
    }
    connectedCallback() { }
    Draw = async () => {
        this.Detalles = await AjaxTools.PostRequest("../api/GestionVenta/ChargeDevoVentaList");

        this.append(Render.Create({ id: "TabContainer" }));
    
        TabContainer.innerHTML = "";
         this.TableDetalle = new TableComponent({
            ModelObject: new ViewDevolDetalleVenta(),
            Dataset: this.Detalles.filter((factura) => {
                if (factura.idfactura == DetalleDevoVenta.idfactura) {
                    console.log("todos detalles",this.Detalles);
                }
                return factura.idfactura == DetalleDevoVenta.idfactura
            })
        });

        TabContainer.append(this.TableDetalle) 
    };
}
customElements.define('w-detalletabledeoventa', TableDetalleDevoVenta);
export { TableDetalleDevoVenta };