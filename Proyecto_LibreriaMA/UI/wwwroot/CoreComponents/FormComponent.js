import { Render } from "../Modules/utility.js";

class FormComponet extends HTMLElement {
    constructor(config = { EditObject: {}, Model: {} }) {
        super();
        this.config = config;
        this.Model = config.Model ?? config.EditObject;
        this.FormObject = config.EditObject ?? {};
        this.FormContainer = Render.Create({ class: "FormContainer2" });
        this.append(this.FormContainer);
        this.DrawFormComponet(this.FormObject);
    }
    connectedCallback() { }
    DrawFormComponet = async (ObjectF = {}) => {
        for (const prop in this.Model) {
            if (!ObjectF[prop]) {
                ObjectF[prop] = undefined;
            }
            if (this.Model[prop] != null &&
                (this.Model[prop].hidden || this.Model[prop].primary)) {
                continue;
            }
            const ControlContainer = Render.Create({
                class: "FormElement", children: [{
                    tagName: "label", class: "inputTitle",
                    innerText: prop
                }]
            });
            let val = ObjectF[prop] == undefined || ObjectF[prop] == null ?
                "" : ObjectF[prop];
            let InputControl = Render.Create({
                tagName: "input", className: "text",
                value: val, type: "text"
            });
            if (this.Model[prop] != null
                && this.Model[prop].__proto__ == Object.prototype) {
                InputControl = this.DefineInputType(prop, val, ObjectF, InputControl);
            }
            InputControl.id = "ControlValue" + prop;
            InputControl.onchange = async (ev) => {
                ObjectF[prop] = ev.target.value;
                if (ev.target.type == "checkbox") {
                    ObjectF[prop] = ev.target.checked;
                }
                if (ev.target.pattern) {
                    let regex = new RegExp(ev.target.pattern);
                    if (regex.test(ObjectF[prop])) {
                        const tool = ev.target.parentNode.querySelector(".ToolTip");
                        if (tool) tool.remove();
                        ev.target.style.boxShadow = "0 0px 2px 1px rgba(0, 0, 0, 0.2)";
                    } else {
                        if (!ev.target.parentNode.querySelector(".ToolTip")) {
                            ev.target.parentNode.append(Render.Create({
                                tagName: "span",
                                innerHTML: `Ingresar formato correcto: ${ev.target.placeholder}`,
                                className: "ToolTip"
                            }));
                            ev.target.style.boxShadow = "0 0 3px #ef4d00";
                        }
                    }
                }
            }
            ControlContainer.append(InputControl);
            this.FormContainer.append(ControlContainer);
        }
    }
    DefineInputType(prop, val, ObjectF, InputControl) {
        switch (this.Model[prop].type.toUpperCase()) {
            case "DATE":
                let date_val = val == " " ? (new Date()).toISO() : ObjectF[prop];
                InputControl = Render.Create({
                    tagName: "input", className: "text", type: this.Model[prop].type
                });
                ObjectF[prop] = InputControl.value = (new Date(date_val)).toISO();
                break;
            case "SELECT":
                InputControl = this.CreateSelect(InputControl, this.Model[prop].Dataset, prop, ObjectF);
                ObjectF[prop] = InputControl.value;
                break;
            case "CHECKBOX": case "radio":
                InputControl = InputControl = Render.Create({
                    tagName: "input",
                    className: "checkbox",
                    checked: val, type: this.Model[prop].type
                });
                break;

            case "EMAIL":
                InputControl = Render.Create({
                    tagName: "input",
                    className: "text",
                    value: val, type: this.Model[prop].type,
                    placeholder: "me@email.com",
                    pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                });
                break;
            default:
                InputControl = Render.Create({
                    tagName: "input", className: "text",
                    value: val, type: this.Model[prop].type,
                    placeholder: prop
                });
                break;
        }
        return InputControl;
    }

    CreateSelect(InputControl, Dataset, prop, ObjectF) {
        InputControl = Render.Create({
            tagName: "select", value: null, className: "text",
            children: Dataset.map(option => {
                let OValue, ODisplay;
                if (option.__proto__ == Object.prototype) {
                    OValue = option["id"];
                    ODisplay = option["desc"];
                } else {
                    OValue = option;
                    ODisplay = option;
                }
                const OptionObject = { tagName: "option", value: OValue, innerText: ODisplay };
                if (ObjectF[prop] != undefined && ObjectF[prop].toString() == OValue.toString()) {
                    OptionObject.selected = "true";
                }
                return OptionObject;
            })
        });
        return InputControl;
    }
}
customElements.define('w-form', FormComponet);
export { FormComponet }