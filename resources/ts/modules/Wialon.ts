import moment from "moment";
import { useAppStore } from "@/store/useAppStore";
export default class {
	layer;
	map;
	store = useAppStore();
	session = wialon.core.Session.getInstance();
	onSelectStart = null;
	onSelectEnd = null;
	onInit = null;
	constructor(map = null) {
		this.map = map;
		this.initWialon();
	}

	async initWialon() {
		await this.initReports();

		if (this.onInit) this.onInit();
	}

	async initReports() {
		return await new Promise(
			function (resolve) {
				const render = this.session.getRenderer();

				render.addListener("changeVersion", () => {
					if (this.layer?.setUrl)
						this.layer.setUrl(
							this.getTiles(this.session.getRenderer())
						);
				});

				this.session.loadLibrary("resourceReports");

				this.session.updateDataFlags(
					[
						{
							type: "type",
							data: "avl_resource",
							flags:
								wialon.item.Item.dataFlag.base |
								wialon.item.Resource.dataFlag.reports,
							mode: 0,
						},
						{
							type: "type",
							data: "avl_unit_group",
							flags:
								wialon.item.Item.dataFlag.base |
								wialon.item.Unit.dataFlag.lastMessage,
							mode: 0,
						},
					],
					() => {
						resolve(this.session.getItems("avl_unit_group"));
						const qaynarov = this.session.getItems("avl_resource")[0];
					}
				);
			}.bind(this)
		);
	}

	public async offerdersReport(group_id, from, to) {
		const qaynarov = this.session.getItems("avl_resource")[0];
		const reports = qaynarov.getReports();

		return await new Promise((resolve) => {
			qaynarov.execReport(reports[59], group_id, 0,
				{ from: moment(from).unix(), to: moment(to).unix(), flags: wialon.item.MReport.intervalFlag.absolute },
				async (error, report) => {

					var allrows = [];
					const rows = await new Promise<[]>((resolve) => {
						report.getTableRows(0, 0, 100, (error, rows) => {
							resolve(rows);
						});
					});
					console.log(rows);

					const detailPromises = rows.map((row: any) => {
						return new Promise((resolve, reject) => {
							report.getRowDetail(0, row.n,
								function (error, column) {
									// console.log(column, 'column');

									if (error) return reject(error)

									const array = column.map((row) => {
										return {
											transport: row.c[1],
											qoida: row.c[2].t,
											batafsil: row.c[4].t,
											manzil: row.c[5].t,
										};
									});

									allrows = allrows.concat(array);
									resolve("good");
								}
							);
						});
					});

					await Promise.all(detailPromises);

					// Передаем массив allrows в resolve
					resolve(allrows); //syuda xochu peredat massiv allrows
				}
			);
		});
	}

	public async greyderReport(from, to) {
		const qaynarov = this.session.getItems("avl_resource")[0];
		const reports = qaynarov.getReports();
		return await new Promise((resolve) => {
			qaynarov.execReport(reports[60], 10259, 0,
				{ from: from, to: to, flags: wialon.item.MReport.intervalFlag.absolute },
				async () => {
					var renderer = this.session.getRenderer();
					if (!this.layer)
						this.layer = L.tileLayer(this.getTiles(renderer), {
							zoomReverse: true,
							zoomOffset: -1,
						}).addTo(this.map);
					else this.layer.setUrl(this.getTiles(renderer));
					resolve("magic");
				}
			);
		});
	}

	public async waterTruckReport(from, to) {
		const qaynarov = this.session.getItems("avl_resource")[0];
		const reports = qaynarov.getReports();

		return await new Promise((resolve) => {
			qaynarov.execReport(reports[54], 10054, 0,
				{ from: from, to: to, flags: wialon.item.MReport.intervalFlag.absolute },
				async () => {
					var renderer = this.session.getRenderer();
					if (!this.layer)
						this.layer = L.tileLayer(this.getTiles(renderer), {
							zoomReverse: true,
							zoomOffset: -1,
						}).addTo(this.map);
					else this.layer.setUrl(this.getTiles(renderer));
					resolve("magic");
				}
			);
		});
	}

