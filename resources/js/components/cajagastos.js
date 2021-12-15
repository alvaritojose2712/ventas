function Cajagastos({
	setMovimientoCaja,
	movCajadescripcion,
	setMovCajadescripcion,
	movCajamonto,
	setMovCajamonto,
	number,
	setMovCajacategoria,
	movCajacategoria,
	setMovCajatipo,
	movimientosCaja,
	delMovCaja,
	movCajatipo,

	movCajaFecha,
	setMovCajaFecha,
}) {
	return (
		<div className="col">
      <h4>Movimientos de caja y Gastos</h4>
      <form onSubmit={setMovimientoCaja} >
        <table className="table table-sm">
          <thead> 
            {movCajatipo!==null?
            <>
            	<tr>
            		<td>
            			<input type="date" value={movCajaFecha} onChange={e=>setMovCajaFecha(e.target.value)}/>
            		</td>
            	</tr>
	            <tr>
	              <td><input type="text" required={true} placeholder="Desc." value={movCajadescripcion} onChange={e=>setMovCajadescripcion(e.target.value)} className="form-control"/></td>
	              <td><input type="text" required={true} placeholder="Monto." value={movCajamonto} onChange={e=>setMovCajamonto(number(e.target.value))} className="form-control"/></td>
	              
	              <td colSpan="2">
	                <select onChange={e=>setMovCajacategoria(e.target.value)} value={movCajacategoria} className="form-control">
	                  <option value="3">Funcionamiento</option>
	                  <option value="4">Pago a proveedores</option>
	                  <option value="2">Nómina</option>
	                  <option value="5">Otros</option>
	                  <option value="6">Devolución</option>
	                  
	                </select>
	              </td>
	              <td>
	                <button className="btn"><i className="fa fa-send"></i></button>
	              </td>
	              
	            </tr>
            </>
            :null}
          </thead>
          <tbody>
            <tr>
              <td colSpan="2">
                <table className="table table-sm">
                  <tbody>
                    <tr>
                      <td colSpan="2">
                      	<h5 
                      	onClick={()=>setMovCajatipo(1)} 
                      	className={movCajatipo==1?"text-primary":null+(" pointer")}>Entregado {movCajatipo==1?null:"(Click)"}</h5>
                      </td>
                    </tr>
                    {movimientosCaja.filter(e=>e.tipo==1).map(e=>
                      <tr key={e.id} data-id={e.id} onClick={delMovCaja}>
                        <td>
                          {e.descripcion}
                          <b>
                            {e.categoria==1?" Vueltos":null}
                            {e.categoria==2?" Nómina":null}
                            {e.categoria==3?" Funcionamiento":null}
                            {e.categoria==4?" Pago a proveedores":null}
                            {e.categoria==5?" Otros":null}
                            {e.categoria==6?" Devolución":null}
                          </b>
                          <br/>
                          <span className="text-muted">{e.created_at}</span>
                        </td>
                        <td>{e.monto}</td>
                      </tr>
                    )}  
                    
                  </tbody>
                </table>
              </td>
              <td colSpan="3">
                <table className="table table-sm">
                  <tbody>
                    <tr>
                      <td colSpan="2"><h5 onClick={()=>setMovCajatipo(0)} className={movCajatipo==0?"text-primary":null+(" pointer")}>Pendiente {movCajatipo==0?null:"(Click)"}</h5></td>
                    </tr>
                      {movimientosCaja.filter(e=>e.tipo==0).map(e=>
                      <tr key={e.id} data-id={e.id} onClick={delMovCaja}>
                        <td>
                          {e.descripcion}
                          <b>
                            {e.categoria==1?" Vueltos":null}
                            {e.categoria==2?" Nómina":null}
                            {e.categoria==3?" Funcionamiento":null}
                            {e.categoria==4?" Pago a proveedores":null}
                            {e.categoria==5?" Otros":null}
                            {e.categoria==6?" Devolución":null}
                          </b>
                          <br/>
                          <span className="text-muted">{e.created_at}</span>
                        </td>
                        <td>{e.monto}</td>
                      </tr>
                    )}  
                    
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>  
        </table>
      </form>
    </div>
	)
}

export default Cajagastos