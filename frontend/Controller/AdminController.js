import DataService from "../Model/DataService.js";
import { INPUT_FIELDS } from "../Model/inputFields.js";
import FormView from "../View/FormView.js";
import ListView from "../View/ListView.js";
import LoaderView from "../View/LoaderView.js";


class AdminController {
    #dataService;
    #dispatchHeader;
    #loaderView;
    #listContainer;
    #formContainer;

    constructor(parent) {
        let name = this.constructor.name;
        this.#dispatchHeader = name[0].toLowerCase() + name.slice(1);
        this.#listContainer = $("#listField");
        this.#formContainer = $("#formField");
        this.#dataService = new DataService();
        this.#loaderView = new LoaderView(this.#listContainer);

        new FormView(this.#formContainer, "mainForm", INPUT_FIELDS, "newData");

        
        this.#dataService.getData("/writers", this.#dispatchHeader);
        this.#handleEvents();
    }
    
    #handleEvents() {
        $(window).on(`${this.#dispatchHeader}#startDataGet`, event => {
            const DATAS = event.detail;
            this.#loaderView.append(this.#listContainer);
        });
        
        $(window).on(`${this.#dispatchHeader}#endDataGet`, event => {
            const DATAS = event.detail;
            this.#loaderView.remove();
            console.log(DATAS);
            new ListView(this.#listContainer, DATAS, "admin-datas-list");
        });
    }
}

export default AdminController;