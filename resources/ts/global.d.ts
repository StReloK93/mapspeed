import { AxiosStatic } from "axios"
declare global {
    var axios: AxiosStatic;
    var ymaps3: any;
    var ymaps: any;
    var wialon: any;
    var L: any
    var qx: any
    var SERVER_DATA: any
    var ENV: {
        PIVOT_LAT: number,
        PIVOT_LON: number,
        SHARQIY: number,
    }
}