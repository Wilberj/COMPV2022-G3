import { FormComponet } from "../../CoreComponents/FormComponent.js";
import { ModalComponent } from "../../CoreComponents/ModalComponent.js";
import { AjaxTools, Render } from "../utility.js";
import { TableComponent } from "../../CoreComponents/TableComponent.js";
import { Articulos, TamanoxArticulo } from "../../Model/DatabaseModel.js";

window.onload = async () => {
    const Tamanox = {}

    const TamanoxArt = []
    const Dataset = []

    const NuevoArticulo = {
        TamanoxArt: TamanoxArt

    }

    AppMain.append(Render.Create({
        tagName: "h1",
        innerText: "Gestion de Articulos", class: "header1"
    })
    );
    AppMain.append(Render.Create({
        class: "FormContainer2",
        children: [
            {
                tagName: 'input', type: 'button',
                className: 'btn',
                value: 'Guardar', onclick: async () => {
                    console.log(NuevoArticulo)
                    console.log(Tamanox)


                    NuevoArticulo.idcategoria = NuevoArticulo.Categoria 
                    NuevoArticulo.idmarca = NuevoArticulo.Marca  
                    NuevoArticulo.idmaterial = NuevoArticulo.Tipo_Material 
                    Tamanox.idtamano = NuevoArticulo.Tamano 
                    TamanoxArt.push(Tamanox);

                    // if (AdminMercas[[0]] == null) {
                    //     alert("Debe tener un Detalle para guardar")
                    //     console.log("detalle eeehh");
                    //     return;
                    // }

                       const response = 
                       await AjaxTools.PostRequest("../api/AdminMercancia/SaveArticulos", NuevoArticulo)
                       if (response == true) {
                           AppMain.append(
                               new ModalComponent(
                                   Render.Create({
                                       tagName: "h1",
                                       innerText: "Guardado Correcto",
                                   }),
                                   console.log(NuevoArticulo)
                    // // //             // window.location.reload()
                               )

                       );

                       }
                },
            },
        ]
    })
    );
    const dataC = await AjaxTools.PostRequest("../api/MantenimientoCatalogos/GetCategoria")
    const dataT = await AjaxTools.PostRequest("../api/MantenimientoCatalogos/GetTamano")
    const dataM = await AjaxTools.PostRequest("../api/MantenimientoCatalogos/GetMarca")
    const dataTM = await AjaxTools.PostRequest("../api/MantenimientoCatalogos/GetTipoMaterial")

    const formArticulo = new FormComponet({
        Model: new Articulos({
            Tamano: {
                type: "select",
                Dataset: dataT.map((d) => ({ id: d.idtamano, desc: d.nombretamano }))
            },
            Categoria: {
                type: "select",
                Dataset: dataC.map((d) => ({ id: d.idcategoria, desc: d.nombrecategoria }))
            },
            Marca: {
                type: "select",
                Dataset: dataM.map((d) => ({ id: d.idmarca, desc: d.nombremarca }))
            },
            Tipo_Material: {
                type: "select",
                Dataset: dataTM.map((d) => ({ id: d.idmaterial, desc: d.nombrematerial}))
            },
        }
        ),
        EditObject: NuevoArticulo,

    })
    const form = new FormComponet({
        Model: new TamanoxArticulo({ }),
        EditObject: Tamanox,
    })
    const TableArticuloDanado = new TableComponent({
        ModelObject: new Articulos(),
        Dataset: Dataset,
        Functions: [
            // {
            //     name: "Remover",
            //     action: async (Dato) => {
            //         const Datof = TamanoxArt.find((x) => x.idarticulo == Dato.idarticulo);
            //         if (Datof != null) {
            //             TamanoxArt.splice(TamanoxArt.indexOf(Datof), 1);

            //             TableArticuloDanado.DrawTableComponent();
            //         }
            //     },
            // },
        ],
    })
    AppMain.append(formArticulo);
    // TableArticuloDanado.filter.append(Render.Create({

    //     tagName: 'input', type: 'button',
    //     className: 'btn_primary', value: 'Anadir', onclick: async () => {
            
    //         const Modal = new ModalComponent(
    //             new AgregarDetalleArtDanados((danado) => {

    //                 AdminMercas.push(danado);
    //                 Modal.Close();
    //                 console.log(AdminMercas);

    //                 TableArticuloDanado.DrawTableComponent();
    //                 NuevoArtiDana.idtamanoxarticulo = AdminMercas[0].idtamanoxarticulo
    //                 NuevoArtiDana.idadmimercancias = AdminMercas[0].idadmimercancias 
    //                 AdminMercas[0].idusuario = NuevoArtiDana.idusuario

    //                 NuevoArtiDana.descripcionarticulodanado = AdminMercas[0].descripcionarticulodanado;
    //                 NuevoArtiDana.cantidaddanadaorigen = AdminMercas[0].cantidaddanadaorigen
    //                 NuevoArtiDana.cantidaddanadaunidad = AdminMercas[0].cantidaddanadaunidad

    //                 console.log(NuevoArtiDana);
    //                 console.log(AdminMercas);
    //             })
    //         )
    //         AppMain.append(Modal)
    //     }

    // }))

    AppMain.append(TableArticuloDanado);
}