export default class {
    map
    rectangles = []
    constructor(sid) {
        this.map = this.createMap(sid)
    }

    createMap(sid) {
        const sess = wialon.core.Session.getInstance()
        const map = L.map('map', { zoomControl: false }).setView([42.2628699, 63.891215], 12)
    
        L.TileLayer.WebGis = L.TileLayer.extend({
            initialize: function (url, options) {
                this._url = `http://wl.ngmk.uz/gis_render/{x}_{y}_{z}/${options.userId}/tile.png?sid=${sid}`
            },
            getTileUrl: getTile
        })
    
        new L.TileLayer.WebGis(sess.getBaseGisUrl('render'), {
            attribution: 'NKMK SHKB',
            minZoom: 1,
            userId: sess.getCurrUser().getId()
        }).addTo(map)

        function getTile(tilePoint) {
            return L.Util.template(this._url, L.extend({
                s: this._getSubdomain(tilePoint),
                z: 17 - this._map._zoom,
                x: tilePoint.x,
                y: tilePoint.y
            }, this.options));
        }

        return map
    }

    drawSquare(item, size) {
        const row = +item.ZonaX
        const column = +item.ZonaY
    
        const pivotLat = 42.32;
        const pivotLon = 63.82;
    
        const boxTL = L.latLng(
            pivotLat - row * (size / 111000), // преобразуем размер в градусы широты
            pivotLon + column * (size / (111000 * Math.cos(this.deg2rad(pivotLat)))) // преобразуем размер в градусы долготы
        )
    
        const boxBR = L.latLng(
            pivotLat - (row + 1) * (size / 111000),
            pivotLon + (column + 1) * (size / (111000 * Math.cos(this.deg2rad(pivotLat))))
        )
    
        const rect = L.rectangle([boxTL, boxBR], { color: 'black', weight: 1, opacity: 1, fillOpacity: 0.25 }).addTo(this.map)
        this.rectangles.push(rect)
        rect.on('click', function (event) {
            console.log(item, event)
        })
    }

    drawCubics(points) {
        points.forEach((point) => {
            this.drawSquare(point, 50)
        })
    }

    removeCubics() {
        this.rectangles.forEach(rect => {
            this.map.removeLayer(rect)
        })
    }

    deg2rad(degrees) {
        return degrees * (Math.PI / 180);
    }
    
}