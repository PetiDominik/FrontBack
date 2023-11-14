import DataService from "../Model/DataService.js";
import { INPUT_FIELDS } from "../Model/inputFields.js";
import FormView from "../View/FormView.js";
import ListView from "../View/ListView.js";


class MainController {
    #dataService;
    #endPoint;
    #tableDiv;
    #listElement;
    #isLoading;

    constructor() {
        this.#endPoint = "http://localhost:8000/api";
        this.#dataService = new DataService();
        this.#tableDiv = $("#listField");
        this.#listElement = null;

        this.#handleEvents();

        /* this.#loading(true); */
        this.#dataService.getData(`${this.#endPoint}/writers`, this.newData);
        //this.#dataService.addData(`${this.#endPoint}/writers`, {nev : "Géza", szul : "20230101"}, this.showDatas);

        new FormView($("#formField"), INPUT_FIELDS, "newData");

        
    }

    #handleEvents() {
        $(window).on("newData", (event) => {
            const DATAS = event.detail;

            this.#dataService.addData(`${this.#endPoint}/writers`, DATAS, this.dataInserted);
        });

        $(window).on("gettedDatasFromDB", (event) => {
            this.showDatas(event.detail);
        });

        $(window).on("startDBUsage", (event) => {
            this.#loading(true);
        });

        $(window).on("endDBUsage", (event) => {
            this.#dataService.getData(`${this.#endPoint}/writers`, this.newData);
        });

        $(window).on("editButtonClick", (event) => {
            const datas = event.detail;
            console.log(datas);
            this.#tableDiv.parent().append(`<div id="editDataDiv"></div>`);
            new FormView($("#editDataDiv"), INPUT_FIELDS, "dataEdit");
        });

        $(window).on("dataEdit", (event) => {
            const datas = event.detail;
            this.#dataService.editData(`${this.#endPoint}/writers/${datas.writer_id}`, datas);
        });
        
        $(window).on("deleteButtonClick", (event) => {
            const ID = event.detail;
            this.#dataService.removeData(`${this.#endPoint}/writers/${ID}`);
        });
    }

    newData(response) {
        let data = response.data;
        window.dispatchEvent(new CustomEvent("gettedDatasFromDB", {detail : data}));
    }

    showDatas(datas) {
        this.#loading(false);
        this.#listElement = new ListView(this.#tableDiv, datas, "datas-table");
    }

    #loading(starLoading) {
        if (this.#isLoading && starLoading) {return;}
        this.#tableDiv.html("");

        if (starLoading) {
            let txt = `<div id="listLoader"><div class="loader"></div></div>`;

            this.#tableDiv.append(txt);
            this.#isLoading = true;
        } else {
            $("listLoader").remove();
            this.#isLoading = false;
        }
        
    }
}

export default MainController;