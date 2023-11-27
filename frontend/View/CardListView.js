import CardView from "./CardView.js";

class CardListView {
    #parent;
    #datas;
    #tableId;
    #eventDispatchHeader;
    #element;

    constructor(parent, datas, tableId, eventDispatchHeader, cardType = CardView) {
        this.#parent = parent;
        this.#datas = datas;
        this.#tableId = tableId;
        this.#eventDispatchHeader = eventDispatchHeader;
        this.#cardListInsert();

        this.#element = $(`#${this.#tableId}`);

        if (datas.length > 0 && datas != null) {
            datas.forEach((item) => {
                try{
                    new cardType(this.#element, item, this.#eventDispatchHeader);
                } catch {
                    console.log("Hiba a kártya létrehozása közben! Nincs ilyen típusú kártya");
                }
            });
        } else {
            this.#element.html("<h2>Nincs adat</h2>");
        }
    }

    #cardListInsert() {
        let txt = `<div id="${this.#tableId}"></div>`;

        this.#parent.html(txt);
    }
}

export default CardListView;