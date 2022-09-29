﻿
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
    const Dataset = [];
    const AdminMercas = Dataset;
    const NuevoArtiDana = {
        AdminMercas: Dataset
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
        EditObject: NuevoArtiDana,
        Model: new ArticulosDanados({
            idusuario: {
                type: "select",
                Dataset: dataC.map((d) => ({ id: d.idusuario, desc: d.nombreusuario }))
            },
            idtamanoxarticulo: { type: "number", hidden: true },
            cantidaddanada: { type: "number", hidden: true },

            // //idusuario: { type: "number" },
            // devolucionUnidad: { type: "checkbox", },
            // devolucionUnidadOrigen: { type: "checkbox", }
        },
        )
    })
    const TableArticuloDanado = new TableComponent({
        ModelObject: new ViewArticulosDanados(),
        Dataset: Dataset,
        Functions: [
            {
                name: "Remover",
                action: async (Dato) => {
                    const Datof = Dataset.find((x) => x.idarticulo == Dato.idarticulo);
                    if (Datof != null) {
                        Dataset.splice(Dataset.indexOf(Datof), 1);

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

                    Dataset.push(danado);
                    Modal.Close();
                    TableArticuloDanado.DrawTableComponent();
                    NuevoArtiDana.idtamanoxarticulo = Dataset[0].idtamanoxarticulo
                    //NuevoArtiDana.idusuario = Dataset[0].idusuario

                    // if (NuevoArtiDana.devolucionUnidad == true) {

                    //     Dataset.existenciasarticulounidad = Dataset[0].existenciasarticulounidad
                    //     Dataset[0].existenciasarticulounidad = Dataset[0].existenciasarticulounidad - NuevoArtiDana.cantidaddanada
                    // }
                    // if (NuevoArtiDana.devolucionUnidadOrigen == true) {
                    //     Dataset.existenciasarticuloorigen = Dataset[0].existenciasarticuloorigen
                    //     Dataset[0].existenciasarticuloorigen = Dataset[0].existenciasarticuloorigen - NuevoArtiDana.cantidaddanada
                    // }

                })
            )
            AppMain.append(Modal)
        }

    }))

    AppMain.append(TableArticuloDanado);
}