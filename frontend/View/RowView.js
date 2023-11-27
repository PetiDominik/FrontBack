
class RowView {
    #eventDispatchHeader;
    #datas;
    #parentElement;

    constructor(parentElement, datas, eventDispatchHeader) {
        this.#eventDispatchHeader = eventDispatchHeader;
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
        return `<tr>${columns}
                    <td><i class="fa fa-2x fa-trash delete-btn"></i><i class="fa fa-2x fa-pencil edit-btn"></i></td>
                </tr>`;
    }

    #appendHTML() {
        this.#parentElement.append(this.#createHTMLCode());

        let tdCell = this.#parentElement.children("tr:last-child").children("td:last-child");
        
        tdCell.children(".delete-btn").on("click", (event) => {
            window.dispatchEvent(new CustomEvent(`${this.#eventDispatchHeader}#deleteButtonClick`, {detail : this.#datas.writer_id}));
        });
        
        tdCell.children(".edit-btn").on("click", (event) => {
            window.dispatchEvent(new CustomEvent(`${this.#eventDispatchHeader}#editButtonClick`, {detail : {...this.#datas}}));
        });
    }
}

export default RowView;