
function ProductosList({
  productos,
  addCarrito,

  clickSetOrderColumn,

  orderColumn,
  orderBy,
  counterListProductos,
  setCounterListProductos,
  tbodyproductosref,
  focusCtMain
}) {

  return (
    <table className="tabla-facturacion ">
      <thead>
        <tr>
          <th className="cell2 pointer" 
          data-valor="codigo_proveedor" 
          onClick={clickSetOrderColumn}>Cod. 
            {orderColumn=="codigo_proveedor"?(<i className={orderBy=="desc"?"fa fa-arrow-up":"fa fa-arrow-down"}></i>):null}
          </th>
          <th className="cell4 pointer" 
          data-valor="descripcion" 
          onClick={clickSetOrderColumn}>Desc. 
            {orderColumn=="descripcion"?(<i className={orderBy=="desc"?"fa fa-arrow-up":"fa fa-arrow-down"}></i>):null}
          </th>
          <th className="cell1 pointer" 
          data-valor="cantidad" 
          onClick={clickSetOrderColumn}>Disp. 
            {orderColumn=="cantidad"?(<i className={orderBy=="desc"?"fa fa-arrow-up":"fa fa-arrow-down"}></i>):null}
          </th>
          <th className="cell1 pointer" 
          data-valor="unidad" 
          onClick={clickSetOrderColumn}>Unidad 
            {orderColumn=="unidad"?(<i className={orderBy=="desc"?"fa fa-arrow-up":"fa fa-arrow-down"}></i>):null}
          </th>
          <th className="cell2 pointer" 
          data-valor="precio" 
          onClick={clickSetOrderColumn}>Precio 
            {orderColumn=="precio"?(<i className={orderBy=="desc"?"fa fa-arrow-up":"fa fa-arrow-down"}></i>):null}
          </th>
        </tr>
      </thead>
      <tbody ref={tbodyproductosref}>
        {productos.map((e,i)=>
          <tr data-index={i} tabIndex="-1" className={(counterListProductos==i?"bg-select":null)+(' tr-producto')} key={e.id}>
            <td data-index={i} onClick={addCarrito} className="pointer cell3">{e.codigo_barras}</td>
            <td data-index={i} onClick={addCarrito} className='pointer text-left pl-5 cell3'>{e.descripcion}</td>
            <td className="cell1">
              <a href='#' className='formShowProductos btn btn-arabito btn-sm w-50'>{e.cantidad}</a>         
            </td>
            <td className="cell1">{e.unidad}</td>
            <td className="cell2">
              <div className='btn-group w-75'>
                  <button type="button" className='m-0 btn-sm btn btn-success text-light w-50'>{e.precio}</button>
                  <button type="button" className='m-0 btn-sm btn btn-secondary w-50'>Bs. {e.bs} </button>
              </div>
              <div className='btn-group w-75'>
                  <button type="button" className='m-0 btn-sm btn btn-secondary'>Cop. {e.cop}</button>
              </div>
            </td>
          </tr>
          )}
      </tbody>
    </table>
  )
}
export default ProductosList