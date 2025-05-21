import { useAppStore } from "@/store/useAppStore"

export default class {
    map
    store
    points = []
    pivotLat
    pivotLon
    size
    rectangles
    constructor(canvas, picker = false) {
        if (ENV.PIVOT_LAT == null || ENV.PIVOT_LAT == null) {
            console.error('ENV ga PIVOT_LAT va PIVOT_LAT qiymatlar kiritilmagan')
            return
        }
        // this.pivotLat = 42.32; // Начальная широта
        // this.pivotLon = 63.82; // Начальная долгота
        this.pivotLat = ENV.PIVOT_LAT; // Начальная широта
        this.pivotLon = ENV.PIVOT_LON; // Начальная долгота
        this.size = 50
        this.store = useAppStore()
        this.map = this.createMap(canvas)
        this.rectangles = []

        if (picker) this.map.on('click', this.handleMapClick.bind(this));
    }

    handleMapClick(event) {
        if(event.originalEvent.ctrlKey){
            const row = Math.floor((this.pivotLat - event.latlng.lat) * 111000 / this.size);
            const column = Math.floor((event.latlng.lng - this.pivotLon) * (111000 * Math.cos(this.deg2rad(this.pivotLat))) / this.size);
    
            if (!this.rectangleFind(row, column)) {
                this.drawSquare({ ZonaX: row, ZonaY: column, color: 'red' }, this.size, 1);
            }
            else {
                const { rectangle } = this.rectangleFind(row, column)
                rectangle.remove()
                this.rectangleDelete(row, column)
            }
        }
    }

    rectangleFind(row, column) {
        return this.rectangles.find(rect => rect.row === row && rect.column === column);
    }


    rectanglesClear() {
        this.rectangles.forEach(({ rectangle }) => {
            rectangle.remove()
        })

        this.rectangles = []
    }

    rectangleDelete(row, column) {
        const index = this.rectangles.findIndex(rect => rect.row === row && rect.column === column);
        this.rectangles.splice(index, 1)
    }

    getRectanglePoints() {
        return this.rectangles.map((rect) => {
            return { ZonaX: rect.row, ZonaY: rect.column, color: rect.color }
        })
    }

    createMap(canvas) {
        const sid = wialon.core.Session.getInstance().getId()
        const sess = wialon.core.Session.getInstance()
        const map = L.map(canvas, { zoomControl: false }).setView([this.pivotLat, this.pivotLon], 12)

        // var latlngs = [
        //     [this.pivotLat, this.pivotLon],
        //     [37.77, -122.43],
        //     [34.04, -118.2]
        // ];
        
        // var polyline = L.polyline(latlngs, {color: 'red'}).addTo(map);
        L.TileLayer.WebGis = L.TileLayer.extend({
            initialize: function (url, options) {
                this._url = `http://172.16.0.166:8025/gis_render/{x}_{y}_{z}/${options.userId}/tile.png?sid=${sid}`
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
                z: 17 - tilePoint.z,
                x: tilePoint.x,
                y: tilePoint.y
            }, this.options));
        }
        return map
    }

    drawSquare(item, size, index, withCircle = false) {
        const row = item.ZonaX !== undefined ? item.ZonaX : item.x
        const column = item.ZonaY !== undefined ? item.ZonaY : item.y

        const pivotLat = this.pivotLat;
        const pivotLon = this.pivotLon;

        const boxTL = L.latLng(
            pivotLat - row * (size / 111000),
            pivotLon + column * (size / (111000 * Math.cos(this.deg2rad(pivotLat))))
        )


        const boxBR = L.latLng(
            pivotLat - (row + 1) * (size / 111000),
            pivotLon + (column + 1) * (size / (111000 * Math.cos(this.deg2rad(pivotLat))))
        )
        const rect = L.rectangle([boxTL, boxBR], { color: item.color, weight: 1, opacity: 1, fillOpacity: 0.25 }).addTo(this.map)
        this.rectangles.push({ row, column, rectangle: rect, color: item.color });

        const center = this.getCenterCubic(boxTL, boxBR)

        if (withCircle) {
            const marker = L.marker(center, {
                icon: L.divIcon({ className: 'custom-marker-class', html: index }),
            }).addTo(this.map)

            this.points.push({ rect, marker })
            this.store.points.push({ center, item, image: marker._icon, active: false, index })
        }
    }

    getCenterCubic(boxTL, boxBR) {
        const centerLat = (boxTL.lat + boxBR.lat) / 2;
        const centerLon = (boxTL.lng + boxBR.lng) / 2;

        return L.latLng(centerLat, centerLon);
    }


    drawCubics(points, numbers = true) {
        points.forEach((point, index) => {
            this.drawSquare(point, this.size, index + 1, numbers)
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

    fixedToPoint(point, image) {
        this.store.points.forEach((point) => {
            if (point.image == image) {
                point.active = true
                point.image.classList.add('animate-marker')
            }
            else {
                point.active = false
                point.image.classList.remove('animate-marker')
            }
        })
        this.map.setView(point, 15);
    }

}