// import { TableComponent } from "../../../CoreComponents/TableComponent.js";
// import { ViewArticuloCompra } from "../../../Model/ViewDatabaseModel.js";
// import { FormComponet } from "../../CoreComponents/FormComponent.js";
// import { DetalleCompraProductos } from "../../Model/DatabaseModel.js";
// import { AjaxTools } from "../../utility.js";

// class AgregarDetalleCompra extends HTMLElement {
//     constructor(action = () =>{}) {  
//         super();
//         this.Dataset = [];
//         this.action = action; 
//         this.Draw();
//         }
//         connectedCallback() { }
//         Draw = async () => {
//             this.Form = new FormComponet({
//                 Model: new DetalleCompraProductos()
//             });
//             this.Table = new TableComponent({
//                 ModelObject: new ViewArticuloCompra(),
//                 Dataset: this.Dataset,
//                 Functions: [
//                     {
//                         name: 'Agregar', action: async(Dato) =>{
//                             this.action(Dato);
//                         }
//                     }
//                 ]
//             });
//             this.append( this.Form ,this.Table); 
//         }
//     }
//     customElements.define('w-agregarardetallecompra', AgregarDetalleCompra);
//     export  {AgregarDetalleCompra};