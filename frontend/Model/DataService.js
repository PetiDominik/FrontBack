

class DataService {

    constructor() {

    }

    getData(endPoint, okFnc) {
        window.dispatchEvent(new CustomEvent("startGettingDatasFromDB"));
        axios.get(endPoint)
            .then(function (response) {

                okFnc(response);
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
            });
    }

    addData(endPoint, datas, okFnc = null) {
        window.dispatchEvent(new CustomEvent("startGettingDatasFromDB"));
        axios.post(endPoint, datas)
            .then(function (response) {
                window.dispatchEvent(new CustomEvent("successfulInsertDataToDB"));
                if (okFnc != null) {
                    okFnc(response);
                }
            })
            .catch(function (error) {
                console.log(error);
          });
    }
}

export default DataService;