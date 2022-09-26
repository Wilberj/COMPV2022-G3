import { FormComponet } from "../../../CoreComponents/FormComponent.js";
import { ModalComponent } from "../../../CoreComponents/ModalComponent.js";
import { TableComponent } from "../../../CoreComponents/TableComponent.js";
import { AdministracionMercancias, Articulos, ConvertirMedida, DetalleCompraProductos, DetalleDevolucionCompra, TamanoxArticulo, Unidades } from "../../../Model/DatabaseModel.js";
import { ViewAdminMercancia, ViewArticuloCompra } from "../../../Model/ViewDatabaseModel.js";
import { AjaxTools, Render } from "../../utility.js";
import { AgregarAdminDetalleDevCompra } from "./AgregarAdminDetalleDevCompra.js";
import { AgregarArticuloCompra } from "./AgregarArticuloCompra.js";
import { AgregarCompraDevolucion } from "./AgregarCompraDevolucion.js";

class AgregarDetallDevolucion extends HTMLElement {
    constructor(action = () => { }) {
        super();
        this.Dataset = [];
        this.Dtemporal = [];
        this.dataAdminMerca = [];

        this.action = action;
        this.DetalleDevCompra = {};
        this.DetalleDevCompra.AdminMerca = this.Dataset;

        this.Draw();
    }
    connectedCallback() { }
    Draw = async () => {

        this.FormAdminMerca = new FormComponet({
            Model: new DetalleDevolucionCompra({
                iddevolucioncompra: { type: "number", hidden: true },
                idadmimercancias: { type: "number", hidden: true },
                devolucionUnidad: { type: "checkbox", },
                devolucionUnidadOrigen: { type: "checkbox", }

            }),

            EditObject: this.DetalleDevCompra
        }),
            this.Table = new TableComponent({
                ModelObject: new ViewAdminMercancia(),
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
                className: 'btn_primary', value: 'Anadir Articulo a devolver', onclick: async () => {
                    //code

                    const Modal = new ModalComponent

                        (new AgregarAdminDetalleDevCompra((articulo) => {

                            if (this.Dataset.length > 0) {
                                alert("Ya existe el articulo")
                                return;
                            }
                            // this.DetalleDevCompra.idarticulo = JSON.parse(JSON.stringify(articulo.idarticulo))
                            this.Dataset.push(articulo);
                            Modal.Close();
                            console.log(this.Dataset);
                            this.Table.DrawTableComponent();
                        }));
                    AppMain.append(Modal)
                }
            })
        )
        this.append(
            this.FormAdminMerca,
            this.Table,);
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
                            this.DetalleDevCompra.idadmimercancias = this.Dataset[0].idadmimercancias;
                            this.DetalleDevCompra.NombreArticulo = this.Dataset[0].nombrearticulo;

                            if (this.DetalleDevCompra.devolucionUnidad == true) {
                                this.Dataset[0].existenciasarticulounidad = this.Dataset[0].existenciasarticulounidad - this.DetalleDevCompra.cantidad;
                            }
                            if (this.DetalleDevCompra.devolucionUnidadOrigen == true) {
                                this.Dataset[0].existenciasarticuloorigen = this.Dataset[0].existenciasarticuloorigen - this.DetalleDevCompra.cantidad;
                            }
                            this.action(this.DetalleDevCompra, this.Dataset, console.log(this.DetalleCompra));


                            //console.log(this.DetalleCompra.IdArticulo = JSON.parse(JSON.stringify(articulo.IdArticulo)));
                        },
                    },
                ],
            })
        );
    };

}
customElements.define('w-agregardetalledev', AgregarDetallDevolucion);
export { AgregarDetallDevolucion };