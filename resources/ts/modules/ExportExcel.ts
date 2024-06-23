import { exportDataGrid } from 'devextreme/excel_exporter'
import { Workbook } from 'exceljs'
import { saveAs } from 'file-saver'

export function onExporting(event: any) {
    const workbook = new Workbook()
    const worksheet = workbook.addWorksheet('Employees')

    exportDataGrid({
        component: event.component,
        worksheet,
        autoFilterEnabled: true,
    }).then(() => {
        workbook.xlsx.writeBuffer().then((buffer) => {
            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'jadval.xlsx')
        })
    })
    event.cancel = true
}

