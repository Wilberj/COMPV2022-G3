import { ModalComponent } from "../../CoreComponents/ModalComponent.js";
import { ViewAdminMercancia, ViewArticuloCompra } from "../../../Model/ViewDatabaseModel.js";
import { FormComponet } from "../../CoreComponents/FormComponent.js";
import { TableComponent } from "../../CoreComponents/TableComponent.js";
import { AdministracionMercancias, ArticulosDanados } from "../../Model/DatabaseModel.js";
import { ViewArticulosDanados } from "../../Model/ViewDatabaseModel.js";
import { AjaxTools, Render } from "../../Modules/utility.js";
import { Admin } from "./AdminMercanciaView.js";

class Update extends HTMLElement {
    constructor(action = () => { }) {
        super();
        this.Dataset = [];
        this.Bodega = [];
        // this.dataAdminMerca = [];
        this.action = action;

        this.AdminMerca = Admin;

        this.Draw();
    }
    connectedCallback() { }
    Draw = async () => {
        this.Bodega = await AjaxTools.PostRequest("../api/MantenimientoCatalogos/GetBodega")

        this.Form = new FormComponet({
            Model: new AdministracionMercancias({
                Seleccionar_Bodega: {
                    type: "select",
                    Dataset: this.Bodega.map((d) => ({ id: d.idbodega, desc: d.nombrebodega }))
                },
            }),
            EditObject: this.AdminMerca,

        }),
            this.append(this.Form);

        console.log(Admin);

        console.log(this.AdminMerca);
        this.append(
            Render.Create({
                className: "FormContainer2",
                children: [
                    {
                        tagName: "input",
                        type: "button",
                        className: "btn_primary",
                        value: "Agregar Informacion Al Detalle",
                        onclick: async () => {
                            console.log(this.Bodega);
                            this.AdminMerca.idbodega = this.AdminMerca.Seleccionar_Bodega
                            this.AdminMerca.nombrebodega = this.Bodega[0].nombrebodega
                            const response = await AjaxTools.PostRequest("../api/AdminMercancia/UpdateAdministracionMercancias",
                                this.AdminMerca
                            );
                            if (response == true) {
                                AppMain.append(
                                    new ModalComponent(
                                        Render.Create({
                                            tagName: "h1",
                                            innerText: " Guardada",
                                        }),

                                        window.location.reload()
                                    )

                                );

                            }
                            this.action(this.AdminMerca, console.log(this.AdminMerca));
                        },
                    },
                ],
            })
        );
    };

}
customElements.define('w-update', Update);
export { Update };