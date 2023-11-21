import { PAGE_SHEME } from "../Model/PageSheme.js";
import ListView from "../View/ListView.js";

class AdminView {
    #listView;
    #datas;

    constructor(datas = null) {
        this.#datas = datas;

        this.#listView = new ListView($("#listField"), {...this.#datas}, "datas-table");
    }


    refreshDatas(datas) {
        this.#datas = datas;
        this.#listView = new ListView($("#listField"), {...this.#datas}, "datas-table");
    }
}

export default AdminView;