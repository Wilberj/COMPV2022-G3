import { ModalComponent } from "../../CoreComponents/ModalComponent.js";
import { ViewAdminMercancia, ViewArticuloCompra } from "../../../Model/ViewDatabaseModel.js";
import { FormComponet } from "../../CoreComponents/FormComponent.js";
import { TableComponent } from "../../CoreComponents/TableComponent.js";
import { ArticulosDanados } from "../../Model/DatabaseModel.js";
import { ViewArticulosDanados } from "../../Model/ViewDatabaseModel.js";
import { AjaxTools, Render } from "../../Modules/utility.js";
import { AgregarArticulosDañados } from "./AgregarArticulosDañados.js";

class AgregarDetalleArtDanados extends HTMLElement {
    constructor(action = () => { }) {
        super();
        this.Dataset = [];
        this.Dtemporal = [];
        // this.dataAdminMerca = [];
        this.action = action;
        this.NuevoArtiDana = {};
        this.NuevoArtiDana.AdminMercas = this.Dataset;

        // this.NuevoArtiDana.AdminMerca = this.Dataset;

        this.Draw();
    }
    connectedCallback() { }
    Draw = async () => {

        this.Form = new FormComponet({
            Model: new ArticulosDanados({
                idtamanoxarticulo: { type: "number", hidden: true },
                idusuario: { type: "number", hidden: true },
                devolucionUnidad: { type: "checkbox", },
                devolucionUnidadOrigen: { type: "checkbox", },
                idadmimercancias: { type: "number", hidden: true },
                idbodega: { hidden: true },
            }),

            EditObject: this.NuevoArtiDana
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
                className: 'btnagregar', value: 'Anadir Articulo a devolver', onclick: async () => {
                    //code

                    const Modal = new ModalComponent

                        (new AgregarArticulosDañados((articulo) => {

                            if (this.Dataset.length > 0) {
                                alert("Ya existe el articulo")
                                return;
                            }
                            // this.DetalleDevCompra.idarticulo = JSON.parse(JSON.stringify(articulo.idarticulo))
                            this.Dataset.push(articulo);
                            Modal.Close();
                            this.Table.DrawTableComponent();
                        }));
                    AppMain.append(Modal)
                }
            })
        )
        this.append(
            this.Form,
            this.Table,);
        this.append(
            Render.Create({
                className: "FormContainer2",
                children: [
                    {
                        tagName: "input",
                        type: "button",
                        className: "btnagregar",
                        value: "Agregar Informacion Al Detalle",
                        onclick: async () => {
                            if(/*this.NuevoArtiDana.cantidaddanadaorigen == null || this.NuevoArtiDana.cantidaddanadaunidad == null
                                ||*/ this.NuevoArtiDana.descripcionarticulodanado == null){
                                    alert("Falta rellenar descripcion , recuerde escoger origen o unidad")
                                    console.log("pjo a esto");
                                    return;
                                }else {
                                    if (this.Dataset[0] == null){
                                        alert("Por favor , añadir articulo dañado")
                                        console.log("articulo dañado");
                                        return;
                                    }
                                }


                            this.NuevoArtiDana.idtamanoxarticulo = this.Dataset[0].idtamanoxarticulo 

                            this.NuevoArtiDana.Temporal = this.Dataset[0].existenciasarticulounidad / this.Dataset[0].existenciasarticuloorigen;
                            this.NuevoArtiDana.Cantidadunidadtotal = this.NuevoArtiDana.Temporal *  this.NuevoArtiDana.cantidaddanadaorigen;

                            this.NuevoArtiDana.idadmimercancias = this.Dataset[0].idadmimercancias;
                            if (this.NuevoArtiDana.devolucionUnidad == true) {
                                this.Dataset[0].existenciasarticulounidad = this.Dataset[0].existenciasarticulounidad - this.NuevoArtiDana.cantidaddanadaunidad
                             }
                             if (this.NuevoArtiDana.devolucionUnidadOrigen == true) {
                                 this.Dataset[0].existenciasarticuloorigen = this.Dataset[0].existenciasarticuloorigen - this.NuevoArtiDana.cantidaddanadaorigen
                                 this.NuevoArtiDana.cantidaddanadaunidad = this.NuevoArtiDana.Cantidadunidadtotal
                                 this.Dataset[0].existenciasarticulounidad = this.Dataset[0].existenciasarticulounidad - this.NuevoArtiDana.Cantidadunidadtotal
                                 
                             }
                             this.NuevoArtiDana.existenciasarticulounidad = this.Dataset[0].existenciasarticulounidad
                             this.NuevoArtiDana.existenciasarticuloorigen = this.Dataset[0].existenciasarticuloorigen
                            this.action(this.NuevoArtiDana, this.Dataset, console.log(this.NuevoArtiDana));
                        },
                    },
                ],
            })
        );
    };

}
customElements.define('w-agregr', AgregarDetalleArtDanados);
export { AgregarDetalleArtDanados };