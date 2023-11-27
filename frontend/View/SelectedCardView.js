
class SelectedCardView {
    #eventDispatchHeader;
    #parent;
    #datas;
    #element;
    #button;

    constructor(parent, datas, eventDispatchHeader) {
        this.#eventDispatchHeader = eventDispatchHeader;
        this.#parent = parent;
        this.#datas = datas;

        this.#appendHTML();

        this.#element = this.#parent.children("div:last-child");
        this.#button = this.#element.find("button");

        this.#handleEvent();
        
    }

    #createHTMLCode() {
        return `<div class="card ${this.#eventDispatchHeader.replace("Controller", "Card")}">
                        <div class="card-header">
                            <h2>${this.#datas.nev}</h2>
                        </div>
                        <div class="card-content">
                            <button class="selectBtn">Eltávolítás</button>
                        </div>
                    </div>`;
    }

    #appendHTML() {
        this.#parent.append(this.#createHTMLCode());
    }

    #handleEvent() {
        this.#button.on("click", event => {
            window.dispatchEvent(new CustomEvent(`${this.#eventDispatchHeader}#unSelect`, {detail: this.#datas.writer_id}));
        });
    }
}

export default SelectedCardView;