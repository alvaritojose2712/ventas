

function ModalAddCarrito({
  setShowModalMovimientos,
  showModalMovimientos,

  setBuscarDevolucion,
  buscarDevolucion,

  setTipoMovMovimientos,
  tipoMovMovimientos,
  
  setTipoCatMovimientos,
  tipoCatMovimientos,

  productosDevulucionSelect,
  setDevolucion,

  idMovSelect,
  setIdMovSelect,

  movimientos,

  delMov,
  movimientosList,
  setFechaMovimientos,
  fechaMovimientos,
}) {

  const retTipoMov = () => (
   
    movimientos.map(e=>
      <tr key={e.id}>
        <td className="align-middle">
            <h2>{e.id}</h2>
            
        </td>
        <td className="w-50">
          {retTipoSubMov(e.items,1)}
        </td>
        <td className="w-50">
          {retTipoSubMov(e.items,0)}
        </td>
      </tr>)
    
         
  )
  const retCat = cat => {
    switch(cat){
      case '1':
        return "Garantía"
      break;

      case '2':
        return "Cambio"
      break;
    }
  }
  const retTipoSubMov = (items,tipo) =>(
      <>
        <table className="table table-sm">
          <thead>
            <tr>
              <th>Prod.</th>
              <th>Ct.</th>
              <th>Cat.</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.filter(e=>e.tipo==tipo).map(ee=>
              <tr key={ee.id}>
                <td>{ee.producto.codigo_proveedor} {ee.producto.descripcion}</td>
                <td>{ee.cantidad}</td>
                <td>{retCat(ee.categoria)}</td>
                <td><i className="fa fa-times tex-danger" data-id={ee.id} onClick={delMov}></i></td>
              </tr>)
            }
          </tbody>
        </table>
          
      </>
  )
  
  return (
    <>
      <section className="modal-custom"> 
        <div className="text-danger" onClick={()=>setShowModalMovimientos(!showModalMovimientos)}><span className="closeModal">&#10006;</span></div>
        <div className="modal-content">
        <h1>Movimientos del día 
        <input type="date" value={fechaMovimientos} onChange={e=>setFechaMovimientos(e.target.value)} /></h1>
          <table className="table">
            <thead>
              <tr>
                <td colSpan="3">
                  <div className="form-group d-flex justify-content-between">
                    <input type="text" className="form-control" placeholder="Buscar..." 
                    onChange={e=>setBuscarDevolucion(e.target.value)}
                    value={buscarDevolucion}
                    />
                    <select 
                    onChange={e=>setTipoMovMovimientos(e.target.value)}
                    className="form-control" 
                    value={tipoMovMovimientos}>
                      <option value="1">Entrada</option>
                      <option value="0">Salida</option>
                    </select>

                    <select 
                    onChange={e=>setTipoCatMovimientos(e.target.value)}
                    className="form-control" 
                    value={tipoCatMovimientos}>
                      <option value="1">Garantía</option>
                      <option value="2">Cambio</option>
                    </select>


                    <select 
                    onChange={e=>setIdMovSelect(e.target.value)}
                    className="form-control" 
                    value={idMovSelect}>
                      {movimientos.map(e=>
                        <option key={e.id} value={e.id}>{e.id}</option>

                      )}
                      <option value="nuevo">nuevo</option>
                    </select>

                  </div>
                </td>
              </tr>
              <tr>
                <th><h4>Num. Mov.</h4></th>
                <th><h3>Entrada</h3></th>
                <th><h3>Salida</h3></th>
              </tr>
            </thead>
            <tbody>

              {buscarDevolucion==""?
              <>
                
                {retTipoMov()}
                    
              </>

              :<tr>
                <td>
                  <table className="table">
                    <tbody>
                      {productosDevulucionSelect.map(e=>
                        <tr key={e.id} onClick={setDevolucion} data-id={e.id}>
                          <td>{e.codigo_proveedor}</td>
                          <td>{e.descripcion}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </td>
              </tr>}
            </tbody>
          </table>
        </div>
      </section>
      <div className="overlay"></div>
    </>

    
  )
}
export default ModalAddCarrito