import { ModalComponent } from "../../CoreComponents/ModalComponent.js";
import { TableComponent } from "../../CoreComponents/TableComponent.js";
import { ViewGestionArticulos, ViewGestionUsuarios } from "../../Model/ViewDatabaseModel.js";
import { AjaxTools, Render } from "../utility.js";
import { ViewCrearUsuario } from "./ViewCrearUsuario.js";
import {UpdateUsuario} from "./UpdateUsuario.js"
import { ModalComponentventa } from "../../CoreComponents/ModalComponentFactura.js";
import { ModalComponentFactura } from "../../CoreComponents/ModalComponenttwo.js";


class Userda {
    UserUpdate
}
window.onload = async () =>{
    AppMain.append(Render.Create({
        tagName: "h1",
        innerText: "Gestion de Usuarios", class: "header1"
    }));
    const Usuarios =
    await AjaxTools.PostRequest("../api/GestionUsuario/ChargeUsuario")

        const Table = new TableComponent({
            Dataset: Usuarios,
            ModelObject: new ViewGestionUsuarios(),
            Functions: [
                {
                    name: "Editar", action: async (UserUpdate) => {
                        Userda = UserUpdate
                        console.log(Userda);
                        console.log(Usuarios);
                        const Modal = new ModalComponent(
                            new UpdateUsuario(()=>{
                                Usuarios.push();
                                Modal.Close();
                                Table.DrawTableComponent();
                            })
                        )
                        AppMain.append(Modal)
                    }
                },
                // {
                //     name: "lol", action: async (UserUpdate) => {
                       
                //         const Modal = new ModalComponent(
                        
                //         )
                //         AppMain.append(Modal)
                //     }
                // }
                // {
                //     name: "Eliminar", action: async (UserUpdate) => {
                //       // const  Userda = [UserUpdate]
                      
                //         const Datof = Usuarios.find((x) => x.idusuario == UserUpdate.idusuario);
                //         if (Datof != null) {
                //             Usuarios.splice(Usuarios.indexOf(Datof), 1);
                //             Table.DrawTableComponent();
                //         }
                //         console.log(Usuarios);
                //     }
                // }
                
            ]
        })
    AppMain.append(Render.Create({
        class: "FormContainer2",
        children: [
            {
                tagName: 'input', type: 'button',
                className: 'button_top',
                value: 'Ingresar Nuevo Usuario', onclick: async () => {
                  const Modal = new ModalComponent(
                    new ViewCrearUsuario(()=>{


                        Modal.Close();
                        Table.DrawTableComponent();
                       console.log(Usuarios);
                    })
                  );
                  AppMain.append(Modal)
                }

            }
        ]
    }));
    AppMain.append(Table)

}
export { Userda }