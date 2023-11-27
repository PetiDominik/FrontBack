
class LoaderView {
    #loaderElement;
    #loaderCode;
    #parent;

    constructor(parent) {
        this.#loaderCode = `<div class="loaderContainer"><div class="loader"></div></div>`;
        this.#parent = parent;
        this.append();
    }

    remove() {
        if (this.#loaderElement != null) {
            this.#loaderElement.remove();
            this.#loaderElement = null;
        }
    }

    append(parent = null) {
        if (parent != null) {
            this.#parent = parent;
        }
        if (this.#loaderElement != null) {
            this.remove();
        }

        this.#parent.html(this.#loaderCode);
        this.#loaderElement = this.#parent.find(".loaderContainer");
    }

    isActive() {
        return this.#loaderElement != null;
    }
}

export default LoaderView;