import { ModalComponent } from "../../CoreComponents/ModalComponent.js";
import { TableComponent } from "../../CoreComponents/TableComponent.js";
import { ViewAdminMercancia, ViewGestionArticulos } from "../../Model/ViewDatabaseModel.js";
import { AjaxTools, Render } from "../utility.js";
import { ViewCrearArticulo } from "./ViewCrearArticulo.js";

window.onload = async () => {
    AppMain.append(Render.Create({
        tagName: "h1",
        innerText: "Gestion de Articulos", class: "header1"
    })
    );

    const MisArticulos =
        await AjaxTools.PostRequest("../../api/GestionCompra/AdminMercancia")


        const Table = new TableComponent({
            Dataset: MisArticulos,
            ModelObject: new ViewAdminMercancia()
    })
    AppMain.append(Render.Create({
        class: "FormContainer2",
        children: [
            // {
            //     tagName: 'input', type: 'button',
            //     className: 'button_top',
            //     value: 'Ingresar Nuevo Articulo', onclick: async () => {
            //         const Modal = new ModalComponent
            //             (new ViewCrearArticulo(() => {

            //                 // if (DetalleCompra.filter((x) => x.idarticulo == compra.idarticulo).length > 0) {
            //                 //     alert("El Detalle ya existe")
            //                 //     return;
            //                 // }

            //                 Modal.Close();
            //                 Table.DrawTableComponent();
            //                 window.location.reload()

            //                 console.log(Articulos);

            //             }));
            //         AppMain.append(Modal)
            //         //cargar vists
            //         //   window.location = "./ViewCrearArticulos"
            //     }
            // },
            {
                tagName: 'input', type: 'button',
                className: 'button_top',
                value: 'Ingresar Articulo Dañado', onclick: async () => {
                    //cargar vists
                    window.location = "./ViewCrearArticulosDanados"
                }
            }
        ]

    }));


    AppMain.append(Table)

}