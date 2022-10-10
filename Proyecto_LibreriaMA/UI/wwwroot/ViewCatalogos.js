import { FormComponet } from "./CoreComponents/FormComponent.js";
import { ModalComponent } from "./CoreComponents/ModalComponent.js";
import { TableComponent } from "./CoreComponents/TableComponent.js";
import { Articulos, Bodega, Categoria, CompraProductos, ConvertirMedida, DatosUsuarios, Marca, Proveedor, Tamano, TamanoxArticulo, TipoMaterial, Unidades } from "./Model/DatabaseModel.js";
import { AjaxTools, Render } from "./Modules/utility.js";

window.onload = async () => {
    AppMain.append(Render.Create({ tagName: "h1", innerText: "Mantenimiento de catalogos", class: "header1" }));
    AppMain.append(Render.Create({
        tagName: "nav", class: "TabMenu", children: [
            {
                tagName: 'label', innerText: 'Categorias', onclick: async () => {
                    const data = await AjaxTools.PostRequest("api/MantenimientoCatalogos/GetCategoria")

                    const Model = new Categoria()
                    ChargeCatalogo(Model)
                }
            },
            // {
            //     tagName: 'label', innerText: 'Compra', onclick: async () => {
            //         const data = await AjaxTools.PostRequest("api/MantenimientoCatalogos/GetCompraProductos")
            //         const Model = new CompraProductos()
            //         ChargeCatalogo(Model)
            //     }
            // },
            {
                tagName: 'label', innerText: 'Datos Usuarios', onclick: async () => {
                    const data = await AjaxTools.PostRequest("api/MantenimientoCatalogos/GetDatosUsuarios")

                    const Model = new DatosUsuarios({
                        email: {
                            type: "EMAIL"
                        }
                    })
                    ChargeCatalogo(Model)
                }
            }, 
             {
                tagName: 'label', innerText: 'Proveedor', onclick: async () => {
                    const data = await AjaxTools.PostRequest("api/MantenimientoCatalogos/GetProveedor")

                    const Model = new Proveedor ({
                    
                    })
                    ChargeCatalogo(Model)
                }
            },
            // {
            //     tagName: 'label', innerText: 'Proveedores', onclick: async () => {
            //         const data = await AjaxTools.PostRequest("api/MantenimientoCatalogos/GetProveedor")

            //         const Model = new Proveedor()
            //         ChargeCatalogo(Model)
            //     }
            // },
            {
                tagName: 'label', innerText: 'Bodega', onclick: async () => {
                    const data = await AjaxTools.PostRequest("api/MantenimientoCatalogos/GetBodega")
                   // const dataA = await AjaxTools.PostRequest("api/MantenimientoCatalogos/GetTamanoxArticulo")

                    const Model = new Bodega({
                    })
                    ChargeCatalogo(Model)

                }
            },
            {
                tagName: 'label', innerText: 'Marca', onclick: async () => {
                    const data = await AjaxTools.PostRequest("api/MantenimientoCatalogos/GetMarca")

                    const Model = new Marca()
                    ChargeCatalogo(Model)
                }
            },
            {
                tagName: 'label', innerText: 'TipoMaterial', onclick: async () => {
                    const data = await AjaxTools.PostRequest("api/MantenimientoCatalogos/GetTipoMaterial")

                    const Model = new TipoMaterial()
                    ChargeCatalogo(Model)
                }
            },
            {
                tagName: 'label', innerText: 'Articulos', onclick: async () => {
                    const data = await AjaxTools.PostRequest("api/MantenimientoCatalogos/GetArticulos")
                    const dataC = await AjaxTools.PostRequest("api/MantenimientoCatalogos/GetCategoria")
                    const dataM = await AjaxTools.PostRequest("api/MantenimientoCatalogos/GetMarca")
                    const dataTM = await AjaxTools.PostRequest("api/MantenimientoCatalogos/GetTipoMaterial")

                    const Model = new Articulos({
                        idcategoria: {
                            type: "select",
                            Dataset: dataC.map((d) => ({ id: d.idcategoria, desc: d.nombrecategoria }))
                        },
                        idmarca: {
                            type: "select",
                            Dataset: dataM.map((d) => ({ id: d.idmarca, desc: d.nombremarca }))
                        },
                        idmaterial: {
                            type: "select",
                            Dataset: dataTM.map((d) => ({ id: d.idmaterial, desc: d.nombrematerial}))
                        }
                    })
                    ChargeCatalogo(Model)
                }
            },
            {
                tagName: 'label', innerText: 'Tamano', onclick: async () => {

                    const Model = new Tamano()
                    ChargeCatalogo(Model)
                }
            },
            // {
            //     tagName: 'label', innerText: 'Tamano Articulos', onclick: async () => {
            //         const data = await AjaxTools.PostRequest("api/MantenimientoCatalogos/GetArticulos")
            //         const dataT = await AjaxTools.PostRequest("api/MantenimientoCatalogos/GetTamano")

            //         const Model = new TamanoxArticulo({

            //             idtamano: {
            //                 type: "select",
            //                 Dataset: dataT.map((d) => ({ id: d.idtamano, desc: d.nombretamano }))
            //             },
            //             idarticulo: {
            //                 type: "select",
            //                 Dataset: data.map((d) => ({ id: d.idarticulo, desc: d.nombrearticulo }))
            //             }
            //         })
            //         ChargeCatalogo(Model)
            //     }
            // },
            {
                tagName: 'label', innerText: 'Unidades', onclick: async () => {

                    const Model = new Unidades()
                    ChargeCatalogo(Model)
                }
            },
            // {
            //     tagName: 'label', innerText: 'BodegaxArticulo', onclick: async () => {

            //         const Model = new BodegaxArticulo()
            //         ChargeCatalogo(Model)
            //     }
            // },
            // {
            //     tagName: 'label', innerText: 'Convertidor de unidades', onclick: async () => {
            //         const data = await AjaxTools.PostRequest("api/MantenimientoCatalogos/GetArticulos")
            //         const dataU = await AjaxTools.PostRequest("api/MantenimientoCatalogos/GetUnidades")

            //         const Model = new ConvertirMedida({

            //             idunidadmedida: {
            //                 type: "select",
            //                 Dataset: dataU.map((d) => ({ id: d.idunidadmedida, desc: d.nombreunidad }))
            //             },
            //             idarticulo: {
            //                 type: "select",
            //                 Dataset: data.map((d) => ({ id: d.idarticulo, desc: d.nombrearticulo }))
            //             }
            //         })
            //         ChargeCatalogo(Model)
            //     }
            // },
        ]
    }));
    AppMain.append(Render.Create({ id: "TabContainer" }));
}

