

function ModalSelectFactura({
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
    setshowModalFacturas(false)

  }
  return (
    <>
      <section className="modal-custom"> 
        <div className="text-danger" onClick={()=>setshowModalFacturas(false)}><span className="closeModal">&#10006;</span></div>
        <div className="modal-content">
          <div className="btn-group mb-4">
            <button className={("btn ")+(factsubView=="buscar"?"btn-dark":"btn-arabito")} onClick={()=>setfactsubView("buscar")}>Buscar</button>
            <button className={("btn ")+(factsubView=="agregar"?"btn-dark":"btn-arabito")} onClick={()=>setfactsubView("agregar")}>

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
            <button className={("btn ")+(factsubView=="detalles"?"btn-dark":"btn-arabito")} onClick={()=>setfactsubView("detalles")}>Detalles</button>            
          </div>
          {factsubView=="buscar"?
          <>
            <div className="input-group ">
              <input type="text" 
              className="form-control" 
              placeholder="Buscar..." 
              value={factqBuscar} 
              onChange={e=>setfactqBuscar(e.target.value)}/>

              <input type="date" 
              className="form-control" 
              value={factqBuscarDate} 
              onChange={e=>setfactqBuscarDate(e.target.value)}/>

              <div className="input-group-prepend">
                <button className="btn btn-outline-secondary" type="button"><i className="fa fa-search"></i></button>
              </div>
            </div>
           <table className="table">
             <thead>
               <tr>
                 <th className="pointer" onClick={()=>setfactOrderByFun("id")}>ID 
                  {factOrderBy=="id"?( <i className={factOrderDescAsc=="desc"?"fa fa-arrow-up":"fa fa-arrow-down"}></i>):null}
                 </th>
                 <th className="pointer" onClick={()=>setfactOrderByFun("numfact")}>Num.Fact. 
                  {factOrderBy=="numfact"?( <i className={factOrderDescAsc=="desc"?"fa fa-arrow-up":"fa fa-arrow-down"}></i>):null}
                 </th>
                 <th className="pointer" onClick={()=>setfactOrderByFun("id_proveedor")}>Proveedor 
                  {factOrderBy=="id_proveedor"?( <i className={factOrderDescAsc=="desc"?"fa fa-arrow-up":"fa fa-arrow-down"}></i>):null}
                 </th>
                 <th>Productos 
                 </th>
                 <th className="pointer" onClick={()=>setfactOrderByFun("monto")}>Monto 
                  {factOrderBy=="monto"?( <i className={factOrderDescAsc=="desc"?"fa fa-arrow-up":"fa fa-arrow-down"}></i>):null}
                 </th>
                 <th className="pointer" onClick={()=>setfactOrderByFun("estatus")}>Estatus 
                  {factOrderBy=="estatus"?( <i className={factOrderDescAsc=="desc"?"fa fa-arrow-up":"fa fa-arrow-down"}></i>):null}
                 </th>
                 <th className="pointer" onClick={()=>setfactOrderByFun("created_at")}>Fecha 
                  {factOrderBy=="created_at"?( <i className={factOrderDescAsc=="desc"?"fa fa-arrow-up":"fa fa-arrow-down"}></i>):null}
                 </th>
               </tr>
             </thead>
             <tbody>
               {facturas.map((e,i)=><tr key={e.id}>
                 <td>{e.id}</td>
                 <td> <h3 onClick={()=>setfactSelectIndexFunInv(i)} className="pointer"><span className="badge bg-secondary w-100">{e.numfact}</span></h3> </td>

                 <td>{e.proveedor.descripcion}</td>
                 <td></td>
                 <td>{e.monto}</td>
                 <td>
                  <i className={e.estatus=="1"?"fa fa-check text-success":"fa fa-times text-danger"}></i>
                  </td>
                 <td>{e.created_at}</td>
                 <td>
                   <button className="btn btn-outline-success" onClick={()=>setfactSelectIndexFun(i,"agregar")}><i className="fa fa-pencil"></i></button>
                   <button className="btn btn-outline-success" onClick={()=>setfactSelectIndexFun(i,"detalles")}><i className="fa fa-send"></i></button>
                 </td>
               </tr>)}
             </tbody>
           </table>
          </>
          :null}
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

                <div className="form-group">
                  <label htmlFor="">
                    Monto
                  </label> 
                    <input type="text" 
                    value={factInpmonto} 
                    onChange={e=>setfactInpmonto(number(e.target.value))} 
                    className="form-control"/>
                </div>

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


                
                <div className="form-group">
                {factSelectIndex==null?
                  <button className="btn btn-outline-success btn-block" type="submit">Guardar</button>
                : 
                  <div className="btn-group">
                    <button className="btn btn-arabito btn-block" type="submit">Editar</button>
                    <button className="btn btn-outline-danger btn-block" onClick={delFactura} type="button"><i className="fa fa-times"></i></button>
                    
                  </div>
                }
                </div>
              </form>
          :null}

          {factsubView=="detalles"?
            facturas[factSelectIndex]?<>
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Ct.</th>
                    <th>Cod.</th>
                    <th>Alterno.</th>
                    <th>Descripción</th>
                    <th>Base</th>
                    <th>Venta</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  
                {facturas[factSelectIndex].items.map(e=>
                  <tr key={e.id}>
                    <td>{e.tipo}</td>
                    <th>{e.cantidad}</th>
                    <td>{e.producto.codigo_barras}</td>
                    <td>{e.producto.codigo_proveedor}</td>
                    <td>{e.producto.descripcion}</td>
                    <td>{e.producto.precio_base}</td>
                    <td>{e.producto.precio}</td>
                    <td><i className="fa fa-times text-danger" data-id={e.id} onClick={delItemFact}></i></td>
                  </tr>
                )}
                </tbody>
              </table>
            </>:null
          :null}

        </div>
      </section>
      <div className="overlay"></div>
    </>

    
  )
}
export default ModalSelectFactura