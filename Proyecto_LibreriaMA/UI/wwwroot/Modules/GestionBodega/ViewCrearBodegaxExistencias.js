import { FormComponet } from "../../CoreComponents/FormComponent.js";
import { ModalComponent } from "../../CoreComponents/ModalComponent.js";
import { TableComponent } from "../../CoreComponents/TableComponent.js";
import { BodegaxArticulo } from "../../Model/DatabaseModel.js";
import { ViewArticulosDanados } from "../../Model/ViewDatabaseModel.js";
import { AjaxTools, Render } from "../utility.js";
import { AgregarDetalleBodegaxExistencias } from "./AgregaDetalleBodegaxExistencias.js";

window.onload = async () =>{
const Dataset = []
    AppMain.append(Render.Create({
        tagName: "h1",
        innerText: "Gestion de Bodega-Existencias", class: "header1"
    }) );
    AppMain.append(Render.Create({
        class: "FormContainer2",
        children: [
            {
                tagName: 'input', type: 'button',
                className: 'btn',
                value: 'Guardar Datos', onclick: async () => {
                },
            },
        ]
    })
    );
    const data = await AjaxTools.PostRequest("../api/MantenimientoCatalogos/GetBodega")
    const formBodegaxArti = new FormComponet({
        Model: new BodegaxArticulo({
            idbodega: {
                type: "select",
                Dataset: data.map((d) => ({ id: d.idbodega, desc: d.nombrebodega }))
            }
        })
    });
    const TableBodegaxarticulo = new TableComponent({
        ModelObject: new ViewArticulosDanados(),
        Dataset:Dataset,
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
    AppMain.append(formBodegaxArti);
    TableBodegaxarticulo.filter.append(Render.Create({
        tagName: 'input', type: 'button',
        className: 'btn_primary', value: 'Anadir', onclick: async () => {
            const Modal = new ModalComponent(
                new AgregarDetalleBodegaxExistencias((bodegaart)=>{

                    Dataset.push(bodegaart);
                    Modal.Close();
                    TableBodegaxarticulo.DrawTableComponent();
                })
            )
            AppMain.append(Modal)
        }
    }))
    AppMain.append(TableBodegaxarticulo)
}