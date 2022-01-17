import {useEffect} from 'react';

import Modaladdproductocarrito from '../components/Modaladdproductocarrito';
import ModaladdPersona from '../components/ModaladdPersona';


function Pagar({
pedidosFast,
pedidoData,
getPedido,
debito,
setDebito,
efectivo,
setEfectivo,
transferencia,
setTransferencia,
credito,
setCredito,

vuelto,
setVuelto,

number,
delItemPedido,
setDescuento,
setDescuentoUnitario,
setDescuentoTotal,
setCantidadCarrito,

toggleAddPersona,
setToggleAddPersona,

getPersona,
personas,
setPersonas,

ModaladdproductocarritoToggle,
setModaladdproductocarritoToggle,
toggleModalProductos,

setProductoCarritoInterno,

toggleImprimirTicket,
onchangeinputmain,
del_pedido,

productos,
getProductos,
facturar_pedido,
inputmodaladdpersonacarritoref,
inputaddcarritointernoref,

tbodyproducInterref,
tbodypersoInterref,

countListInter,
countListPersoInter,

clickSetOrderColumn,
orderColumn,
orderBy,
entregarVuelto,

setPersonaFast,
clienteInpidentificacion,
setclienteInpidentificacion,
clienteInpnombre,
setclienteInpnombre,
clienteInptelefono,
setclienteInptelefono,
clienteInpdireccion,
setclienteInpdireccion,
inputaddCarritoFast,
setinputaddCarritoFast,
refinputaddcarritofast,

viewReportPedido,
autoCorrector,
setautoCorrector,

getDebito,
getCredito,
getTransferencia,
getEfectivo,
tipobusquedapedido,
pedidos,
setPedidos,
onClickEditPedido,
}) {

  
  const syncPago = (val,type)=>{
    val = number(val)
    if (type=="Debito") {

      setDebito(val)
    }
    else if (type=="Efectivo") {
      setEfectivo(val) 
    }
    else if (type=="Transferencia") {
      setTransferencia(val)
    }
    else if (type=="Credito") {
      setCredito(val)
    }


    let divisor=0;

    let inputs = [
      {key:"Debito", val:debito, set:(val)=>setDebito(val)},
      {key:"Efectivo", val:efectivo, set:(val)=>setEfectivo(val)},
      {key:"Transferencia", val:transferencia, set:(val)=>setTransferencia(val)},
      {key:"Credito", val:credito, set:(val)=>setCredito(val)},
    ]

    inputs.map(e => {
      if (e.key!=type) {
        if (e.val) {divisor++}
      }
    })

    if (autoCorrector) {
      inputs.map(e => {
        if (e.key!=type) {
          if (e.val) {
            e.set(((pedidoData.clean_total-val)/divisor).toFixed(2))
          }
        }
      })
    }
  }
  useEffect(()=>{
    if (refinputaddcarritofast.current) {
      refinputaddcarritofast.current.value = ""

    }
    // refinputaddcarritofast.current.focus()
  },[])
  try{
    const {id,created_at,vendedor,cliente,items,total_des,subtotal,total,total_porciento,cop,bs,editable,vuelto_entregado,estado} = pedidoData
    return (
      <>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-auto p-0">
                
                {pedidosFast?pedidosFast.map(e=>
                  e?
                    <div className="card-pedidos d-flex justify-content-center flex-column" key={e.id} data-id={e.id} onClick={onClickEditPedido}>
                      <h3>
                        <span className={(e.id==id?"btn":"btn-outline")+(!e.estado?"-arabito":"-success")+(" fs-4 btn btn-xl btn-circle f")}>
                          {e.id}
                        </span>
                      </h3>
                      <span className="text-muted text-center">
                          <b className={("h5 ")+(!e.estado?" text-arabito":" text-success")}></b>

                      </span>
                    </div>
                  :null
                ):null} 
            </div>
            <div className="col">
              
              {ModaladdproductocarritoToggle&&<Modaladdproductocarrito 
                toggleModalProductos={toggleModalProductos}
                productos={productos}
                setProductoCarritoInterno={setProductoCarritoInterno}
                getProductos={getProductos}
                inputaddcarritointernoref={inputaddcarritointernoref}

                tbodyproducInterref={tbodyproducInterref}

                countListInter={countListInter}
                onchangeinputmain={onchangeinputmain}

                clickSetOrderColumn={clickSetOrderColumn}
                orderColumn={orderColumn}
                orderBy={orderBy}


              />}

              {toggleAddPersona&&<ModaladdPersona 
                setToggleAddPersona={setToggleAddPersona}
                getPersona={getPersona}
                personas={personas}
                setPersonas={setPersonas}
                inputmodaladdpersonacarritoref={inputmodaladdpersonacarritoref}
                tbodypersoInterref={tbodypersoInterref}
                countListPersoInter={countListPersoInter}

                setPersonaFast={setPersonaFast}
                clienteInpidentificacion={clienteInpidentificacion}
                setclienteInpidentificacion={setclienteInpidentificacion}
                clienteInpnombre={clienteInpnombre}
                setclienteInpnombre={setclienteInpnombre}
                clienteInptelefono={clienteInptelefono}
                setclienteInptelefono={setclienteInptelefono}
                clienteInpdireccion={clienteInpdireccion}
                setclienteInpdireccion={setclienteInpdireccion}
              />}
              <table className="table table-bordered text-center">
                <thead>
                  <tr>
                    <th className="text-arabito">Código</th>
                    <th className="text-arabito">Árticulo</th>
                    <th className="text-arabito">Cant.</th>
                    <th className="text-arabito">Precio</th>
                    {/*<th className="text-arabito">Sub-total</th>*/}
                    {/*<th className="text-arabito">Desc. %</th>*/}
                    {/*<th className="text-arabito">Tot.Desc.</th>*/}
                    <th className="text-arabito">Total</th>
                    {editable?
                    <th><button className="btn btn-circle text-white btn-arabito btn-sm mb-3" onClick={toggleModalProductos}>F1 <i className="fa fa-plus"></i></button></th>
                    :null}
                  </tr>
                </thead>
                <tbody>
                  {items?items.map((e,i)=>
                    e.abono&&!e.producto?
                    <tr key={e.id}>
                      <td>PAGO</td>
                      <td>{e.abono}</td>
                      <td>{e.cantidad} </td>
                      <td>{e.monto}</td>
                      {/*<td>{e.subtotal}</td>
                      <td onClick={setDescuentoUnitario} data-index={e.id} className="pointer clickme">{e.descuento}</td>
                      {/*<td>{e.total_des}</td>*/}

                      <th className="font-weight-bold">{e.total}</th>
                      <td> </td>
                    </tr>
                    :<tr key={e.id}>
                      <td>{e.producto.codigo_barras}</td>
                      <td>{e.producto.descripcion}</td>
                      <td onClick={setCantidadCarrito} data-index={e.id} className="pointer clickme">{e.cantidad.replace(".00","")} </td>
                      <td>{e.producto.precio}</td>

                      <th className="font-weight-bold">{e.total}</th>
                      {editable?
                      <td> <i onClick={delItemPedido} data-index={e.id} className="fa fa-times text-danger"></i> </td>
                      :null}
                    </tr>
                  ):null}
                  <tr>
                    <td><button className="btn btn-outline-success fs-5">{items.length}</button></td>
                    <td colSpan="5" className="align-middle">
                      {editable?
                      <input className="form-control form-control-sm" ref={refinputaddcarritofast} value={inputaddCarritoFast} 
                      placeholder="Agregar...(esc)" onChange={e=>setinputaddCarritoFast(e.target.value)}/>
                      :null}
                    </td>

                  </tr>
                  <tr>
                    <th colSpan="6" className="p-2">{cliente?cliente.nombre:null} <b>{cliente?cliente.identificacion:null}</b></th>
                  </tr>
                </tbody>
              </table>
            </div>
          
            
            <div className="col-5">
              <div className={(estado?"bg-success":"bg-arabito")+(" text-center p-1")}>
                <h3>Pedido #{id}</h3>
                <h6>{created_at}</h6>
              </div>
              <div className="mt-2 mb-2 container-fluid">
                
                <div className="row">
                  {editable?
                    <>
                      <div className="col p-0">
                        
                        <div className={(debito!=""?"bg-success-light card-arabito":"t-5")+(" card")}>
                          <div className="card-body">
                            <div className="card-title pointer" onClick={getDebito}>Déb.</div>
                            <div className="card-text pago-numero"><input type="text" value={debito} onChange={(e)=>syncPago(e.target.value,"Debito")} placeholder="D"/></div>
                            
                          </div>
                        </div>
                      </div>
                      <div className="col p-0">
                        
                        <div className={(efectivo!=""?"bg-success-light card-arabito":"t-5")+(" card")}>
                          <div className="card-body">
                            <div className="card-title pointer" onClick={getEfectivo}>Efec.</div>
                            <div className="card-text pago-numero"><input type="text" value={efectivo} onChange={(e)=>syncPago(e.target.value,"Efectivo")} placeholder="E"/></div>
                            
                          </div>
                        </div>
                      </div>

                      <div className="col p-0">
                        
                        <div className={(transferencia!=""?"bg-success-light card-arabito":"t-5")+(" card")}>
                          <div className="card-body">
                            <div className="card-title pointer" onClick={getTransferencia}>Tran.</div>
                            <div className="card-text pago-numero"><input type="text" value={transferencia} onChange={(e)=>syncPago(e.target.value,"Transferencia")} placeholder="T"/></div>
                            
                          </div>
                        </div>
                      </div>

                      <div className="col p-0">
                        
                        <div className={(credito!=""?"bg-success-light card-arabito":"t-5")+(" card")}>
                          <div className="card-body">
                            <div className="card-title pointer" onClick={getCredito}>Créd.</div>
                            <div className="card-text pago-numero"><input type="text" value={credito} onChange={(e)=>syncPago(e.target.value,"Credito")} placeholder="C"/></div>
                            
                          </div>
                        </div>
                      </div>
                    </>:<>
                      
                      <div className="col p-0">
                        
                        <div className={(debito!=""?"bg-success-light card-arabito":"t-5")+(" card")}>
                          <div className="card-body">
                            <div className="card-title pointer">Déb.</div>
                            <div className="card-text pago-numero">{debito}</div>
                            
                          </div>
                        </div>
                      </div>
                      <div className="col p-0">
                        
                        <div className={(efectivo!=""?"bg-success-light card-arabito":"t-5")+(" card")}>
                          <div className="card-body">
                            <div className="card-title pointer">Efec.</div>
                            <div className="card-text pago-numero">{efectivo}</div>
                            
                          </div>
                        </div>
                      </div>

                      <div className="col p-0">
                        
                        <div className={(transferencia!=""?"bg-success-light card-arabito":"t-5")+(" card")}>
                          <div className="card-body">
                            <div className="card-title pointer">Tran.</div>
                            <div className="card-text pago-numero">{transferencia}</div>
                            
                          </div>
                        </div>
                      </div>

                      <div className="col p-0">
                        
                        <div className={(credito!=""?"bg-success-light card-arabito":"t-5")+(" card")}>
                          <div className="card-body">
                            <div className="card-title pointer">Créd.</div>
                            <div className="card-text pago-numero">{credito}</div>
                            
                          </div>
                        </div>
                      </div>
                    </>
                  }

                  <div className="col p-0">
                    
                    <div className={(vuelto!=""?"card-danger-pago":"t-5")+(" card pointer")}>
                      <div className="card-body">
                        <div className="card-title">Vuel.</div>
                        {
                          editable?
                          <div className="card-text pago-numero">
                            <input type="text" value={vuelto} onChange={(e)=>setVuelto(number(e.target.value))} placeholder="V"/>
                          </div>
                          :
                          <div onClick={entregarVuelto}>
                            <div className="card-text pago-numero">                
                              {vuelto}
                            </div>
                            <small className="text-success fst-italic " className="pointer">Entregar</small><br/>
                            {vuelto_entregado.map(e=><div title={e.created_at} key={e.id}>
                              Entregado = <b>{e.monto}</b>
                              
                            </div>)}
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              {!editable?
                <div className="text-right">
                  

                  {autoCorrector?
                    <button className="btn btn-outline-success btn-sm pull-right" onClick={()=>setautoCorrector(false)}>Auto On</button>:
                    <button className="btn btn-outline-danger btn-sm pull-right" onClick={()=>setautoCorrector(true)}>Off Auto</button>
                  }

                </div>:null
              }

              <div className="mt-1 mb-1">
                <table className="table table-sm">
                  <tbody>
                    <tr>
                      <th className="">Sub-Total</th>
                      <td className="text-right">{subtotal}</td>
                    </tr>
                    <tr>
                      <th className="">I.V.A <span>16%</span></th>
                      <td className="text-right"></td>
                    </tr>
                    <tr>
                      <th className="" data-index={id} onClick={setDescuentoTotal} className="pointer clickme">Desc. {total_porciento}%
                      </th>
                      <td className="text-right">{total_des}</td>
                    </tr>
                    <tr className="h4">
                      <th className="">Total</th>
                      <td className="text-right">{total}</td>
                    </tr>

                    <tr className="text-muted">
                      <th className="text-left">Ref. Bs {bs}</th>
                      <th className="text-right">Ref. COP {cop}</th>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="d-flex justify-content-center">
              </div>
              <div className="d-flex justify-content-center">
                
                <div className="">
                  {editable?
                  <button className="btn btn-circle text-white btn-success btn-xl me-5" onClick={facturar_pedido}>ENTER <i className="fa fa-paper-plane"></i></button>
                  :null}
                  {editable?
                  <button className="btn btn-circle text-white btn-primary btn-xl me-4" onClick={()=>setToggleAddPersona(true)}>F2 <i className="fa fa-user"></i></button>
                  :null}
                  <button className="btn btn-circle text-white btn-arabito btn-xl me-1" onClick={toggleImprimirTicket}>F3 <i className="fa fa-print"></i></button>
                  <button className="btn btn-circle text-white btn-arabito btn-xl me-4" onClick={viewReportPedido}>F4 <i className="fa fa-eye"></i></button>
                  {editable?
                  <button className="btn btn-circle text-white btn-danger btn-sm" onClick={del_pedido}>F5 <i className="fa fa-times"></i></button>
                  :null}
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </>

      
    )
  }catch(err){
    console.log(err)
    return ""

  }
}
export default Pagar