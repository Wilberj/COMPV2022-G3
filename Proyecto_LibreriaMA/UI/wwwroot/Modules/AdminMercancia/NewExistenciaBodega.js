import { FormComponet } from "../../CoreComponents/FormComponent.js";
import { ModalComponent } from "../../CoreComponents/ModalComponent.js";
import { TableComponent } from "../../CoreComponents/TableComponent.js";
import { AdministracionMercancias, Articulos } from "../../Model/DatabaseModel.js";
import { Vieadminbodega } from "../../Model/ViewDatabaseModel.js";
import { Render,AjaxTools } from "../utility.js";
import { Admin } from "./AdminMercanciaView.js";
import { AgregarExistenciaBodega } from "./AgregarExistenciaBodega.js";



class NewExistenciaBodega extends HTMLElement {
    constructor(action =() =>{}){
        super();
        this.Dataset = [];
        this.action = action;
        this.Bodega =[];
       // this.Nuevoexisbodega = {}
       
        this.Nuevoexisbodega = Admin
        //this.Nuevoexisbodega = this.AdminMercas
       //this.AdminMercas = this.AdminMercas
        //this.Nuevoexisbodega = {}
        this.Nuevoexisbodega.AdminMercas = this.Dataset;
        this.Draw(); 
 
    }
    
    connectedCallback() { }
    Draw = async () =>{
        this.Bodega = await AjaxTools.PostRequest("../api/MantenimientoCatalogos/GetBodega")

        this.FormexisBodega = new FormComponet({
            Model: new AdministracionMercancias({
                GuardarUnidadOrigen: { type: "checkbox" },
                GuardarUnidad: { type: "checkbox" },
                idtamanoxarticulo: { type: "number",hidden:true},
                idconvertir: { type: "number",hidden:true},
                preciocompraunidad: { type: "number", hidden: true },
                precioventa: { type: "number" },
                existenciasarticuloorigen: { type: "number" },
                existenciasarticulounidad: { type: "number" },
                Seleccionar_Bodega: {
                    type: "select",
                    Dataset: this.Bodega.map((d) => ({ id: d.idbodega, desc: d.nombrebodega }))
                },
            }),
            EditObject: this.Nuevoexisbodega
        }),
        //tabla que trae los datos de eexistencia
        this.Table = new TableComponent({
            ModelObject: new Vieadminbodega(),
            Dataset: this.Dataset,
        })
        this.Table.filter.append(
            Render.Create({
                tagName: 'input', type: 'button',
            className: 'btn_primary', value: 'Anadir Nueva existencia',
             onclick: async () => {
                const Modal = new ModalComponent(
                    new AgregarExistenciaBodega((articulo) =>{
                        if(this.Dataset.length > 0){

                            alert("Ya existe el Dato")
                            return;
                        }
                        this.Dataset.push(articulo)
                        Modal.Close();
                        this.Table.DrawTableComponent();
                        console.log(articulo);
                    }));
                    AppMain.append(Modal)
                  
             }
             
            })
                //code
        )
        this.append(this.FormexisBodega,this.Table);
        //console.log(this.Nuevoexisbodega);
        //console.log(Admin);
     ////////////
        this.append(Render.Create({
            className: "FormContainer2",
            children: [{
                tagName: "input",
                        type: "button",
                        className: "btn_primary",
                        value: "Agregar Informacion Al Detalle",
                        onclick: async () => {
                            //this.Nuevoexisbodega.idadmimercancias = this.Dataset[0].idadmimercancias
                           this.Dataset[0].idadmimercancias = this.Nuevoexisbodega.idadmimercancias
                                this.Nuevoexisbodega.Temporal = this.Dataset[0].existenciasarticulounidad / this.Dataset[0].existenciasarticuloorigen;
                                this.Nuevoexisbodega.Cantidadunidadtotal = this.Nuevoexisbodega.Temporal * this.Nuevoexisbodega.existenciasarticuloorigen
                            if(this.Nuevoexisbodega.GuardarUnidad){
                                this.Dataset[0].existenciasarticulounidad = this.Dataset[0].existenciasarticulounidad - this.Nuevoexisbodega.existenciasarticulounidad
                            }
                            if(this.Nuevoexisbodega.GuardarUnidadOrigen){

                            }
                            this.Dataset[0].existenciasarticuloorigen = this.Dataset[0].existenciasarticuloorigen
                        this.Dataset[0].existenciasarticulounidad = this.Dataset[0].existenciasarticulounidad
                           // this.Nuevoexisbodega.idtamanoxarticulo = this.Nuevoexisbodega[0].idtamanoxarticulo
                           // this.AdminMerca.idtamanoxarticulo= this.AdminMerca.idtamanoxarticulo
                          
                           const response = await AjaxTools.PostRequest("../api/AdminMercancia/UpdateAdministracionMercancias",
                           "../api/AdminMercancia/SaveAdministracionMercancias",this.Nuevoexisbodega.idadmimercancias=null,
                            this.Nuevoexisbodega
                            );
                            if (response == true) {
                                AppMain.append(
                                    new ModalComponent(
                                        Render.Create({
                                            tagName: "h1",
                                            innerText: " Guardado Completo",
                                            
                                        }),

                                       // window.location.reload()
                                    )
                                        
                                );
                                           // console.log(this.Nuevoexisbodega);
                            }
                           
                          
                            this.action(this.Nuevoexisbodega,this.Dataset,console.log(this.Nuevoexisbodega))
                            
                        }
                        
            }]
            
        }))
    }
}
customElements.define('w-nuevoeexis',NewExistenciaBodega)
export {NewExistenciaBodega};