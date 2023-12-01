import { ResponsiveBar } from '@nivo/bar'
import { getRandomRangeInt } from '@/utils/numberTools';
import NominalFormat from '@/components/main/NominalFormat';

type Props = {
	data: any
}

const RenderGraph = (props: Props) => {
	const { data } = props

	return (
		<div className="card-body css-awn-fan-eg3" style={{ height: '322px' }}>
			<div className="css-na-fawga">
				<>
					<NivoChart data={data} />
				</>
			</div>
		</div>
	)
}

export default RenderGraph;

type Props2 = {
	data: any
}

const NivoChart = (props: Props2) => {
	const { data } = props
	const detailChartHover = (e: any) => {
		let data = {
			anggaran: 0,
			realisasi: 0,
			label: '-',
			percent: 0,
		}

		if (e != null && e.data != null) {
			data = e.data
			data.percent = Number(((data.realisasi / data.anggaran) * 100).toFixed(2))
		}
		return (
			<div className="css-dash-cmi2_cmo-af3">
				<div className="css-mi-w1ga">
					<div className="css-mi003n-a_a--2ja">
						<p className='font-12 text-semibold'>{data.label}</p>
						<div className="badge" style={{ background: '#FFFFFF', color: '#2B2E4A' }}>
							{data.percent}%
						</div>
						{/* <p className='font-12'>{data.percent}</p> */}
					</div>
					<div className="css-nio-w_a-dash">
						<p className='css-oo-m30a_afj-aw2ta'>Anggaran</p>
						<NominalFormat displayType='text' prefix='Rp' className='css-ni09-w-c2_cef' value={data.anggaran} />
					</div>
					<div className="css-nio-w_a-dash">
						<p className='css-oo-m30a_afj-aw2ta'>Realisasi</p>
						<NominalFormat displayType='text' prefix='Rp' className='css-ni09-w-c2_cef' value={data.realisasi} />
					</div>
				</div>
			</div>
		)
	}

	const lineGraphSettings = {
		// "background": "#ffffff",
		"text": {
			"fontSize": 11,
			"fill": "#FFF",
			"outlineWidth": 0,
			"outlineColor": "transparent"
		},
		"axis": {
			"domain": {
				"line": {
					"stroke": "#777777",
					"strokeWidth": 0
				}
			},
			"legend": {
				"text": {
					"fontSize": 12,
					"fill": "#333333",
					"outlineWidth": 0,
					"outlineColor": "transparent"
				}
			},
			"ticks": {
				"line": {
					"stroke": "#777777",
					"strokeWidth": 0
				},
				"text": {
					"fontSize": 9,
					"fill": "#555558",
					"outlineWidth": 0,
					"outlineColor": "transparent"
				}
			}
		},
		"grid": {
			"line": {
				"stroke": "#dddddd",
				"strokeWidth": 1
			}
		},
		"legends": {
			"title": {
				"text": {
					"fontSize": 11,
					"fill": "#333333",
					"outlineWidth": 0,
					"outlineColor": "transparent"
				}
			},
			"text": {
				"fontSize": 11,
				"fill": "#333333",
				"outlineWidth": 0,
				"outlineColor": "transparent"
			},
			"ticks": {
				"line": {},
				"text": {
					"fontSize": 10,
					"fill": "#333333",
					"outlineWidth": 0,
					"outlineColor": "transparent"
				}
			}
		},
		"annotations": {
			"text": {
				"fontSize": 13,
				"fill": "#333333",
				"outlineWidth": 2,
				"outlineColor": "#ffffff",
				"outlineOpacity": 1
			},
			"link": {
				"stroke": "#000000",
				"strokeWidth": 1,
				"outlineWidth": 2,
				"outlineColor": "#ffffff",
				"outlineOpacity": 1
			},
			"outline": {
				"stroke": "#000000",
				"strokeWidth": 2,
				"outlineWidth": 2,
				"outlineColor": "#ffffff",
				"outlineOpacity": 1
			},
			"symbol": {
				"fill": "#000000",
				"outlineWidth": 2,
				"outlineColor": "#ffffff",
				"outlineOpacity": 1
			}
		},
		"tooltip": {
			"container": {
				"background": "#ffffff",
				"fontSize": 12
			},
			"basic": {},
			"chip": {},
			"table": {},
			"tableCell": {},
			"tableCellValue": {}
		}
	};

	const n = [
		{
			"label": "Pendapatan Daerah",
			"anggaran": data[0].count,
			"realisasi": getRandomRangeInt(144737, data[0].count)
		},
		{
			"label": "Belanja Daerah",
			"anggaran": data[1].count,
			"realisasi": getRandomRangeInt(144737, data[1].count)
		},
		{
			"label": "Penerimaan Pembiayaan",
			"anggaran": data[2].count,
			"realisasi": getRandomRangeInt(144737, data[2].count)
		},
		{
			"label": "Pengeluaran Pembiayaan",
			"anggaran": data[3].count,
			"realisasi": getRandomRangeInt(144737, data[3].count)
		},
	]

	return (
		<>
			<ResponsiveBar
				data={n}
				keys={[
					'anggaran',
					'realisasi'
				]}
				indexBy="label"
				groupMode="grouped"
				margin={{ top: 50, right: -50, bottom: 20, left: -50 }}
				padding={0.3}
				valueScale={{ type: 'linear' }}
				indexScale={{ type: 'band', round: true }}
				colors={['#4669FA', '#2B2E4A']}
				theme={lineGraphSettings}
				borderRadius={7}
				borderWidth={2}
				borderColor={'#FFF'}
				innerPadding={5}
				enableGridY={false}
				defs={[
					{
						id: 'dots',
						type: 'patternDots',
						background: 'inherit',
						color: '#FFF',
						size: 4,
						padding: 1,
						stagger: true
					},
					{
						id: 'lines',
						type: 'patternLines',
						background: 'inherit',
						color: '#FFF',
						rotation: -45,
						lineWidth: 6,
						spacing: 10
					}
				]}
				labelTextColor={"#FFF"}
				axisTop={null}
				axisRight={null}
				labelSkipWidth={12}
				labelSkipHeight={12}
				enableLabel={false}
				tooltip={(e: any) => detailChartHover(e)}
				role="application"
				ariaLabel="Chart Realization"
				barAriaLabel={e => e.id + ": " + e.formattedValue + " in country: " + e.indexValue}
			/>
		</>
	)
}