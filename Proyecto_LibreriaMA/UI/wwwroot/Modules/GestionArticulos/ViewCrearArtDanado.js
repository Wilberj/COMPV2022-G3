
import { FormComponet } from "../../CoreComponents/FormComponent.js";
import { ModalComponent } from "../../CoreComponents/ModalComponent.js";
import { Articulos, ArticulosDanados, CompraProductos, DetalleCompraProductos } from "../../Model/DatabaseModel.js";
import { AjaxTools, Render } from "../utility.js";
import { TableComponent } from "../../CoreComponents/TableComponent.js";
import {  ViewAdminMercancia, ViewArticulosDanados } from "../../Model/ViewDatabaseModel.js";
//import {agregarArtidañado} from "../GestionArticulos/AgregarArticulosDañados.js"
//import {AgregarArticuloCompra} from "../GestionCompra/Components/AgregarArticuloCompra.js"
import { AgregarArticulosDañados } from "./AgregarArticulosDañados.js";
import { AgregarAdminDetalleDevCompra } from "../GestionCompra/Components/AgregarAdminDetalleDevCompra.js";


window.onload = async () => {
    const AdminMercas = [];
    const Dataset = [];
    const ArticulosDana = [];
    //const AdminMercas = this.Dataset
    //const  ArtiAdminDanado = [];
   
    const NuevoArtiDana = {
        ArticulosDana: ArticulosDana,
        //AdminMercas: AdminMercas,
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
                  const response = await  AjaxTools.PostRequest("../api/GestionCompra/SaveArtidanado",NuevoArtiDana)
                  if (response == true) {
                    AppMain.append(
                        new ModalComponent(
                            Render.Create({
                                tagName: "h1",
                                innerText: "Guardado Correcto",
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
    
    // const formAmdinMercancia =  new FormComponet({
    //    // EditObject: ArtiAdminDanado,
    //     Model: new ArticulosDanados({
    //         idtamanoxarticulo: { type: "number",hidden: true },
    //         devolucionUnidad: { type: "checkbox", },

    //     }),
        
        
        
    // })
    const dataC = await AjaxTools.PostRequest("../api/MantenimientoCatalogos/GetDatosUsuarios")
    //const dataTM = await AjaxTools.PostRequest("../api/MantenimientoCatalogos/GetTamanoxArticulo")
  
    const formArtiDanado = new FormComponet({
    EditObject: NuevoArtiDana,
    Model : new ArticulosDanados({
        idusuario: {
            type: "select",
            Dataset: dataC.map((d) => ({ id: d.idusuario, desc: d.nombreusuario }))
        },
        idtamanoxarticulo: { type: "number",hidden : true },
        //idusuario: { type: "number" },
        devolucionUnidad: { type: "checkbox", },
        devolucionUnidadOrigen: {type: "checkbox",}
    },
   // ArticulosDana.idusuario = JSON.parse(JSON.stringify(danado.idusuario))
        )
        
})
const TableArticuloDanado = new TableComponent({
    ModelObject: new ViewAdminMercancia(),
    Dataset: Dataset,
    Functions: [
        {
            name: "Remover",
            action: async (Dato) => {
                const Datof = Dataset.find((x) => x.idarticulo == Dato.idarticulo);
                if (Datof != null) {
                    Dataset.splice(Dataset.indexOf(Datof), 1);
                    
                    TableArticuloDanado.DrawTableComponent();
                }
                //ArticulosDana.idusuario = JSON.parse(JSON.stringify(danado.idusuario))
            },
        },
    ],
    })
AppMain.append(formArtiDanado);
TableArticuloDanado.filter.append(Render.Create({
    tagName: 'input', type: 'button',
                className: 'btn_primary', value: 'Anadir', onclick: async () => {
                 
                    const Modal = new ModalComponent(
                        new AgregarAdminDetalleDevCompra((danado)=>{
                            // if (ArticulosDana.filter((x) => x.idarticulo == danado.idarticulo)) {
                            //     alert("El Dato ya se Agrego")
                            //     return;
                            // }
                          
                           
                            Dataset.push(danado);
                           console.log(NuevoArtiDana);
                            console.log(Dataset)
                            Modal.Close();
                            TableArticuloDanado.DrawTableComponent();
                            NuevoArtiDana.idtamanoxarticulo = Dataset[0].idtamanoxarticulo
                            NuevoArtiDana.idusuario = Dataset[0].idusuario

                            if (NuevoArtiDana.devolucionUnidad == true){
                                this.AdminMercas[0].existenciasarticulounidad = this.AdminMercas[0].existenciasarticulounidad - NuevoArtiDana.cantidaddanada;
                            }
                    })
                    )
                    AppMain.append(Modal)
                }
               
    }))
    
    AppMain.append(TableArticuloDanado);
}