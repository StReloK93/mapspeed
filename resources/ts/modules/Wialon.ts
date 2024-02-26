import moment from 'moment'
import { useAppStore } from "@/store/useAppStore"
export default class {
    layer
    map
    store = useAppStore()
    session = wialon.core.Session.getInstance()
    onSelectStart = null
    onSelectEnd = null
    onInit = null
    constructor(map) {
        this.map = map
        this.initWialon()
    }

    async initWialon() {
        const groups: any = await this.initReports()
        if (this.onInit) this.onInit(groups)
    }

    groupsUI(groups) {
        
        groups.forEach((group) => {
            if(group.getName().includes('Ekskavator')) return
            const groupGen = this.getGroupName(group)
            
            this.store.UIData.groups.push({
                id: group.getId(), name: groupGen.name,
                number: groupGen.onlyNumber == "" ? 0 : groupGen.onlyNumber
            })
        })
    }

    async initReports() {
        return await new Promise(function (resolve) {
            const render = this.session.getRenderer()
            render.addListener("changeVersion", () => {
                if (this.layer?.setUrl) this.layer.setUrl(this.getTiles(this.session.getRenderer()))
            })
            this.session.loadLibrary("resourceReports")
            this.session.updateDataFlags([
                { type: "type", data: "avl_resource", flags: wialon.item.Item.dataFlag.base | wialon.item.Resource.dataFlag.reports, mode: 0 },
                { type: "type", data: "avl_unit_group", flags: wialon.item.Item.dataFlag.base | wialon.item.Unit.dataFlag.lastMessage, mode: 0 }

            ], () => resolve(this.session.getItems("avl_unit_group")))
        }.bind(this))
    }

    public async executeReport(group_id, from, to) {
        var renderer = this.session.getRenderer()
        var user = this.session.getItems("avl_resource").find((item) => item._id == 9779)
        var template = user.getReports()
        
        return await new Promise(function (resolve) {
            user.execReport(
                template[1],
                group_id, 0,
                { "from": from, "to": to, "flags": wialon.item.MReport.intervalFlag.absolute },
                () => {
                    if (!this.layer) this.layer = L.tileLayer(this.getTiles(renderer), { zoomReverse: true, zoomOffset: -1 }).addTo(this.map)
                    else this.layer.setUrl(this.getTiles(renderer))
                    resolve('magic')
                }
            )
        }.bind(this))

    }


    async selectGroup(group_id) {
        if (this.onSelectStart) this.onSelectStart()
        
        const select = this.store.UIData.groups.find((group) => group.id == group_id)
        const to = moment().unix()
        const from = to - 3600 * 24 - 1
        
        // if (this.store.UIData.active == group_id) return
        this.store.UIData.active = group_id
        this.executeReport(group_id, from, to)
        const { data: points } = await axios.post('/api/tracks/show', {
            index: select.number,
            oldDays: this.store.oldDays,
            hourPeriod: this.store.hourPeriod,
            speedRange: this.store.speedRange,
            selectedTime: moment(this.store.time).format('YYYY-MM-DD HH:mm'),
        })

        if (this.onSelectEnd) this.onSelectEnd(points)
    }

    getTiles(render) {
        const sess = this.session
        return `${sess.getBaseUrl()}/adfurl${render.getVersion()}/avl_render/{x}_{y}_{z}/${sess.getId()}.png`
    }


    getGroupName(group) {
        const onlyNumber = group.getName().replace(/\D/g, "")
        

        if (onlyNumber == "") var name = "Barcha"
        else if (onlyNumber == "55") var name = "55 tn"
        else if (onlyNumber == "90") var name = "90 tn"
        else if (onlyNumber == "91") var name = "Komatsu"
        else if (onlyNumber == "92") var name = "CAT"

        return { onlyNumber, name }
    }

}