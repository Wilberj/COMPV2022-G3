import { FormComponet } from "../../CoreComponents/FormComponent.js";
import { ModalComponent } from "../../CoreComponents/ModalComponent.js";
import { TableComponent } from "../../CoreComponents/TableComponent.js";
import { AjaxTools, Render } from "../utility.js";
import { DetalleFactura } from "../../Model/DatabaseModel.js";
import { ViewAdminMercancia } from "../../Model/ViewDatabaseModel.js";
import { ViewrticuloVenta } from "./ViewListArticuloVenta.js";

class AgregarDetalleVenta extends HTMLElement {
    constructor(action = () => { }) {
        super();
        this.Dataset = [];
        this.action = action;
        this.DetalleVenta = {};
        this.DetalleVenta.AdminMercaVenta = this.Dataset;

        this.Draw();

    }

    connectedCallback() { }
    Draw = async () => {
        this.Form = new FormComponet({
            //aqui oculrar el tamanoxarticulo y el idfactura lo podes traer en una nueva vista
            //y referenciarlo como se ha hecho anteriormente
            Model: new DetalleFactura({
                Unidad: { type: "checkbox", },
                UnidadOrigen: { type: "checkbox", },
            }),
            EditObject: this.DetalleVenta
        }),
            this.Table = new TableComponent({
                ModelObject: new ViewAdminMercancia(),
                Dataset: this.Dataset,
                Functions: [
                    {
                        name: "Remover",
                        action: async (Dato) => {
                            const Datof = this.Dataset.find((x) => x.idarticulo == Dato.idarticulo);
                            if (Datof != null) {
                                this.Dataset.splice(this.Dataset.indexOf(Datof), 1);
                                this.Table.DrawTableComponent();
                            }
                        },
                    },
                ],
            });
        this.Table.filter.append(Render.Create({
            tagName: 'input', type: 'button',
            className: 'btn_primary', value: 'Anadir Articulo a Vender', onclick: async () => {
                //code

                const Modal = new ModalComponent

                    (new ViewrticuloVenta((articulo) => {

                        if (this.Dataset.length > 0) {
                            alert("Ya existe el articulo")
                            return;
                        }
                        // this.DetalleVenta.idarticulo = JSON.parse(JSON.stringify(articulo.idarticulo))
                        this.Dataset.push(articulo);
                        Modal.Close();
                        console.log("este es");
                        console.log(this.Dataset);
                        this.Table.DrawTableComponent();
                    }));
                AppMain.append(Modal)
            }

        }))
        this.append(this.Form, this.Table);
        this.append(Render.Create({
            className: "FormContainer2",
            children: [
                {
                    tagName: "input",
                    type: "button",
                    className: "btn_primary",
                    value: "Agregar Informacion Al Detalle venta",
                    onclick: async () => {

                        if (this.DetalleVenta.cantidadventa == null /*||this.DetalleVenta.descuentoventa == null*/ ||
                            this.DetalleVenta.precioventa == null) {
                            alert("Falta rellenar campos")
                            console.log("pjo a esto");
                            return;

                        } else {
                            if (this.Dataset[0] == null) {
                                alert("Escoge el articulo que se vendera")
                                console.log("pjo a esto");
                                return;
                            } else {
                                if (this.DetalleVenta.cantidadventa > this.Dataset[0].existenciasarticulounidad ||
                                    this.DetalleVenta.cantidadventa > this.Dataset[0].existenciasarticuloorigen) {
                                    alert("La cantidad que vendes supera la cantidad del Stock Disponible")
                                    console.log("excedistes");
                                    return;
                                }
                            }

                        }
                        this.DetalleVenta.idtamanoxarticulo = this.Dataset[0].idtamanoxarticulo
                        this.DetalleVenta.Temporal = this.Dataset[0].existenciasarticulounidad / this.Dataset[0].existenciasarticuloorigen;
                        this.DetalleVenta.Articulo = this.Dataset[0].nombrearticulo

                        if (this.DetalleVenta.Unidad == true) {
                            this.Dataset[0].existenciasarticulounidad = this.Dataset[0].existenciasarticulounidad - this.DetalleVenta.cantidadventa
                        }
                        if (this.DetalleVenta.UnidadOrigen == true) {

                            this.Dataset[0].existenciasarticuloorigen = this.Dataset[0].existenciasarticuloorigen - this.DetalleVenta.cantidadventa
                            this.DetalleVenta.Cantidadunidadtotal = this.DetalleVenta.Temporal * this.DetalleVenta.cantidadventa;
                            this.DetalleVenta.cantidaddanadaunidad = this.DetalleVenta.Cantidadunidadtotal
                            this.Dataset[0].existenciasarticulounidad = this.Dataset[0].existenciasarticulounidad - this.DetalleVenta.Cantidadunidadtotal
                        }
                        this.DetalleVenta.totaldetalle = this.DetalleVenta.cantidadventa * this.DetalleVenta.precioventa - this.DetalleVenta.descuentoventa;

                        console.log(this.DetalleVenta);
                        //  this.DetalleVenta.existenciasarticulounidad = this.Dataset[0].existenciasarticulounidad
                        //  this.DetalleVenta.existenciasarticuloorigen = this.Dataset[0].existenciasarticuloorigen
                        this.action(this.DetalleVenta, this.DetalleVenta.AdminMercaVenta, this.Dataset);
                    }
                }

            ]
        }))




    }
}
customElements.define('w-agregardetalleven', AgregarDetalleVenta)
export { AgregarDetalleVenta };