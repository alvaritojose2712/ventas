
import Clientes from '../components/clientes';

function Credito({
  onchangecaja,

  qDeudores,
  deudoresList,

  selectDeudor,
  setSelectDeudor,

  tipo_pago_deudor,
  monto_pago_deudor,
  setPagoCredito,
  onClickEditPedido,
  onCLickDelPedido,
  detallesDeudor,
  onlyVueltos,
  setOnlyVueltos,

  crediSubview,
  setcrediSubview,
  qBuscarCliente,
  setqBuscarCliente,
  clientesCrud,
  setindexSelectCliente,
  indexSelectCliente,
  setClienteCrud,
  delCliente,
  clienteInpidentificacion,
  setclienteInpidentificacion,
  clienteInpnombre,
  setclienteInpnombre,
  clienteInpcorreo,
  setclienteInpcorreo,
  clienteInpdireccion,
  setclienteInpdireccion,
  clienteInptelefono,
  setclienteInptelefono,
  clienteInpestado,
  setclienteInpestado,
  clienteInpciudad,
  setclienteInpciudad,

  sumPedidos,
  sumPedidosArr

}) {

  return (
    <div className="container"> 
      <div className="row">
        <div className="col">
          <h3>Créditos</h3> 
          <div className="btn-group">
            <button className={("btn ")+(crediSubview=="credito"?"btn-dark":"btn-arabito")} onClick={()=>setcrediSubview("credito")}>Créditos</button>
            <button className={("btn ")+(crediSubview=="clientes"?"btn-dark":"btn-arabito")} onClick={()=>setcrediSubview("clientes")}>Clientes</button>
          </div>
        </div>
      </div> 
      {crediSubview=="credito"?
        selectDeudor===null?
        <div>
          <input type="text" className="form-control" value={qDeudores} name="qDeudores" onChange={onchangecaja}/>
          <table className="table table-hoverable">
            <thead>
              <tr>
                <th className="text-right">Balance</th>
                <th className="text-center">Nombres</th>
                <th className="text-right">Vuelto</th>
              </tr>
            </thead>
            <tbody>
              {deudoresList.map((e,i)=>
                e?
                <tr key={e.id} className="text-center pointer">
                  <td  className={(e.saldo>0?"text-success":"text-danger")+(" h2 text-right")}>
                    <button className={("btn ")+(e.saldo<0?"btn-outline-danger":"btn-outline-success")} onClick={()=>{
                      setOnlyVueltos(0)
                      setSelectDeudor(i)
                    }}>{e.saldo}</button>
                  </td>
                  <td>{e.id} - {e.nombre} - {e.identificacion}</td>
                  <td className="text-right">
                    <button className="btn btn-outline-danger" onClick={()=>{
                      setOnlyVueltos(1)
                      setSelectDeudor(i)
                    }}>Vuelto {e.totalVuelto}</button>
                  </td>
                  
                </tr>
                :null
              )}
            </tbody>
          </table>
        </div>:
        <div className="p-4">
          <h3 className="text-center"><i className="fa fa-times text-danger pointer" onClick={()=>{
            setSelectDeudor(null)
            setOnlyVueltos(0)
          }}></i></h3>
          <hr/>
          <div>
            <table className="table table-striped">
              <thead>
                  <tr className="">
                    {detallesDeudor["pedido_total"]?
                    <>
                      <th className="" colSpan="2">
                        {deudoresList[selectDeudor]?
                        <div className="">
                          <span className="">{deudoresList[selectDeudor].identificacion}</span>
                          <h1 className="">{deudoresList[selectDeudor].nombre}</h1>
                        </div>:null}
                        {sumPedidosArr.map(e=><button key={e} className="btn btn-outline-success" data-id={e} data-tipo="del" onClick={sumPedidos}>{e}</button>)}
                        {sumPedidosArr.length?
                          <a className="" target="_blank" href={"/sumpedidos?id="+sumPedidosArr}>
                            <button className="btn btn-success">Emitir Factura.</button>
                          </a>
                          :null}
                      </th>
                      {!onlyVueltos?
                        <>
                            <td className="text-right">Balance: <h2 className={(detallesDeudor["pedido_total"]["diferencia"]>0?"text-success":"text-danger")}>{detallesDeudor["pedido_total"]["diferencia"]}</h2></td>
                            <td className="text-right h3 text-danger">{detallesDeudor["pedido_total"][1]}</td>
                            <td className="text-right h3 text-success">{detallesDeudor["pedido_total"][0]}</td>
                        </>
                      :null}
                    </>
                    :null}
                  </tr>
                <tr>
                  <th className="text-right">FECHA</th>
                  <th>PEDIDO</th>
                  <th>TIPO PAGO</th>
                  <th className="text-right ">CRÉDITO</th>
                  <th className="text-right ">ABONO</th>
                </tr>
              </thead>
              <tbody>

              {!onlyVueltos?
                <tr>
                  <td colSpan="2"></td>
                  <td>
                      <form onSubmit={setPagoCredito} className="w-50">

                        <div className="form-group">
                          <label htmlFor="">Tipo de pago</label>
                          <select value={tipo_pago_deudor} name="tipo_pago_deudor" onChange={onchangecaja} className="form-control">
                            <option value="3">Efectivo</option>            
                            <option value="1">Transferencia</option>            
                            <option value="2">Débito</option>            
                          </select>
                        </div>
                      </form>
                  </td>
                  <td colSpan="2">
                      <form onSubmit={setPagoCredito} className="">
                        <div className="form-group">
                          <label htmlFor="">Monto Pago</label>
                          <input name="monto_pago_deudor" value={monto_pago_deudor} onChange={onchangecaja} className="form-control"/>
                        </div>
                      </form>

                  </td>
                </tr>
              :null}

                {
                  detallesDeudor&&detallesDeudor["pedido"]?
                    detallesDeudor["pedido"].map(e=>
                      <tr key={e.id}>
                        <td className="d-flex justify-content-between">
                          {!sumPedidosArr.filter(id_save=>id_save==e.id).length?
                            <button className="btn btn-outline-success" data-id={e.id} data-tipo="add" onClick={sumPedidos}>Select</button>
                            :
                          
                            <button className="btn btn-outline-danger" data-id={e.id} data-tipo="del" onClick={sumPedidos}>UnSelect</button>
                          }
                          {/*<span title="Eliminar pedido">
                            Eliminar <i className="fa fa-times text-danger" data-type="getDeudor" onClick={onCLickDelPedido} data-id={e.id}></i> {e.created_at}
                          </span>*/}
                        </td>
                        <td>
                          <button className="btn btn-secondary btn-lg w-50" data-id={e.id} onClick={onClickEditPedido}>{e.id} <i className="fa fa-eye"></i></button>
                        </td>
                        <td>
                          {e.pagos.map(ee=><div key={ee.id}>
                            {ee.tipo==1&&ee.monto!=0?<span className="w-50 btn-sm btn-info btn">Trans. {ee.monto}</span>:null}
                            {ee.tipo==2&&ee.monto!=0?<span className="w-50 btn-sm btn-secondary btn">Deb. {ee.monto}</span>:null}
                            {ee.tipo==3&&ee.monto!=0?<span className="w-50 btn-sm btn-success btn">Efec. {ee.monto}</span>:null}
                            {ee.tipo==6&&ee.monto!=0?<span className="w-50 btn-sm btn-danger btn" data-id={e.id} onClick={onClickEditPedido}>Vuel. {ee.monto}</span>:null}
                            {ee.tipo==4&&ee.monto!=0?<span className="w-50 btn-sm btn-warning btn">Cred. {ee.monto}</span>:null}
                          </div>)}
                          {e.entregado.map((ee,i)=><div key={ee.id}>
                            <span className="w-50 btn-sm btn-warning btn">{ee.descripcion} {ee.monto}</span>
                          </div>)}
                        </td>
                        {e.saldoDebe?
                          <>
                            <th className="text-danger h2 text-right">{e.saldoDebe}</th>
                            <td></td>
                            
                          </>:
                          <>
                            <td></td>
                            <th className="text-success h2 text-right">{e.saldoAbono}</th>
                          </>
                        }
                      </tr>
                    )
                  :null
                }
              </tbody>
            </table>
          </div>
        </div>
      :null}
      {crediSubview=="clientes"?
        <Clientes
          qBuscarCliente={qBuscarCliente}
          setqBuscarCliente={setqBuscarCliente}
          clientesCrud={clientesCrud}
          setindexSelectCliente={setindexSelectCliente}
          indexSelectCliente={indexSelectCliente}
          setClienteCrud={setClienteCrud}
          delCliente={delCliente}
          clienteInpidentificacion={clienteInpidentificacion}
          setclienteInpidentificacion={setclienteInpidentificacion}
          clienteInpnombre={clienteInpnombre}
          setclienteInpnombre={setclienteInpnombre}
          clienteInpcorreo={clienteInpcorreo}
          setclienteInpcorreo={setclienteInpcorreo}
          clienteInpdireccion={clienteInpdireccion}
          setclienteInpdireccion={setclienteInpdireccion}
          clienteInptelefono={clienteInptelefono}
          setclienteInptelefono={setclienteInptelefono}
          clienteInpestado={clienteInpestado}
          setclienteInpestado={setclienteInpestado}
          clienteInpciudad={clienteInpciudad}
          setclienteInpciudad={setclienteInpciudad}
        />
      :null}
    </div>
  )
}
export default Credito