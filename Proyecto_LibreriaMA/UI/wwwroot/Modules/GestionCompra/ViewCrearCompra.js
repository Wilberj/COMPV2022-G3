import { FormComponet } from "../../CoreComponents/FormComponent.js";
import { ModalComponent } from "../../CoreComponents/ModalComponent.js";
import { TableComponentCompra } from "./Components/TableComponentCompra.js";
import { Articulos, CompraProductos, DetalleCompraProductos } from "../../Model/DatabaseModel.js";
import { ViewArticuloCompra } from "../../Model/ViewDatabaseModel.js";
import { AjaxTools, Render } from "../utility.js";
import { AgregarArticuloCompra } from "./Components/AgregarArticuloCompra.js";
import { AgregarDetalleCompra } from "./Components/AgregarDetalle.js";
import { TableComponent } from "../../CoreComponents/TableComponent.js";


window.onload = async () => {
    const DetalleCompra = []; 
    const NuevaCompra = {
        DetalleCompra: DetalleCompra
    }
    AppMain.append(Render.Create({
        tagName: "h1",
        innerText: "Gestion de compras-Ingreso", class: "header1"
    })
    );
    AppMain.append(Render.Create({
        class: "FormContainer2",
        children: [
            {
                tagName: 'input', type: 'button',
                className: 'btn',
                value: 'Guardar Compra', onclick: async () => {
                    const response =
                        await AjaxTools.PostRequest("../api/GestionCompra/SaveCompra",
                            NuevaCompra);
                    // (new AgregarArticuloCompra((articulos) => {

                    //     if (DetalleCompraProductos.filter(x => x.idarticulo == articulos.idarticulo).length > 0) {
                    //         alert("Ya existe el articulo")
                    //         return;
                    //     }
                    //     DetalleCompraProductos.push(articulos);
                    //     console.log(DetalleCompraProductos);
                    //     Modal.Close();
                    //     TableCompraArticulos.DrawTableComponent();
                    // }));
                    // console.log(NuevaCompra);
                    if (response == true) {
                        AppMain.append(
                            new ModalComponent(
                                Render.Create({
                                    tagName: "h1",
                                    innerText: "Compra Guardada",
                                }),

                                // window.location.reload()
                            )
                            
                        );
                       
                    }

                },
            },
        ]
    })
    );
    const data = await AjaxTools.PostRequest("../api/MantenimientoCatalogos/GetProveedor")
    const dataC = await AjaxTools.PostRequest("../api/MantenimientoCatalogos/GetDatosUsuarios")

    const FormCompraProductos = new FormComponet({
        EditObject: NuevaCompra,    
        Model: new CompraProductos({
            idproveedor: {
                type: "select",
                Dataset: data.map((d) => ({ id: d.idproveedor, desc: d.nombreproveedor }))
            },
            idusuario: {
                type: "select",
                Dataset: dataC.map((d) => ({ id: d.idusuario, desc: d.nombreusuario }))
            }
        })
    })
    AppMain.append(FormCompraProductos);

    //Articulos
    // const TableCompraArticulos = new TableComponentCompra({
    //     ModelObject: new Articulos(),
    //     Dataset: ArticulosComp, Functions: [
    //         {
    //             name: "Remover", action: async (articulos) => {
    //                 const articulosf = Articulos.find(x => x.idarticulo == articulos.idarticulo)
    //                 if (articulosf != null) {
    //                     Articulos.splice(Articulos.indexOf(articulosf), 1);
    //                     TableCompraArticulos.DrawTableComponent();
    //                 }
    //             }
    //         }
    //     ]
    // });

    // TableCompraArticulos.filter.append(
    //     Render.Create({
    //         tagName: 'input', type: 'button',
    //         className: 'btn_primary', value: 'Anadir', onclick: async () => {
    //             const Modal = new ModalComponent

    //                 (new AgregarArticuloCompra((Articulos) => {

    //                     if (Articulos.filter(x => x.idarticulo == Articulos.idarticulo).length > 0) {
    //                         alert("Ya existe el articulo")
    //                         return;
    //                     }
    //                     Articulos.push(Articulos);
    //                     console.log(Articulos);
    //                     Modal.Close();
    //                     TableCompraArticulos.DrawTableComponent();
    //                 }));
    //             AppMain.append(Modal)
    //         }
    //     })
    // )


    //Detalle
    const TableDetalleCompra = new TableComponent({
        ModelObject: new DetalleCompraProductos(),
        Dataset: DetalleCompra,
        Functions:[
            {
                name: "eliminar", action: async(detaeli)=>{
                    const detalleelimina = DetalleCompra.find(x=>x.idarticulo == detaeli.idarticulo )
                    if(detalleelimina != null){
                        DetalleCompra.splice(DetalleCompra.indexOf(detaeli),1);
                        TableDetalleCompra.DrawTableComponent();
                    }
                }
            }
        ]
    });

    TableDetalleCompra.filter.append(
        Render.Create({
            tagName: 'input', type: 'button',
            className: 'btn_primary', value: 'Anadir', onclick: async () => {
                const Modal = new ModalComponent

                    (new AgregarDetalleCompra((compra) => {

                        if (DetalleCompra.filter((x) => x.idarticulo == compra.idarticulo).length > 0) {
                            alert("El Detalle ya existe")
                            return;
                        }
                        
                        DetalleCompra.push(compra);
                        // ConvertirMedida.push(DetalleCompra.ConvertirMedida);
                        console.log(compra);
                        console.log(DetalleCompra);

                        Modal.Close();
                        TableDetalleCompra.DrawTableComponent();
                    }));
                AppMain.append(Modal)
            }
        })
    )   
    AppMain.append(Render.Create({
        tagName: "h3",
        innerText: "Agregar articulos a la compra", class: "header1"
    })
    );
    AppMain.append(TableDetalleCompra);
    //

}

