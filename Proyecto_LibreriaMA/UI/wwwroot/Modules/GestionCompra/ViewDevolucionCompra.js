import { FormComponet } from "../../CoreComponents/FormComponent.js";
import { ModalComponent } from "../../CoreComponents/ModalComponent.js";
import { TableComponentCompra } from "./Components/TableComponentCompra.js";
import { Articulos, CompraProductos, DetalleCompraProductos, DetalleDevolucionCompra, DevolucionCompra } from "../../Model/DatabaseModel.js";
import { AjaxTools, Render } from "../utility.js";
import { AgregarArticuloCompra } from "./Components/AgregarArticuloCompra.js";
import { AgregarDetalleCompra } from "./Components/AgregarDetalle.js";
import { TableComponent } from "../../CoreComponents/TableComponent.js";
import { AgregarCompraDevolucion } from "./Components/AgregarCompraDevolucion.js";
import { AgregarDetallDevolucion } from "./Components/AgregarDetalleDevolucion.js";
import { ViewAdminMercancia, ViewArticuloCompra } from "../../Model/ViewDatabaseModel.js";
import { AgregarAdminDetalleDevCompra } from "./Components/AgregarAdminDetalleDevCompra.js";

class Identificador {
    id;
}

window.onload = async () => {
    const Dataset = [];
    const DetalleDevolucion = [];

    const UpdateCompra = [];
    const AdminMerca = [];

    const NewDevolucionCompra = {
        UpdateCompra: UpdateCompra,
        DetalleDevolucion: DetalleDevolucion,
        UpdateDetalleCompra: UpdateCompra,
        AdminMerca: UpdateCompra,
    }
    AppMain.append(Render.Create({
        tagName: "h1",
        innerText: "Gestion devoluciones compra", class: "header1"
    })
    );
    AppMain.append(Render.Create({
        class: "FormContainer2",
        children: [
            {
                tagName: 'input', type: 'button',
                className: 'button_topp',
                value: 'Guardar registro', onclick: async () => {

                    if(DetalleDevolucion[0] == null){
                        alert("Debe tener un Detalle Devolucion")
                        console.log("detalle eeehh");
                        return;
                       }else{
                        if(UpdateCompra[0] == null){
                            alert("Debe tener una compra")
                            console.log("detalle eeehh");
                            return;
                        }
                       }

                    const response =
                        await AjaxTools.PostRequest("../api/GestionCompra/SaveDevolucionCompra",
                            NewDevolucionCompra);
                    console.log(NewDevolucionCompra);
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
                                    innerText: "Devolucion Completada",
                                }),
                                console.log(NewDevolucionCompra)
                                // window.location.reload()
                            )

                        );

                    }

                },
            },
        ]
    })
    );
    const FormDevolucionCompra = new FormComponet({
        EditObject: NewDevolucionCompra,
        Model: new DevolucionCompra({
            idcompra: { type: "number", hidden: true },
            idproveedor: { type: "number", hidden: true },
            idadmimercancias: { type: "number", hidden: true }

        })
    })
    const Table = new TableComponent({
        ModelObject: new ViewArticuloCompra(),
        Dataset: UpdateCompra,

        Functions: [
            {
                name: "Remover",
                action: async (Dato) => {
                    const Datof = UpdateCompra.find((x) => x.idproveedor == Dato.idproveedor);
                    if (Datof != null) {
                        UpdateCompra.splice(UpdateCompra.indexOf(Datof), 1);
                        Table.DrawTableComponent();
                    }
                },
            },
        ],
    });
    Table.filter.append(
        Render.Create({
            tagName: 'input', type: 'button',
            className: 'btnagregar', value: 'Anadir ', onclick: async () => {
                //code
                
                const Modal = new ModalComponent
                    (new AgregarCompraDevolucion((DetalleDev) => {

                        if (UpdateCompra.length > 0) {
                            alert("Solo puede seleccionar una compra")
                            return;
                        }
                        UpdateCompra.push(DetalleDev);

                        Modal.Close();
                        // console.log(NewDevolucionCompra);
                        Table.DrawTableComponent();

                        NewDevolucionCompra.idcompra = UpdateCompra[0].idcompra
                        console.log(DetalleDev);
                        Identificador.id = JSON.parse(JSON.stringify(DetalleDev.idcompra))
                        console.log(Identificador.id);

                        NewDevolucionCompra.idproveedor = UpdateCompra[0].idproveedor

                        console.log("Dataset");

                        console.log(UpdateCompra);

                    }));

                AppMain.append(Modal)


            }
        })
    )
    AppMain.append(FormDevolucionCompra, Table);

    const TableDetalleDevCompra = new TableComponent({
        ModelObject: new ViewAdminMercancia(),
        Dataset: DetalleDevolucion,
         Functions: [
             {
                  name: "Remover",
                  action: async (Dato) => {
                      const Datof = Dataset.find((x) => x.idadmimercancias == Dato.idadmimercancias);
                     if (Datof != null) {
                          Dataset.splice(Dataset.indexOf(Datof), 1);
                          Table.DrawTableComponent();
                      }
                  },
             },
         ],
    });

     TableDetalleDevCompra.filter.append(
         Render.Create({
             tagName: 'input', type: 'button',
             className: 'btnagregar', value: 'Anadir detalle', onclick: async () => {

                 if(UpdateCompra[0] == null){
                     alert("Primero se debe seleccionar una compra")
                     return;
                 }
                 console.log("llllll");
                 console.log(DetalleDevolucion);
                  const Modal = new ModalComponent
                  (new AgregarAdminDetalleDevCompra((Detalledev) => {
                    const tempo = Detalledev

                    console.log(tempo);
                    DetalleDevolucion.push(Detalledev);

                    // DetalleDevCompra === tempo ;


                      Modal.Close();
                      // console.log(NewDevolucionCompra);
                      NewDevolucionCompra.idadmimercancias = DetalleDevolucion[0].idadmimercancias

                      TableDetalleDevCompra.DrawTableComponent();
                   
                      console.log(NewDevolucionCompra);


                      console.log("Dataset");

                      console.log(DetalleDevolucion);

                  }));

              AppMain.append(Modal)
             }
         })
     )
     AppMain.append(Render.Create({
         tagName: "h3",
         innerText: "Agregar detalles", class: "header1"
     })
     );
     AppMain.append(TableDetalleDevCompra);
}

export { Identificador }