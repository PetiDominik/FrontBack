import DataService from "../Model/DataService.js";

import { INPUT_FIELDS } from "../Model/inputFields.js";
import { PAGE_SHEME } from "../Model/PageSheme.js";

import FormView from "../View/FormView.js";
import AdminController from "./AdminController.js";


class MainController {
    #dataService;
    #isLoading;
    #activeController;

    constructor() {
        this.#dataService = new DataService();
        if (this.#getActiveMenu() == null) {
            let value = Object.keys(PAGE_SHEME)[0]
            this.#setActiveMenu(value);
        }
        this.#initMenus();
        this.#reloadContent();

        this.#handleEvents();

        /* this.#loading(true); */
        //this.#dataService.addData(`${this.#endPoint}/writers`, {nev : "Géza", szul : "20230101"}, this.showDatas);

        //new FormView($("#formField"), "mainForm", INPUT_FIELDS, "newData");

        
    }

    #initMenus() {
        const MENU_ELEMENT = $("#mainNav");
        const ACTIVE_PAGE = this.#getActiveMenu();
        const MENU_NAME = MENU_ELEMENT.attr("id");

        for (const key in PAGE_SHEME) {
            if (Object.hasOwnProperty.call(PAGE_SHEME, key)) {
                const element = PAGE_SHEME[key];
                let code = `
                            <div class="menuItem" id="${MENU_NAME}-${key}">${element.title}</div>
                            `
                MENU_ELEMENT.append(code);
                if (key == ACTIVE_PAGE) {
                    MENU_ELEMENT.children("div:last-child").addClass("active");
                }
                
            }
        }

        let osztaly = this;

        MENU_ELEMENT.children(".menuItem").on("click", function() {
            MENU_ELEMENT.children(".active").removeClass("active");
            $(this).addClass("active");
            
            let activePage = $(this).attr("id").split("-");
            osztaly.#setActiveMenu(activePage[activePage.length - 1]);

            osztaly.#reloadContent();
        });
    }

    #reloadContent(datas = null) {
        const CONTENT_CONTAINER = $("article");
        const ACTIVE_MENU = this.#getActiveMenu();
        let content = PAGE_SHEME[ACTIVE_MENU] ? PAGE_SHEME[ACTIVE_MENU].content ? PAGE_SHEME[ACTIVE_MENU].content : "<h2> Nincs tartalom<h2>" : "<h2>404</h2>";

        CONTENT_CONTAINER.html(content);

        switch (this.#getActiveMenu()) {
            case "public":
                this.#activeController = null;
                break;
            case "admin":
                this.#activeController = new AdminController();
                break;
            case "selected":
                this.#activeController = null;
                break;
            default:
                this.#activeController = null;
                break;
        }
    }

    #handlePageRefresh() {

    }

    #handleEvents() {

        $(window).on("newData", (event) => {
            const DATAS = event.detail;
            this.#dataService.addData(`/writers`, DATAS, this.dataInserted);
        });

        $(window).on("gettedDatasFromDB", (event) => {
            this.showDatas(event.detail);
        });

        $(window).on("startDBUsage", (event) => {
            this.#loading(true);
        });

        $(window).on("endDBUsage", (event) => {
            this.#dataService.getData(`/writers`, this.newData);
        });

        $(window).on("editButtonClick", (event) => {
            const datas = event.detail;
            $("#listField").parent().append(`<div id="editDataDiv"></div>`);
            new FormView($("#editDataDiv"), "editForm", INPUT_FIELDS, "dataEdit", datas, true);
        });

        $(window).on("dataEdit", (event) => {
            const datas = event.detail;
            
            this.#dataService.editData(`/writers/${datas.writer_id}`, datas);
        });
        
        $(window).on("deleteButtonClick", (event) => {
            const ID = event.detail;
            this.#dataService.removeData(`/writers/${ID}`);
        });
    }

    newData(response) {
        let data = response.data;
        window.dispatchEvent(new CustomEvent("gettedDatasFromDB", {detail : data}));
    }

    showDatas(datas) {
        this.#loading(false);
        this.#reloadContent(datas);
        console.log("a");
        //new ListView(this.#tableDiv, datas, "datas-table");
    }

    #loading(starLoading) {
        if (this.#isLoading && starLoading) {return;}
        //-this.#tableDiv.html("");

        if (starLoading) {
            let txt = `<div id="listLoader"><div class="loader"></div></div>`;

            //-this.#tableDiv.append(txt);
            this.#isLoading = true;
        } else {
            $("listLoader").remove();
            this.#isLoading = false;
        }
        
    }

    #getActiveMenu() {
        return localStorage.getItem("activePage");
    }

    #setActiveMenu(value) {
        localStorage.setItem("activePage", value);
    }
}

export default MainController;