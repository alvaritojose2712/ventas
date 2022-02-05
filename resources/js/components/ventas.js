import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

export default function VentasComponet({
	ventasData,
	getVentasClick,
	setfechaventas,
	fechaventas,
	moneda
}) {
	
	let dataGrafica = ventasData.grafica ? ventasData.grafica:[]
	

	return (
		<div className="container">
			<div className="input-group mb-4">
				<div className="input-prepend-text">
					<button className="btn btn-outline-success" onClick={getVentasClick}>Actualizar</button>
				</div>
				<input type="date" className="form-control" onChange={e=>setfechaventas(e.target.value)} value={fechaventas}/>
			</div>	
			<div className="container-fluid">
				<div className="row">
					<div className="col p-0">
						{ventasData?
							<div className="btn-group">
								<button className="btn btn-outline-success fs-1">Tot. {moneda(ventasData["total"])}</button>
								<button className="btn btn-outline-sinapsis fs-4">Efec. {moneda(ventasData[3])}</button>
								<button className="btn btn-outline-sinapsis fs-4">Deb. {moneda(ventasData[2])}</button>
								<button className="btn btn-outline-sinapsis fs-4">Trans. {moneda(ventasData[1])}</button>
							</div>
						:null}

					</div>
					<div className="col p-0">
						{ventasData?
							<span className="text-success pull-right fs-2">
								<i className="fa fa-user m-2"></i>
								<button className="btn btn-xl btn-outline-success btn-circle fs-3">
									{ventasData["numventas"]}
								</button>
							</span>
						:null}						
					</div>	
				</div>
			</div>
			<div className='m-3 d-flex justify-content-center'>
				<LineChart width={800} height={300} data={dataGrafica}>
					<Line type="monotone" dataKey="monto" stroke="#8884d8" />
					<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
					<XAxis dataKey="hora" />
					<YAxis />
					<Tooltip />
				</LineChart>
			</div>
		</div>
	)
}