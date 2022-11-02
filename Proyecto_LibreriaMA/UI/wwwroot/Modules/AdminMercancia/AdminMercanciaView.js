import { FormComponet } from "../../CoreComponents/FormComponent.js";
import { ModalComponent } from "../../CoreComponents/ModalComponent.js";
import { TableComponent } from "../../CoreComponents/TableComponent.js";
import { ViewAdminMercancia } from "../../Model/ViewDatabaseModel.js";
import { AjaxTools, Render } from "../utility.js";
import { NewExistenciaBodega } from "./NewExistenciaBodega.js";
import { Update } from "./Update.js";

class Admin {
    AdminMerca
}
window.onload = async () => {
    AppMain.append(Render.Create({
        tagName: "h1",
        innerText: "Administracion Mercancia", class: "header1"
    })
    );

    // AppMain.append(Render.Create({
    //     class: "FormContainer2",
    //     children: [
    //         {
    //             tagName: 'input', type: 'button',
    //             className: 'btn',
    //             value: 'Ingresar Existencias a bodega', onclick: async () => {
    //                 //cargar vists
    //                 window.location = "../GestionBodega/GestionBodegaView"

    //             }
    //         }
    //     ]
    // }))

    const MisArticulos =
        await AjaxTools.PostRequest("../api/GestionCompra/AdminMercancia")

    const Table = new TableComponent({
        Dataset: MisArticulos,
        ModelObject: new ViewAdminMercancia(
        ),
        Functions: [
            {
                name: "Editar", action: async (AdminMerca) => {

                    Admin = AdminMerca
                    console.log(Admin);
                    console.log(MisArticulos);

                    const Modal = new ModalComponent(
                        new Update(() => {
                            // Admin.AdminMerca = JSON.parse(JSON.stringify(AdminMerca))
                            // console.log(Admin);
                            MisArticulos.push();
                            Modal.Close();
                            Table.DrawTableComponent();

                        })
                    )
                    AppMain.append(Modal)
                }
            },
            //lo de nueva existencia y restar existenca
            {
                name: "Mover", action: async (AdminMerca) => {
                    Admin = AdminMerca



                    console.log(AdminMerca);
                    console.log(Admin);
                    console.log(MisArticulos);
                    const Modal = new ModalComponent(
                        new NewExistenciaBodega(() => {
                            MisArticulos.push();
                            Modal.Close();

                            Table.DrawTableComponent();

                        })
                    )
                    AppMain.append(Modal)
                }
            }

        ],


    }
    )
    AppMain.append(Table)
}
export { Admin }