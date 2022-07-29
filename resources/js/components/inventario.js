
import Proveedores from '../components/proveedores';
import CargarProducto from '../components/cargarproducto';
import Facturas from '../components/facturas';
import Fallas from '../components/fallas';

import InventarioForzado from '../components/inventarioForzado';
import EstadisticaInventario from '../components/estadisticainventario';
import Gastos from '../components/gastos';





function Inventario({
  setdropprintprice,
dropprintprice,
  printPrecios,
  setCtxBulto,
  setPrecioAlterno,

  openReporteFalla,
  setporcenganancia,
  changeInventario,
  
  /* showaddpedidocentral,
  setshowaddpedidocentral,
  valheaderpedidocentral,
  setvalheaderpedidocentral,
  valbodypedidocentral,
  setvalbodypedidocentral,
  procesarImportPedidoCentral, */

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

  setProveedor,
  proveedordescripcion,
  setproveedordescripcion,
  proveedorrif,
  setproveedorrif,
  proveedordireccion,
  setproveedordireccion,
  proveedortelefono,
  setproveedortelefono,

  subViewInventario,
  setsubViewInventario,

  setIndexSelectProveedores,
  indexSelectProveedores,
  qBuscarProveedor,
  setQBuscarProveedor,
  proveedoresList,

  delProveedor,
  delProducto,

  inpInvid_proveedor,
  setinpInvid_proveedor,
  inpInvid_marca,
  setinpInvid_marca,
  inpInvid_deposito,
  setinpInvid_deposito,
  setshowModalFacturas,
  showModalFacturas,
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
  factInpid_proveedor,
  setfactInpid_proveedor,
  factInpnumfact,
  setfactInpnumfact,
  factInpdescripcion,
  setfactInpdescripcion,
  factInpmonto,
  setfactInpmonto,
  factInpfechavencimiento,
  setfactInpfechavencimiento,

  setFactura,

  factInpestatus,
  setfactInpestatus,

  delFactura,

  Invnum,
  setInvnum,
  InvorderColumn,
  setInvorderColumn,
  InvorderBy,
  setInvorderBy,

  delItemFact,

  qFallas,
  setqFallas,
  orderCatFallas,
  setorderCatFallas,
  orderSubCatFallas,
  setorderSubCatFallas,
  ascdescFallas,
  setascdescFallas,
  fallas,
  delFalla,

  getPedidosCentral,
  selectPedidosCentral,
  checkPedidosCentral,

  pedidosCentral,
  setIndexPedidoCentral,
  indexPedidoCentral,
  moneda,
  
  verDetallesFactura,
  setNewProducto,
  modViewInventario,
  setmodViewInventario,
  inpInvLotes,

  addNewLote,
  changeModLote,
  reporteInventario,

  guardarNuevoProductoLote,
  refsInpInvList,
  categorias,

  fechaQEstaInve,
  setfechaQEstaInve,
  fechaFromEstaInve,
  setfechaFromEstaInve,
  fechaToEstaInve,
  setfechaToEstaInve,
  orderByEstaInv,
  setorderByEstaInv,
  orderByColumEstaInv,
  setorderByColumEstaInv,
  dataEstaInven,

  saveFactura,
  
  setmodFact,
  modFact,

  setPagoProveedor,
  tipopagoproveedor,
  settipopagoproveedor,
  montopagoproveedor,
  setmontopagoproveedor,
  getPagoProveedor,
  pagosproveedor,

  setSameGanancia,
  setSameCat,
  setSamePro,
  busquedaAvanazadaInv,
  setbusquedaAvanazadaInv,

  busqAvanzInputsFun,
  busqAvanzInputs,
  buscarInvAvanz,

  delPagoProveedor,

  qgastosfecha1,
  setqgastosfecha1,
  qgastosfecha2,
  setqgastosfecha2,
  qgastos,
  setqgastos,
  qcatgastos,
  setqcatgastos,
  gastosdescripcion,
  setgastosdescripcion,
  gastoscategoria,
  setgastoscategoria,
  gastosmonto,
  setgastosmonto,
  gastosData,
  delGastos,
  getGastos,
  setGasto,

  sameCatValue,
  sameProValue,
}) {

  const type = type => {
    return !type || type === "delete" ? true : false
  }

  return (
    <>
      <div className="container">
        <div className="row">
        <div className="col mb-2 d-flex justify-content-between auto-colum">
          <div className="btn-group auto-colum">              
              <button className={("btn ")+(subViewInventario=="inventario"?"btn-success":"btn-outline-success")} onClick={()=>setsubViewInventario("inventario")}>Inventario</button>
              
              <button className={("btn ")+(subViewInventario=="proveedores"?"btn-success":"btn-outline-success")} onClick={()=>setsubViewInventario("proveedores")}>Proveedores</button>
              <>
                <button className={("btn ") + (subViewInventario=="facturas"?"btn-success":"btn-outline-success")} onClick={()=>setsubViewInventario("facturas")}>Facturas</button>
              </>
              <button className={("btn ") + (subViewInventario=="fallas"?"btn-success":"btn-outline-success")} onClick={()=>setsubViewInventario("fallas")}>Fallas</button>
          </div>
          <div className="btn-group auto-colum">
              <button className={("btn ") + (subViewInventario == "gastos" ? "btn-success" : "btn-outline-success")} onClick={() => setsubViewInventario("gastos")}>Gastos</button>
              <button className={("btn ") + (subViewInventario=="estadisticas"?"btn-success":"btn-outline-success")} onClick={()=>setsubViewInventario("estadisticas")}>Estadísticas</button> 
          </div>
          
        </div>
          
        </div>
      </div>
      <hr/>
      {
        subViewInventario=="facturas"?
          <Facturas
            delPagoProveedor={delPagoProveedor}
            pagosproveedor={pagosproveedor}
            getPagoProveedor={getPagoProveedor}
            setPagoProveedor={setPagoProveedor}
            tipopagoproveedor={tipopagoproveedor}
            settipopagoproveedor={settipopagoproveedor}
            montopagoproveedor={montopagoproveedor}
            setmontopagoproveedor={setmontopagoproveedor}
            setmodFact={setmodFact}
            modFact={modFact}
            qBuscarProveedor={qBuscarProveedor}
            setQBuscarProveedor={setQBuscarProveedor}
            setIndexSelectProveedores={setIndexSelectProveedores}
            indexSelectProveedores={indexSelectProveedores}

            moneda={moneda}
            saveFactura={saveFactura}
            setsubViewInventario={setsubViewInventario}
            setshowModalFacturas={setshowModalFacturas}
            showModalFacturas={showModalFacturas}
            facturas={facturas}
            verDetallesFactura={verDetallesFactura}

            factqBuscar={factqBuscar}
            setfactqBuscar={setfactqBuscar}
            factqBuscarDate={factqBuscarDate}
            setfactqBuscarDate={setfactqBuscarDate}
            factsubView={factsubView}
            setfactsubView={setfactsubView}
            factSelectIndex={factSelectIndex}
            setfactSelectIndex={setfactSelectIndex}
            factOrderBy={factOrderBy}
            setfactOrderBy={setfactOrderBy}
            factOrderDescAsc={factOrderDescAsc}
            setfactOrderDescAsc={setfactOrderDescAsc}
            factInpid_proveedor={factInpid_proveedor}
            setfactInpid_proveedor={setfactInpid_proveedor}
            factInpnumfact={factInpnumfact}
            setfactInpnumfact={setfactInpnumfact}
            factInpdescripcion={factInpdescripcion}
            setfactInpdescripcion={setfactInpdescripcion}
            factInpmonto={factInpmonto}
            setfactInpmonto={setfactInpmonto}
            factInpfechavencimiento={factInpfechavencimiento}
            setfactInpfechavencimiento={setfactInpfechavencimiento}
            setFactura={setFactura}
            proveedoresList={proveedoresList}

            number={number}
            
            factInpestatus={factInpestatus}
            setfactInpestatus={setfactInpestatus}
            delFactura={delFactura}
            delItemFact={delItemFact}
          />
        :null
      }
      {
        subViewInventario=="inventario"?
          <>
            <div className="container">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex justify-content-start">

                  {subViewInventario == "inventario" && modViewInventario != "unique" ?
                    <button className="btn btn-success text-light" onClick={() => changeInventario(null, null, null, "add")}>Nuevo (f2) <i className="fa fa-plus"></i></button>
                    :
                    <button className="btn btn-sinapsis mr-1" onClick={setNewProducto}>Nuevo <i className="fa fa-plus"></i></button>
                  }

                 
                  <button className={(modViewInventario == "list" ? "btn-success text-light" : "") + (" ms-2 btn")} onClick={() => setmodViewInventario("list")}><i className="fa fa-list"></i></button>
                  <button className={(modViewInventario == "unique" ? "btn-sinapsis" : "") + (" btn")} onClick={() => setmodViewInventario("unique")}><i className="fa fa-columns"></i></button>
                  <button className="btn btn-warning ms-2" onClick={reporteInventario}><i className="fa fa-print"></i></button>
                  
                  <div className="dropdown ms-1">
                    <button onClick={()=>setdropprintprice(!dropprintprice)} className="btn btn-warning dropdown-toggle" type="button" id="preciosbtn" data-bs-toggle="dropdown" aria-expanded="false">
                      Precio
                    </button>
                    <ul className={("dropdown-menu ")+(dropprintprice?"show":"")} aria-labelledby="preciosbtn">
                      <li><a className="dropdown-item" href="#" onClick={()=>printPrecios(3)}>$</a></li>
                      <li><a className="dropdown-item" href="#" onClick={()=>printPrecios(7)}>Mayor en $</a></li>

                      {/*<li><a className="dropdown-item" href="#" onClick={()=>printPrecios(1)}>$ con Bs</a></li>
                      <li><a className="dropdown-item" href="#" onClick={()=>printPrecios(2)}>Bs con $</a></li>
                      <li><a className="dropdown-item" href="#" onClick={()=>printPrecios(4)}>Bs</a></li>
                      <li><a className="dropdown-item" href="#" onClick={()=>printPrecios(5)}>Mayor en $ con Bs</a></li>
                      <li><a className="dropdown-item" href="#" onClick={()=>printPrecios(6)}>Mayor en Bs con $</a></li>

                      <li><a className="dropdown-item" href="#" onClick={()=>printPrecios(8)}>Mayor en Bs</a></li>
                    */}
                    </ul>
                  </div>
                  
                
                </div>

                {/* {factSelectIndex == null ? null
                  :
                  <div className="input-group w-25">
                    <span className="input-group-text" >{facturas[factSelectIndex] ? facturas[factSelectIndex].proveedor.descripcion : null}</span>

                    <button className="btn btn-outline-secondary"
                      onClick={() => { setshowModalFacturas(true); setfactsubView("detalles") }}>{facturas[factSelectIndex] ? facturas[factSelectIndex].numfact : null}</button>
                    <button className="btn btn-outline-danger" onClick={() => setfactSelectIndex(null)}>
                      <i className="fa fa-times"></i>
                    </button>
                  </div>
                } */}
              </div>
              <hr/>
            </div>
            {modViewInventario=="unique"?
            <CargarProducto
              categorias={categorias}
              setporcenganancia={setporcenganancia}
              type={type}
              setNewProducto={setNewProducto}
              productosInventario={productosInventario}
              qBuscarInventario={qBuscarInventario}
              setQBuscarInventario={setQBuscarInventario}

              setIndexSelectInventario={setIndexSelectInventario}
              indexSelectInventario={indexSelectInventario}
              inputBuscarInventario={inputBuscarInventario}

              inpInvbarras={inpInvbarras}
              setinpInvbarras={setinpInvbarras}
              inpInvcantidad={inpInvcantidad}
              setinpInvcantidad={setinpInvcantidad}
              inpInvalterno={inpInvalterno}
              setinpInvalterno={setinpInvalterno}
              inpInvunidad={inpInvunidad}
              setinpInvunidad={setinpInvunidad}
              inpInvcategoria={inpInvcategoria}
              setinpInvcategoria={setinpInvcategoria}
              inpInvdescripcion={inpInvdescripcion}
              setinpInvdescripcion={setinpInvdescripcion}
              inpInvbase={inpInvbase}
              setinpInvbase={setinpInvbase}
              inpInvventa={inpInvventa}
              setinpInvventa={setinpInvventa}
              inpInviva={inpInviva}
              setinpInviva={setinpInviva}
              inpInvLotes={inpInvLotes}

              number={number}

              guardarNuevoProducto={guardarNuevoProducto}

              setProveedor={setProveedor}
              proveedordescripcion={proveedordescripcion}
              setproveedordescripcion={setproveedordescripcion}
              proveedorrif={proveedorrif}
              setproveedorrif={setproveedorrif}
              proveedordireccion={proveedordireccion}
              setproveedordireccion={setproveedordireccion}
              proveedortelefono={proveedortelefono}
              setproveedortelefono={setproveedortelefono}

              subViewInventario={subViewInventario}
              setsubViewInventario={setsubViewInventario}

              setIndexSelectProveedores={setIndexSelectProveedores}
              indexSelectProveedores={indexSelectProveedores}
              qBuscarProveedor={qBuscarProveedor}
              setQBuscarProveedor={setQBuscarProveedor}
              proveedoresList={proveedoresList}

              delProveedor={delProveedor}
              delProducto={delProducto}

              inpInvid_proveedor={inpInvid_proveedor}
              setinpInvid_proveedor={setinpInvid_proveedor}
              inpInvid_marca={inpInvid_marca}
              setinpInvid_marca={setinpInvid_marca}
              inpInvid_deposito={inpInvid_deposito}
              setinpInvid_deposito={setinpInvid_deposito}
              
              Invnum={Invnum}
              setInvnum={setInvnum}
              InvorderColumn={InvorderColumn}
              setInvorderColumn={setInvorderColumn}
              InvorderBy={InvorderBy}
              setInvorderBy={setInvorderBy}

              addNewLote={addNewLote}
              changeModLote={changeModLote}
              
            />
            : <InventarioForzado
                sameCatValue={sameCatValue}
                sameProValue={sameProValue}
                setCtxBulto={setCtxBulto}
                setPrecioAlterno={setPrecioAlterno}
                busqAvanzInputsFun={busqAvanzInputsFun}
                busqAvanzInputs={busqAvanzInputs}
                buscarInvAvanz={buscarInvAvanz}

                busquedaAvanazadaInv={busquedaAvanazadaInv}
                setbusquedaAvanazadaInv={setbusquedaAvanazadaInv}
                setSameCat={setSameCat}
                setSamePro={setSamePro}
                setSameGanancia={setSameGanancia}

                categorias={categorias}
                setporcenganancia={setporcenganancia}

                refsInpInvList={refsInpInvList}
                proveedoresList={proveedoresList}
                guardarNuevoProductoLote={guardarNuevoProductoLote}
                inputBuscarInventario={inputBuscarInventario}
                type={type}
                number={number}
                productosInventario={productosInventario}
                qBuscarInventario={qBuscarInventario}
                setQBuscarInventario={setQBuscarInventario}

                changeInventario={changeInventario}

                Invnum={Invnum}
                setInvnum={setInvnum}
                InvorderColumn={InvorderColumn}
                setInvorderColumn={setInvorderColumn}
                InvorderBy={InvorderBy}
                setInvorderBy={setInvorderBy}
              />}
          </>
        :null
      }
      {subViewInventario=="proveedores"?<Proveedores 

        number={number}
        setProveedor={setProveedor}
        proveedordescripcion={proveedordescripcion}
        setproveedordescripcion={setproveedordescripcion}
        proveedorrif={proveedorrif}
        setproveedorrif={setproveedorrif}
        proveedordireccion={proveedordireccion}
        setproveedordireccion={setproveedordireccion}
        proveedortelefono={proveedortelefono}
        setproveedortelefono={setproveedortelefono}
        subViewInventario={subViewInventario}
        setsubViewInventario={setsubViewInventario}
        setIndexSelectProveedores={setIndexSelectProveedores}
        indexSelectProveedores={indexSelectProveedores}
        qBuscarProveedor={qBuscarProveedor}
        setQBuscarProveedor={setQBuscarProveedor}
        proveedoresList={proveedoresList}
        delProveedor={delProveedor}
        delProducto={delProducto}
        inpInvid_proveedor={inpInvid_proveedor}
        setinpInvid_proveedor={setinpInvid_proveedor}
        inpInvid_marca={inpInvid_marca}
        setinpInvid_marca={setinpInvid_marca}
        inpInvid_deposito={inpInvid_deposito}
        setinpInvid_deposito={setinpInvid_deposito}
      />:null}

      {subViewInventario=="fallas"?<Fallas 
        openReporteFalla={openReporteFalla}
        qFallas={qFallas}
        setqFallas={setqFallas}
        orderCatFallas={orderCatFallas}
        setorderCatFallas={setorderCatFallas}
        orderSubCatFallas={orderSubCatFallas}
        setorderSubCatFallas={setorderSubCatFallas}
        ascdescFallas={ascdescFallas}
        setascdescFallas={setascdescFallas}
        fallas={fallas}
        delFalla={delFalla}
      />:null}
      {subViewInventario=="estadisticas"?
        <EstadisticaInventario
          fechaQEstaInve={fechaQEstaInve}
          setfechaQEstaInve={setfechaQEstaInve}
          fechaFromEstaInve={fechaFromEstaInve}
          setfechaFromEstaInve={setfechaFromEstaInve}
          fechaToEstaInve={fechaToEstaInve}
          setfechaToEstaInve={setfechaToEstaInve}
          orderByEstaInv={orderByEstaInv}
          setorderByEstaInv={setorderByEstaInv}
          orderByColumEstaInv={orderByColumEstaInv}
          setorderByColumEstaInv={setorderByColumEstaInv}
          moneda={moneda}

          dataEstaInven={dataEstaInven}
        />
      :null}
      {subViewInventario=="gastos"?<Gastos
        qgastosfecha1={qgastosfecha1}
        setqgastosfecha1={setqgastosfecha1}
        qgastosfecha2={qgastosfecha2}
        setqgastosfecha2={setqgastosfecha2}
        qgastos={qgastos}
        setqgastos={setqgastos}
        qcatgastos={qcatgastos}
        setqcatgastos={setqcatgastos}
        gastosdescripcion={gastosdescripcion}
        setgastosdescripcion={setgastosdescripcion}
        gastoscategoria={gastoscategoria}
        setgastoscategoria={setgastoscategoria}
        gastosmonto={gastosmonto}
        setgastosmonto={setgastosmonto}
        gastosData={gastosData}
        delGastos={delGastos}
        getGastos={getGastos}
        setGasto={setGasto}
        number={number}
        moneda={moneda}
      />:null}

      

    </>
  )
}
export default Inventario