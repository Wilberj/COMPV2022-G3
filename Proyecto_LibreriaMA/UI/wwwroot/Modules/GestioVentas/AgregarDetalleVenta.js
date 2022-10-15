import { FormComponet } from "../../CoreComponents/FormComponent.js";
import { ModalComponent } from "../../CoreComponents/ModalComponent.js";
import { TableComponent } from "../../CoreComponents/TableComponent.js";
import { AdministracionMercancias, Articulos, ConvertirMedida, DetalleCompraProductos, TamanoxArticulo, Unidades } from "../../../Model/DatabaseModel.js";
import { ViewArticuloCompra } from "../../../Model/ViewDatabaseModel.js";
import { AjaxTools, Render } from "../utility.js";
import { DetalleFactura } from "../../Model/DatabaseModel.js";
import { ViewAdminMercancia } from "../../Model/ViewDatabaseModel.js";
import { AgregarArticuloCompra } from "../GestionCompra/Components/AgregarArticuloCompra.js";
//import { AgregarArticuloCompra } from "./AgregarArticuloCompra.js";

class AgregarDetalleVenta extends HTMLElement {
    constructor(action = () => { }){
        super();
        this.Dataset =[];
        this.action = action;
        this.DetalleVenta = {};

        this.Draw();

    }

    connectedCallback() { }
    Draw = async () => {
        this.Form = new FormComponet({
            //aqui oculrar el tamanoxarticulo y el idfactura lo podes traer en una nueva vista
            //y referenciarlo como se ha hecho anteriormente
            Model: new DetalleFactura({

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
            className: 'btn_primary', value: 'Anadir Articulo', onclick: async () => {
                const Modal =new ModalComponent
                ///otra vista nueva de sql podrias hacer,dependiendo de los datos de la tabla
                //y lo que se necesite para visualizar mejor las cosas
                (new AgregarArticuloCompra((articulo)=>{
                    if (this.Dataset.length > 0) {
                        alert("Ya existe el articulo")
                        return;
                    }
                    this.Dataset.push(articulo);
                    Modal.Close();
                    this.Table.DrawTableComponent();
                })

                )
                AppMain.append(Modal);
            }

        }))
        this.append(this.Form,this.Table);
        this.append(Render.Create({
            className: "FormContainer2",
            children: [
                {
                    tagName: "input",
                    type: "button",
                    className: "btn_primary",
                    value: "Agregar Informacion Al Detalle",
                    onclick: async () => {

                        this.action(this.DetalleVenta, this.Dataset);
                    }
                }
                
            ]
        }))
        

        

    }
}
customElements.define('w-agregardetalleven', AgregarDetalleVenta)
export {AgregarDetalleVenta};