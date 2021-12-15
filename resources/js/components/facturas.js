import ModalSelectFactura from '../components/modalSelectFactura';

function Facturas({
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
proveedoresList,
number,

factInpestatus,
setfactInpestatus,

delFactura,
delItemFact,
}) {

	return (
		<div className="container">
			<div className="row">
				<div className="col">
					{showModalFacturas&&<ModalSelectFactura 
						setshowModalFacturas={setshowModalFacturas}
						facturas={facturas}

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

					/>}
				</div>
				
			</div>
		</div>
	)
}

export default Facturas