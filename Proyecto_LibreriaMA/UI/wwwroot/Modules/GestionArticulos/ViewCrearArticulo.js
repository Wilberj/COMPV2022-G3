import { FormComponet } from "../../CoreComponents/FormComponent.js";
import { ModalComponent } from "../../CoreComponents/ModalComponent.js";
import { TableComponent } from "../../CoreComponents/TableComponent.js";
import { Articulos, TamanoxArticulo } from "../../Model/DatabaseModel.js";
import { AjaxTools, Render } from "../utility.js";


class ViewCrearArticulo extends HTMLElement {
    constructor(action = () => { }) {
        super();
        this.Dataset = [];
        this.NuevoArticulo = {}
        this.Tamanox = {};
        this.TamanoxArt = [];
        this.NuevoArticulo.TamanoxArt = [this.Tamanox]

        this.dataC = []
        this.dataT = []
        this.dataM = []
        this.dataTM = []
        this.action = action;

        this.Draw();
    }
    connectedCallback() { }
    Draw = async () => {
        this.append(Render.Create({
            tagName: "h1",
            innerText: "Gestion de Articulos", class: "header1"
        })
        )

        this.append(Render.Create({
            class: "FormContainer2",
            children: [
                {
                    tagName: 'input', type: 'button',
                    className: 'button_topp',
                    value: 'Guardar', onclick: async () => {
                        if (this.NuevoArticulo.descripcionarticulo == null ||
                            this.NuevoArticulo.nombrearticulo == null ||
                            this.NuevoArticulo.color == null) {
                            alert("Falta rellenar campos")
                            console.log("pjo a esto");
                            return;
                        }
                        this.NuevoArticulo.idcategoria = this.NuevoArticulo.Categoria
                        this.NuevoArticulo.idmarca = this.NuevoArticulo.Marca
                        this.NuevoArticulo.idmaterial = this.NuevoArticulo.Tipo_Material
                        this.Tamanox.idtamano = this.NuevoArticulo.Tamano
                        console.log(this.NuevoArticulo)
                        console.log(this.Tamanox)

                        console.log(this.TamanoxArt)


                    

                        // if (AdminMercas[[0]] == null) {
                        //     alert("Debe tener un Detalle para guardar")
                        //     console.log("detalle eeehh");
                        //     return;
                        // }
                        
                        await AjaxTools.PostRequest("../api/AdminMercancia/SaveArticulos", this.NuevoArticulo)
                        this.action(this.NuevoArticulo, console.log(this.NuevoArticulo));

                    },
                },
            ]
        })
        );
        this.dataC = await AjaxTools.PostRequest("../api/MantenimientoCatalogos/GetCategoria")
        this.dataT = await AjaxTools.PostRequest("../api/MantenimientoCatalogos/GetTamano")
        this.dataM = await AjaxTools.PostRequest("../api/MantenimientoCatalogos/GetMarca")
        this.dataTM = await AjaxTools.PostRequest("../api/MantenimientoCatalogos/GetTipoMaterial")

        this.formArticulo = new FormComponet({
            Model: new Articulos({
                Tamano: {
                    type: "select",
                    Dataset: this.dataT.map((d) => ({ id: d.idtamano, desc: d.nombretamano }))
                },
                Categoria: {
                    type: "select",
                    Dataset: this.dataC.map((d) => ({ id: d.idcategoria, desc: d.nombrecategoria }))
                },
                Marca: {
                    type: "select",
                    Dataset: this.dataM.map((d) => ({ id: d.idmarca, desc: d.nombremarca }))
                },
                Tipo_Material: {
                    type: "select",
                    Dataset: this.dataTM.map((d) => ({ id: d.idmaterial, desc: d.nombrematerial}))
                },
            }
            ),
            EditObject: this.NuevoArticulo,
    
        })
        this.form = new FormComponet({
            Model: new TamanoxArticulo({ }),
            EditObject: this.Tamanox,
        })

        this.append(this.formArticulo);


    };

}
customElements.define('w-viewcrear', ViewCrearArticulo);
export { ViewCrearArticulo };