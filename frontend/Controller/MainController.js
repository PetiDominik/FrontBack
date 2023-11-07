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
        this.#endPoint = "http://localhost:8000"
        this.#dataService = new DataService();
        this.#tableDiv = $("#listField");
        this.#listElement = null;

        this.#handleEvents();

        /* this.#loading(true); */
        this.#dataService.getData(`${this.#endPoint}/writers`, this.newData);
        //this.#dataService.addData(`${this.#endPoint}/writers`, {nev : "Géza", szul : "20230101"}, this.showDatas);

        new FormView($("#formField"), INPUT_FIELDS);

        
    }

    #handleEvents() {
        $(window).on("newData", (event) => {
            const DATAS = event.detail;

            this.#dataService.addData(`${this.#endPoint}/writers`, DATAS, this.dataInserted);
        });

        $(window).on("gettedDatasFromDB", (event) => {
            this.showDatas(event.detail);
        });

        $(window).on("startGettingDatasFromDB", (event) => {
            this.#loading(true);
        });

        $(window).on("successfulInsertDataToDB", (event) => {
            this.#dataService.getData(`${this.#endPoint}/writers`, this.newData);
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