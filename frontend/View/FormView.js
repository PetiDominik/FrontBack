import InputView from "./InputView.js";

class FormView {
    #parentElement;
    #inputFields;
    #formElement;
    #inputs = [];
    #formData = {};
    #id;

    constructor(parentElement, id, inputFields, submitEvent, defaultData = null, destroyAfterDataInput = false) {
        this.#inputFields = inputFields;
        this.#parentElement = parentElement;
        this.#id = id;
        this.#parentElement.append(`<form id="${this.#id}">`);
        this.#formElement = this.#parentElement.children("form");
        if (defaultData != null) {
            this.#formData = defaultData;
        } else {
            this.#formData = {};
        }

        this.#urlapOsszerak();
        this.#formElement.find(".submitBtn").on("click", (event) => {
            event.preventDefault();

            let index = 0;
            while (index < this.#inputs.length && this.#inputs[index].isValid()) {
                index++;
            }

            if (index < this.#inputs.length) {
                alert("Hibás adatok!");
            } else {
                /* this.#formData = {} */

                this.#inputs.forEach(element => {
                    this.#formData[element.getKey()] = element.getValue();
                });
                
                if (destroyAfterDataInput) {
                    this.#parentElement.remove();
                }
                window.dispatchEvent(new CustomEvent(submitEvent, {detail : this.#formData}));
            }

        });
    }

    #urlapOsszerak() {
        this.#inputs = [];

        for (const key in this.#inputFields) {
            if (Object.hasOwnProperty.call(this.#inputFields, key)) {
                this.#inputs.push(new InputView(this.#formElement, {...this.#inputFields[key]}, key, this.#formData[key] || null));
            }
        }
        this.#formElement.append(`<div><input type="submit" class="submitBtn" value="Ok" /></div>`);
    }
}
export default FormView;