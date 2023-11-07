import InputView from "./InputView.js";

class FormView {
    #parentElement;
    #inputFields;
    formElement;
    #inputs = [];
    #formData = {};

    constructor(parentElement, inputFields) {
        this.#inputFields = inputFields;
        this.#parentElement = parentElement;
        this.#parentElement.append("<form>");
        this.formElement = this.#parentElement.children("form");

        this.#urlapOsszerak();

        $("#submit").on("click", (event) => {
            event.preventDefault();
            
            let index = 0;
            while (index < this.#inputs.length && this.#inputs[index].isValid()) {
                index++;
            }

            if (index < this.#inputs.length) {
                alert("Hibás adatok!");
            } else {
                this.#formData = {}

                this.#inputs.forEach(element => {
                    this.#formData[element.getKey()] = element.getValue();
                });
                
                window.dispatchEvent(new CustomEvent("newData", {detail : this.#formData}));
            }

        });
    }

    #urlapOsszerak() {
        this.#inputs = [];

        for (const key in this.#inputFields) {
            if (Object.hasOwnProperty.call(this.#inputFields, key)) {
                this.#inputs.push(new InputView(this.formElement, this.#inputFields[key], key));
            }
        }
        this.formElement.append(`<div><input type="submit" id="submit" value="Ok" /></div>`);
    }
}
export default FormView;