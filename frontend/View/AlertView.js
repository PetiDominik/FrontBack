class AlertView {
    #alertBox;
    #loaderbar;

    constructor() {
        if ($("#alertBox").length == 0) {
            $("body").append(`
                            <div id="alertBox">
                                <div class="content"></div>
                                <div class="loaderbar"></div>
                            </div>
            `);
        }

        this.#alertBox = $("#alertBox");
        this.#loaderbar = this.#alertBox.children(".loaderbar");

    }

    alert(text, color = "#06611d") {
        this.#alertBox.children(".content").html(text);
        this.#alertBox.css("display", "block");
        this.#alertBox.addClass("notifyIn");
        this.#loaderbar.css("background-color", color);

        const TICK_INTERVAL = 10;
        let duration = text.length * 50;
        let width = this.#loaderbar.css("width");
        let minusPerInterval = width.slice(0, width.indexOf("px")) / (duration / TICK_INTERVAL);      


        setTimeout(() => {
            let barProgress = setInterval(() => {
                let currentWidth = this.#loaderbar.css("width");
                let currentPercent = currentWidth.slice(0, currentWidth.indexOf("px"));            

                if (currentPercent > 0) {
                    this.#loaderbar.css("width", `${currentPercent - minusPerInterval}px`);
                } else {
                    this.#loaderbar.css("width", 0);

                    clearInterval(barProgress);
                    this.#alertBox.removeClass("notifyIn");
                    this.#alertBox.addClass("notifyOut");
                    setTimeout(() => {
                        this.#alertBox.css("display", "none");
                        this.#alertBox.removeClass("notifyOut");
                        this.#loaderbar.css("width", "100%");
                    }, 500);
                }
            }, TICK_INTERVAL);
        }, 500);
        
    }
}

export default AlertView;