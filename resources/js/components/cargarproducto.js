
function Cargarproducto({
  productosInventario,
  qBuscarInventario,
  setQBuscarInventario,

  setIndexSelectInventario,
  indexSelectInventario,
  inputBuscarInventario,

  inpInvbarras,
  setinpInvbarras,
  inpInvcantidad,
  setinpInvcantidad,
  inpInvalterno,
  setinpInvalterno,
  inpInvunidad,
  setinpInvunidad,
  inpInvcategoria,
  setinpInvcategoria,
  inpInvdescripcion,
  setinpInvdescripcion,
  inpInvbase,
  setinpInvbase,
  inpInvventa,
  setinpInvventa,
  inpInviva,
  setinpInviva,

  number,
  guardarNuevoProducto,

  subViewInventario,
  setsubViewInventario,


  proveedoresList,

  delProveedor,
  delProducto,

  inpInvid_proveedor,
  setinpInvid_proveedor,

  inpInvid_marca,
  setinpInvid_marca,

  inpInvid_deposito,
  setinpInvid_deposito,

  depositosList,
  marcasList,

  Invnum,
  setInvnum,
  InvorderColumn,
  setInvorderColumn,
  InvorderBy,
  setInvorderBy,
}) {

  const setIndexSelectInventarioFun = e => {
    let index = e.currentTarget.attributes["data-index"].value
    if (index==indexSelectInventario) {
      setIndexSelectInventario(null)
    }else{
      setIndexSelectInventario(index)
    }
  }

 
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
              <div className="input-group ">
                <input type="text" 
                ref={inputBuscarInventario}
                className="form-control" 
                placeholder="Buscar... Presiona (ESC)" 
                value={qBuscarInventario} 
                onChange={e=>setQBuscarInventario(e.target.value)}/>
                <select value={Invnum} onChange={e=>setInvnum(e.target.value)}>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                  <option value="500">500</option>
                  <option value="2000">2000</option>
                </select>
                <select value={InvorderColumn} onChange={e=>setInvorderColumn(e.target.value)}>
                  <option value="id">id</option>
                  <option value="descripcion">descripcion</option>
                  <option value="precio">precio</option>
                  <option value="cantidad">cantidad</option>
                  <option value="codigo">codigo</option>
                </select>
                <select value={InvorderBy} onChange={e=>setInvorderBy(e.target.value)}>
                  <option value="asc">Asc</option>
                  <option value="desc">Desc</option>
                </select>
                <div className="input-group-prepend">
                  <button className="btn btn-outline-secondary" type="button"><i className="fa fa-search"></i></button>
                </div>
              </div>
              
              { 
                productosInventario.length
                ? productosInventario.map( (e,i) =>
                  <div 
                  onClick={setIndexSelectInventarioFun} 
                  data-index={i}
                  key={e.id}
                  className={(indexSelectInventario==i?"bg-arabito":"bg-light text-secondary")+" card mt-2 pointer"}>
                    <div className="card-header flex-row justify-content-between">
                      <div>
                        <small>ID.{e.id}</small>
                      </div>
                      <div className="d-flex justify-content-between">
                        <div><span>{e.codigo_proveedor}</span></div>
                        <div><span className="h3">{e.precio}</span></div>
                      </div>
                    </div>
                    <div className="card-body d-flex justify-content-between">
                      <div className="/personal/vermas">
                        <h5 
                        className="card-title"
                        ><b>{e.descripcion}</b></h5>
                      </div> 
                      <p className="card-text p-1">
                        Ct. <b>{e.cantidad}</b>
                      </p>
                    </div>
                  </div>
                 )
                : <div className='h3 text-center text-dark mt-2'><i>¡Sin resultados!</i></div>
              }
          </div>
          <div className="col">        
            <form className="container-fluid" onSubmit={guardarNuevoProducto}>
              <h3>Producto</h3>

              <div className="row">
                <div className="col text-center">Bar. <input className="m-3 h2" 
                type="text" 
                value={inpInvbarras} 
                onChange={e=>setinpInvbarras(e.target.value)} 
                placeholder="Barras."/></div>
              </div>
              <div className="row">
                <div className="col text-center">
                  Ct. <input className="h1 m-5 input-ct" 
                  type="text"
                  value={inpInvcantidad} 
                  onChange={e=>setinpInvcantidad(number(e.target.value))}
                  placeholder="Ct."/>
                </div>
              </div>
              <div className="row">
                <div className="col"><input className="" 
                type="text" 
                value={inpInvalterno} 
                onChange={e=>setinpInvalterno(e.target.value)}
                placeholder="Alterno."/></div>
                <div className="col">
                  <select className="form-control"
                  value={inpInvunidad} 
                  onChange={e=>setinpInvunidad(e.target.value)}
                  >
                    <option value="UND">UND</option>
                    <option value="PAR">PAR</option>
                    <option value="JUEGO">JUEGO</option>
                    <option value="PQT">PQT</option>
                    <option value="MTR">MTR</option>
                    <option value="KG">KG</option>
                    <option value="LTR">LTR</option>
                  </select>
                </div>
                <div className="col">
                <select className="form-control"
                  value={inpInvcategoria} 
                  onChange={e=>setinpInvcategoria(e.target.value)}
                  >
                  
                    <option value="1">VETERINARIA</option>
                    <option value="2">TORNILLERIA</option>
                    <option value="3">TERMOS</option>
                    <option value="4">TELEFONIA</option>
                    <option value="5">TECNOLOGIA</option>
                    <option value="6">REPUESTOS</option>
                    <option value="7">REFRIGERACION</option>
                    <option value="8">QUINCALLERIA</option>
                    <option value="9">PLOMERIA</option>
                    <option value="10">PLANTAS</option>
                    <option value="11">PINTURA</option>
                    <option value="12">PESCA</option>
                    <option value="13">PEGAS</option>
                    <option value="14">NAILOS</option>
                    <option value="15">MOTOS</option>
                    <option value="16">MECANICA</option>
                    <option value="17">MALLAS</option>
                    <option value="18">LENTES</option>
                    <option value="19">JARDINERIA</option>
                    <option value="20">INTERNET</option>
                    <option value="21">ILUMINACION></option>
                    <option value="22">HOGAR</option>
                    <option value="23">HERRERIA</option>
                    <option value="24">HERRAMIENTAS</option>
                    <option value="25">GRIFERIA</option>
                    <option value="26">GAS</option>
                    <option value="27">FONTANERIA</option>
                    <option value="28">ELECTRONICA</option>
                    <option value="29">ELECTRODOMESTICO</option>
                    <option value="30">ELECTRICIDAD</option>
                    <option value="31">DISCO</option>
                    <option value="32">CORDONES</option>
                    <option value="33">CONSTRUCCION</option>
                    <option value="34">CERRADURA</option>
                    <option value="35">CERAMICA</option>
                    <option value="36">BATERIA</option>
                    <option value="37">ALAMBRE</option>
                    <option value="38">AGRICOLA</option>
                    <option value="39">ACEITES</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  Proveedor
                  <select className="form-control" onChange={e=>setinpInvid_proveedor(e.target.value)} value={inpInvid_proveedor}>
                    <option value="">----</option>
                    {proveedoresList.map(e=><option value={e.id} key={e.id}>{e.descripcion}</option>)}
                  </select>
                </div>

                <div className="col">
                  Depósito
                  <select className="form-control" onChange={e=>setinpInvid_deposito(e.target.value)} value={inpInvid_deposito}>
                    <option value="">----</option>
                    {depositosList.map(e=><option value={e.id} key={e.id}>{e.descripcion}</option>)}

                  </select>
                </div>

                <div className="col">
                  Marca
                  <select className="form-control" onChange={e=>setinpInvid_marca(e.target.value)} value={inpInvid_marca}>
                    <option value="">----</option>
                    {marcasList.map(e=><option value={e.id} key={e.id}>{e.descripcion}</option>)}

                  </select>
                </div>
                


              </div>
              <div className="row">
                <div className="col text-center">
                  <textarea className="m-5 h3" cols="40" rows="3"
                  value={inpInvdescripcion} 
                  onChange={e=>setinpInvdescripcion(e.target.value)}
                  placeholder="Descripción"></textarea>
                </div>
              </div>
              <div className="row">
                <div className="col text-right">
                  <div className="bg-arabito p-2">
                    Base. <input className="h1 input-ct" 
                    type="text"
                    value={inpInvbase} 
                    onChange={e=>setinpInvbase(number(e.target.value))}
                    placeholder="Base."/>
                  </div>
                </div>
                <div className="col">
                  <div className="bg-primary p-2">
                    <input className="h1 input-ct" 
                    type="text"
                    value={inpInvventa} 
                    onChange={e=>setinpInvventa(number(e.target.value))}
                    placeholder="Venta."/> Venta.
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col text-center">
                  <div className="mt-2">
                    <label htmlFor="">
                    IVA % <input className="input-ct" 
                    type="text"
                    value={inpInviva} 
                    onChange={e=>setinpInviva(number(e.target.value))}
                    placeholder="Iva."/>
                    </label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col text-center">
                  {indexSelectInventario==null?
                    <button className="btn btn-outline-success btn-block" type="submit">Guardar</button>
                  :
                    <div className="btn-group">
                      <button className="btn btn-arabito btn-block" type="submit">Editar</button>
                      <button className="btn btn-outline-danger btn-block" onClick={delProducto} type="button"><i className="fa fa-times"></i></button>
                    </div>
                  }
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
export default Cargarproducto