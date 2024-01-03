var tile_layer 
export function createMap(sid) {
    L.TileLayer.WebGis = L.TileLayer.extend({
        initialize: function (url, options) {
            init.bind(this)(options, sid)
        },
        getTileUrl: getTile
    });

    const map = L.map('map').setView([42.2628699, 63.891215], 12);
    var sess = wialon.core.Session.getInstance()
    L.tileLayer.webGis = function (url, options) {
        return new L.TileLayer.WebGis(url, options);
    };
    
    L.tileLayer.webGis(sess.getBaseGisUrl('render'), {
        attribution: 'Gurtam Maps',
        minZoom: 1,
        userId: sess.getCurrUser().getId()
    }).addTo(map);


    var res_flags = wialon.item.Item.dataFlag.base | wialon.item.Resource.dataFlag.reports;
    var flags = wialon.item.Item.dataFlag.base | wialon.item.Unit.dataFlag.lastMessage // specify what kind of data should be returned
    var renderer = sess.getRenderer()
    sess.loadLibrary("resourceReports")
    renderer.addListener("changeVersion", update_renderer);
    sess.updateDataFlags([
        { type: "type", data: "avl_resource", flags: res_flags, mode: 0 },
        { type: "type", data: "avl_unit", flags: flags, mode: 0 },
        { type: "type", data: "avl_unit_group", flags: flags, mode: 0 }

    ], (code) => {
        var units = sess.getItems("avl_unit_group")
        executeReport()
        units[14].getUnits().forEach((item) => {
            show_track(item, map)
        })
    })

    return map
}

export function init(options, sid) {
    options = L.setOptions(this, options);

    if (options.detectRetina && L.Browser.retina && options.maxZoom > 0) {
        options.tileSize = Math.floor(options.tileSize / 2);
        options.zoomOffset++;
        if (options.minZoom > 0) {
            options.minZoom--;
        }
        this.options.maxZoom--;
    }
    if (options.bounds) {
        options.bounds = L.latLngBounds(options.bounds);
    }
    this._url = 'http://wl.ngmk.uz' + "/gis_render/{x}_{y}_{z}/" + options.userId +
        `/tile.png?sid=${sid}`
    var subdomains = this.options.subdomains;
    if (typeof subdomains === 'string') {
        this.options.subdomains = subdomains.split('');
    }
}

export function getTile(tilePoint) {
    const tileUrl = L.Util.template(this._url, L.extend({
        s: this._getSubdomain(tilePoint),
        z: 17 - this._map._zoom,
        x: tilePoint.x,
        y: tilePoint.y
    }, this.options));
    return tileUrl
}




export function drawSquare(map, item, size) {
    const row = +item.ZonaY
    const column = +item.ZonaX
    
    const pivotLat = 42.32;
    const pivotLon = 63.82;

    // Рассчитываем координаты углов квадрата
    const boxTL = L.latLng(
        pivotLat - row * (size / 111000), // преобразуем размер в градусы широты
        pivotLon + column * (size / (111000 * Math.cos(deg2rad(pivotLat)))) // преобразуем размер в градусы долготы
    )

    const boxBR = L.latLng(
        pivotLat - (row + 1) * (size / 111000),
        pivotLon + (column + 1) * (size / (111000 * Math.cos(deg2rad(pivotLat))))
    )
    
    const rect = L.rectangle([boxTL, boxBR], { color: 'black', weight: 1, opacity: 1, fillOpacity: 0.25 }).addTo(map)

    rect.on('click', function (event) {
        console.log(item, event)
    })
}

export function update_renderer() {
    var sess = wialon.core.Session.getInstance()
    var renderer = sess.getRenderer()
    if (tile_layer && tile_layer.setUrl) tile_layer.setUrl(sess.getBaseUrl() + "/adfurl" + renderer.getVersion() + "/avl_render/{x}_{y}_{z}/" + sess.getId() + ".png")
}

export function deg2rad(degrees) {
    return degrees * (Math.PI / 180);
}


export const toUnixTime = (year, month, day, hr, min, sec) => {
    const date = new Date(Date.UTC(year, month - 1, day, hr, min, sec));
    return Math.floor(date.getTime() / 1000);
}

export function show_track(unit_id, map) {
    
    var sess = wialon.core.Session.getInstance() // get instance of current Session	
    var renderer = sess.getRenderer()
    //@ts-ignore
    var to =  Math.round(new Date().getTime() / 1000) 
    var from = to - 3600 * 24 - 1 
    
    var unit = sess.getItem(unit_id)
    var color = '00ffaa'
    var pos = unit.getPosition() // get unit position
    if (document.getElementById(unit_id) || !unit || !pos) return
    const image = sess.getBaseUrl() + "/adfurl" + renderer.getVersion() + "/avl_render/{x}_{y}_{z}/" + sess.getId() + ".png"
    // callback is performed, when messages are ready and layer is formed
    const callback = qx.lang.Function.bind((code, layer) => {
        if (layer) {
            var layer_bounds = layer.getBounds()
            if (layer_bounds.length != 4) return
            if (map) {
                // const bounds = new L.LatLngBounds(
                //     L.latLng(layer_bounds[0], layer_bounds[1]),
                //     L.latLng(layer_bounds[2], layer_bounds[3])
                // )
                // map.fitBounds(bounds)
                if (!tile_layer) tile_layer = L.tileLayer(image, { zoomReverse: true, zoomOffset: -1 }).addTo(map)
                else tile_layer.setUrl(image)
            }
        }
    });
    // query params
    const params = {
        "layerName": "route_unit_" + unit_id, // layer name
        "itemId": unit_id, // ID of unit which messages will be requested
        "timeFrom": from, //interval beginning
        "timeTo": to, // interval end
        "tripDetector": 0, //use trip detector: 0 - no, 1 - yes
        "trackColor": color, //track color in ARGB format (A - alpha channel or transparency level)
        "trackWidth": 2, // track line width in pixels
        "arrows": 0, //show course of movement arrows: 0 - no, 1 - yes
        "points": 0, // show points at places where messages were received: 0 - no, 1 - yes
        "pointColor": color, // points color
        "annotations": 0 //show annotations for points: 0 - no, 1 - yes
    }
    renderer.createMessagesLayer(params, callback)
}


export function executeReport() { // execute selected report
    // get data from corresponding fields
    var id_res = 7547
    var id_templ = 3
    var id_unit = 7381
    var sess = wialon.core.Session.getInstance(); // get instance of current Session
    var res = sess.getItem(id_res); // get resource by id
    var from = toUnixTime(2024, 1, 3, '00', '00', 0)
    var to = toUnixTime(2024, 1, 3, '09', '00', 0)

    var interval = { "from": from, "to": to, "flags": wialon.item.MReport.intervalFlag.absolute };
    var template = res.getReport(id_templ); // get report template by id
    res.execReport(template, id_unit, 0, interval, (code, data) => console.log(code, data))
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