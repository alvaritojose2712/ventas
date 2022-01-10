function Cierre({
	caja_usd,
	caja_cop,
	caja_bs,
	caja_punto,

	notaCierre,

	dejar_usd,
	dejar_cop,
	dejar_bs,

	onchangecaja,
	cierre,
	cerrar_dia,
	total_caja_neto,
	total_punto,
	fechaCierre,
	setFechaCierre,

	viewCierre,
	setViewCierre,
	toggleDetallesCierre,
	setToggleDetallesCierre,
	guardar_cierre,
	total_dejar_caja_neto,

	guardar_usd,
	setguardar_usd,
	guardar_cop,
	setguardar_cop,
	guardar_bs,
	setguardar_bs,

	number,
}) {


	
	return (
		<div className="container-fluid">
			<h5>Fecha de cierre: <input type="date" required={true} value={fechaCierre} className="form-control" onChange={e=>setFechaCierre(e.target.value)}/></h5>
			{cierre["fecha"]?
				<form onSubmit={cerrar_dia}>
					
					<table className="table table-bordered">
						<thead>
							<tr>
								<td colSpan="2" className="d-flex justify-content-between">
									<button className="btn btn-arabito" onClick={cerrar_dia}><i className="fa fa-cogs"></i></button>
								</td>
								<td>
								</td>
								<td className="text-center">
									<h4>Se ha facturado:</h4>
								</td>
							</tr>
							<tr className="table-active">
								<td rowSpan="2" className="align-middle">
									<h4>¿Cuánto hay en caja?</h4>
									<div>
										<div className="row">
											<div className="col">
												<div className="input-group mb-3">
												  <div className="input-group-prepend w-50">
												    <span className="input-group-text">Dólar USD($)</span>
												  </div>
												  <input type="text" className="form-control" placeholder="$" name="caja_usd" value={caja_usd} onChange={onchangecaja}/>
												</div>
												
											</div>
											<div className="col">
												<div className="input-group mb-3">
												  <div className="input-group-prepend w-50">
												    <span className="input-group-text">Pesos COP.</span>
												  </div>
												  <input type="text" className="form-control" placeholder="COP" name="caja_cop" value={caja_cop} onChange={onchangecaja}/>
												</div>
												
											</div>
											<div className="col">
												<div className="input-group mb-3">
												  <div className="input-group-prepend w-50">
												    <span className="input-group-text">Bolívares VE.</span>
												  </div>
												  <input type="text" className="form-control" placeholder="Bs." name="caja_bs" value={caja_bs} onChange={onchangecaja}/>
												</div>
												
											</div>
										</div>
										<div className="input-group mb-3 w-50">
										  <div className="input-group-prepend w-25">
										    <span className="input-group-text">Total.</span>
										  </div>
										  <input type="text" value={total_caja_neto} className="form-control" disabled={true}/>
										</div>
									</div>
								</td>
								<td className="align-middle text-center">
									{toggleDetallesCierre?
										<div>
											<h6>Entregado</h6>
											{cierre["entregado"]}
											<h6>Pendiente</h6>
											{cierre["pendiente"]}
											<h6>Caja inicial</h6>
											{cierre["caja_inicial"]}
										</div>
									:null}
									<h2>{cierre["total_caja"]?cierre["total_caja"]:0}</h2>
								</td>
								<td className="align-middle text-center bg-success-light">
									<h2>{cierre[3]?cierre[3].toFixed(2):null}</h2>
								</td>
							</tr>
							<tr className="table-active">
								<td colSpan="2" className={(cierre["estado_efec"]==1?"bg-success-light":"bg-arabito-light")+" align-middle"}>
									<h2 className="text-center">{cierre["msj_efec"]?cierre["msj_efec"]:null}</h2>
								</td>
							</tr>
							<tr>
								<td rowSpan="2">
									<h4>Punto de venta</h4>
									<div className="input-group mb-3">
									  <div className="input-group-prepend w-25">
									    <span className="input-group-text">Bs.</span>
									  </div>
									  <input type="text" className="form-control" placeholder="Punto de venta" name="caja_punto" value={caja_punto} onChange={onchangecaja}/>
									</div>
								</td>
								<td className="text-center">
									<h3>
										{total_punto}
									</h3>
								</td>
								<td className="align-middle text-center bg-success-light">
									<h2>{cierre[2]?cierre[2]:null}</h2>
								</td>
							</tr>
							<tr>
								<td colSpan="2" className={(cierre["estado_punto"]==1?"bg-success-light":"bg-arabito-light")+" align-middle text-center"}>
									<h2 className="text-center">{cierre["msj_punto"]?cierre["msj_punto"]:null}</h2>
								</td>
							</tr>
							<tr className="table-active">
								<td colSpan="2"><h4>Transferencia</h4></td>
								<td className="text-center bg-success-light">
									<h2>
										{cierre[1]?cierre[1]:null}
										
									</h2>
								</td>
							</tr>
							<tr>
								<td>
									<h3>¿Cuánto dejarás en caja?</h3>
								</td>
								<td colSpan="2">
										<div className="row">
											<div className="col">
												<div className="input-group mb-3">
												  <div className="input-group-prepend w-50">
												    <span className="input-group-text">Dólar USD($)</span>
												  </div>
												  <input type="text" className="form-control" placeholder="$" name="dejar_usd" value={dejar_usd} onChange={onchangecaja}/>
												</div>
												
											</div>
											<div className="col">
												<div className="input-group mb-3">
												  <div className="input-group-prepend w-50">
												    <span className="input-group-text">Pesos COP.</span>
												  </div>
												  <input type="text" className="form-control" placeholder="COP" name="dejar_cop" value={dejar_cop} onChange={onchangecaja}/>
												</div>
												
											</div>
											<div className="col">
												<div className="input-group mb-3">
												  <div className="input-group-prepend w-50">
												    <span className="input-group-text">Bolívares VE.</span>
												  </div>
												  <input type="text" className="form-control" placeholder="Bs." name="dejar_bs" value={dejar_bs} onChange={onchangecaja}/>
												</div>
											</div>
										</div>
										<h3>{total_dejar_caja_neto}</h3>
								</td>
							</tr>
							<tr>
								<td>
									<h3>Efectivo Guardado</h3>
								</td>
								<td>
									<div className="container fluid">
										<div className="row">
											<div className="col">
												  <span className="text-success fs-3 fw-bold">{cierre["efectivo_guardado"]?cierre["efectivo_guardado"]:null}</span>
											</div>
											<div className="col">
												<div className="input-group mb-3">
												  <div className="input-group-prepend w-50">
												    <span className="input-group-text">Dólar USD($)</span>
												  </div>
												  <input type="text" className="form-control" placeholder="$" name="guardar_usd" value={guardar_usd} onChange={e=>setguardar_usd(number(e.target.value))}/>
												</div>
												
											</div>
											<div className="col">
												<div className="input-group mb-3">
												  <div className="input-group-prepend w-50">
												    <span className="input-group-text">Pesos COP.</span>
												  </div>
												  <input type="text" className="form-control" placeholder="COP" name="guardar_cop" value={guardar_cop} onChange={e=>setguardar_cop(number(e.target.value))}/>
												</div>
												
											</div>
											<div className="col">
												<div className="input-group mb-3">
												  <div className="input-group-prepend w-50">
												    <span className="input-group-text">Bolívares VE.</span>
												  </div>
												  <input type="text" className="form-control" placeholder="Bs." name="guardar_bs" value={guardar_bs} onChange={e=>setguardar_bs(number(e.target.value))}/>
												</div>
											</div>
										</div>
									</div>
								</td>		
							</tr>
							<tr>
								<td>
									<h3>
										Nota
									</h3>
								</td>
								<td colSpan="2">
									<textarea name="notaCierre" placeholder="Novedades..." value={notaCierre} onChange={onchangecaja} cols="40" rows="2"></textarea>
								</td>
							</tr>
							<tr>
								<td colSpan="3" className="text-center">
									<div className="btn-group">
										<button className="btn" onClick={()=>setToggleDetallesCierre(!toggleDetallesCierre)}>Ver detalles</button>

										<button className="btn btn-arabito" onClick={guardar_cierre} type="button" data-type="ver">Guardar&Ver</button>
										<button className="btn btn-warning" onClick={guardar_cierre} type="button" data-type="enviar">Guardar&Enviar</button>
									</div>
								</td>
							</tr>
						</thead>
					</table>
				</form>

				:<div className="d-flex justify-content-center align-items-center">
					<button className="btn btn-xl btn-success" onClick={cerrar_dia}>¡Cerremos el día!</button>
				</div>}
		</div>
	)
}

export default Cierre;