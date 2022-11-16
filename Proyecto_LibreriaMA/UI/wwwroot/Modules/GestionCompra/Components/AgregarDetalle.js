import { FormComponet } from "../../../CoreComponents/FormComponent.js";
import { ModalComponent } from "../../../CoreComponents/ModalComponent.js";
import { TableComponent } from "../../../CoreComponents/TableComponent.js";
import { AdministracionMercancias, Articulos, ConvertirMedida, DetalleCompraProductos, TamanoxArticulo, Unidades } from "../../../Model/DatabaseModel.js";
import { ViewArticuloCompra } from "../../../Model/ViewDatabaseModel.js";
import { AjaxTools, Render } from "../../utility.js";
import { AgregarArticuloCompra } from "./AgregarArticuloCompra.js";

class AgregarDetalleCompra extends HTMLElement {
    constructor(action = () => { }) {
        super();
        this.Dataset = [];
        this.Dtemporal = [];
        this.datau = [];
        // this.dataT = [];
        this.dataC = [];
        // this.dataTxA = [];
        this.dataAdminMerca = [];
        this.action = action;
        this.DetalleCompra = {};
        this.DetalleCompra.Articulos = this.Dataset;
        //Convertidor de medidas
        this.DetalleCompra.Unidades = [];
        this.DetalleCompra.ConvertMedida = {};
        //TamanoxArticulo
        this.DetalleCompra.Tamanos = [];
        // this.DetalleCompra.TamanoxArt = {};
        //AdminMerca
        this.DetalleCompra.AdminMercanciaComp = {};


        this.Draw();
    }
    connectedCallback() { }
    Draw = async () => {
        this.datau = await AjaxTools.PostRequest("../api/MantenimientoCatalogos/GetUnidades")
        // this.dataT = await AjaxTools.PostRequest("../api/MantenimientoCatalogos/GetTamano")
        this.datab = await AjaxTools.PostRequest("../api/MantenimientoCatalogos/GetBodega")
        this.Form = new FormComponet({
            Model: new DetalleCompraProductos({
                TipoUnidad: {
                    type: "select",
                    Dataset: this.datau.map((d) => ({ id: d.idunidadmedida, desc: d.nombreunidad }))
                },
                Cantidad_unidades: {
                    type: "number",
                    Dataset: this.dataC.cantidad
                },
                // Tamano: {
                //     type: "select",
                //     Dataset: this.dataT.map((d) => ({ id: d.idtamano, desc: d.nombretamano }))
                // }
                // Cantidad_UnidadesxOrigen: {
                //     type: "number",
                // },
            }),

            EditObject: this.DetalleCompra
        })
        this.Form1 = new FormComponet({
            Model: new ConvertirMedida({}),

            EditObject: this.DetalleCompra.ConvertMedida
        })
        this.Form1 = new FormComponet({
            Model: new TamanoxArticulo({}),

            EditObject: this.DetalleCompra.TamanoxArt
        })

       
        this.FormAdminMerca = new FormComponet({
            Model: new AdministracionMercancias({
                idtamanoxarticulo: { type: "number", hidden: true },
                idconvertir: { type: "number", hidden: true },
                preciocompraunidad: { type: "number", hidden: true },
                precioventa: { type: "number" },
                existenciasarticuloorigen: { type: "number", hidden: true },
                UnidadxOrigen: { type: "number", hidden: true},
                existenciasarticulounidad: { type: "number", hidden: true },
                idbodega: {
                    type: "select",
                    Dataset: this.datab.map((d) => ({ id: d.idbodega, desc: d.nombrebodega }))
                },
            }),
           

            EditObject: this.DetalleCompra.AdminMercanciaComp
        }),
            this.Table = new TableComponent({
                ModelObject: new ViewArticuloCompra(),
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
        this.Table.filter.append(
            Render.Create({
                tagName: 'input', type: 'button',
                className: 'btn_primary', value: 'Anadir Articulo', onclick: async () => {
                    //code

                    const Modal = new ModalComponent

                        (new AgregarArticuloCompra((articulo) => {

                            if (this.Dataset.length > 0) {
                                alert("Ya existe el articulo")
                                return;
                            }
                            this.DetalleCompra.idarticulo = JSON.parse(JSON.stringify(articulo.idarticulo))
                            this.Dataset.push(articulo);
                            Modal.Close();
                            console.log(this.Dataset);
                            this.Table.DrawTableComponent();
                        }));
                    AppMain.append(Modal)
                }
            })
        )
        this.append(this.Form,
            
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

                            if (this.DetalleCompra.cantidadcompra == null ||

                                //  this.DetalleCompra.Cantidad_unidades == null ||
                                //  this.DetalleCompra.precioventa == null ||

                                
                                this.DetalleCompra.preciocompra == null) {
                            alert("Tiene que rellenar los campos")
                            console.log("pjo a esto");
                            return;

                        } else {
                            if (this.Dataset[0] == null) {
                                alert("Tiene que añadir el articulo que se comprará")
                                console.log("pjo a esto");
                                return;
                            }
                        }
                        //     } else {
                        //         if (this.DetalleVenta.cantidadventa > this.Dataset[0].existenciasarticulounidad ||
                        //             this.DetalleVenta.cantidadventa > this.Dataset[0].existenciasarticuloorigen) {
                        //             alert("La cantidad que vendes supera la cantidad del Stock Disponible")
                        //             console.log("excedistes");
                        //             return;
                        //         }
                        //     }

                        // }

                            // if ((this.DetalleCompra.preciocompra == null) || 
                            // (this.DetalleCompra.cantidadcompra == null) || 
                            // (this.DetalleCompra.descuentocompra == null) || 
                            // (this.DetalleCompra.Cantidad_unidades == null) || 
                            // (this.DetalleCompra.precioventa == null) ) 
                            // {  //COMPRUEBA CAMPOS VACIOS
                            //     alert("Los campos no pueden quedar vacios");
                            //     return;
                            // }

                            //Unidad
                            this.DetalleCompra.idunidadmedida = this.DetalleCompra.TipoUnidad;
                            this.DetalleCompra.ConvertMedida.idunidadmedida = this.datau.find((x) => x.idunidadmedida == this.DetalleCompra.TipoUnidad).idunidadmedida;

                            this.DetalleCompra.Unidades = [this.datau.find((x) => x.idunidadmedida == this.DetalleCompra.TipoUnidad)];
                            this.DetalleCompra.TipoUnidad = this.datau.find((x) => x.idunidadmedida == this.DetalleCompra.TipoUnidad).nombreunidad;
                            //ConvertirMedida
                            this.DetalleCompra.ConvertMedida.cantidad = this.DetalleCompra.Cantidad_unidades;
                            this.DetalleCompra.ConvertMedida.idarticulo = this.Dataset[0].idarticulo;
                            this.dataC = this.DetalleCompra.ConvertMedida
                            this.DetalleCompra.ConvertMedida = [this.dataC];
                            //Tamanos
                            this.DetalleCompra.idtamano = this.DetalleCompra.Tamano;
                            // this.DetalleCompra.TamanoxArt.idtamano = this.dataT.find((x) => x.idtamano == this.DetalleCompra.Tamano).idtamano;

                            // this.DetalleCompra.Tamanos = [this.dataT.find((x) => x.idtamano == this.DetalleCompra.Tamano)];
                            // this.DetalleCompra.Tamano = this.dataT.find((x) => x.idtamano == this.DetalleCompra.Tamano).nombretamano;
                            //TamanoXart
                            this.DetalleCompra.AdminMercanciaComp.idtamanoxarticulo = this.Dataset[0].idtamanoxarticulo;
                            // this.dataTxA = this.DetalleCompra.TamanoxArt
                            // this.DetalleCompra.TamanoxArt = [this.dataTxA]

                            //invenUnidadxOrigen

                            this.DetalleCompra.AdminMercanciaComp.UnidadxOrigen = this.DetalleCompra.Cantidad_unidades

                            this.DetalleCompra.AdminMercanciaComp.existenciasarticuloorigen = this.DetalleCompra.cantidadcompra
                            this.DetalleCompra.AdminMercanciaComp.existenciasarticulounidad = this.DetalleCompra.Cantidad_unidades * this.DetalleCompra.cantidadcompra 
                            this.DetalleCompra.AdminMercanciaComp.preciocompraunidad = this.DetalleCompra.preciocompra / this.DetalleCompra.Cantidad_unidades 
                            this.dataAdminMerca = this.DetalleCompra.AdminMercanciaComp
                            this.DetalleCompra.AdminMercanciaComp = [this.dataAdminMerca]

                            //
                            this.DetalleCompra.nombre = this.Dataset[0].nombrearticulo;
                            this.DetalleCompra.totaldetalle = this.DetalleCompra.cantidadcompra * this.DetalleCompra.preciocompra - this.DetalleCompra.descuentocompra;

                            console.log("INI")
                            console.log(this.DetalleCompra);

                            console.log("lll")
                            this.action(this.DetalleCompra, this.Dataset, console.log(this.DetalleCompra));


                            //console.log(this.DetalleCompra.IdArticulo = JSON.parse(JSON.stringify(articulo.IdArticulo)));
                        },
                    },
                ],
            })
        );
    };

}
customElements.define('w-agregardetallecomp', AgregarDetalleCompra);
export { AgregarDetalleCompra };