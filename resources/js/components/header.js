import logo from "../../images/logo.png"
import carrito from "../../images/carrito1.png"
function Header({settoggleClientesBtn,toggleClientesBtn,getVentasClick,dolar,peso,view,setView,setMoneda,getPedidos,setViewCaja,viewCaja,setShowModalMovimientos,showModalMovimientos}) {
  return (
    <header className="mb-3">
      <div className="d-flex justify-content-center flex-wrap align-items-center">
        <div className="p-3">
          <img src={logo} alt="sinapsis" className="logo" />
        </div>
        <div className="p-3">
          <img src={carrito} alt="sinapsis" width="50px" className="pointer carrito-icon" onClick={
            ()=>{
              setView("pedidos")
              getPedidos()
            }
          }/>
        </div>
      </div>
      <div className="bg-sinapsis container-fluid">
        <div className="row">
          <div className="col d-flex justify-content-end">
            <span className={(view == "ventas" ? "btn btn-dark" : null) + (" p-3 pointer")} onClick={() => { setView("ventas"); getVentasClick()}}>Ventas</span>
            <span className={(view=="seleccionar"?"btn btn-dark":null)+(" p-3 pointer")} onClick={()=>setView("seleccionar")}>Facturar</span>

            <div className="dropdown btn">
              <button className={(toggleClientesBtn ? "btn btn-dark" : null)+(" btn dropdown-toggle text-light")} type="button" onClick={() => settoggleClientesBtn(!toggleClientesBtn)}>
                Clientes
              </button>
              <ul className={("dropdown-menu ")+ (toggleClientesBtn?"show":null)}>
                <li>
                  <span className={(view == "vueltos" ? "btn btn-dark" : null) + (" p-3 pointer dropdown-item")} onClick={() => {setView("vueltos");settoggleClientesBtn(false)}}>Vueltos</span>
                </li>
                <li>
                  <span className={(view=="credito"?"btn btn-dark":null)+(" p-3 pointer dropdown-item")} onClick={()=>{setView("credito");settoggleClientesBtn(false)}}>Crédito</span>
                </li>
                <li>
                  <span className={(view == "clientes_crud" ? "btn btn-dark" : null) + (" p-3 pointer dropdown-item")} onClick={() => {setView("clientes_crud");settoggleClientesBtn(false)}}>Crud Clientes</span>

                </li>
              </ul>
            </div>


            
            <span className={(view=="usuarios"?"btn btn-dark":null)+(" p-3 pointer")} onClick={()=>setView("usuarios")}>Usuarios</span>
            <span className={(view=="cierres"?"btn btn-dark":null)+(" p-3 pointer")} onClick={()=>setView("cierres")}>Cierre</span>

            <small className="p-3 monto-header" onClick={setMoneda} data-type="1">USD {dolar} </small>
            <small className="p-3 monto-header" onClick={setMoneda} data-type="2">COP {peso} </small>
            
          </div>
          <div className="col-4 d-flex justify-content-end">
            {view=="seleccionar"?
              <>
                <span className={(viewCaja?"btn btn-sinapsis":null)+(" p-3 pointer")} onClick={()=>setViewCaja(!viewCaja)}>Caja/Gastos</span>
                <span className={(showModalMovimientos?"btn btn-sinapsis":null)+(" p-3 pointer")} onClick={()=>setShowModalMovimientos(!showModalMovimientos)}>Movimientos</span>
              </>:null
            }

            <span className={(view=="inventario"?"btn btn-dark":null)+(" p-3 pointer")} onClick={()=>setView("inventario")}>Inventario</span>
          </div>
        </div>
      </div>
    </header>
  )
}
export default Header