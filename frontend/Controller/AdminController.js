import DataService from "../Model/DataService.js";
import { INPUT_FIELDS } from "../Model/inputFields.js";
import FormView from "../View/FormView.js";
import TableListView from "../View/TableListView.js";
import LoaderView from "../View/LoaderView.js";


class AdminController {
    #dataService;
    #dispatchHeader;
    #loaderView;
    #listContainer;
    #formContainer;

    constructor() {
        let name = this.constructor.name;
        this.#dispatchHeader = name[0].toLowerCase() + name.slice(1);
        this.#listContainer = $("#listField");
        this.#formContainer = $("#formField");
        this.#dataService = new DataService(this.#dispatchHeader);
        this.#loaderView = new LoaderView(this.#listContainer);

        new FormView(this.#formContainer, "mainForm", INPUT_FIELDS, "newData");

        
        this.#dataService.getData("/writers");
        this.#handleEvents();
    }
    
    #handleEvents() {

        $(window).on(`${this.#dispatchHeader}#startDataGet`, event => {
            if (!this.#loaderView.isActive()){
                this.#loaderView.append(this.#listContainer);
            }
        });
        
        $(window).on(`${this.#dispatchHeader}#endDataGet`, event => {
            const DATAS = event.detail;
            this.#loaderView.remove();

            new TableListView(this.#listContainer, DATAS, "admin-datas-list", this.#dispatchHeader);
        });

        $(window).on(`${this.#dispatchHeader}#deleteButtonClick`, (event) => {
            const ID = event.detail;
            this.#dataService.removeData(`/writers/${ID}`);
        });

        $(window).on("dataEdit", (event) => {
            const datas = event.detail;
            
            this.#dataService.editData(`/writers/${datas.writer_id}`, datas);
        });

        $(window).on(`${this.#dispatchHeader}#editButtonClick`, (event) => {
            const datas = event.detail;
            $("#listField").parent().append(`<div id="editDataDiv"></div>`);
            new FormView($("#editDataDiv"), "editForm", INPUT_FIELDS, "dataEdit", datas, true);
        });


        $(window).on("newData", (event) => {
            const DATAS = event.detail;
            this.#dataService.addData(`/writers`, DATAS, this.dataInserted);
        });

        $(window).on("gettedDatasFromDB", (event) => {
            this.showDatas(event.detail);
        });

        $(window).on(`${this.#dispatchHeader}#startDBUsage`, (event) => {
            this.#loaderView.append();
        });

        $(window).on(`${this.#dispatchHeader}#endDBUsage`, (event) => {
            this.#dataService.getData(`/writers`);
        });
    }
}

export default AdminController;