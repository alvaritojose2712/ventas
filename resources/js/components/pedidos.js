import {useState} from 'react';

function Pedidos({
tipobusquedapedido,
setTipoBusqueda,

busquedaPedido,

fecha1pedido,

fecha2pedido,

onChangePedidos,

pedidos,
getPedidos,

onClickEditPedido,
onCLickDelPedido,

tipoestadopedido,
setTipoestadopedido,
filterMetodoPago,
filterMetodoPagoToggle,
}) {
	try{
		return (
			<div className="container">
				<div className="inputs">
					<div className="input-group mb-3">
					  <div className="input-group-prepend">
	            <div className="input-group-text">
								<div className="radios d-flex mr-2">
									<div className={" m-1 pointer "+(tipoestadopedido=="0"?"select-fact bg-warning":"select-fact")} onClick={()=>setTipoestadopedido("0")}>
										Pend. <i className="fa fa-clock-o"></i>
									</div>
									<div className={" m-1 pointer " + (tipoestadopedido=="1"?"select-fact bg-success":"select-fact")} onClick={()=>setTipoestadopedido("1")}>
										Procs. <i className="fa fa-check"></i> 
									</div>
								</div>
								<div className="radios d-flex mr-2">
									<div className={" m-1 pointer "+(tipobusquedapedido=="fact"?"select-fact bg-arabito":"select-fact")} onClick={()=>setTipoBusqueda("fact")}>
										Fact. <i className="fa fa-search"></i>
									</div>
									<div className={" m-1 pointer " + (tipobusquedapedido=="prod"?"select-fact bg-arabito":"select-fact")} onClick={()=>setTipoBusqueda("prod")}>
										Prod. <i className="fa fa-search"></i> 
									</div>
								</div>

							</div>
	          </div>
	            <input className="form-control" placeholder="Buscar... #Factura, Descripción de producto" value={busquedaPedido} data-type="busquedaPedido" onChange={onChangePedidos} autoComplete="off" />
	          <input type="date" value={fecha1pedido} data-type="fecha1pedido" onChange={onChangePedidos} className="form-control" />
	          <input type="date" value={fecha2pedido} data-type="fecha2pedido" onChange={onChangePedidos} className="form-control" />
						<i className="fa fa-reload" onClick={()=>getPedidos()}></i>
					</div>
					<div className="m-3">
						{tipobusquedapedido=="prod"?
							<>
								{pedidos["prod"]?pedidos["prod"].map(e=>
									e?
										<div className="card-pedidos d-flex justify-content-between" key={e.id}>
										  <div className="">
											  <h1>
											  	<span className="badge btn-arabito">
											  		{e.cantidadtotal}
											  	</span>
											  </h1>
										    <h6 className=" mb-2 text-muted">{e.descripcion}</h6>
										    <h6 className=" mb-2 text-muted">{e.codigo_proveedor}</h6>
										  </div>
										  <div className="w-50">
									    	<ul className="list-group">
									    		{e.items.map(ee=>
										    		<li className="list-group-item d-flex justify-content-between align-items-center" key={ee.id}>
									    				<span>{ee.cantidad}</span>
	    												<span className="text-muted mr-1">{ee.created_at}</span>
	    												<span className="badge btn-secondary badge-pill pointer" 
	    												data-id={ee.id_pedido} 
	    												onClick={onClickEditPedido}>Ped. {ee.id_pedido}</span>
											    				
										    		</li>

									    			)}
									    	</ul>
										  	
										  </div>
										</div>
									:null
								):null}	
							</>
						:null}

						{tipobusquedapedido=="fact"?
							<>
										
									<div className="card-pedidos-header">
										<div className="container-fluid">
											<div className="row">
												<div className="col">
													<div className="d-flex justify-content-between">
														<div>
															<span className="text-muted text-left">
													    	Pedidos Tot.
													    </span>
												    	<h1>
													    	<span className="badge btn-arabito">
													    	{pedidos["totalventas"]}
													    	</span>
												    	</h1>
														</div>
														<div>
						    							<span className={(filterMetodoPagoToggle=="todos"?"btn-dark":"")+(" pointer btn")} data-type="todos" onClick={filterMetodoPago}>Todos</span>
						    							<span className={(filterMetodoPagoToggle==1?"btn-info":"")+(" btn")} data-type="1" onClick={filterMetodoPago}>Trans.</span>
						    							<span className={(filterMetodoPagoToggle==2?"btn-secondary":"")+(" btn")} data-type="2" onClick={filterMetodoPago}>Deb.</span>
						    							<span className={(filterMetodoPagoToggle==3?"btn-success":"")+(" btn")} data-type="3" onClick={filterMetodoPago}>Efec.</span>
						    							<span className={(filterMetodoPagoToggle==4?"btn-warning":"")+(" btn")} data-type="4" onClick={filterMetodoPago}>Cred.</span>
						    							<span className={(filterMetodoPagoToggle==6?"btn-danger":"")+(" btn")} data-type="6" onClick={filterMetodoPago}>Vuel.</span>															
														</div>
													  <table className="table table-sm table-borderless w-50">
													  	<thead>
											    			<tr>
														    	<td className="text-muted w-10">
														    		Items. 
														    	</td>
											    				<td className="w-30"><b className="h5">Sub.</b></td>
											    				<td className="w-30"><b className="h5">Desc.</b></td>
											    				<td className="w-30"><b className="h3">Tot.</b></td>
											    			</tr>
											    		</thead>
											    		<tbody>
											    			<tr>
														    	<td className="text-muted w-10">
														    		{pedidos["itemstotal"]} 
														    	</td>
											    				<td><b className="h5 w-30">{pedidos["subtotal"]}</b></td>
											    				<td><b className="h5 w-30">{pedidos["porctotal"]}%</b></td>
											    				<td><b className="h3 w-30">{pedidos["totaltotal"]}</b></td>
											    			</tr>
											    		</tbody>
											    	</table>
													</div>
												</div>
												<div className="col-md-auto">
													<div className="btn-options"></div>
												</div>
											</div>
										</div>
									</div>
								{pedidos["fact"]?pedidos["fact"].map(e=>
									e?
										<div className="card-pedidos " key={e.id}>
											<div className="container-fluid">
												<div className="row">
													<div className="col">
														<div className="d-flex justify-content-between">
															<div>
																<span className="text-muted text-left">
														    		{e.pedido.vendedor.nombre} 
														    </span>
													    	<h1>
														    	<span className="badge btn-secondary">
														    		{e.id}
														    	</span>
													    	</h1>
																<span className="text-muted text-left">
														    		{e.pedido.created_at} 
														    </span>
															</div>
														  <table className="table table-sm w-50">
												    		<tbody>
												    			<tr>
															    	<td className="text-muted w-10">
															    		{e.pedido.items.length}
															    	</td>
												    				<td className="w-30"><b className="h5">{e.pedido.subtotal}</b></td>
												    				<td className="w-30"><b className="h5">{e.pedido.total_porciento}</b></td>
												    				<td className="w-30"><b className="h3 text-success">{e.pedido.total}</b></td>
												    			</tr>
												    			<tr>
												    				<td colSpan="4">
												    					{e.pedido.pagos.map(ee=>
												    						<span className="h3" key={ee.id}>
												    						{ee.monto!=0&&ee.tipo==1?
												    							<span className="badge btn-info">Trans. {ee.monto}</span>
												    						:null}

												    						{ee.monto!=0&&ee.tipo==2?
												    							<span className="badge btn-secondary">Deb. {ee.monto}</span>
												    						:null}

												    						{ee.monto!=0&&ee.tipo==3?
												    							<span className="badge btn-success">Efec. {ee.monto}</span>
												    						:null}

												    						{ee.monto!=0&&ee.tipo==4?
												    							<span className="badge btn-warning">Cred. {ee.monto}</span>
												    						:null}

												    						{ee.monto!=0&&ee.tipo==5?
												    							<span className="badge btn-primary">Otr. {ee.monto}</span>
												    						:null}

												    						{ee.monto!=0&&ee.tipo==6?
												    							<span className="badge btn-danger">Vuel. {ee.monto}</span>
												    						:null}
												    						</span>
												    					)}
												    				</td>
												    			</tr>
												    			<tr>
												    				<td colSpan="4">
												    					Cliente: <b>{e.pedido.cliente.nombre}</b>
												    				</td>
												    			</tr>
												    		</tbody>
												    	</table>
														</div>
													</div>
													<div className="col-md-auto">
														<div className="btn-group-vertical btn-options h-100">
															<button className="btn btn-outline-success h-75" data-id={e.pedido.id} onClick={onClickEditPedido}><i className="fa fa-pencil"></i></button>
															<button className="btn btn-outline-danger" data-id={e.pedido.id} data-type="getPedidos" onClick={onCLickDelPedido}><i className="fa fa-times"></i></button>
														</div>
													</div>
												</div>
											</div>
										</div>
									:null
								):null}	
							</>
						:null}
					</div>
				</div>
			</div>
		)
	}catch(err){
		console.log("ped.",pedidos)
		console.log("err",err)
	}
}
export default Pedidos;