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
            Model: new DetalleFactura({
                Unidad: { type: "checkbox" },
                UnidadOrigen: { type: "checkbox" },
                precioventa: { hidden: true },

            }),
            EditObject: this.DetalleVenta
        }),
            this.Table = new TableComponent({
                ModelObject: new ViewAdminMercancia(
                    {
                        preciocompraunidad: { type: "number", hidden: true }

                    }
                ),
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
            className: 'btnagregar', value: 'Anadir Articulo a Vender', onclick: async () => {
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
                    className: "btnagregar",
                    value: "Agregar Informacion Al Detalle venta",
                    onclick: async () => {

                        if (this.DetalleVenta.cantidadventa == null /*||this.DetalleVenta.descuentoventa == null*/
                           /*this.DetalleVenta.precioventa == null*/) {
                            alert("Falta rellenar campos")
                            console.log("pjo a esto");
                            return;

                        } else {
                            if (this.Dataset[0] == null) {
                                alert("Escoge el articulo que se vendera")
                                console.log("pjo a esto");
                                return;
                            }

                        }
                        this.DetalleVenta.idtamanoxarticulo = this.Dataset[0].idtamanoxarticulo
                        this.DetalleVenta.Temporal = this.Dataset[0].existenciasarticulounidad / this.Dataset[0].existenciasarticuloorigen;
                        this.DetalleVenta.Articulo = this.Dataset[0].nombrearticulo
                        this.DetalleVenta.precioventa = this.Dataset[0].precioventa
                        // this.DetalleVenta.sacarorigen = this.DetalleVenta.cantidadventa / this.DetalleVenta.Temporal
                        this.DetalleVenta.nuevo = this.Dataset[0].existenciasarticulounidad - this.DetalleVenta.cantidadventa
                        this.DetalleVenta.calculo = this.Dataset[0].existenciasarticuloorigen - this.DetalleVenta.cantidadventa



                        if (this.DetalleVenta.Unidad == true) {


                            if (this.DetalleVenta.cantidadventa > this.Dataset[0].existenciasarticulounidad) {
                                alert("La cantidad que vendes supera la cantidad del Stock Disponible")
                                console.log("excedistes");
                                return;
                            }
                            // if (this.DetalleVenta.cantidadventa >= this.DetalleVenta.Temporal) {
                            //     this.Dataset[0].existenciasarticuloorigen = this.DetalleVenta.cantidadventa / this.DetalleVenta.Temporal
                            //     return;
                            //    }
                            this.Dataset[0].existenciasarticulounidad = this.Dataset[0].existenciasarticulounidad - this.DetalleVenta.cantidadventa

                            this.DetalleVenta.variable = this.Dataset[0].existenciasarticuloorigen
                            this.DetalleVenta.variable = parseInt(this.DetalleVenta.nuevo / this.Dataset[0].UnidadxOrigen);
                            this.Dataset[0].existenciasarticuloorigen = this.DetalleVenta.variable
                            this.DetalleVenta.totaldetalle = this.DetalleVenta.cantidadventa * this.DetalleVenta.precioventa - this.DetalleVenta.descuentoventa;
                            this.DetalleVenta.variabledescuenotmax = this.Dataset[0].precioventa - this.Dataset[0].preciocompraunidad
                            this.DetalleVenta.variabledescuenotmax1 = this.DetalleVenta.variabledescuenotmax - 1
                            this.DetalleVenta.variabledescuenotmax2 = this.DetalleVenta.variabledescuenotmax1 * this.DetalleVenta.cantidadventa
                            if (this.DetalleVenta.descuentoventa > this.DetalleVenta.variabledescuenotmax2) {
                                alert("El descuento que intenta ingresar no genera ninguna ganancia " + "Descuento maximo para este articulo: " + this.DetalleVenta.variabledescuenotmax2.toFixed(2))
                                return;
                            }
                        }
                        if (this.DetalleVenta.UnidadOrigen == true) {

                            // if (this.Dataset[0].existenciasarticulounidad < this.DetalleVenta.Temporal) {
                            //     alert("No hay una caja completa disponible para poder vender")
                            //     console.log("excedistes");
                            //     return;
                            // }

                            if (this.DetalleVenta.cantidadventa > this.Dataset[0].existenciasarticuloorigen) {
                                alert("La cantidad que vendes supera la cantidad del Stock Disponible")
                                console.log("excedistes");
                                return;
                            }

                            this.Dataset[0].existenciasarticuloorigen = this.Dataset[0].existenciasarticuloorigen - this.DetalleVenta.cantidadventa
                            // this.DetalleVenta.Cantidadunidadtotal = this.DetalleVenta.UnidadxOrigen * this.DetalleVenta.cantidadventa;
                            // this.DetalleVenta.cantidaddanadaunidad = this.DetalleVenta.Cantidadunidadtotal
                            // this.Dataset[0].existenciasarticulounidad = this.Dataset[0].existenciasarticulounidad - this.DetalleVenta.Cantidadunidadtotal
                            this.DetalleVenta.sacarunidad = this.Dataset[0].existenciasarticulounidad
                            this.DetalleVenta.sacarunidad = parseInt(this.DetalleVenta.calculo * this.Dataset[0].UnidadxOrigen);
                            this.Dataset[0].existenciasarticulounidad = this.DetalleVenta.sacarunidad
                            this.DetalleVenta.CalculoPrecioOrigen = parseInt(this.DetalleVenta.cantidadventa) * parseInt(this.Dataset[0].precioventa)
                            this.DetalleVenta.precioorigen = this.Dataset[0].preciocompraunidad * this.Dataset[0].UnidadxOrigen
                            this.DetalleVenta.precioorigenganancia = this.Dataset[0].precioventa * this.Dataset[0].UnidadxOrigen
                            this.DetalleVenta.variabledescuenotmax = this.DetalleVenta.precioorigenganancia - this.DetalleVenta.precioorigen
                            this.DetalleVenta.variabledescuenotmax1 = this.DetalleVenta.variabledescuenotmax - 1
                            this.DetalleVenta.variabledescuenotmax2 = this.DetalleVenta.variabledescuenotmax1 * this.DetalleVenta.cantidadventa
                            if (this.DetalleVenta.descuentoventa > this.DetalleVenta.variabledescuenotmax2) {
                                alert("El descuento que intenta ingresar no genera ninguna ganancia " + "Descuento maximo para este articulo: " + this.DetalleVenta.variabledescuenotmax2.toFixed(2))
                                return;
                            }

                            this.DetalleVenta.totaldetalle = parseInt(this.DetalleVenta.CalculoPrecioOrigen) * parseInt(this.Dataset[0].UnidadxOrigen) - parseInt(this.DetalleVenta.descuentoventa)
                            this.DetalleVenta.cantidadventatemporal = this.DetalleVenta.cantidadventa
                            this.DetalleVenta.cantidadventa = parseInt(this.DetalleVenta.cantidadventatemporal) * parseInt(this.Dataset[0].UnidadxOrigen)
                        }

                        this.DetalleVenta.activo = true

                        console.log(this.DetalleVenta);
                        console.log(this.Dataset);
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