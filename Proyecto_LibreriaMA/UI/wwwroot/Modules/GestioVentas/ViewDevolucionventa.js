import { FormComponet } from "../../CoreComponents/FormComponent.js";

import { ModalComponent } from "../../CoreComponents/ModalComponent.js";
import { DetalleDevolucionVenta, DetalleFactura, DevolucionVenta } from "../../Model/DatabaseModel.js";
import { AjaxTools, Render } from "../utility.js";
import { TableComponent } from "../../CoreComponents/TableComponent.js";
import { viewDetalleDevolucionVenta, viewdevolventa } from "../../Model/ViewDatabaseModel.js";
import { AgregarVentaDevolucion } from "./Components/AgregarVentaDevolucion.js";
import { Agregar } from "./ModalViewRefactura.js";

class IdentificadorFactura {
    id;
}
class FacturaDevolucion {
    id;
}

window.onload = async () => {
    // const Detalle = []
    const Datosprueba = []
    const Detalle = await AjaxTools.PostRequest("../api/GestionVenta/ChargeDetaDevVenta");

    const DetalleDevFactura = [];
    const DetalleFacturas = [];
    const Updateventa = [];//necesaria para actualziar admin
    const NewDevolucionVenta = {
        DetalleDevventas: DetalleDevFactura,
        DetalleFacturas: Datosprueba,
        Updateventa: Updateventa

    }
    AppMain.append(Render.Create({
        tagName: "h1",
        innerText: "Gestion devoluciones venta", class: "header1"
    })
    );
    AppMain.append(Render.Create({
        class: "FormContainer2",
        children: [
            {
                tagName: 'input', type: 'button',
                className: 'button_top',
                value: 'Continuar', onclick: async () => {
                    if (Datosprueba[0] == null) {
                        alert("Haga la seleccion de factura")
                        console.log("detalle ");
                        return;
                    } else {
                        if (Updateventa[0] == null) {
                            alert("Debe tener una factura")
                            console.log("detalle eeehh");
                            return;
                        }
                    }
                    const response = true
                            await AjaxTools.PostRequest("../api/GestionVenta/SaveDevolucionventa",
                               NewDevolucionVenta
                            );
                    if (response == true) {
                        console.log(NewDevolucionVenta);
                        AppMain.append(
                            new ModalComponent(
                                Render.Create({
                                    tagName: "h1",
                                    innerText: "Devolucion ",
                                    children: [
                                        {
                                            tagName: 'input', type: 'button',
                                            className: 'button_top',
                                            value: 'Refactura', onclick: async () => {

                                                const Modal = new ModalComponent

                                                    (new Agregar((articulo) => {
                                                        
                                                        console.log(articulo);
                                                        if (this.Dataset.length > 0) {
                                                            alert("Ya existe el articulo")
                                                            return;
                                                        }
                                                        // this.DetalleVenta.idarticulo = JSON.parse(JSON.stringify(articulo.idarticulo))
                                                        Modal.Close();
                                                        console.log("este es");
                                                        console.log(this.Dataset);
                                                    }));
                                                AppMain.append(Modal)
                                            }
                                        }
                                    ]
                                }),

                            )

                        );

                    }
                },
            },
        ]
    })
    );
    const FormDevolucionFactura = new FormComponet({
        EditObject: NewDevolucionVenta,
        Model: new DevolucionVenta({
            idfactura: { type: "number", hidden: true }
        }),
    });
    const Table = new TableComponent({
        //cambiar vista
        ModelObject: new viewdevolventa(),
        Dataset: Updateventa,

        Functions: [
            {
                name: "Remover",
                action: async (Dato) => {
                    const Datof = Updateventa.find((x) => x.idfactura == Dato.idfactura);
                    if (Datof != null) {
                        Updateventa.splice(Updateventa.indexOf(Datof), 1);
                        Table.DrawTableComponent();
                    }
                },
            },
        ],
    });
    Table.filter.append(Render.Create({
        tagName: 'input', type: 'button',
        className: 'btnagregar', value: 'Anadir ', onclick: async () => {

            const Modal = new ModalComponent

                (new AgregarVentaDevolucion((DetalleDev) => {
                    FacturaDevolucion = DetalleDev

                    if (Updateventa.length > 0) {
                        alert("Solo puede seleccionar una venta")
                        return;
                    }

                    console.log(DetalleDev);
                    Updateventa.push(DetalleDev);
                    //NewDevolucionVenta.idcompra = Updateventa[0].idcompra
                    //  Identificador.id = JSON.parse(JSON.stringify(DetalleDev.idcompra))
                    Modal.Close();

                    AppMain.append(Render.Create({ id: "TabContainer" }));

                    TabContainer.innerHTML = "";
                    const TableDetalle = new TableComponent({
                        ModelObject: new viewDetalleDevolucionVenta(),
                        Dataset: Detalle.filter((factura) => {
                            factura.activo = false
                            if (factura.idfactura == DetalleDev.idfactura) {
                                console.log(factura);

                                Datosprueba.push(factura)
                                console.log(Datosprueba);
                                console.log(Datosprueba);
                            }
                            return factura.idfactura == DetalleDev.idfactura
                        }),
                        Functions: [
                            {
                                name: "Remover",
                                action: async (Dato) => {
                                    console.log(Dato);
                                    const Datof = Datosprueba.find((x) => x.iddetallefactura == Dato.iddetallefactura);
                                    if (Datof != null) {
                                        Datosprueba.splice(Datosprueba.indexOf(Datof), 1);
                                        TableDetalle.DrawTableComponent(Datosprueba);
                                    }
                                },
                            },
                        ]

                    });
                    console.log(Detalle);

                    TabContainer.append(TableDetalle)
                    console.log(Updateventa);
                    Table.DrawTableComponent();
                    NewDevolucionVenta.idfactura = Updateventa[0].idfactura
                    IdentificadorFactura.id = JSON.parse(JSON.stringify(DetalleDev.idfactura))
                    console.log("lololololololo");
                    console.log(FacturaDevolucion);


                    console.log(IdentificadorFactura.id);
                    console.log(DetalleDev);

                }))

            AppMain.append(Modal)

        }

    }
    )
    )
    AppMain.append(FormDevolucionFactura, Table,)


    //  const TableDetalleDevFactura = new TableComponent({
    //      ModelObject: new DetalleDevolucionVenta(),
    //      Dataset: DetalleDevventa,
    //      Functions: [
    //          {
    //              name: "eliminar", action: async (detaeli) => {
    //                  const detalleelimina = DetalleDevventa.find(x => x.idarticulo == detaeli.idarticulo)
    //                  if (detalleelimina != null) {
    //                      DetalleDevventa.splice(DetalleDevventa.indexOf(detaeli), 1);
    //                      TableDetalleDevFactura.DrawTableComponent();
    //                  }
    //              }
    //          }
    //      ]

    //  });
    //  TableDetalleDevFactura.filter.append(Render.Create({
    //      tagName: 'input', type: 'button',
    //      className: 'btn_primary', value: 'Anadir detalle', onclick: async () => {
    //          if (Updateventa[0] == null) {
    //              alert("Debe tener una factura")
    //              console.log("detalle eeehh");
    //              return;
    //          }
    //          const Modal = new ModalComponent
    //              (new AgregarFacturaDevolucion((venta) => {
    //                  if (DetalleDevFactura.filter((x) => x.idadmimercancias == compra.idadmimercancias).length > 0) {
    //                      alert("El Detalle ya existes")
    //                      return;
    //                  }
    //                  DetalleDevFactura.push(venta);
    //                  console.log(venta);
    //                  console.log(DetalleDevFactura);
    //                  Dataset.activo = DetalleDevFactura[0].activo
    //                  Dataset.iddetallefactura = DetalleDevFactura[0].iddetallefactura
    //                  DetalleFacturas.push(Dataset);

    //                  console.log(Dataset);
    //                  Modal.Close();
    //                  TableDetalleDevFactura.DrawTableComponent();



    //              }))
    //          AppMain.append(Modal)

    //      }
    //  }))
    AppMain.append(Render.Create({
        tagName: "h3",
        innerText: "Agregar detalles", class: "header1"
    })
    );
    //  AppMain.append(TableDetalleDevFactura);

}
export { IdentificadorFactura, FacturaDevolucion }