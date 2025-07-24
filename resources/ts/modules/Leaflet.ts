import { useAppStore } from "@/store/useAppStore"
interface IDrawLine {
    circle: any,
    color: any,
    line: any,
    point: any[],
}

export default class {
    map
    store
    points = []
    drawPoints: IDrawLine[] = []
    pivotLat
    pivotLon
    size
    rectangles
    selectedCircle: IDrawLine
    onSelectCircle: Function
    onClearSelectCircle: Function
    constructor(canvas, picker = 0) {
        if (ENV.PIVOT_LAT == null || ENV.PIVOT_LAT == null) {
            console.error('ENV ga PIVOT_LAT va PIVOT_LAT qiymatlar kiritilmagan')
            return
        }

        this.pivotLat = ENV.PIVOT_LAT; // Начальная широта
        this.pivotLon = ENV.PIVOT_LON; // Начальная долгота
        this.size = 50
        this.store = useAppStore()
        this.map = this.createMap(canvas)
        this.rectangles = []
        this.drawPoints = []
        if (picker == 1) this.map.on('click', this.handleMapClick.bind(this));
        if (picker == 2) this.writeLine(this.map)

    }

    handleMapClick(event) {

        //      DECLARE @Y0 FLOAT = 42.32;
        //      DECLARE @X0 FLOAT = 63.82;

        //      DECLARE @ZonaX INT = FLOOR((@Y0 - @Y) * 111000 / 50);
        //      DECLARE @ZonaY INT = FLOOR(((@X0 - @X) * (111000 * COS(@Y0 * (PI() / 180)))) / 50);



        // this.size = 50
        // this.pivotLat = 42.32; // Начальная широта
        // this.pivotLon = 63.82; // Начальная долгота
        // deg2rad(degrees) {
        //     return degrees * (Math.PI / 180);
        // }

        if (event.originalEvent.ctrlKey) {
            const row = Math.floor((this.pivotLat - event.latlng.lat) * 111000 / this.size);
            const column = Math.floor((this.pivotLon - event.latlng.lng) * (111000 * Math.cos(this.deg2rad(this.pivotLat))) / this.size);
            console.log(row, column);

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



    drawSquare(item, size, index, withCircle = false) {

        const row = item.ZonaX !== undefined ? +item.ZonaX : item.x
        const column = item.ZonaY !== undefined ? +item.ZonaY : item.y

        console.log(row, column);


        const pivotLat = this.pivotLat;
        const pivotLon = this.pivotLon;
        const latCos = Math.cos(this.deg2rad(pivotLat));
        const boxTL = L.latLng(
            pivotLat - row * (size / 111000),
            pivotLon - column * (size / (111000 * latCos))
        );

        const boxBR = L.latLng(
            pivotLat - (row + 1) * (size / 111000),
            pivotLon - (column + 1) * (size / (111000 * latCos))
        );


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

    geetDrawPoints() {
        return this.drawPoints.map((drawPoint, index) => ({
            index: index,
            lat: drawPoint.point[0],
            lng: drawPoint.point[1],
            color: drawPoint.color,
        }))
    }

    writeLine(currentMap) {

        currentMap.on('click', (event) => {
            const point = [event.latlng.lat, event.latlng.lng]
            if (event.originalEvent.target.classList.contains('circle')) return

            if (this.selectedCircle) movePoint(point)
            else createPoint(point)

        });




        const movePoint = (point) => {
            this.selectedCircle.circle.setLatLng(point);
            this.selectedCircle.point = point

            this.selectedCircle.circle.setStyle({ color: this.selectedCircle.color })

            if (this.selectedCircle.line) this.selectedCircle.line.setStyle({ color: this.selectedCircle.color })

            this.reDrawLines()

            if (this.onClearSelectCircle) this.onClearSelectCircle()

            this.selectedCircle = null
        }



        const createPoint = (point) => {
            const circle = this.createCircle(point)


            if (this.drawPoints.length > 0) {
                var line = L.polyline([this.drawPoints.at(-1).point, point], { color: 'red', weight: 2, interactive: false }).addTo(currentMap);
            }
            this.drawPoints.push({ point: point, circle: circle, line: line, color: 'red' })
        }

    }

    createCircle(point, color = 'red') {
        const circle = L.circle(point, { radius: 10, weight: 1, color: color }).addTo(this.map);
        circle._path.classList.add('circle')


        circle.on('click', () => {
            if (this.selectedCircle) {
                this.selectedCircle.circle.setStyle({ color: this.selectedCircle.color })
                if (this.selectedCircle.line) {
                    this.selectedCircle.line.setStyle({ color: this.selectedCircle.color })
                }
            }

            this.selectedCircle = this.drawPoints.find((gedo) => gedo.circle._leaflet_id == circle._leaflet_id)
            this.selectedCircle.circle.setStyle({ color: 'blue' })


            if (this.selectedCircle.line) this.selectedCircle.line.setStyle({ color: 'blue' })
            if (this.onSelectCircle) this.onSelectCircle()
        });


        return circle
    }

    changeColorDrawLine(color) {
        if (this.selectedCircle) {
            if (this.selectedCircle.line) this.selectedCircle.line.setStyle({ color: color })
            this.selectedCircle.circle.setStyle({ color: color })
            this.selectedCircle.color = color
            this.selectedCircle = null
            this.onClearSelectCircle()
        }
    }

    clearDrawLinePoints() {
        this.drawPoints.forEach((drawPoint) => {
            drawPoint.circle.remove()
            if (drawPoint.line) drawPoint.line.remove()
        })

        this.drawPoints = []
    }

    deleteDrawLine() {
        if (this.selectedCircle) {
            const index = this.drawPoints.findIndex((gedo) => gedo.circle == this.selectedCircle.circle)
            const selectedPoint = this.drawPoints.find((gedo) => gedo.circle == this.selectedCircle.circle)

            if (index == 0) {
                selectedPoint.circle.remove()
                this.drawPoints[1].line.remove()
                this.drawPoints.splice(index, 1)
                this.reDrawLines()

                this.onClearSelectCircle()
            }
            else if (index > 0) {

                selectedPoint.circle.remove()
                selectedPoint.line.remove()
                this.drawPoints.splice(index, 1)
                this.reDrawLines()

                this.onClearSelectCircle()
            }
        }
    }



    reDrawLines() {
        this.drawPoints.find((drawPoint, index) => {
            if (index != 0) {
                drawPoint.line.remove()
                const lat = this.drawPoints[index - 1].point
                var line = L.polyline([lat, drawPoint.point], { color: drawPoint.color, weight: 2, interactive: false }).addTo(this.map);
                drawPoint.line = line
            }
        })
    }

    reDrawLinesBase(points: any[]) {
        points.forEach((drawPoint, index) => {
            const point = [drawPoint.lat, drawPoint.lng]
            const circle = this.createCircle([drawPoint.lat, drawPoint.lng], drawPoint.color)
            if (index == 0) {
                this.drawPoints.push({ point: point, circle: circle, line: null, color: drawPoint.color })
            }
            else {
                const oldPoint = [points[index - 1].lat, points[index - 1].lng]
                var line = L.polyline([oldPoint, point], { color: drawPoint.color, weight: 2, interactive: false }).addTo(this.map);
                this.drawPoints.push({ point: point, circle: circle, line: line, color: drawPoint.color })
            }
        });
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