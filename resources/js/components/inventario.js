
import Proveedores from '../components/proveedores';
import CargarProducto from '../components/cargarproducto';
import Facturas from '../components/facturas';
import Fallas from '../components/fallas';
import PedidosCentralComponent from '../components/pedidosCentral';



function Inventario({
  showaddpedidocentral,
  setshowaddpedidocentral,
  valheaderpedidocentral,
  setvalheaderpedidocentral,
  valbodypedidocentral,
  setvalbodypedidocentral,
  procesarImportPedidoCentral,

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

  depositosList,
  marcasList,

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
  
}) {


  return (
    <>
      <div className="container">
        <div className="row">
        <div className="col">
          <div className="btn-group mb-2">              
              {factSelectIndex!==null?<button className={("btn ")+(subViewInventario=="inventario"?"btn-dark":"btn-outline-success")} onClick={()=>setsubViewInventario("inventario")}>Inventario</button>
              :null}
              <button className={("btn ")+(subViewInventario=="fallas"?"btn-dark":"btn-outline-success")} onClick={()=>setsubViewInventario("fallas")}>Fallas</button>
              <button className={("btn ")+(subViewInventario=="proveedores"?"btn-dark":"btn-outline-success")} onClick={()=>setsubViewInventario("proveedores")}>Proveedores</button>
          </div>
        </div>
          <div className="col text-right d-flex align-items-center justify-content-between">
            <button className={("btn ")+(subViewInventario=="pedidosCentral"?"btn-dark":"btn-outline-success")} onClick={()=>setsubViewInventario("pedidosCentral")}>Pedidos Central</button>
            <div className="btn-group mb-2">
              <button className="btn btn-sinapsis" onClick={()=>setshowModalFacturas(!showModalFacturas)}>Seleccionar Factura</button>
            </div>
          </div>
          
        </div>
      </div>
      <hr/>
      <div className="container">
        
        <div className="d-flex justify-content-end">
          {factSelectIndex==null?null
          : 
          <div className="input-group w-25">
            <span className="input-group-text" >{facturas[factSelectIndex]?facturas[factSelectIndex].proveedor.descripcion:null}</span>

            <button className="btn btn-outline-secondary">{facturas[factSelectIndex]?facturas[factSelectIndex].numfact:null}</button>
            <button className="btn btn-outline-danger" onClick={()=>setfactSelectIndex(null)}>
              <i className="fa fa-times"></i>
            </button>
          </div>
          }
        </div>
      </div>
      <hr/>
      <Facturas
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
      {factSelectIndex!==null?
        subViewInventario=="inventario"?
          <CargarProducto 
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
            
            depositosList={depositosList}
            marcasList={marcasList}

            Invnum={Invnum}
            setInvnum={setInvnum}
            InvorderColumn={InvorderColumn}
            setInvorderColumn={setInvorderColumn}
            InvorderBy={InvorderBy}
            setInvorderBy={setInvorderBy}
          />
        :null

      :null}
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
        depositosList={depositosList}
        marcasList={marcasList}
      />:null}

      {subViewInventario=="fallas"?<Fallas 
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

      {subViewInventario=="pedidosCentral"?
        <PedidosCentralComponent
          getPedidosCentral={getPedidosCentral}
          selectPedidosCentral={selectPedidosCentral}
          checkPedidosCentral={checkPedidosCentral}

          pedidosCentral={pedidosCentral}
          setIndexPedidoCentral={setIndexPedidoCentral}
          indexPedidoCentral={indexPedidoCentral}
          moneda={moneda}

          showaddpedidocentral={showaddpedidocentral}
          setshowaddpedidocentral={setshowaddpedidocentral}
          valheaderpedidocentral={valheaderpedidocentral}
          setvalheaderpedidocentral={setvalheaderpedidocentral}
          valbodypedidocentral={valbodypedidocentral}
          setvalbodypedidocentral={setvalbodypedidocentral}
          procesarImportPedidoCentral={procesarImportPedidoCentral}
        />
      :null}

    </>
  )
}
export default Inventario