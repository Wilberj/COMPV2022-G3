
import { FormComponet } from "../../CoreComponents/FormComponent.js";
import { ModalComponent } from "../../CoreComponents/ModalComponent.js";
import { Articulos, ArticulosDanados, CompraProductos, DetalleCompraProductos } from "../../Model/DatabaseModel.js";
import { AjaxTools, Render } from "../utility.js";
import { TableComponent } from "../../CoreComponents/TableComponent.js";
import { ViewAdminMercancia, ViewArticulosDanados } from "../../Model/ViewDatabaseModel.js";
//import { AgregarArticulosDañados } from "./AgregarArticulosDañados.js";
//import { AgregarAdminDetalleDevCompra } from "../GestionCompra/Components/AgregarAdminDetalleDevCompra.js";
// import { AgregarDetalleArtDanados } from "./DetalleArtDanados.js";
import { AgregarDetalleArtDanados } from "./DetalleArtDanados.js"

window.onload = async () => {
    const AdminMercas = []
    const NuevoArtiDana = {
        AdminMercas: AdminMercas
    }

    AppMain.append(Render.Create({
        tagName: "h1",
        innerText: "Gestion de Articulos", class: "header1"
    })
    );
    AppMain.append(Render.Create({
        class: "FormContainer2",
        children: [
            {
                tagName: 'input', type: 'button',
                className: 'btn',
                value: 'Guardar', onclick: async () => {
                    const response = await AjaxTools.PostRequest("../api/GestionCompra/SaveArtidanado", NuevoArtiDana)
                    if (response == true) {
                        AppMain.append(
                            new ModalComponent(
                                Render.Create({
                                    tagName: "h1",
                                    innerText: "Guardado Correcto",
                                }),
                                console.log(NuevoArtiDana)
                                // window.location.reload()
                            )

                        );

                    }
                },
            },
        ]
    })
    );

    const dataC = await AjaxTools.PostRequest("../api/MantenimientoCatalogos/GetDatosUsuarios")
    const formArtiDanado = new FormComponet({
        Model: new ArticulosDanados({
            idusuario: {
                type: "select",
                Dataset: dataC.map((d) => ({ id: d.idusuario, desc: d.nombreusuario }))
            },
            idtamanoxarticulo: { type: "number", hidden: true },
            cantidaddanada: { type: "number", hidden: true },
            descripcionarticulodanado: { type: "number", hidden: true },

            // //idusuario: { type: "number" },
            // devolucionUnidad: { type: "checkbox", },
            // devolucionUnidadOrigen: { type: "checkbox", }
        }
        ),
        EditObject: NuevoArtiDana,

    })
    const TableArticuloDanado = new TableComponent({
        ModelObject: new ViewArticulosDanados(),
        Dataset: AdminMercas,
        Functions: [
            {
                name: "Remover",
                action: async (Dato) => {
                    const Datof = AdminMercas.find((x) => x.idarticulo == Dato.idarticulo);
                    if (Datof != null) {
                        AdminMercas.splice(AdminMercas.indexOf(Datof), 1);

                        TableArticuloDanado.DrawTableComponent();
                    }
                },
            },
        ],
    })
    AppMain.append(formArtiDanado);
    TableArticuloDanado.filter.append(Render.Create({

        tagName: 'input', type: 'button',
        className: 'btn_primary', value: 'Anadir', onclick: async () => {
            const Modal = new ModalComponent(
                new AgregarDetalleArtDanados((danado) => {

                    AdminMercas.push(danado);
                    Modal.Close();
                    console.log(AdminMercas);

                    TableArticuloDanado.DrawTableComponent();
                    NuevoArtiDana.idtamanoxarticulo = AdminMercas[0].idtamanoxarticulo
                    NuevoArtiDana.idadmimercancias = AdminMercas[0].idadmimercancias 
                    AdminMercas[0].idusuario = NuevoArtiDana.idusuario

                    NuevoArtiDana.descripcionarticulodanado = AdminMercas[0].descripcionarticulodanado;
                    NuevoArtiDana.cantidaddanada = AdminMercas[0].cantidaddanada;

                    // NuevoArtiDana.existenciasarticulounidad = AdminMercas[0].existenciasarticulounidad
                    // NuevoArtiDana.existenciasarticuloorigen = AdminMercas[0].existenciasarticuloorigen


                    //NuevoArtiDana.idusuario = Dataset[0].idusuario

                    // if (NuevoArtiDana.devolucionUnidad == true) {

                    //     //   Dataset.existenciasarticulounidad = Dataset[0].existenciasarticulounidad
                    //     Dataset[0].existenciasarticulounidad = Dataset[0].existenciasarticulounidad - NuevoArtiDana.cantidaddanada
                    // }
                    // if (NuevoArtiDana.devolucionUnidadOrigen == true) {
                    //     // Dataset.existenciasarticuloorigen = Dataset[0].existenciasarticuloorigen
                    //     Dataset[0].existenciasarticuloorigen = Dataset[0].existenciasarticuloorigen - NuevoArtiDana.cantidaddanada
                    // }
                    console.log(NuevoArtiDana);
                })
            )
            AppMain.append(Modal)
        }

    }))

    AppMain.append(TableArticuloDanado);
}