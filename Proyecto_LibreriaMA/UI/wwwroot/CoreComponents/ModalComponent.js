import { Render } from "../Modules/utility.js";

class ModalComponent extends HTMLElement {
    constructor(Component) {
        super();
        this.ModalContent = Render.Create({
            className: "ModalContent", children: [
                this.ModalHeader()
            ]
        });
        this.ModalContentComponent = Render.Create({
            className: "ModalContentComponent"
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
            class: "ModalHeader",
            children: [
                { tagName: 'label', innerText: 'Modal' },
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
customElements.define('w-modal', ModalComponent);
export { ModalComponent }