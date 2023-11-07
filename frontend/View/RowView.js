
class RowView {
    #datas;
    #parentElement;

    constructor(parentElement, datas) {
        this.#datas = datas;
        this.#parentElement = parentElement;

        this.#appendHTML();
    }

    #createHTMLCode() {
        let columns = "";
        let keys = Object.keys(this.#datas);

        keys.forEach(key => {
            columns += `<td>${this.#datas[key]}</td>`;
        });

        return `<tr>${columns}</tr>`;
    }

    #appendHTML() {
        this.#parentElement.append(this.#createHTMLCode());
    }
}

export default RowView;