	public async executeReport(group_id, from, to) {
		var user = this.session.getItems("avl_resource").find((item) => item._id == 9779);
		var template = user.getReports();

		return await new Promise(
			function (resolve) {
				user.execReport(
					template[1],
					group_id,
					0,
					{
						from: from,
						to: to,
						flags: wialon.item.MReport.intervalFlag.absolute,
					},
					() => {
						var renderer = this.session.getRenderer();
						if (!this.layer)
							this.layer = L.tileLayer(this.getTiles(renderer), {
								zoomReverse: true,
								zoomOffset: -1,
							}).addTo(this.map);
						else this.layer.setUrl(this.getTiles(renderer));
						resolve("magic");
					}
				);
			}.bind(this)
		);
	}

	public async selectGroup(group) {
		if (this.onSelectStart) this.onSelectStart();

		const to = moment().unix();
		const from = to - 3600 * 24 - 1;

		this.store.UIData.active = group.id;
		await this.executeReport(group.id, from, to);
		const { data: points } = await axios.post("/api/tracks/show", {
			index: group.id,
			oldDays: this.store.oldDays,
			hourPeriod: this.store.hourPeriod,
			speedRange: this.store.speedRange,
			selectedTime: moment(this.store.time).format("YYYY-MM-DD HH:mm"),
		});

		if (this.onSelectEnd) this.onSelectEnd(points);
	}

	getTiles(render) {
		const sess = this.session;
		return `${sess.getBaseUrl()}/adfurl${render.getVersion()}/avl_render/{x}_{y}_{z}/${sess.getId()}.png`;
	}












	public async greyderTable(group_id, from, to) {
		const qaynarov = this.session.getItems("avl_resource")[0];
		const reports = qaynarov.getReports();
		return await new Promise(async (resolve) => {
			const report: any = await new Promise<[]>((res) =>
				qaynarov.execReport(reports[65], group_id, 0,
					{ from: from, to: to, flags: 0 },
					(error, report) => res(report)
				)
			);

			const allrows: any = {};

			await this.getTableById(0, report, (col) => {
				const period = col.c[4]['v'] - col.c[3]['v']
				if (allrows[col.c[1]]) {
					allrows[col.c[1]].time_in_excavator += period
					allrows[col.c[1]].counts.add(col.c[2])
				}
				else {
					allrows[col.c[1]] = {}
					if (isNaN(period)) {
						allrows[col.c[1]].time_in_excavator = 0
						allrows[col.c[1]].counts = new Set()
						return
					}
					allrows[col.c[1]].time_in_excavator = period
					allrows[col.c[1]].counts = new Set([col.c[2]])
				}
			});

			await this.getTableById(1, report, (col) => {
				const period = col.c[4]['v'] - col.c[3]['v']
				if (allrows[col.c[1]] && allrows[col.c[1]].in_smena) {
					allrows[col.c[1]].in_smena += period
				}
				else {
					if (isNaN(period)) return allrows[col.c[1]].in_smena = 0
					allrows[col.c[1]].in_smena = period
				}
			});
			await this.getTableById(2, report, (col) => {
				const period = col['t2'] - col['t1']
				if (allrows[col.c[1]] && allrows[col.c[1]].in_not_excavator_move) {
					allrows[col.c[1]].in_not_excavator_move += period
				}
				else {
					if (isNaN(period)) return allrows[col.c[1]].in_not_excavator_move = 0
					allrows[col.c[1]].in_not_excavator_move = period
				}
			});
			await this.getTableById(3, report, (col) => {
				const period = col['t2'] - col['t1']
				if (allrows[col.c[1]] && allrows[col.c[1]].in_not_excavator_stop) {
					allrows[col.c[1]].in_not_excavator_stop += period
				}
				else {
					if (isNaN(period)) return allrows[col.c[1]].in_not_excavator_stop = 0
					allrows[col.c[1]].in_not_excavator_stop = period
				}
			});
			resolve(allrows);
		});
	}


	async getTableById(id, report, callback) {
		const rows = await new Promise<[]>((res) => report.getTableRows(id, 0, 10000, (err, rows) => res(rows)))
		const detailPromises = rows.map((row: any) => new Promise((resolve, reject) => {
			report.getRowDetail(id, row.n, (err, cols) => {
				cols.forEach(col => { callback(col) })
				resolve("good");
			})
		}))

		await Promise.all(detailPromises);
	}
}



