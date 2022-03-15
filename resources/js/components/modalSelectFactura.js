

function ModalSelectFactura({
  moneda,
  setshowModalFacturas,
  facturas,

  factqBuscar,
  setfactqBuscar,
  factqBuscarDate,
  setfactqBuscarDate,
  factsubView,
  setfactsubView,
  factSelectIndex,
  setfactSelectIndex,
  factOrderBy,
  setfactOrderBy,
  factOrderDescAsc,
  setfactOrderDescAsc,

  setfactInpdescripcion,
  factInpdescripcion,
  factInpid_proveedor,
  setfactInpid_proveedor,
  factInpnumfact,
  setfactInpnumfact,
  factInpmonto,
  setfactInpmonto,
  factInpfechavencimiento,
  setfactInpfechavencimiento,

  setFactura,

  proveedoresList,
  number,

  factInpestatus,
  setfactInpestatus,

  delFactura,
  delItemFact,

  verDetallesFactura,
  setsubViewInventario,
  saveFactura,

  setmodFact,
  modFact,
  qBuscarProveedor,
  setQBuscarProveedor,
  setIndexSelectProveedores,
  indexSelectProveedores,

  setPagoProveedor,
  tipopagoproveedor,
  settipopagoproveedor,
  montopagoproveedor,
  setmontopagoproveedor,
  getPagoProveedor,
}) {
  const setfactOrderByFun = val => {
    if (val==factOrderBy) {
      if (factOrderDescAsc=="desc") {
        setfactOrderDescAsc("asc")
      }else{
        setfactOrderDescAsc("desc")

      }
    }else{
      setfactOrderBy(val)
    }
  }
  const setfactSelectIndexFun = (i,view) =>{
    setfactSelectIndex(i)
    setfactsubView(view)

    if (facturas[i]) {
      let obj = facturas[i]
      setfactInpid_proveedor(obj.id_proveedor)
      setfactInpnumfact(obj.numfact)
      setfactInpdescripcion(obj.descripcion)
      setfactInpmonto(obj.monto)
      setfactInpfechavencimiento(obj.fechavencimiento)
      setfactInpestatus(obj.estatus)

    }
  }

  const setfactSelectIndexFunInv = i => {
    setfactSelectIndex(i)
    // setshowModalFacturas(false)
    setfactsubView("detalles")

  }
  const setNuevaFact = () => {
    setfactSelectIndex(null)
    setfactsubView("agregar")


    setfactInpdescripcion("")
    setfactInpid_proveedor("")
    setfactInpnumfact("")
    setfactInpmonto("")
    setfactInpfechavencimiento("")
    setfactInpestatus("")

  }
  return (
    <>
      <section className=""> 
        <div className="container-fluid">
          <div className="row">
            <div className="col-3">
              <div className="">
                <div className="d-flex justify-content-between">
                  <div>
                    <button className="btn-sm btn btn-outline-success mb-1" onClick={()=>setNuevaFact()}>Nuevo</button>
                  </div>
                  <div>
                    <div className="btn-group">
                      <button className={("btn ")+(modFact=="factura"?"btn":"btn-outline")+("-success")} onClick={() => setmodFact("factura")}>Facturas</button>
                      <button className={("btn ")+(modFact=="proveedor"?"btn":"btn-outline")+("-success")} onClick={() => setmodFact("proveedor")}>Proveedor</button>
                    </div>
                  </div>
                </div>
              </div>
              
              {modFact == "proveedor" ?
                <>
                  <input type="text"
                    className="form-control"
                    placeholder="Buscar proveedor..."
                    value={qBuscarProveedor}
                    onChange={e => setQBuscarProveedor(e.target.value)} />
                  
                  {
                    proveedoresList.length
                      ? proveedoresList.map((e, i) =>
                        <div
                          onClick={()=>setIndexSelectProveedores(i)}
                          key={e.id}
                          className={(indexSelectProveedores == i ? "bg-sinapsis" : "bg-light text-secondary") + " card mt-2 pointer"}>
                          <div className="card-header flex-row row justify-content-between">
                            <div>
                              <small>ID.{e.id}</small>
                            </div>
                            <div className="d-flex justify-content-between">
                              <div><span>{e.rif}</span></div>
                              <div><span className="">{e.telefono}</span></div>
                            </div>
                          </div>
                          <div className="card-body">
                            <div className="">
                              <h5
                                className="card-title"
                              ><b>{e.descripcion}</b></h5>
                            </div>
                            <p className="card-text">
                            </p>
                          </div>
                        </div>
                      )
                      : <div className='h3 text-center text-dark mt-2'><i>¡Sin resultados!</i></div>
                  }
                </>
              : null}
              {modFact=="factura"?
                <>
                  <input type="date"
                    className="form-control"
                    value={factqBuscarDate}
                    onChange={e => setfactqBuscarDate(e.target.value)} />
                  <input type="text"
                    className="form-control"
                    placeholder="Buscar factura..."
                    value={factqBuscar}
                    onChange={e => setfactqBuscar(e.target.value)} />
                  <div className=" mb-1 mt-1">
                    <span className="pointer badge bg-secondary" onClick={() => setfactOrderByFun("id")}>ID
                      {factOrderBy == "id" ? (<i className={factOrderDescAsc == "desc" ? "fa fa-arrow-up" : "fa fa-arrow-down"}></i>) : null}
                    </span>
                    <span className="pointer badge bg-secondary" onClick={() => setfactOrderByFun("numfact")}>Num.Fact.
                      {factOrderBy == "numfact" ? (<i className={factOrderDescAsc == "desc" ? "fa fa-arrow-up" : "fa fa-arrow-down"}></i>) : null}
                    </span>
                    <span className="pointer badge bg-secondary" onClick={() => setfactOrderByFun("id_proveedor")}>Proveedor
                      {factOrderBy == "id_proveedor" ? (<i className={factOrderDescAsc == "desc" ? "fa fa-arrow-up" : "fa fa-arrow-down"}></i>) : null}
                    </span>
                    <span className="pointer badge bg-secondary" onClick={() => setfactOrderByFun("monto")}>Monto
                      {factOrderBy == "monto" ? (<i className={factOrderDescAsc == "desc" ? "fa fa-arrow-up" : "fa fa-arrow-down"}></i>) : null}
                    </span>
                    <span className="pointer badge bg-secondary" onClick={() => setfactOrderByFun("estatus")}>Estatus
                      {factOrderBy == "estatus" ? (<i className={factOrderDescAsc == "desc" ? "fa fa-arrow-up" : "fa fa-arrow-down"}></i>) : null}
                    </span>
                    <span className="pointer badge bg-secondary" onClick={() => setfactOrderByFun("created_at")}>Fecha
                      {factOrderBy == "created_at" ? (<i className={factOrderDescAsc == "desc" ? "fa fa-arrow-up" : "fa fa-arrow-down"}></i>) : null}
                    </span>
                  </div>
                  {facturas?facturas.map((e,i)=>
                    <div className="text-secondary mb-3 pointer shadow p-2" key={e.id}>
                      <div className="text-center">
                      <small className="text-muted">{e.created_at}</small>
                      {/*<i className={e.push?"fa fa-send text-info":""}></i>*/}
                      </div>
                      <div>
                        <h6 onClick={()=>setfactSelectIndexFunInv(i)} className="pointer">
                          <span className={(i==factSelectIndex?"bg-success":"bg-secondary")+(" badge w-100")}>{e.id}-{e.numfact}</span>
                        </h6>
                      </div>
                      <p>
                        {e.proveedor.descripcion}
                      </p>
                      {/*<div>
                      <i className={e.estatus=="1"?"fa fa-check text-success":"fa fa-times text-danger"}></i>
                      <br/>
                      </div>*/}
                      <div className="d-flex justify-content-between">
                        <div>
                          
                          <button className="btn-sm btn btn-outline-success" onClick={()=>setfactSelectIndexFun(i,"agregar")}><i className="fa fa-pencil"></i></button>
                          <button className="btn-sm btn btn-outline-success" onClick={()=>setfactSelectIndexFun(i,"detalles")}><i className="fa fa-send"></i></button>
                        </div>

                        <div><span className="text-success">{moneda(e.monto)}</span></div>

                      </div>
                    </div>)
                  :null}
                </>
              :null}
            </div>
            {modFact == "proveedor" ?
              <div className="col">
                <h1>Registrar Pago</h1>

                {proveedoresList[indexSelectProveedores]?<>
                  <h4>{proveedoresList[indexSelectProveedores].descripcion}</h4>
                </>:null}
                <form onSubmit={setPagoProveedor}>
                  <div className="form-group">
                    <label htmlFor="">Tipo de pago</label>
                    <select value={tipopagoproveedor} name="tipopagoproveedor" onChange={e => settipopagoproveedor(e.target.value)} className="form-control">
                      <option value="">--Seleccione--</option>
                      <option value="3">Efectivo</option>
                      <option value="1">Transferencia</option>
                      <option value="2">Débito</option>
                    </select>
                  </div>

                  
                  
                  <div className="form-group mb-1">
                    <label htmlFor="">Monto Pago</label>
                    <input value={montopagoproveedor} onChange={e => setmontopagoproveedor(number(e.target.value))} className="form-control" />
                  </div>
                  <div className="form-group">
                    <button className="btn btn-outline-success">Guardar</button>
                  </div>
                </form>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Tipo</th>
                      <th>Abono</th>
                      <th>Credito</th>
                      <th>Balance</th>
                    </tr>
                  </thead>
                </table>
              </div>
            :null}
            {modFact == "factura" ?
              <div className="col">
                <div className="btn-group mb-4">
                  <button className={("btn ")+(factsubView=="detalles"?"btn-dark":"btn-sinapsis")} onClick={()=>setfactsubView("detalles")}>Detalles</button>            
                  <button className={("btn ")+(factsubView=="agregar"?"btn-dark":"btn-sinapsis")} onClick={()=>setfactsubView("agregar")}>

                    {factSelectIndex==null?
                      <span>Agregar</span>
                    : 
                      <>
                        Editar
                        <span> {facturas[factSelectIndex]?
                            facturas[factSelectIndex].numfact
                          :null}
                        </span>
                        -
                        <span>
                        {facturas[factSelectIndex]?
                          facturas[factSelectIndex].proveedor.descripcion
                        :null}
                        </span>
                      </>
                        
                    }
                  </button>
                </div>
                {factsubView=="agregar"?
                  <form onSubmit={setFactura}>

                      {factSelectIndex==null?
                        <h3>Registrar Factura</h3>
                      : <>
                        <h3>Editar Factura <button className="btn btn-outline-danger" onClick={()=>setfactSelectIndex(null)}>Cancelar</button></h3>
                        <h1 className="text-right">{facturas[factSelectIndex]?
                            facturas[factSelectIndex].numfact
                          :null}</h1>
                        <h1 className="text-right">{facturas[factSelectIndex]?
                          facturas[factSelectIndex].proveedor.descripcion
                        :null}</h1>
                      </>
                      }

                      <div className="form-group">
                        <label htmlFor="">
                          Descripción
                        </label> 
                          <input type="text" 
                          value={factInpdescripcion} 
                          onChange={e=>setfactInpdescripcion(e.target.value)} 
                          className="form-control"/>
                      </div>

                      <div className="form-group">
                        Proveedor
                        <select className="form-control" onChange={e=>setfactInpid_proveedor(e.target.value)} value={factInpid_proveedor}>
                          <option value="">----</option>
                          {proveedoresList.map(e=><option value={e.id} key={e.id}>{e.descripcion}</option>)}
                        </select>
                      </div>

                      <div className="form-group">
                        <label htmlFor="">
                          Número de Factura
                        </label> 
                          <input type="text" 
                          value={factInpnumfact} 
                          onChange={e=>setfactInpnumfact(e.target.value)} 
                          className="form-control"/>
                      </div>

                      {/*<div className="form-group">
                        <label htmlFor="">
                          Monto
                        </label> 
                          <input type="text" 
                          value={factInpmonto} 
                          onChange={e=>setfactInpmonto(number(e.target.value))} 
                          className="form-control"/>
                      </div>*/}

                      <div className="form-group">
                        <label htmlFor="">
                          Fecha de Vencimiento
                        </label> 
                          <input type="date" 
                          value={factInpfechavencimiento} 
                          onChange={e=>setfactInpfechavencimiento(e.target.value)} 
                          className="form-control"/>
                      </div>

                      <div className="form-group">
                        Estatus
                        <select className="form-control" onChange={e=>setfactInpestatus(e.target.value)} value={factInpestatus}>
                          <option value="0">No</option>
                          <option value="1">Sí</option>
                        </select>
                      </div>


                      
                      <div className="form-group mt-2">
                      {factSelectIndex==null?
                        <button className="btn btn-outline-success btn-block" type="submit">Guardar</button>
                      : 
                        <div className="btn-group">
                          <button className="btn btn-sinapsis btn-block" type="submit">Editar</button>
                          <button className="btn btn-outline-danger btn-block" onClick={delFactura} type="button"><i className="fa fa-times"></i></button>
                          
                        </div>
                      }
                      </div>
                    </form>
                :null}

                {factsubView=="detalles"?
                  facturas[factSelectIndex]?<>
                    <div className="d-flex justify-content-between">
                      <div>
                        <small className="text-muted">Items. {facturas[factSelectIndex].items ? facturas[factSelectIndex].items.length :null}</small><br/>
                        <span className="fw-bold">{facturas[factSelectIndex].proveedor.descripcion}</span><br />
                        <p>{facturas[factSelectIndex].descripcion}</p>
                      </div>
                      <div className="text-right">
                        
                        <button className="btn" onClick={saveFactura}>Guardar Factura {moneda(facturas[factSelectIndex].monto)}</button><br/>
                        
                        
                      </div>
                    </div>
                    <table className="table">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Ct.</th>
                          <th>Cod.</th>
                          <th>Alterno.</th>
                          <th>Descripción</th>
                          <th className="">Base</th>
                          <th className="">Total Base</th>

                          <th>Venta</th>
                          <th className="">Total Venta</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        
                      {facturas[factSelectIndex].items?facturas[factSelectIndex].items.map(e=>
                        <tr key={e.id}>
                          <td>{e.tipo}</td>
                          <th>{e.cantidad}</th>
                          <td>{e.producto.codigo_barras}</td>
                          <td>{e.producto.codigo_proveedor}</td>
                          <td>{e.producto.descripcion}</td>
                          <td className="text-right">{e.producto.precio_base}</td>
                          <td className="text-right">{e.subtotal_base}</td>
                          <td className="text-right">{e.producto.precio}</td>
                          <td className="text-right">{e.subtotal}</td>
                          <td><i className="fa fa-times text-danger" data-id={e.id} onClick={delItemFact}></i></td>
                        </tr>
                      ):null}
                      <tr>
                        <td colSpan={5}>

                        </td>
                        <td colSpan={2} className="text-success h5 text-right">
                          {facturas[factSelectIndex].summonto_base}
                        </td>
                        <td colSpan={2} className="h5 text-right">
                          {facturas[factSelectIndex].summonto}
                        </td>
                      </tr>
                      </tbody>
                    </table>
                    <div className="m-5 d-flex justify-content-center align-items-center">
                      <button className="btn btn lg btn-xl btn-outline-success" onClick={verDetallesFactura}>Ver todo <i className="fa fa-send"></i></button>
                    </div>
                  </>:null
                :null}
              </div>
            :null}
          </div>
        </div>   
      </section>
    </>

    
  )
}
export default ModalSelectFactura