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
        ACCAUNT_ID: number,
        BASE_ALLCARS_ID: number,
        REPORT_INDEX: number,
        WIALON_TOKEN: string,
        WATER_TRUCKS_REPORT: string,
        WATER_TRUCK_GROUPID: string,
        BASE_SMENA_DAY: string,
        BASE_SMENA_NIGHT: string
    }
}