import DataService from "../Model/DataService.js";
import AlertView from "../View/AlertView.js";
import CardListView from "../View/CardListView.js";
import CardView from "../View/CardView.js";
import LoaderView from "../View/LoaderView.js";

class PublicController {
    #dataService;
    #dispatchHeader;
    #loaderView;
    #cardListContainer;
    #alertView;

    constructor() {
        let name = this.constructor.name;
        this.#dispatchHeader = name[0].toLowerCase() + name.slice(1);
        this.#cardListContainer = $("#listField");

        this.#dataService = new DataService(this.#dispatchHeader);
        this.#loaderView = new LoaderView(this.#cardListContainer);
        this.#alertView = new AlertView();

        this.#dataService.getData("/writers");
        this.#handleEvents();
    }

    #handleEvents() {
        $(window).on(`${this.#dispatchHeader}#startDataGet`, event => {
            if (!this.#loaderView.isActive()){
                this.#loaderView.append();
            }
        });
        
        $(window).on(`${this.#dispatchHeader}#endDataGet`, event => {
            const DATAS = event.detail;
            this.#loaderView.remove();

            new CardListView($("#listField"), DATAS, "cardListContainer", this.#dispatchHeader, CardView);
        });

        $(window).on(`${this.#dispatchHeader}#select`, event => {
            const DATAS = event.detail;

            this.#dataService.addData("/selected", {writer_id : DATAS.writer_id});
        });

        $(window).on(`${this.#dispatchHeader}#endDBUsage`, event => {
            this.#alertView.alert("Sikeres kiválasztás!");
        });

        $(window).on(`${this.#dispatchHeader}#error`, event => {
            this.#alertView.alert("Ez az elem már ki van választva!", "#be1212");
        });
    }
}

export default PublicController;