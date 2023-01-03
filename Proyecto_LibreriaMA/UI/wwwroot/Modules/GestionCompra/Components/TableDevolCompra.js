import { TableComponent } from "../../../CoreComponents/TableComponent.js";
import { ViewDetalleDevolucion, Viewdevoldetallecompra } from "../../../Model/ViewDatabaseModel.js";
import { AjaxTools, Render } from "../../../Modules/utility.js";
import { devolvito } from "../ViewDevolucionList.js";

class TableDevolCompra extends HTMLElement{
    constructor(action = () =>{}){
        super();
        this.Dataset = [];
        this.DevolDetalleCompra = []

        this.Draw();
    }
    connectedCallback() { }

    Draw = async()=> {
        this.DevolDetalleCompra  =await AjaxTools.PostRequest("../api/GestionCompra/DevolDetallecompra");
        
        this.append(Render.Create({id:"TabContainer"}));

        TabContainer.innerHTML = "";
        this.TableDevolDetalle = new TableComponent({
            ModelObject: new Viewdevoldetallecompra(),
            Dataset:this.DevolDetalleCompra.filter((devdetalle)=>{
                if(devdetalle.iddevolucioncompra == devolvito.iddevolucioncompra){
                    console.log("Detallecompra",this.DevolDetalleCompra);
                }
                return devdetalle.iddevolucioncompra == devolvito.iddevolucioncompra
            })
        });
        TabContainer.append(this.TableDevolDetalle)
    }
}
customElements.define('w-devoltable', TableDevolCompra);
export { TableDevolCompra};