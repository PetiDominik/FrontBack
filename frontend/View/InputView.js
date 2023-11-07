
class InputView {
    #formElement;
    #datas;
    #key;
    #InputElement;
    #validElement;
    #invalidElement;
    #isValid;

    constructor(formElem, adatok, key) {
        this.#isValid = false;
        this.#formElement = formElem;
        this.#datas = adatok;
        this.#key = key;
        this.#elem();

        this.#InputElement = $(`#in-${key}`);
        this.#validElement = this.#formElement.children("div:last-child").children(`#valid-${key}`);
        this.#invalidElement = this.#formElement.children("div:last-child").children(`#invalid-${key}`);

        this.#InputElement.on("input", () => {
            this.#validation();
        });
    }

    #elem() {
        let txt = `<div class="mb-3 mt-3"><label for="${this.#key}" class="form-label">${this.#datas.extra.label}</label><input id="in-${this.#key}" `
            + (this.#datas.type != "checkbox" ? `class="form-control"` : "");

        for (const key in this.#datas) {
            if (key != "extra" && Object.hasOwnProperty.call(this.#datas, key)) {
                let data = this.#datas[key];
                if (data == null) {
                    txt += ` ${key}`;
                } else {
                    if (data.includes("%today%")) {
                        data = new Date().toISOString().split('T')[0]
                    }
                    txt += ` ${key}="${data}"`;
                }
            }
        }
        txt += `/><i class="fa fa-check fa-2x elrejt valid" id="valid-${this.#key}"></i><i class="fa fa-times fa-2x elrejt invalid" id="invalid-${this.#key}"></i></div>`;

        this.#formElement.append(txt);
    }

    #validation() {
        let isValid = false;

        switch (this.#datas.type) {
            case "date":
                let dateVal = new Date(this.#InputElement.val());
                let maxDate = this.#datas.max.includes("%today%") ? new Date() : new Date(this.#datas.max);

                isValid = dateVal >= new Date(this.#datas.min) && dateVal <= maxDate;
                break;
            case "checkbox":
                isValid = this.#datas.extra.needToBeChecked == this.#InputElement.is(":checked");
                break;
            case "number":
                let num = this.#InputElement.val();
                isValid = this.#datas.extra.min <= num && num <= this.#datas.extra.max;
                break;
            default:
                let val = this.#InputElement.val();
                let regex = this.#datas.pattern;
                isValid = new RegExp(regex).test(val);
                break;
        }

        if (isValid) {
            this.#isValid = true;
            this.#validElement.removeClass("elrejt");
            this.#invalidElement.addClass("elrejt");/* 
            this.#inputElem.css("background-color", "green"); */
        } else {
            this.#isValid = false;
            this.#validElement.addClass("elrejt");
            this.#invalidElement.removeClass("elrejt");/* 
            this.#inputElem.css("background-color", "red"); */
        }
    }

    isValid() {
        return this.#isValid;
    }

    getValue() {
        return this.#InputElement.val();
    }

    getKey() {
        return this.#key
    }
}

export default InputView;