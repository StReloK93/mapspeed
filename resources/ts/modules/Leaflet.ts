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
        this.pivotLat = 42.32; // Начальная широта
        this.pivotLon = 63.82; // Начальная долгота
        this.size = 50
        this.store = useAppStore()
        this.map = this.createMap(canvas)
        this.rectangles = []

        // for (let index = 0; index < 250; index++) {
        //     for (let fix = 0; fix < 250; fix++) {
        //         if(fix%5 == 0 && index%5 == 0) this.drawSquare({ZonaX: index, ZonaY: fix}, 50, 1)
        //     }
        // }
        if (picker) this.map.on('click', this.handleMapClick.bind(this));
    }

    handleMapClick(e) {
        // Получаем координаты клика
        const clickedLat = e.latlng.lat;
        const clickedLon = e.latlng.lng;

        // Вычисляем индексы ячейки сетки на основе координатов клика
        const row = Math.floor((this.pivotLat - clickedLat) * 111000 / this.size);
        const column = Math.floor((clickedLon - this.pivotLon) * (111000 * Math.cos(this.deg2rad(this.pivotLat))) / this.size);

        
        // Рисуем квадрат
        if (!this.rectangleFind(row, column)) {
            this.drawSquare({ ZonaX: row, ZonaY: column }, this.size, 1);
        }
        else {
            const { rectangle } = this.rectangleFind(row, column)
            rectangle.remove()
            this.rectangleDelete(row, column)
        }

    }

    rectangleFind(row, column) {
        return this.rectangles.find(rect => rect.row === row && rect.column === column);
    }


    rectanglesClear(){
        this.rectangles.forEach(({rectangle}) => {
            rectangle.remove()
        })

        this.rectangles = []
    }

    rectangleDelete(row, column) {
        const index = this.rectangles.findIndex(rect => rect.row === row && rect.column === column);
        this.rectangles.splice(index, 1)
    }

    getRectanglePoints(){
        return this.rectangles.map((rect) => {
            return { ZonaX: rect.row, ZonaY: rect.column }
        })
    }

    createMap(canvas) {
        const sid = wialon.core.Session.getInstance().getId()
        const sess = wialon.core.Session.getInstance()
        const map = L.map(canvas, { zoomControl: false }).setView([42.2628699, 63.891215], 12)

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
                z: 17 - tilePoint.z,
                x: tilePoint.x,
                y: tilePoint.y
            }, this.options));
        }
        return map
    }

    drawSquare(item, size, index, withCircle = false) {
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
        const rect = L.rectangle([boxTL, boxBR], { color: 'red', weight: 1, opacity: 1, fillOpacity: 0.25 }).addTo(this.map)
        this.rectangles.push({ row, column, rectangle: rect });

        const center = this.getCenterCubic(boxTL, boxBR)

        if(withCircle){
            const marker = L.marker(center, {
                icon: L.divIcon({ className: 'custom-marker-class', html: index}),
            }).addTo(this.map)
    
            this.points.push({ rect, marker })
            this.store.points.push({ center, item, image: marker._icon, active: false, index })
        }

        // this.store.points = this.store.points.sort((d1, d2) => (
        //     +d1.item.SpeedAvg - +d1.item.SpeedAvgL > +d2.item.SpeedAvg - +d2.item.SpeedAvgL
        // ) ? -1 : 1)
    }

    getCenterCubic(boxTL, boxBR) {
        const centerLat = (boxTL.lat + boxBR.lat) / 2;
        const centerLon = (boxTL.lng + boxBR.lng) / 2;

        return L.latLng(centerLat, centerLon);
    }


    drawCubics(points) {
        points.forEach((point, index) => {
            this.drawSquare(point, 50, index + 1, true)
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