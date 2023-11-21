

class DataService {

    constructor() {
        axios.defaults.baseURL = "http://localhost:8000/api";
    }

    getData(endPoint, eventDispatchHeader) {
        window.dispatchEvent(new CustomEvent(`${eventDispatchHeader}#startDataGet`));
        axios.get(endPoint)
            .then(response => {
                window.dispatchEvent(new CustomEvent(`${eventDispatchHeader}#endDataGet`, {detail: response.data}));
            })
            .catch(error => {
                console.log(error);
            });
    }

    addData(endPoint, datas, okFnc = null) {
        window.dispatchEvent(new CustomEvent("startDBUsage"));
        axios.post(endPoint, datas)
            .then(response => {
                window.dispatchEvent(new CustomEvent("endDBUsage"));
                if (okFnc != null) {
                    okFnc(response);
                }
            })
            .catch(error => {
                console.log(error);
          });
    }

    removeData(endPoint, okFnc = null) {
        window.dispatchEvent(new CustomEvent("startDBUsage"));
        axios.delete(endPoint)
            .then(response => {
                window.dispatchEvent(new CustomEvent("endDBUsage"));
                if (okFnc != null) {
                    okFnc(response);
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    editData(endPoint, datas, okFnc = null) {
        window.dispatchEvent(new CustomEvent("startDBUsage"));
        axios.put(endPoint, datas)
            .then(response => {
                window.dispatchEvent(new CustomEvent("endDBUsage"));
                if (okFnc != null) {
                    okFnc(response);
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
}

export default DataService;