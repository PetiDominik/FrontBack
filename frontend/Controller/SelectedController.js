import DataService from "../Model/DataService.js";
import CardListView from "../View/CardListView.js";
import LoaderView from "../View/LoaderView.js";
import SelectedCardView from "../View/SelectedCardView.js";

class SelectedController {
    #dataService;
    #dispatchHeader;
    #loaderView;
    #cardListContainer;

    constructor() {
        let name = this.constructor.name;
        this.#dispatchHeader = name[0].toLowerCase() + name.slice(1);
        this.#cardListContainer = $("#listField");

        this.#dataService = new DataService(this.#dispatchHeader);
        this.#loaderView = new LoaderView(this.#cardListContainer);

        this.#dataService.getData("/selected");
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

            new CardListView($("#listField"), DATAS, "cardListContainer", this.#dispatchHeader, SelectedCardView);
        });

        $(window).on(`${this.#dispatchHeader}#unSelect`, event => {
            const ID = event.detail;

            this.#dataService.removeData(`/selected/${ID}`);
        });

        $(window).on(`${this.#dispatchHeader}#startDBUsage`, (event) => {
            this.#loaderView.append();
        });

        $(window).on(`${this.#dispatchHeader}#endDBUsage`, (event) => {
            this.#dataService.getData(`/selected`);
        });
    }
}

export default SelectedController;