import DataService from "../Model/DataService.js";

import { PAGE_SHEME } from "../Model/PageSheme.js";

import AdminController from "./AdminController.js";
import PublicController from "./PublicController.js";
import SelectedController from "./SelectedController.js";

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
        $(window).off();
        
        const CONTENT_CONTAINER = $("article");
        const ACTIVE_MENU = this.#getActiveMenu();
        let content = PAGE_SHEME[ACTIVE_MENU] ? PAGE_SHEME[ACTIVE_MENU].content ? PAGE_SHEME[ACTIVE_MENU].content : "<h2> Nincs tartalom<h2>" : "<h2>404</h2>";

        CONTENT_CONTAINER.html(content);

        switch (this.#getActiveMenu()) {
            case "public":
                this.#activeController = new PublicController();
                break;
            case "admin":
                this.#activeController = new AdminController();
                break;
            case "selected":
                this.#activeController = new SelectedController();
                break;
            default:
                this.#activeController = null;
                break;
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