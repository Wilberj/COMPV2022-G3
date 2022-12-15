import { FormComponet } from "../../CoreComponents/FormComponent.js";
import { ModalComponent } from "../../CoreComponents/ModalComponent.js";
import { TableComponent } from "../../CoreComponents/TableComponent.js";
import { AdministracionMercancias, } from "../../Model/DatabaseModel.js";
import { ViewAdminMercancia } from "../../Model/ViewDatabaseModel.js";
import { Render, AjaxTools } from "../utility.js";
import { Admin } from "./AdminMercanciaView.js";
import { Update } from "./Update.js";



class NewExistenciaBodega extends HTMLElement {
    constructor(action = () => { }) {
        super();
        this.Dataset = [];
        this.action = action;
        this.Bodega = [];

        this.Nuevoexisbodega = Admin

        this.Nuevoexisbodega.NuevaMercancia = {};
        this.Draw();

    }

    connectedCallback() { }
    Draw = async () => {
        this.Bodega = await AjaxTools.PostRequest("../api/MantenimientoCatalogos/GetBodega")

        this.FormexisBodega = new FormComponet({
            Model: new AdministracionMercancias({
                GuardarUnidadOrigen: { type: "checkbox" },
                GuardarUnidad: { type: "checkbox" },
                idtamanoxarticulo: { type: "number", hidden: true },
                idconvertir: { type: "number", hidden: true },
                preciocompraunidad: { type: "number", hidden: true },
                precioventa: { type: "number" },
                existenciasarticuloorigen: { type: "number" },
                existenciasarticulounidad: { type: "number" },
                Seleccionar_Bodega: {
                    type: "select",
                    Dataset: this.Bodega.map((d) => ({ id: d.idbodega, desc: d.nombrebodega }))
                },
            }),
            EditObject: this.Nuevoexisbodega
        }),
            //tabla que trae los datos de eexistencia
            // this.Table = new TableComponent({
            //     ModelObject: new ViewAdminMercancia(),
            //     Dataset: this.Dataset,
            // })
            // this.Table.filter.append(
            //     Render.Create({
            //         tagName: 'input', type: 'button',
            //     className: 'btn_primary', value: 'Anadir Nueva existencia',
            //      onclick: async () => {
            //         const Modal = new ModalComponent(
            //             new Update((articulo) =>{
            //                 if(this.Dataset.length > 0){

            //                     alert("Ya existe el Dato")
            //                     return;
            //                 }
            //                 this.Dataset.push(articulo)
            //                 Modal.Close();
            //                 this.Table.DrawTableComponent();
            //                 console.log(articulo);
            //             }));
            //             AppMain.append(Modal)

            //      }

            //     })
            //         //code
            // )

        this.Nuevoexisbodega.NuevaMercancia.idtamanoxarticulo = this.Nuevoexisbodega.idtamanoxarticulo
        this.Nuevoexisbodega.NuevaMercancia.idcompra = this.Nuevoexisbodega.idcompra
        this.Nuevoexisbodega.NuevaMercancia.idconvertir = this.Nuevoexisbodega.idconvertir
        this.Nuevoexisbodega.NuevaMercancia.preciocompraunidad = this.Nuevoexisbodega.preciocompraunidad
        this.Nuevoexisbodega.NuevaMercancia.idadmimercancias = undefined
        this.Nuevoexisbodega.NuevaMercancia.UnidadxOrigen = this.Nuevoexisbodega.UnidadxOrigen

        this.Nuevoexisbodega.temporal = this.Nuevoexisbodega.existenciasarticulounidad / this.Nuevoexisbodega.existenciasarticuloorigen;
        this.Nuevoexisbodega.existenciaorigentemporal = this.Nuevoexisbodega.existenciasarticuloorigen
        this.Nuevoexisbodega.existenciaunidadtemporal = this.Nuevoexisbodega.existenciasarticulounidad
        this.Nuevoexisbodega.precioventatemporal = this.Nuevoexisbodega.precioventa
        this.Nuevoexisbodega.existenciasarticulounidadtempotempo =  this.Nuevoexisbodega.existenciasarticulounidad 

        this.append(this.FormexisBodega);

        this.append(Render.Create({
            className: "FormContainer2",
            children: [{
                tagName: "input",
                type: "button",
                className: "btnagregar",
                value: "Guardar Cambios",
                onclick: async () => {

                    this.Nuevoexisbodega.idbodega = this.Nuevoexisbodega.Seleccionar_Bodega
                    this.Nuevoexisbodega.nombrebodega = this.Bodega[0].nombrebodega
                    this.Nuevoexisbodega.NuevaMercancia.idbodega = this.Nuevoexisbodega.idbodega
                    this.Nuevoexisbodega.NuevaMercancia.precioventa = this.Nuevoexisbodega.precioventa
                    this.Nuevoexisbodega.precioventa = this.Nuevoexisbodega.precioventatemporal

                    if (this.Nuevoexisbodega.GuardarUnidad == true) {
                        // this.Nuevoexisbodega.existenciaunidadtemporal = this.Nuevoexisbodega.existenciaunidadtemporal - this.Nuevoexisbodega.existenciasarticulounidad
                         this.Nuevoexisbodega.newexistenciaunidadtemporal = this.Nuevoexisbodega.existenciasarticulounidad
                         this.Nuevoexisbodega.NuevaMercancia.existenciasarticulounidad = this.Nuevoexisbodega.newexistenciaunidadtemporal
                        // this.Nuevoexisbodega.existenciasarticulounidad = this.Nuevoexisbodega.existenciaunidadtemporal
                        // this.Nuevoexisbodega.NuevaMercancia.existenciasarticuloorigen = this.Nuevoexisbodega.existenciaorigentemporal
                        if (this.Nuevoexisbodega.existenciasarticulounidad > this.Nuevoexisbodega.existenciasarticulounidadtempotempo) {
                            alert("La cantidad que vendes supera la cantidad del Stock Disponible")
                            console.log("excedistes");
                            return;
                        }
                        if ( this.Nuevoexisbodega.existenciasarticulounidad < this.Nuevoexisbodega.UnidadxOrigen) {
                            this.Nuevoexisbodega.NuevaMercancia.existenciasarticuloorigen = 0 
                        }
                        else
                        {
                            this.Nuevoexisbodega.variable = this.Nuevoexisbodega.existenciasarticuloorigen
                            this.Nuevoexisbodega.variable = parseInt(this.Nuevoexisbodega.existenciasarticulounidad / this.Nuevoexisbodega.UnidadxOrigen);
                            this.Nuevoexisbodega.NuevaMercancia.existenciasarticuloorigen  = this.Nuevoexisbodega.variable
                        }
                        // if (this.DetalleVenta.cantidadventa >= this.DetalleVenta.Temporal) {
                        //     this.Dataset[0].existenciasarticuloorigen = this.DetalleVenta.cantidadventa / this.DetalleVenta.Temporal
                        //     return;
                        //    }
                        this.Nuevoexisbodega.existenciaunidadtemporal = this.Nuevoexisbodega.existenciaunidadtemporal - this.Nuevoexisbodega.existenciasarticulounidad
                        
                        this.Nuevoexisbodega.variable = this.Nuevoexisbodega.existenciasarticuloorigen
                        this.Nuevoexisbodega.variable = parseInt(this.Nuevoexisbodega.existenciaunidadtemporal / this.Nuevoexisbodega.UnidadxOrigen);
                        this.Nuevoexisbodega.existenciasarticuloorigen = this.Nuevoexisbodega.variable

                        this.Nuevoexisbodega.existenciasarticulounidad = this.Nuevoexisbodega.existenciaunidadtemporal

                    }

                    if (this.Nuevoexisbodega.GuardarUnidadOrigen == true) {
                        this.Nuevoexisbodega.existenciaorigentemporal = this.Nuevoexisbodega.existenciaorigentemporal - this.Nuevoexisbodega.existenciasarticuloorigen
                        this.Nuevoexisbodega.newexistenciaorigentemporal = this.Nuevoexisbodega.existenciasarticuloorigen
                        this.Nuevoexisbodega.NuevaMercancia.existenciasarticuloorigen = this.Nuevoexisbodega.newexistenciaorigentemporal
                        this.Nuevoexisbodega.existenciasarticuloorigen = this.Nuevoexisbodega.existenciaorigentemporal
                        this.Nuevoexisbodega.NuevaMercancia.existenciasarticulounidad = this.Nuevoexisbodega.newexistenciaorigentemporal * this.Nuevoexisbodega.UnidadxOrigen
                        this.Nuevoexisbodega.existenciasarticulounidad = this.Nuevoexisbodega.existenciaunidadtemporal
                        this.Nuevoexisbodega.existenciasarticulounidad = this.Nuevoexisbodega.existenciasarticulounidad - this.Nuevoexisbodega.NuevaMercancia.existenciasarticulounidad
                    }
                    
                    const response = 
                        await AjaxTools.PostRequest("../api/AdminMercancia/UpdateAdministracionMercancias", this.Nuevoexisbodega,
                        await AjaxTools.PostRequest("../api/AdminMercancia/SaveAdministracionMercancias", this.Nuevoexisbodega.NuevaMercancia
                        ));
                    console.log(this.Nuevoexisbodega);
                    if (response == true) {
                        AppMain.append(
                            new ModalComponent(
                                Render.Create({
                                    tagName: "h1",
                                    innerText: " Guardado Completo",

                                }),
                                window.location.reload()
                            )
                            
                        );
                        
                    }


                    this.action(this.Nuevoexisbodega, this.Nuevoexisbodega.NuevaMercancia, console.log(this.Nuevoexisbodega))

                }

            }]

        }))
    }
}
customElements.define('w-nuevoeexis', NewExistenciaBodega)
export { NewExistenciaBodega };