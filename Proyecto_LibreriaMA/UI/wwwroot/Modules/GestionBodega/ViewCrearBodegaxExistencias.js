import { FormComponet } from "../../CoreComponents/FormComponent.js";
import { ModalComponent } from "../../CoreComponents/ModalComponent.js";
import { TableComponent } from "../../CoreComponents/TableComponent.js";
import { BodegaxArticulo } from "../../Model/DatabaseModel.js";
import { ViewArticulosDanados } from "../../Model/ViewDatabaseModel.js";
import { AjaxTools, Render } from "../utility.js";
import { AgregarDetalleBodegaxExistencias } from "./AgregaDetalleBodegaxExistencias.js";

window.onload = async () => {
    const Dataset = []
    const NuevoBodeXarti = {
        AdminMercas: Dataset

    }
    AppMain.append(Render.Create({
        tagName: "h1",
        innerText: "Gestion de Bodega-Existencias", class: "header1"
    }));
    AppMain.append(Render.Create({
        class: "FormContainer2",
        children: [
            {
                tagName: 'input', type: 'button',
                className: 'btn',
                value: 'Guardar Datos', onclick: async () => {
                    const response = await AjaxTools.PostRequest("../api/GestionCompra/SaveBodegaxArticulo", NuevoBodeXarti)
                    if (response == true) {
                        AppMain.append(
                            new ModalComponent(
                                Render.Create({
                                    tagName: "h1",
                                    innerText: "Datos Guardados",
                                }),

                                // window.location.reload()
                            )

                        );

                    }
                },
            },
        ]
    })
    );
    const data = await AjaxTools.PostRequest("../api/MantenimientoCatalogos/GetBodega")
    const formBodegaxArti = new FormComponet({
        Model: new BodegaxArticulo({
            idbodega: { hidden: true },
            Cantidadunidad: { hidden: true },
            Cantidadorigen: { hidden: true },
            existenciasarticuloorigen: { type: "number", hidden: true },

            NombreBodega: {
                type: "select",
                Dataset: data.map((d) => ({ id: d.idbodega, desc: d.nombrebodega }))
            }
        }),
        EditObject: NuevoBodeXarti,

    });
    const TableBodegaxarticulo = new TableComponent({
        ModelObject: new BodegaxArticulo(),
        Dataset: Dataset,
        Functions: [
            {
                name: "Remover",
                action: async (Dato) => {
                    const Datof = Dataset.find((x) => x.idtamanoxarticulo == Dato.idtamanoxarticulo);
                    if (Datof != null) {
                        Dataset.splice(Dataset.indexOf(Datof), 1);

                        TableArticuloDanado.DrawTableComponent();
                    }
                },
            },
        ],
    })
    AppMain.append(formBodegaxArti);
    TableBodegaxarticulo.filter.append(Render.Create({
        tagName: 'input', type: 'button',
        className: 'btnagregar', value: 'Anadir', onclick: async () => {
            const Modal = new ModalComponent(
                new AgregarDetalleBodegaxExistencias((bodegaart) => {

                    Dataset.push(bodegaart);
                    Modal.Close();
                    TableBodegaxarticulo.DrawTableComponent();
                    console.log(NuevoBodeXarti);
                    NuevoBodeXarti.idbodega = NuevoBodeXarti.NombreBodega;
                    NuevoBodeXarti.idtamanoxarticulo = Dataset[0].idtamanoxarticulo;
                    NuevoBodeXarti.idadmimercancias = Dataset[0].idadmimercancias;
                    NuevoBodeXarti.NombreArticulo = Dataset[0].NombreArticulo
                    NuevoBodeXarti.Cantidadunidad = Dataset[0].Cantidadunidad;
                    NuevoBodeXarti.Cantidadorigen = Dataset[0].Cantidadorigen;
                })
            )
            AppMain.append(Modal)
        }
    }))
    AppMain.append(TableBodegaxarticulo)
}