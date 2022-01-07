

function ModalAddCarrito({number,inputCantidadCarritoref,producto,pedidoList,setSelectItem,addCarritoRequest,cantidad,numero_factura,setCantidad,setNumero_factura,setFalla}) {

  return (
    <>
      <section className="modal-custom"> 
        <div className="text-danger" onClick={setSelectItem}><span className="closeModal">&#10006;</span></div>
        <div className="modal-content-sm modal-cantidad">
         <div className="d-flex justify-content-between">
          <div>
            <h5>{producto.codigo_proveedor}</h5>
            <h4>{producto.descripcion}</h4>
          </div>
          <h5 className="text-success">${producto.precio}</h5>
          
         </div>
          <form onSubmit={e=>e.preventDefault()} className="d-flex justify-content-center flex-column p-3">
            <div className="input-group m-3">
              <input type="number" ref={inputCantidadCarritoref} className="form-control" placeholder="Cantidad" onChange={(e)=>setCantidad(number(e.target.value))} value={number(cantidad)}/>

              <div className="input-group-append">
                <span className="input-group-text">Total. {cantidad*producto.precio?(cantidad*producto.precio).toFixed(2):null}</span>
              </div>
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  Pedido #
                  <small className="text-muted">(space)</small>
                </span>
              </div>
              <select className="form-control" onChange={(e)=>setNumero_factura(e.target.value)} value={numero_factura}>
                {pedidoList.map((e,i)=>
                  <option value={e.id} key={e.id}>{e.id}</option>
                )}
                  <option value='nuevo'>Nuevo Pedido</option>
              </select>

            </div>
            <div className="btn-group">
              <button className="btn btn-arabito agregar_carrito" type="button" onClick={addCarritoRequest} data-type="agregar">Agregar(enter)</button>
              <button className="btn btn-outline-success" type="button" onClick={addCarritoRequest} data-type="agregar_procesar">Procesar(f1)</button>
              <button className="btn btn-outline-secondary" type="button" onClick={setFalla} data-id={producto.id}>Falla</button>
              
            </div>
          </form>

        </div>
      </section>
      <div className="overlay"></div>
    </>

    
  )
}
export default ModalAddCarrito