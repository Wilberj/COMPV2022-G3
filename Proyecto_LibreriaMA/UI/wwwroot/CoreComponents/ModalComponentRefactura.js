import { Render } from "../Modules/utility.js";

class ModalComponentrefact extends HTMLElement {
    constructor(Component) {
        super();
        this.ModalContent = Render.Create({
            className: "ModalContentrefact", children: [
                this.ModalHeader()
            ]
        });
        this.ModalContentComponent = Render.Create({
            className: "ModalContentComponentrefact"
        });

        this.ModalContentComponent.append(Component);
        this.ModalContent.append(this.ModalContentComponent);
        this.append(this.ModalContent);
    }

    connectedCallback() {
        setTimeout(() => {
            this.style.opacity = 1
        }, 100);
    }

    ModalHeader = () => {
        return {
            class: "ModalHeaderrefact",
            children: [
                { tagName: 'label'},
                {
                    tagName: 'input', type: 'button',
                    className: 'btn_secundary', value: 'X',
                    onclick:() => {
                        this.Close();
                       // window.location.reload()
                    }
                }
            ]
        }
    }
    Close = () => {
        this.style.opacity = 0
        setTimeout(() => {
            this.remove()
        }, 1000);
    }
}
customElements.define('w-modalrefact', ModalComponentrefact);
export { ModalComponentrefact }