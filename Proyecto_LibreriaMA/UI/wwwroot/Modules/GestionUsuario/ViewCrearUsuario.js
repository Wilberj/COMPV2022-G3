import { FormComponet } from "../../CoreComponents/FormComponent.js";
import { TableComponent } from "../../CoreComponents/TableComponent.js";
import { DatosUsuarios } from "../../Model/DatabaseModel.js";
import { AjaxTools, Render } from "../utility.js";

class ViewCrearUsuario extends HTMLElement {
    constructor(action=()=>{}){
        super();
        this.Dataset = [];
        this.NuevoUsuario ={}
        this.dataR = []


        this.action = action;
        this.Draw();
    }
    connectedCallback() { }

    Draw = async () => {
        this.append(Render.Create({
            tagName: "h1",
            innerText: "Nuevo Usuario", class: "header1"
        }))
        this.append(Render.Create({
            class: "FormContainer2",
            children: [
                {
                    tagName: 'input', type: 'button',
                    className: 'button_topp',
                    value: 'Guardar', onclick: async () => {

                        this.NuevoUsuario.idroles = this.NuevoUsuario.Roles
                   // this.dataUs  =   await AjaxTools.PostRequest("../api/MantenimientoCatalogos/SaveDatosUsuarios")
                   await AjaxTools.PostRequest("../api/GestionUsuario/Saveusuario", this.NuevoUsuario)
                   
                   this.action(this.NuevoUsuario, console.log(this.NuevoUsuario));
                    
                    
                      window.location.reload()
                    } 
                }
            ]
        }));
        this.dataR = await AjaxTools.PostRequest("../api/MantenimientoCatalogos/Getroles")
        this.formusuario = new FormComponet({
            Model: new DatosUsuarios({
                idroles: {hidden: true},
             Roles: {
                    type: "select",
                    Dataset: this.dataR.map((d) => ({ id: d.idroles, desc: d.descripcion}))
                }
            }),
            EditObject: this.NuevoUsuario,
        })
        this.append(this.formusuario);
    };
}
customElements.define('w-viewcrearusu',ViewCrearUsuario)
export { ViewCrearUsuario };