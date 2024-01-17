import Leaflet from "./Leaflet"
import moment from 'moment'
import { useAppStore } from "@/store/useAppStore"
export default class {
    Tlayer
    map
    leafMap
    drawSquare
    store
    to = Math.round(new Date().getTime() / 1000); from = this.to - 3600 * 24 - 1
    session = wialon.core.Session.getInstance()

    constructor(sid, UIData) {
        this.initWialon(sid, UIData)
        this.store = useAppStore()
    }

    async initWialon(sid, UIData) {
        this.leafMap = new Leaflet(sid)
        this.map = this.leafMap.map

        const groups: any = await this.initReports()
        groups.forEach((group) => {
            const onlyNumber = group.getName().replace(/\D/g, "")
            var name

            if (onlyNumber == "") name = "Barcha"
            else if(onlyNumber == "55") name = "55 tn"
            else if(onlyNumber == "90") name = "90 tn"
            else if(onlyNumber == "91") name = "Komatsu"
            else if (onlyNumber == "92") name = "CAT"
            UIData.groups.push({ id: group.getId(), name: name, number: onlyNumber == "" ? 0 : onlyNumber })
        })
        this.selectUnit(groups[0].getId(), UIData)
    }

    async selectUnit(unitId, UIData) {
        UIData.loading = true
        this.leafMap.removeCubics()
        this.map.setView([42.2628699, 63.891215], 13);
        const select = UIData.groups.find((group) => group.id == unitId)
        await this.executeReport(unitId, UIData)
        console.log(this.store.oldDays, this.store.hourPeriod);
        
        await axios.post('/api/tracks/show', {
            index: select.number,
            oldDays: this.store.oldDays,
            hourPeriod: this.store.hourPeriod,
            speedRange: this.store.speedRange,
            selectedTime: moment(this.store.time.value).format('YYYY-MM-DD HH:mm'),
        }).then(({ data: points }) => {
            this.leafMap.drawCubics(points)
        })

        UIData.loading = false
    }

    async initReports() {
        const session = this.session
        function update_renderer() {
            var renderer = session.getRenderer()
            if (this.Tlayer && this.Tlayer.setUrl) this.Tlayer.setUrl(this.getTiles(renderer))
        }

        return await new Promise(function (resolve, reject) {

            var renderer = session.getRenderer()
            session.loadLibrary("resourceReports")
            renderer.addListener("changeVersion", update_renderer);
            session.updateDataFlags([
                { type: "type", data: "avl_resource", flags: wialon.item.Item.dataFlag.base | wialon.item.Resource.dataFlag.reports, mode: 0 },
                { type: "type", data: "avl_unit", flags: wialon.item.Item.dataFlag.base | wialon.item.Unit.dataFlag.lastMessage, mode: 0 },
                { type: "type", data: "avl_unit_group", flags: wialon.item.Item.dataFlag.base | wialon.item.Unit.dataFlag.lastMessage, mode: 0 }

            ], (code) => {
                var units = session.getItems("avl_unit_group")
                resolve(units)
            })
        })
    }

    public async executeReport(group_id, UIData) { // execute selected report
        if (UIData.active == group_id) return

        UIData.active = group_id
        var renderer = this.session.getRenderer()
        var report = this.session.getItems("avl_resource")[0]
        var template = report.getReports()


        return await new Promise(function (resolve, reject) {

            report.execReport(template[1], group_id, 0, { "from": this.from, "to": this.to, "flags": wialon.item.MReport.intervalFlag.absolute },
                (code, layer) => {
                    if (!layer) return
                    if (!this.Tlayer) this.Tlayer = L.tileLayer(this.getTiles(renderer), { zoomReverse: true, zoomOffset: -1 }).addTo(this.map)
                    else this.Tlayer.setUrl(this.getTiles(renderer))
                    resolve('magic')
                }
            )

        }.bind(this))

    }


    getTiles(renderer) {
        return this.session.getBaseUrl() + "/adfurl" + renderer.getVersion() + "/avl_render/{x}_{y}_{z}/" + this.session.getId() + ".png"
    }



}
















// function delete_track (evt) {
// 	const unit_id = evt
// 	const sess = wialon.core.Session.getInstance()
// 	const renderer = sess.getRenderer()
// 	if (layers && layers[unit_id])
// 	{
// 		// delete layer from renderer
// 		renderer.removeLayer(layers[unit_id], function(code) {
// 			if (code)
// 				msg(wialon.core.Errors.getErrorText(code)); // exit if error code
// 			else
// 				msg("Track removed."); // else send message, then ok
// 		});
// 		delete layers[unit_id]; // delete layer from container
// 	}
// 	// move marker behind bounds
// 	if (map)
// 		map.removeLayer(markers[unit_id]);
// 	delete markers[unit_id];
// }


// export function show_track(unit_id, map) {
//     var sess = wialon.core.Session.getInstance() // get instance of current Session
//     var renderer = sess.getRenderer()

//     var unit = sess.getItem(unit_id)
//     if (document.getElementById(unit_id) || !unit || !unit.getPosition()) return

//     // callback is performed, when messages are ready and layer is formed
//     const callback = qx.lang.Function.bind((code, layer) => {
//         if (layer) {
//             var layer_bounds = layer.getBounds()
//             if (layer_bounds.length != 4) return
//             if (map) {
//                 // const bounds = new L.LatLngBounds(
//                 //     L.latLng(layer_bounds[0], layer_bounds[1]),
//                 //     L.latLng(layer_bounds[2], layer_bounds[3])
//                 // )
//                 // map.fitBounds(bounds)
//                 if (!Tlayer) Tlayer = L.tileLayer(getTiles(sess, renderer), { zoomReverse: true, zoomOffset: -1 }).addTo(map)
//                 else Tlayer.setUrl(getTiles(sess, renderer))
//             }
//         }
//     });
//     // query params
//     const params = {
//         "layerName": "route_unit_" + unit_id, // layer name
//         "itemId": unit_id, // ID of unit which messages will be requested
//         "timeFrom": from, //interval beginning
//         "timeTo": to, // interval end
//         "tripDetector": 0, //use trip detector: 0 - no, 1 - yes
//         "trackColor": '00ffaa', //track color in ARGB format (A - alpha channel or transparency level)
//         "trackWidth": 2, // track line width in pixels
//         "arrows": 0, //show course of movement arrows: 0 - no, 1 - yes
//         "points": 0, // show points at places where messages were received: 0 - no, 1 - yes
//         "pointColor": '00ffaa', // points color
//         "annotations": 0 //show annotations for points: 0 - no, 1 - yes
//     }
//     renderer.createMessagesLayer(params, callback)
// }