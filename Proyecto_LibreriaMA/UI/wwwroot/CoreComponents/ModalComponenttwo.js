import {Render} from "../Modules/utility.js"


class ModalComponentFactura extends HTMLElement {
    constructor (Componenta) {
        super();
        this.ModalContenta = Render.Create({
            className: "ModalContenta", children: [
            this.ModalHeadera()
            ]

        });
        this.ModalContentComponenta = Render.Create({
            className: "ModalContentComponenta"
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
            class: "ModalHeadera",
            children: [
            // {tagName: 'label',innerText:'!Su Compra se Realizo con exito!'},
             {tagName: 'input',type:'button',
             className: 'botoncito',value: 'Cerrar',
            onclick : ()=> {
                this.Close();
                window.location = "./Compra"
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
customElements.define('f-modal',ModalComponentFactura);
export {ModalComponentFactura}