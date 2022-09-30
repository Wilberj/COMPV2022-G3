import { FormComponet } from "../../CoreComponents/FormComponent.js";
import { ModalComponent } from "../../CoreComponents/ModalComponent.js";
import { TableComponent } from "../../CoreComponents/TableComponent.js";
import { BodegaxArticulo } from "../../Model/DatabaseModel.js";
import { ViewArticulosDanados } from "../../Model/ViewDatabaseModel.js";
import { AgregarArticulosDañados } from "../GestionArticulos/AgregarArticulosDañados.js";
import { Render } from "../utility.js";


class  AgregarDetalleBodegaxExistencias extends HTMLElement {
    constructor(action = ()=>{}){
        super();
        this.Dataset = [];
        this.action = action;
        this.NuevoBodegaxExiste = {}
        this.Draw();
    }
    connectedCallback() { }

    Draw = async() =>{
        this.form = new FormComponet({
            Model: new BodegaxArticulo({
                //oculte el idtamanoxarticulo en el DatabaseModel y aqui por lp que
                //usaremos la vista que trae ese idtamanoxarticulo
                idbodegaxarticulo: { type: "number", primary: true },
                idtamanoxarticulo: { type: "number", hidden: true},
                idbodega: { type: "number", hidden: true },
                Cantidadorigen: { type: "checkbox", },
                Cantidadunidad: { type: "checkbox", },
            
            }),
            EditObject: this.NuevoBodegaxExiste
        }),
        this.Table = new TableComponent({
            ModelObject: new ViewArticulosDanados(),
            Dataset: this.Dataset,
            Functions: [
                {
                    name: "Remover",
                    action: async (Dato) => {
                        const Datof = this.Dataset.find((x) => x.idadmimercancias == Dato.idadmimercancias);
                        if (Datof != null) {
                            this.Dataset.splice(this.Dataset.indexOf(Datof), 1);
                            this.Table.DrawTableComponent();
                        }
                    },
                },
            ],
        });
        this.Table.filter.append(
            Render.Create({
                tagName: 'input', type: 'button',
                className: 'btn_primary', value: 'Anadir Existencia de Articulo a Mover', onclick: async () => {

                    const Modal = new ModalComponent
                    (new AgregarArticulosDañados((articulo)=>{
                        if (this.Dataset.length > 0) {
                            alert("Ya se agrego el Dato")
                            return;
                        }
                        this.Dataset.push(articulo);
                        Modal.Close();
                        this.Table.DrawTableComponent();
                    }));
                    AppMain.append(Modal)
                }
                    //code
            })
        )
        this.append(this.form,this.Table);
        this.append(Render.Create({
            className: "FormContainer2",
            children: [
                {
                    tagName: "input",
                    type: "button",
                    className: "btn_primary",
                    value: "Agregar Informacion Al Detalle",
                    onclick: async () => {}  
                }
            ]
        }))
    }
}
customElements.define('w-agregarbodegaxexistencia', AgregarDetalleBodegaxExistencias);
export {AgregarDetalleBodegaxExistencias };