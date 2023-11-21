import RowView from "./RowView.js";

class ListView {
    #parentElement;
    #element;
    #keys;
    #tableId;

    constructor(parentElement, datas, tableId) {
        this.#tableId = tableId;
        this.#keys = Object.keys(datas[0] || {});
        this.#parentElement = parentElement;
        this.#tableInsert();
        this.#element = $(`#${this.#tableId} tbody`);

        if (datas) {
            datas.forEach((item) => {
                new RowView(this.#element, item);
            });
        } else {
            this.#element.html("<h2>Nincs adat</h2>")
        }
        
    }

    #tableInsert() {
        this.#parentElement.html();

        let txt = `<table class="table" id="${this.#tableId}"><thead><tr>`;
        this.#keys.forEach(key => {      

            txt += `<th>${key}</th>`;
        });

        txt += `<th>
                    
                </th></tr></thead><tbody></tbody></table>`;

        this.#parentElement.html(txt);
    }

}

export default ListView;