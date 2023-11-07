
export const INPUT_FIELDS = {
    nev : {
        type : "text",
        value : "",
        placeholder : "Minta János",
        pattern : "[A-Z][a-z]{2,15}",
        extra : {
            label : "Név",
            validation : "Név nagy betűvel kezdődik és legalább 3 beetű!"
        }
    },
    szul : {
        type : "date",
        min : "1900-01-01",
        max : "%today%",
        extra : {
            label : "Születési év",
            validation : "1900.01.01 - %today% közötti érték"
        }
    }
}