const FormOptions = (form, table, action = "Save", Modal) => {
    return Render.Create({
        class: "FormContainer2",
        children: [
            {
                tagName: 'input', type: 'button',
                className: 'btn',
                value: 'Guardar', onclick: async () => {
                    console.log(form.FormObject);
                    const data = await AjaxTools.PostRequest(
                        "api/MantenimientoCatalogos/" +
                        action +
                        form.Model.constructor.name,
                        form.FormObject
                    );
                    if (data) {
                        if (action == "Save") {
                            table.config.Dataset.push(data)
                        }
                        Modal.Close();
                        table.DrawTableComponent();
                    } else {
                        alert("Error")
                    }

                }
            }
        ]
    })
}

function ChargeForm(Dato, table, action, Model) {
    const form = new FormComponet({
        EditObject: Dato,
        Model: Model
    });
    const formContainer = Render.Create({});
    const Modal = new ModalComponent(formContainer);
    formContainer.append(form, FormOptions(form, table, action, Modal));
    TabContainer.append(Modal);
}

async function ChargeCatalogo(Model) {
    TabContainer.innerHTML = "";
    const data = await AjaxTools.PostRequest("api/MantenimientoCatalogos/Get" + Model.constructor.name)

    // const header = document.createElement("h1");
    // header.innerText = "START"
    // header.className = "header1"
    const table = new TableComponent({
        Dataset: data, Functions: [
            {
                name: "Edit", action: async (Dato) => {
                    ChargeForm(Dato, table, "Update", Model);
                }
            }
        ]
    })
    const NewBtn = {
        tagName: "input",
        type: 'button', className: 'btn',
        value: 'Nuevo registro', onclick: async () => {
            ChargeForm({}, table, "Save", Model);
        }
    }
    TabContainer.append(Render.Create({ className: "FormContainer2", children: [NewBtn] }));
    TabContainer.append(table);
}
