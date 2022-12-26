import { ModalComponent } from "../../CoreComponents/ModalComponent.js";
import { ViewGestionUsuarios } from "../../../Model/ViewDatabaseModel.js";
import { FormComponet } from "../../CoreComponents/FormComponent.js";
import { TableComponent } from "../../CoreComponents/TableComponent.js";
import { Articulos} from "../../Model/DatabaseModel.js";
import { ViewArticulosDanados } from "../../Model/ViewDatabaseModel.js";
import { AjaxTools, Render } from "../../Modules/utility.js";

import { Artiedit } from "./GestionArticulos.js"


class Updatearticulo extends HTMLElement {
    constructor(action = () => {}) {
        super();
        this.Dataset = [];
        this.action = action;
        this.ArtiUpdate = Artiedit;

        this.Draw();
    }
    connectedCallback() { }

    Draw = async ()=>{
        this.form = new FormComponet({
            Model:new Articulos({

            }),
            EditObject: this.ArtiUpdate,
            
        }),
        this.append(this.form);
            console.log(Artiedit);
            console.log(this.ArtiUpdate);

            this.append(Render.Create({
                className: "FormContainer2",
                children: [
                    {
                        tagName: "input",
                        type: "button",
                        className: "btnagregar",
                        value: "Actualizar",
                        onclick: async () => {
                            const response = await AjaxTools.PostRequest("../api/GestionArticulos/UpdateArticulos",
                            this.ArtiUpdate
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
                           this.action(this.ArtiUpdate,console.log(this.ArtiUpdate));
                        }   
                        
                    }
                ]  
            }))
        
    }
}
customElements.define('a-update', Updatearticulo)
export { Updatearticulo }