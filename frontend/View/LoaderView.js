
class LoaderView {
    #loaderElement;
    #loaderCode;

    constructor(parent) {
        this.#loaderCode = `<div class="loaderContainer"><div class="loader"></div></div>`;
        parent.html(this.#loaderCode);
        this.#loaderElement = parent.find(".loaderContainer");
    }

    remove() {
        this.#loaderElement.remove();
    }

    append(parent) {
        this.remove();
        parent.html(this.#loaderCode);
        this.#loaderElement = parent.find(".loaderContainer");
    }
}

export default LoaderView;