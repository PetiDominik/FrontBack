

class DataService {

    constructor() {

    }

    getData(endPoint, okFnc) {
        window.dispatchEvent(new CustomEvent("startDBUsage"));
        axios.get(endPoint)
            .then(response => {
                if (okFnc != null) {
                    okFnc(response);
                }
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
        axios.patch(endPoint, datas)
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