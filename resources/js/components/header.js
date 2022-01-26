import logo from "../../images/logo.png"
import carrito from "../../images/carrito1.png"
function Header({getVentasClick,dolar,peso,view,setView,setMoneda,getPedidos,setViewCaja,viewCaja,setShowModalMovimientos,showModalMovimientos}) {
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
            <span onClick={getVentasClick} className={(view=="ventas"?"btn btn-dark":null)+(" p-3 pointer")} onClick={()=>setView("ventas")}>Ventas</span>
            <span className={(view=="seleccionar"?"btn btn-dark":null)+(" p-3 pointer")} onClick={()=>setView("seleccionar")}>Facturar</span>
            <span className={(view=="clientes"?"btn btn-dark":null)+(" p-3 pointer")} onClick={()=>setView("clientes")}>Clientes</span>
            <span className={(view=="credito"?"btn btn-dark":null)+(" p-3 pointer")} onClick={()=>setView("credito")}>Crédito</span>
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