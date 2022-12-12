import { ModalComponent } from "../../CoreComponents/ModalComponent.js";
import { ViewGestionUsuarios} from "../../../Model/ViewDatabaseModel.js";
import { FormComponet } from "../../CoreComponents/FormComponent.js";
import { TableComponent } from "../../CoreComponents/TableComponent.js";
import { AdministracionMercancias, ArticulosDanados, DatosUsuarios } from "../../Model/DatabaseModel.js";
import { ViewArticulosDanados } from "../../Model/ViewDatabaseModel.js";
import { AjaxTools, Render } from "../../Modules/utility.js";
//import { Admin } from "./AdminMercanciaView.js";
import {Userda} from "./GestionUsuario.js"

class UpdateUsuario extends HTMLElement {
    constructor(action=() =>{}){
        super();
        this.Dataset = [];
        this.action = action;
        this.roless = [];
        this.UserUpdate = Userda;

        this.Draw();
    }
    connectedCallback() { }
    Draw = async ()=>{
        this.roless = await AjaxTools.PostRequest("../api/MantenimientoCatalogos/Getroles")
        this.form = new FormComponet({
            Model:new DatosUsuarios({
                idroles: {hidden: true},
                Roles: {
                       type: "select",
                       Dataset: this.roless.map((d) => ({ id: d.idroles, desc: d.descripcion}))
                   }
            }),
            EditObject: this.UserUpdate,
        }),
     this.append(this.form);

     console.log(Userda);
     console.log(this.UserUpdate);
     this.append(
        Render.Create({
            className: "FormContainer2",
            children: [
                {
                    tagName: "input",
                    type: "button",
                    className: "btnagregar",
                    value: "Actualizar",
                    onclick: async () => {
                        this.UserUpdate.idroles  = this.UserUpdate.Roles
                       console.log("este es this.roles",this.roless);
                        //this.AdminMerca.idbodega = this.AdminMerca.Seleccionar_Bodega
                      //  this.AdminMerca.nombrebodega = this.Bodega[0].nombrebodega
                        const response = await AjaxTools.PostRequest("../api/GestionUsuario/UpdateDatosusuarios",
                            this.UserUpdate
                        );
                        if (response == true) {
                            AppMain.append(
                                new ModalComponent(
                                    Render.Create({
                                        tagName: "h1",
                                        innerText: " Guardada",
                                    }),

                                   // window.location.reload()
                                )

                            );

                        }
                        this.action(this.UserUpdate, console.log(this.UserUpdate));
                    },
                },
            ],
        })
    );
    }
}
customElements.define('w-update', UpdateUsuario)
export {UpdateUsuario}