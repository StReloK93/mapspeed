import { useAppStore } from "@/store/useAppStore"

export default class {
    map
    store
    points = []
    constructor(sid) {
        this.store = useAppStore()
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
        const center = this.getCenterCubic(boxTL, boxBR)
        const rect = L.rectangle([boxTL, boxBR], { color: 'black', weight: 1, opacity: 1, fillOpacity: 0.25 }).addTo(this.map)
        const marker = L.marker(center).addTo(this.map)
        marker._icon.classList.add('animate-marker')

        this.points.push({ rect, marker })
        this.store.points.push({ center, item })
        rect.on('click', function (event) { })
    }

    getCenterCubic(boxTL, boxBR) {
        const centerLat = (boxTL.lat + boxBR.lat) / 2;
        const centerLon = (boxTL.lng + boxBR.lng) / 2;

        return L.latLng(centerLat, centerLon);
    }


    drawCubics(points) {
        points.forEach((point) => {
            this.drawSquare(point, 50)
        })
    }

    removeCubics() {
        this.points.forEach(object => {
            this.map.removeLayer(object.rect)
            this.map.removeLayer(object.marker)
        })
        this.store.points = []
        this.points = []
    }

    deg2rad(degrees) {
        return degrees * (Math.PI / 180);
    }

    fixedToPoint(point) {
        this.map.setView(point, 15);
    }

}