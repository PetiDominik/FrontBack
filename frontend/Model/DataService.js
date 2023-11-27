

class DataService {
    #eventDispatchHeader;

    constructor(eventDispatchHeader) {
        this.#eventDispatchHeader = eventDispatchHeader;
        axios.defaults.baseURL = "http://localhost:8000/api";
    }

    getData(endPoint) {
        window.dispatchEvent(new CustomEvent(`${this.#eventDispatchHeader}#startDataGet`));

        axios.get(endPoint)
            .then(response => {
                window.dispatchEvent(new CustomEvent(`${this.#eventDispatchHeader}#endDataGet`, {detail: response.data}));
            })
            .catch(error => {
                window.dispatchEvent(new CustomEvent(`${this.#eventDispatchHeader}#error`, {detail: error}));
            });
    }

    addData(endPoint, datas, okFnc = null) {
        window.dispatchEvent(new CustomEvent(`${this.#eventDispatchHeader}#startDBUsage`));
        axios.post(endPoint, datas)
            .then(response => {
                window.dispatchEvent(new CustomEvent(`${this.#eventDispatchHeader}#endDBUsage`));
                if (okFnc != null) {
                    okFnc(response);
                }
            })
            .catch(error => {
                window.dispatchEvent(new CustomEvent(`${this.#eventDispatchHeader}#error`, {detail: error}));
          });
    }

    removeData(endPoint, okFnc = null) {
        window.dispatchEvent(new CustomEvent(`${this.#eventDispatchHeader}#startDBUsage`));
        axios.delete(endPoint)
            .then(response => {
                window.dispatchEvent(new CustomEvent(`${this.#eventDispatchHeader}#endDBUsage`));
                if (okFnc != null) {
                    okFnc(response);
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    editData(endPoint, datas, okFnc = null) {
        window.dispatchEvent(new CustomEvent(`${this.#eventDispatchHeader}#startDBUsage`));
        axios.put(endPoint, datas)
            .then(response => {
                window.dispatchEvent(new CustomEvent(`${this.#eventDispatchHeader}#endDBUsage`));
                if (okFnc != null) {
                    okFnc(response);
                }
            })
            .catch(error => {
                window.dispatchEvent(new CustomEvent(`${this.#eventDispatchHeader}#error`, {detail: error}));
            })
    }
}

export default DataService;