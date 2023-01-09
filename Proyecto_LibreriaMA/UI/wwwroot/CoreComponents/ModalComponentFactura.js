import {Render} from "../Modules/utility.js"


class ModalComponentventa extends HTMLElement {
    constructor (Componenta) {
        super();
        this.ModalContenta = Render.Create({
            className: "ModalContentventa", children: [
            this.ModalHeadera()
            ]

        });
        this.ModalContentComponenta = Render.Create({
            className: "ModalContentComponentaventa"
        });
        this.ModalContentComponenta.append(Componenta);
        this.ModalContenta.append(this.ModalContentComponenta);
        this.append(this.ModalContenta);
        
    }
    connectedCallback(){
        // this.style.opacity = 1
        // this.style.display = "block"
        
        setTimeout(()=>{
            this.style.opacity = 1
        },100);
    }
    ModalHeadera = () =>{
        return {
            class: "ModalHeaderaventa",
            children: [
            // {tagName: 'label',innerText:'!Su Compra se Realizo con exito!'},
             {tagName: 'input',type:'button',
             className: 'botonventa',value: 'Cerrar',
            onclick : ()=> {
                this.Close();
               // alert("¡Se ha realizado la compra!");
                //window.location = "./ViewVenta"
            }}

            ]
        }
    }
      Close = ()=>{
       this.style.opacity = 0
       setTimeout(()=>{
        this.remove()
       },1000);

      }
}
customElements.define('f-modalv',ModalComponentventa);
export {ModalComponentventa}