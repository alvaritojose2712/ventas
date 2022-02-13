import '../../css/modal.css'

import { useHotkeys } from 'react-hotkeys-hook';


import { useState, useEffect, useRef } from 'react';
import {cloneDeep} from 'lodash';
import db from '../database/database';



import { moneda, number } from './assets';
import ProductosList from '../components/productoslist';
import ModalAddCarrito from '../components/modaladdcarrito';
import ModalMovimientos from '../components/ModalMovimientos';

import Pagar from '../components/pagar';
import Header from '../components/header';


import Pedidos from '../components/pedidos';

import Credito from '../components/credito';
import Vueltos from '../components/vueltos';
import Clientes from '../components/clientes';



import Cierres from '../components/cierre';
import Inventario from '../components/inventario';

import Cajagastos from '../components/cajagastos';
import Ventas from '../components/ventas';
import Usuarios from '../components/usuarios';

import ViewPedidoVendedor from '../components/viewPedidoVendedor';





export default function Facturar({user,notificar,setLoading}) {
  
  const [num,setNum] = useState(50)
  const [itemCero,setItemCero] = useState(true)
  const [qProductosMain,setQProductosMain] = useState("")

  const [orderColumn, setOrderColumn] = useState("descripcion")
  const [orderBy, setOrderBy] = useState("asc")
  
  const [inputaddCarritoFast, setinputaddCarritoFast] = useState("")


  const [view,setView] = useState("seleccionar")
  const [selectItem,setSelectItem] = useState(null)
  const [pedidoSelect,setPedidoSelect] = useState(null)
  const [pedidoData,setPedidoData] = useState({})

  const [dolar,setDolar] = useState("")
  const [peso,setPeso] = useState("")

  const [cantidad,setCantidad] = useState("")
  const [numero_factura,setNumero_factura] = useState("nuevo")

  const [onlyVueltos,setOnlyVueltos] = useState(0)


  
  const [productos,setProductos] = useState([])
  const [productosInventario,setProductosInventario] = useState([])

  const [qBuscarInventario,setQBuscarInventario] = useState("")
  const [indexSelectInventario,setIndexSelectInventario] = useState(null)


  const [inpInvbarras,setinpInvbarras] = useState("")
  const [inpInvcantidad,setinpInvcantidad] = useState("")
  const [inpInvalterno,setinpInvalterno] = useState("")
  const [inpInvunidad,setinpInvunidad] = useState("UND")
  const [inpInvcategoria,setinpInvcategoria] = useState("24")
  const [inpInvdescripcion,setinpInvdescripcion] = useState("")
  const [inpInvbase,setinpInvbase] = useState("")
  const [inpInvventa,setinpInvventa] = useState("")
  const [inpInviva,setinpInviva] = useState("0")
  const [inpInvporcentaje_ganancia, setinpInvporcentaje_ganancia] = useState("0")
  
  const [inpInvLotes,setinpInvLotes] = useState([])

  const [inpInvid_proveedor,setinpInvid_proveedor] = useState("")
  const [inpInvid_marca,setinpInvid_marca] = useState("")
  const [inpInvid_deposito,setinpInvid_deposito] = useState("")
  
  const [depositosList,setdepositosList] = useState([])
  const [marcasList,setmarcasList] = useState([])

  const [Invnum,setInvnum] = useState(25)
  const [InvorderColumn,setInvorderColumn] = useState("id")
  const [InvorderBy,setInvorderBy] = useState("desc")

  const [proveedordescripcion,setproveedordescripcion] = useState("")
  const [proveedorrif,setproveedorrif] = useState("")
  const [proveedordireccion,setproveedordireccion] = useState("")
  const [proveedortelefono,setproveedortelefono] = useState("")

  const [subViewInventario,setsubViewInventario] = useState("inventario")

  const [indexSelectProveedores,setIndexSelectProveedores] = useState(null)

  const [qBuscarProveedor,setQBuscarProveedor] = useState("")

  const [proveedoresList,setProveedoresList] = useState([])

  const [pedidoList,setPedidoList] = useState([])

  const [debito,setDebito] = useState("")
  const [efectivo,setEfectivo] = useState("")
  const [transferencia,setTransferencia] = useState("")
  const [credito,setCredito] = useState("")

  const [vuelto,setVuelto] = useState("")

  const [descuento,setDescuento] = useState(0)

  const [ModaladdproductocarritoToggle,setModaladdproductocarritoToggle] = useState(false)

  const [toggleAddPersona,setToggleAddPersona] = useState(false)
  const [personas,setPersona] = useState([])

  const [pedidos,setPedidos] = useState([])

  const [movimientosCaja,setMovimientosCaja] = useState([])
  const [movimientos,setMovimientos] = useState([])

  
  const [vendedor, setVendedor] = useState([])
  const [tipobusquedapedido,setTipoBusqueda] = useState("fact")

  const [tipoestadopedido,setTipoestadopedido] = useState("todos")


  const [busquedaPedido,setBusquedaPedido] = useState("")
  const [fecha1pedido,setFecha1pedido] = useState("")
  const [fecha2pedido,setFecha2pedido] = useState("")

  const [caja_usd,setCaja_usd] = useState("")
  const [caja_cop,setCaja_cop] = useState("")
  const [caja_bs,setCaja_bs] = useState("")
  const [caja_punto,setCaja_punto] = useState("")

  const [dejar_usd,setDejar_usd] = useState("")
  const [dejar_cop,setDejar_cop] = useState("")
  const [dejar_bs,setDejar_bs] = useState("")

  const [cierre,setCierre] = useState({})

  const [today,setToday] = useState("")

  const [fechaCierre,setFechaCierre] = useState("")

  const [viewCierre,setViewCierre] = useState("cuadre")
  const [toggleDetallesCierre,setToggleDetallesCierre] = useState(0)

  const [filterMetodoPagoToggle,setFilterMetodoPagoToggle] = useState("todos")


  const [notaCierre,setNotaCierre] = useState("")

  const [qDeudores,setQDeudores] = useState("")
  const [deudoresList,setDeudoresList] = useState([])

  const [selectDeudor,setSelectDeudor] = useState(null)

  const [tipo_pago_deudor,setTipo_pago_deudor] = useState("3")
  const [monto_pago_deudor,setMonto_pago_deudor] = useState("")

  const [detallesDeudor,setDetallesDeudor] = useState([])
  
  
  const [counterListProductos,setCounterListProductos] = useState(0)

  const [countListInter,setCountListInter] = useState(0)
  const [countListPersoInter,setCountListPersoInter] = useState(0)

  const [viewCaja,setViewCaja] = useState(false)

  const [movCajadescripcion,setMovCajadescripcion] = useState("")
  const [movCajatipo,setMovCajatipo] = useState(null)
  const [movCajacategoria,setMovCajacategoria] = useState(3)
  const [movCajamonto,setMovCajamonto] = useState("")
  const [movCajaFecha,setMovCajaFecha] = useState("")

  const tbodyproductosref = useRef(null)
  const inputBuscarInventario = useRef(null)


  const tbodyproducInterref = useRef(null)
  const tbodypersoInterref = useRef(null)

  const inputCantidadCarritoref = useRef(null)
  const inputbusquedaProductosref = useRef(null)
  const inputmodaladdpersonacarritoref = useRef(null)
  const inputaddcarritointernoref = useRef(null)

  const refinputaddcarritofast = useRef(null)



  const [typingTimeout,setTypingTimeout] = useState(0)

  const [fechaMovimientos,setFechaMovimientos] = useState("")

  const [showModalMovimientos,setShowModalMovimientos] = useState(false)
  const [buscarDevolucion,setBuscarDevolucion] = useState("")
  const [tipoMovMovimientos,setTipoMovMovimientos] = useState("1")
  const [tipoCatMovimientos,setTipoCatMovimientos] = useState("2")
  const [productosDevulucionSelect,setProductosDevulucionSelect] = useState([])

  const [idMovSelect,setIdMovSelect] = useState("nuevo")

  const [showModalFacturas,setshowModalFacturas] = useState(false)
  
  const [facturas,setfacturas] = useState([])

  const [factqBuscar,setfactqBuscar] = useState("")
  const [factqBuscarDate,setfactqBuscarDate] = useState("")
  const [factOrderBy,setfactOrderBy] = useState("id")
  const [factOrderDescAsc,setfactOrderDescAsc] = useState("desc")
  const [factsubView,setfactsubView] = useState("buscar")
  const [factSelectIndex,setfactSelectIndex] = useState(null)
  const [factInpid_proveedor,setfactInpid_proveedor] = useState("")
  const [factInpnumfact,setfactInpnumfact] = useState("")
  const [factInpdescripcion,setfactInpdescripcion] = useState("")
  const [factInpmonto,setfactInpmonto] = useState("")
  const [factInpfechavencimiento,setfactInpfechavencimiento] = useState("")

  const [factInpestatus,setfactInpestatus] = useState(0)

  
  const [qBuscarCliente,setqBuscarCliente] = useState("")
  const [numclientesCrud,setnumclientesCrud] = useState(25)

  
  const [clientesCrud,setclientesCrud] = useState([])
  const [indexSelectCliente,setindexSelectCliente] = useState(null)

  const [clienteInpidentificacion,setclienteInpidentificacion] = useState("")
  const [clienteInpnombre,setclienteInpnombre] = useState("")
  const [clienteInpcorreo,setclienteInpcorreo] = useState("")
  const [clienteInpdireccion,setclienteInpdireccion] = useState("")
  const [clienteInptelefono,setclienteInptelefono] = useState("")
  const [clienteInpestado,setclienteInpestado] = useState("")
  const [clienteInpciudad,setclienteInpciudad] = useState("")  

  const [sumPedidosArr,setsumPedidosArr] = useState([])

  const [qFallas,setqFallas] = useState("")
  const [orderCatFallas,setorderCatFallas] = useState("proveedor")
  const [orderSubCatFallas,setorderSubCatFallas] = useState("todos")
  const [ascdescFallas,setascdescFallas] = useState("")
  const [fallas,setfallas] = useState([])

  const [autoCorrector,setautoCorrector] = useState(true)

  const [pedidosCentral,setpedidoCentral] = useState([])
  const [indexPedidoCentral, setIndexPedidoCentral] = useState(null)

  const [showaddpedidocentral, setshowaddpedidocentral] = useState(false)
  const [permisoExecuteEnter, setpermisoExecuteEnter] = useState(true)

  const [guardar_usd,setguardar_usd] = useState("")
  const [guardar_cop,setguardar_cop] = useState("")
  const [guardar_bs,setguardar_bs] = useState("")

  const [ventasData,setventasData] = useState([])

  const [fechaventas,setfechaventas] = useState("")

  const [pedidosFast,setpedidosFast] = useState([])

  const [billete1,setbillete1] = useState("") 
  const [billete5,setbillete5] = useState("") 
  const [billete10,setbillete10] = useState("") 
  const [billete20,setbillete20] = useState("") 
  const [billete50,setbillete50] = useState("") 
  const [billete100,setbillete100] = useState("")

  const [usuariosData, setusuariosData] = useState([])
  
  const [toggleClientesBtn, settoggleClientesBtn] = useState(false)

  const [modViewInventario, setmodViewInventario] = useState("unique")
  
  const [loteIdCarrito, setLoteIdCarrito] = useState(null)
  const refsInpInvList = useRef(null)
  

  const [valheaderpedidocentral, setvalheaderpedidocentral] = useState("12340005ARAMCAL")
  const [valbodypedidocentral, setvalbodypedidocentral] = useState("12341238123456123456123451234123712345612345612345123412361234561234561234512341235123456123456123451234123412345612345612345")

// 1234123812345612345612345
// 1234123712345612345612345
// 1234123612345612345612345
// 1234123512345612345612345
// 1234123412345612345612345
// 12341234ARAMCAL
  

  useHotkeys('f1', () => {
    if(selectItem!==null&&view=="seleccionar"){
      addCarritoRequest("agregar_procesar")
    }else if(view=="pedidos"){
      setView("seleccionar")
    }else if(view=="pagar"){
      toggleModalProductos(true,()=>{
        inputaddcarritointernoref.current.focus()

      })
      
    }else if(selectItem===null && view=="seleccionar"){
      getPedido("ultimo",()=>{
        setView("pagar")
      })
    } else if (view == "inventario" && subViewInventario == "inventario" && modViewInventario == "list"){
      guardarNuevoProductoLote()
    }

  },{
    enableOnTags:["INPUT", "SELECT"],
  },[view,selectItem]);
  useHotkeys('f2', () => {
    if (view=="seleccionar") {
      setView("pedidos")
      getPedidos()
    }else if(view=="pagar"){
      setToggleAddPersonaFun(true,()=>{
        setclienteInpnombre("")
        setclienteInptelefono("")
        setclienteInpdireccion("")

        inputmodaladdpersonacarritoref.current.focus()
      })
    } else if (view == "inventario" && subViewInventario == "inventario" && modViewInventario == "list") {
      changeInventario(null, null, null, "add")
    }
  },{
    enableOnTags:["INPUT", "SELECT"],
  },[view]);
  useHotkeys('f5', () => {
    if(view=="pagar"){
      del_pedido()
    }
  },{
    enableOnTags:["INPUT", "SELECT"],
  },[view]);

  useHotkeys('f4', () => {
    if(view=="pagar"){
      viewReportPedido()
    }
  },{
    enableOnTags:["INPUT", "SELECT"],
  },[view]);
  
  useHotkeys('f3', () => {
    if (view=="pagar") {
      toggleImprimirTicket() 
    }
  },{
    enableOnTags:["INPUT", "SELECT"],
    filter:false,
  },[view]);

  useHotkeys('esc', () => {
    try{
      if (view=="seleccionar"&&selectItem!==null) {
        setSelectItem(null) 
        setViewCaja(false) 
      }else if(view=="seleccionar"&&selectItem===null){
        inputbusquedaProductosref.current.value = ""
        inputbusquedaProductosref.current.focus()
      }else if(view=="pagar"){
        setToggleAddPersona(false)
        toggleModalProductos(false)
        setViewCaja(false)
        if (refinputaddcarritofast.current) {
          refinputaddcarritofast.current.focus()

        }
      }else if(view=="inventario"){
        inputBuscarInventario.current.value = ""
        inputBuscarInventario.current.focus()
        
      }
    }catch(err){
      
    }
  },{
    enableOnTags:["INPUT", "SELECT"],
    filter:false,
  },[view,selectItem]);

  useHotkeys('space', () => {
    if (view=="seleccionar"&&selectItem!==null) {
      setNumero_factura("nuevo")  
    }
  },{
    enableOnTags:["INPUT", "SELECT"],
    filter:false,
  },[view,selectItem]);

  useHotkeys('d', () => {
    if (view=="pagar") {
      getDebito() 
    }
  },{
    enableOnTags:["INPUT", "SELECT"],
    filter:false,
  },[view]);

  useHotkeys('c', () => {
    if (view=="pagar") {
      getCredito()  
    }
  },{
    enableOnTags:["INPUT", "SELECT"],
    filter:false,
  },[view]);

  useHotkeys('t', () => {
    if (view=="pagar") {
      getTransferencia() 


    }
  },{
    enableOnTags:["INPUT", "SELECT"],
    filter:false,
  },[view]);

  useHotkeys('e', () => {
    if (view=="pagar") {
      getEfectivo() 
    }
  },{
    enableOnTags:["INPUT", "SELECT"],
    filter:false,
  },[view]);
  useHotkeys('down', event => {
    if(view=="seleccionar"){
        try{
          let index = counterListProductos+1
          if (tbodyproductosref.current.rows[index]) {
            setCounterListProductos(index)

            tbodyproductosref.current.rows[index].focus()
          }
          
        }catch(err){
          //console.log(err)
        }
    }else if(view=="pagar"){
      if (ModaladdproductocarritoToggle) {
        let index = countListInter+1
        if (tbodyproducInterref.current.rows[index]) {
          setCountListInter(index)
          tbodyproducInterref.current.rows[index].focus()
        }

      }else if(toggleAddPersona) {

        let index = countListPersoInter+1
        if (tbodypersoInterref.current.rows[index]) {
          setCountListPersoInter(index)
          tbodypersoInterref.current.rows[index].focus()
        }


        
        

      }

    } else if (view == "inventario" && subViewInventario == "inventario" && modViewInventario == "list") {
      focusInputSibli(event.target, "down")
    }
  },{
    enableOnTags:["INPUT", "SELECT"],

  }, [view, counterListProductos, countListInter, countListPersoInter, subViewInventario, modViewInventario]);
  useHotkeys('up', event => {
    if(view=="seleccionar"){
      if (counterListProductos>0) {
        try{

          let index = counterListProductos-1
          if (tbodyproductosref.current.rows[index]) {
            tbodyproductosref.current.rows[index].focus()
            setCounterListProductos(index)
          }
        }catch(err){}
      }
    }else if(view=="pagar"){
      if (ModaladdproductocarritoToggle) {
        

        if (countListInter>0) {
          let index = countListInter-1
          if (tbodyproducInterref.current.rows[index]) {
            tbodyproducInterref.current.rows[index].focus()
            setCountListInter(index)
          }
        }


      }else if(toggleAddPersona) {

        if (countListPersoInter>0) {
          let index = countListPersoInter-1
          if (tbodypersoInterref.current.rows[index]) {
            tbodypersoInterref.current.rows[index].focus()
            setCountListPersoInter(index)
          }
        }



      }
    } else if (view == "inventario" && subViewInventario == "inventario" && modViewInventario == "list") {
      focusInputSibli(event.target, "up")
    }
  },{
    enableOnTags:["INPUT", "SELECT"],

  }, [view, counterListProductos, countListInter, countListPersoInter, subViewInventario, modViewInventario]);
  useHotkeys('enter', event => {
    if(selectItem===null&&view=="seleccionar"){
      try{
        if (tbodyproductosref.current) {
          let tr = tbodyproductosref.current.rows[counterListProductos]
          let index = tr.attributes["data-index"].value
          if (permisoExecuteEnter) {
            if (productos[index]) {
              if (!productos[index].lotes.length) {
                addCarrito(index)
              }
            }
            // console.log("Execute Enter")
          }
          //wait
        }

      }catch(err){}

    }else if(selectItem!==null&&view=="seleccionar"){
      addCarritoRequest("agregar")
    }else if(view=="pagar"){
      if (ModaladdproductocarritoToggle) {
        if (tbodyproducInterref.current.rows[countListInter]) {
          if (permisoExecuteEnter) {
            setProductoCarritoInterno(tbodyproducInterref.current.rows[countListInter].attributes["data-index"].value)
            // console.log("Execute Enter")

          }
          //wait
        }
      }else if(toggleAddPersona){
        if (tbodypersoInterref.current.rows[countListPersoInter]) {
          if (tbodypersoInterref.current.rows[countListPersoInter].attributes["data-index"]) {
            setPersonas(tbodypersoInterref.current.rows[countListPersoInter].attributes["data-index"].value)

          }
        }
      }else{
        facturar_pedido()
      }
    } else if (view == "inventario" && subViewInventario == "inventario" && modViewInventario == "list") {
      focusInputSibli(event.target,1)
    }
  },{
    filterPreventDefault:false,
    enableOnTags:["INPUT", "SELECT"],
  }, [view, counterListProductos, selectItem, subViewInventario, modViewInventario]);


  useHotkeys('right', event => {
    if (view == "inventario" && subViewInventario == "inventario" && modViewInventario == "list") {
      focusInputSibli(event.target, 1)
    }
  }, {
    filterPreventDefault: false,
    enableOnTags: ["INPUT", "SELECT"],
  }, [view, subViewInventario, modViewInventario]);
  
  useHotkeys('left', event => {
    if (view == "inventario" && subViewInventario == "inventario" && modViewInventario == "list") {
      focusInputSibli(event.target, -1)
    }
  }, {
    filterPreventDefault: false,
    enableOnTags: ["INPUT", "SELECT"],
  }, [view, subViewInventario, modViewInventario]);



  useEffect(()=>{
    // let isMounted = true;  
    getMoneda() // ya invoca getProductos()
    getPedidosList()
    getToday()

    // return () => { isMounted = false }
  },[])

  useEffect(()=>{
    getFallas()
  },[
    qFallas,
    orderCatFallas,
    orderSubCatFallas,
    ascdescFallas
  ])
  useEffect(()=>{
    addCarritoFast()
  },[inputaddCarritoFast])
  useEffect(()=>{
    getClienteCrud()
  },[qBuscarCliente])
  useEffect(()=>{
    focusCtMain()
  },[selectItem])
  useEffect(()=>{
    getFacturas()
  },[
  factqBuscar,
  factqBuscarDate,
  factOrderBy,
  factOrderDescAsc
  ])
  useEffect(() => {
    if (view=="pedidos") {
      getPedidos()
    }
  }, [busquedaPedido,fecha1pedido,fecha2pedido,tipobusquedapedido,tipoestadopedido,filterMetodoPagoToggle]);
  useEffect(()=>{
    if (selectDeudor==null) {
      getDeudores()
    }else{
      getDeudor()
    }
  },[selectDeudor])
  useEffect(()=>{
    getBuscarDevolucion()
  },[buscarDevolucion])
  useEffect(()=>{
    buscarInventario()
  },[
    Invnum,
    InvorderColumn,
    InvorderBy,
  ]);

  useEffect(()=>{
    getMovimientosCaja()
  },[viewCaja,movCajaFecha])
  useEffect(()=>{
    getMovimientos()
  },[showModalMovimientos,fechaMovimientos])
  useEffect(()=>{
    buscarInventario()
  },[qBuscarInventario])

  useEffect(()=>{
    getProveedores()
  },[qBuscarProveedor])
  useEffect(()=>{
    if (view=="inventario") {
      if (subViewInventario=="fallas") {
        getFallas()
      }else if (subViewInventario=="inventario") {
        getProductos()
      }else if (subViewInventario=="proveedores") {
        getProveedores()
      }else if (subViewInventario=="pedidosCentral") {
        getPedidosCentral()
      }

    }
  },[subViewInventario])  

  useEffect(() => {
    if (view == "credito" || view =="vueltos") {
      getDeudores()
      getDeudor()
    }
  }, [view,qDeudores]);

  useEffect(()=>{
    getProductos()
  },[
    num,
    itemCero,
    qProductosMain,
    orderColumn,
    orderBy,
  ])

  useEffect(()=>{
    setInputsInventario()
  },[indexSelectInventario])

  useEffect(()=>{
    getVentas()
  },[fechaventas])

  useEffect(()=>{
    setInputsProveedores()
  },[indexSelectProveedores])

  useEffect(()=>{
    setBilletes()
  },[
    billete1,
    billete5,
    billete10,
    billete20,
    billete50,
    billete100,
  ])


  let total_caja_calc = ( parseFloat(caja_usd?caja_usd:0) + (parseFloat(caja_cop?caja_cop:0)/parseFloat(peso)) + (parseFloat(caja_bs?caja_bs:0)/parseFloat(dolar)) ).toFixed(2)
  let total_caja_neto = !total_caja_calc||total_caja_calc=="NaN"?0:total_caja_calc

  let total_dejar_caja_calc = ( parseFloat(dejar_usd?dejar_usd:0) + (parseFloat(dejar_cop?dejar_cop:0)/parseFloat(peso)) + (parseFloat(dejar_bs?dejar_bs:0)/parseFloat(dolar)) ).toFixed(2)
  let total_dejar_caja_neto = !total_dejar_caja_calc||total_dejar_caja_calc=="NaN"?0:total_dejar_caja_calc

  let total_punto = dolar&&caja_punto?(caja_punto/dolar).toFixed(2):0

const setporcenganancia = (tipo,base=0,fun=null) => {
  let insert = window.prompt("Porcentaje")
  if (insert) {
    if (number(insert)) {
      if (tipo=="unique") {
        let re = Math.round(parseFloat(inpInvbase) + (parseFloat(inpInvbase)*(parseFloat(insert)/100)))
        setinpInvventa(re)
      }else if("list"){
        let re = Math.round(parseFloat(base) + (parseFloat(base)*(parseFloat(insert)/100)))
        fun(re)
      }
    }

  }

}

const focusInputSibli = (tar, mov) => {
  let inputs = [].slice.call(refsInpInvList.current.elements)
  let index;
  if (tar.tagName == "INPUT") {

    if (mov == "down") {
      mov = 11
    } else if (mov == "up") {
      mov = -11
    }
  }
  for (let i in inputs) {
    if (tar == inputs[i]) {
      index = parseInt(i) + mov
      if (refsInpInvList.current[index]) {
        refsInpInvList.current[index].focus()
      }
      break
    }
  }
  if (typeof (index) === "undefined") {
    if (refsInpInvList.current[0]) {
      refsInpInvList.current[0].focus()
    }
  }
}
const cerrar_dia = (e) => {
  e.preventDefault()
  setLoading(true)
  db.cerrar({
  fechaCierre,
  total_caja_neto,
  total_punto,
  dejar_usd,
  dejar_cop,
  dejar_bs,}).then(res=>{

    let cierreData = res.data
    if (res.data) {
      setguardar_usd(cierreData["efectivo_guardado"])

      if (cierreData["match_cierre"]) {


        setDejar_usd(cierreData["match_cierre"]["dejar_dolar"])
        setDejar_cop(cierreData["match_cierre"]["dejar_peso"])
        setDejar_bs(cierreData["match_cierre"]["dejar_bss"])
        setNotaCierre(cierreData["match_cierre"]["nota"])


        setguardar_usd(cierreData["match_cierre"]["efectivo_guardado"])
        setguardar_cop(cierreData["match_cierre"]["efectivo_guardado_cop"])
        setguardar_bs(cierreData["match_cierre"]["efectivo_guardado_bs"])
        
      }
    }
    setCierre(cierreData)

    setLoading(false)
  })
}
const focusCtMain = () => {
  if (inputCantidadCarritoref.current) {
    inputCantidadCarritoref.current.focus()

  }
}
function getBuscarDevolucion() {
  setLoading(true)
  db.getBuscarDevolucion({
    qProductosMain:buscarDevolucion,
    num:25,
    itemCero:true,
    orderColumn:"descripcion",
    orderBy:"asc"
  }).then(res=>{
    setProductosDevulucionSelect(res.data)
    setLoading(false)
  })
}
const setToggleAddPersonaFun = (prop,callback=null)=> {
  setToggleAddPersona(prop)
  if (callback) {callback()}
}
const getMovimientos = () =>{
  setLoading(true)
  db.getMovimientos({fechaMovimientos}).then(res=>{
    setMovimientos(res.data)

    if (!res.data.length) {
      setIdMovSelect("nuevo")
    }else{
      if (res.data[0]) {
        setIdMovSelect(res.data[0].id)
      }
    }
    setLoading(false)
  })
}
const getDeudor = () => {
  try{
    if (deudoresList[selectDeudor]) {
        setLoading(true)
      db.getDeudor({onlyVueltos,id:deudoresList[selectDeudor].id}).then(res=>{
        // detallesDeudor
        setDetallesDeudor(res.data)
        setLoading(false)
      })
    }
  }catch(err){}
}
const entregarVuelto = () => {
    let monto = window.prompt("Monto a entregar")
    if (pedidoData.id&&number(monto)) {
        setLoading(true)

      db.entregarVuelto({id_pedido:pedidoData.id,monto}).then(res=>{
        notificar(res)
        getPedido()
        getMovimientosCaja()
        setLoading(false)

      })
    }
}
const getDebito = () =>{
  setDebito(pedidoData.clean_total)
  setEfectivo("")
  setTransferencia("")
  setCredito("")
}
const getCredito = () =>{
  setCredito(pedidoData.clean_total)
  setEfectivo("")
  setDebito("")
  setTransferencia("")
}
const getTransferencia = () =>{
  setTransferencia(pedidoData.clean_total)
  setEfectivo("")
  setDebito("")
  setCredito("")
}
const getEfectivo = () =>{
  setEfectivo(pedidoData.clean_total)
  setDebito("")
  setTransferencia("")
  setCredito("")
}
const getToday = () =>{
  db.today({}).then(res=>{
    let today = res.data
    setToday(today)
    setFechaCierre(today)
    setFecha1pedido(today)
    setFecha2pedido(today)
    setFechaMovimientos(today)
    setMovCajaFecha(today)
    setfechaventas(today)

  })
}
const getMovimientosCaja = () =>{
  setLoading(true)
  db.getMovimientosCaja({fecha:movCajaFecha}).then(res=>{
    setMovimientosCaja(res.data)
    setLoading(false)
  })
}
const setMovimientoCaja = e =>{
  e.preventDefault()
  setLoading(true)
  db.setMovimientoCaja({
    descripcion:movCajadescripcion,
    tipo:movCajatipo,
    categoria:movCajacategoria,
    monto:movCajamonto,
    fecha:movCajaFecha

  }).then(res=>{
    getMovimientosCaja()
    notificar(res)
    setLoading(false)
    setMovCajatipo(null)

    setMovCajadescripcion("")
    setMovCajamonto("")

  })
}
const filterMetodoPago = e => {
  let type = e.currentTarget.attributes["data-type"].value

  setFilterMetodoPagoToggle(type)
}
const onchangecaja = e => {
  let name = e.currentTarget.attributes["name"].value
  let val
  if (name=="notaCierre"||name=="tipo_pago_deudor"||name=="qDeudores") {
    val = e.currentTarget.value
  }else{
    val = number(e.currentTarget.value)
    val = val=="NaN"||!val?"":val
  }

  switch(name){
    case 'caja_usd':
      setCaja_usd(val)
    break;

    case 'caja_cop':
      setCaja_cop(val)
    break;

    case 'caja_bs':
      setCaja_bs(val)
    break;

    case 'dejar_usd':
      setDejar_usd(val)
    break;

    case 'dejar_cop':
      setDejar_cop(val)
    break;

    case 'dejar_bs':
      setDejar_bs(val)
    break;

    case 'caja_punto':
      setCaja_punto(val)
    break;

    case 'notaCierre':
      setNotaCierre(val)
    break;

    case 'tipo_pago_deudor':
      setTipo_pago_deudor(val)
    break;
    case 'monto_pago_deudor':
      setMonto_pago_deudor(val)
    break;
    case 'qDeudores':
      setQDeudores(val)
    break;



    
  }
}
const setMoneda = e => {
  const tipo = e.currentTarget.attributes["data-type"].value
  let valor = window.prompt("Nuevo valor")
  if (valor) {
    db.setMoneda({tipo,valor}).then(res=>{
      getMoneda()
      getProductos()
    })
  }
}
const getMoneda = () => {
  setLoading(true)
  db.getMoneda().then(res=>{
    if (res.data.peso){
      setPeso(res.data.peso.valor)
    }

    if (res.data.dolar) {
      setDolar(res.data.dolar.valor)
    }
    setLoading(false)
  })
}
const toggleModalProductos = (prop,callback=null) => {
  setModaladdproductocarritoToggle(prop)
  if (inputaddcarritointernoref) {
    if (inputaddcarritointernoref.current){
      inputaddcarritointernoref.current.focus()

    }
    
  }
  if (callback) {callback()}
}
const toggleImprimirTicket = () => {
  if (pedidoData) {
    let identificacion = window.prompt("Identificación",pedidoData.cliente.identificacion)

    if (identificacion) {
      let nombres = window.prompt("Nombre y Apellido",pedidoData.cliente.nombre)
      if (nombres) {

        db.imprimirTicked({
          id: pedidoData.id,
          identificacion,
          nombres
        }).then(res=>{
          notificar(res)
        })
      }
    }
    
  }
}
const onChangePedidos = e =>{
  const type = e.currentTarget.attributes["data-type"].value
  const value = e.currentTarget.value
  switch(type){
    case "busquedaPedido":
      setBusquedaPedido(value)
    break;
    case "fecha1pedido":
      setFecha1pedido(value)
    break;
    case "fecha2pedido":
      setFecha2pedido(value)
    break;
  }
}
const getPedidos = e => {
  setLoading(true)
  db.getPedidos({busquedaPedido,fecha1pedido,fecha2pedido,tipobusquedapedido,tipoestadopedido,filterMetodoPagoToggle}).then(res=>{
    setPedidos(res.data)
    setLoading(false)
  })
}
const getProductos = () => {

  setpermisoExecuteEnter(false)
  setLoading(true)

  if (time!=0) {
    clearTimeout(typingTimeout)
  }

  let time = window.setTimeout(()=>{
    db.getinventario({vendedor,num,itemCero,qProductosMain,orderColumn,orderBy}).then(res=>{
      if (res.data.length) {
        
        setProductos(res.data)
      }
      if (!res.data[counterListProductos]) {
        setCounterListProductos(0)
        setCountListInter(0)
      }
      setLoading(false)
    })
    setpermisoExecuteEnter(true)

  },150)
  setTypingTimeout(time)


}
const getPersona = q => {
  setLoading(true)
  db.getpersona({q}).then(res=>{
    setPersona(res.data)
    if (!res.data.length) {
      setclienteInpidentificacion(q)
    }
    setLoading(false)
  })
}
const setPersonaFast = e => {
  e.preventDefault()
  db.setClienteCrud({
    id:null,
    clienteInpidentificacion,
    clienteInpnombre,
    clienteInpdireccion,
    clienteInptelefono,
  }).then(res=>{
    notificar(res)
    if (res.data.estado) {
      if (res.data.id) {
        setPersonas(res.data.id)
      }

    }
    setLoading(false)
  })
}
const printCreditos = () => {
  db.openPrintCreditos("")
}
const getPedidosList = ()=>{
  db.getPedidosList().then(res=>{
    setPedidoList(res.data)
    if (res.data[0]) {
      setNumero_factura(res.data[0].id)
    }
  })
}
const getPedido = (id,callback=null) => {
  setLoading(true)
  if (!id) {
    id = pedidoSelect
  }else{
    setPedidoSelect(id)
  }
  db.getPedido({id}).then(res=>{
    setLoading(false)
    setPedidoData(res.data)
    setTransferencia("")
    setDebito("")
    setEfectivo("")
    setCredito("")
    setVuelto("")

    getPedidosFast()

    if (res.data.pagos) {
      let d = res.data.pagos
      if (d.filter(e=>e.tipo==1)[0]) {
        let var_setTransferencia = d.filter(e=>e.tipo==1)[0].monto
        if (var_setTransferencia=="0.00") {
          setTransferencia("")

        }else{
          setTransferencia(d.filter(e=>e.tipo==1)[0].monto)

        }

      }
      if (d.filter(e=>e.tipo==2)[0]) {
        let var_setDebito = d.filter(e=>e.tipo==2)[0].monto
        if (var_setDebito=="0.00") {
          setDebito("")

        }else{
          setDebito(d.filter(e=>e.tipo==2)[0].monto)

        }

      }
      if (d.filter(e=>e.tipo==3)[0]) {
        let var_setEfectivo = d.filter(e=>e.tipo==3)[0].monto
        if (var_setEfectivo=="0.00") {
          setEfectivo("")

        }else{
          setEfectivo(d.filter(e=>e.tipo==3)[0].monto)

        }

      }
      if (d.filter(e=>e.tipo==4)[0]) {
        let var_setCredito = d.filter(e=>e.tipo==4)[0].monto
        if (var_setCredito=="0.00") {
          setCredito("")

        }else{
          setCredito(d.filter(e=>e.tipo==4)[0].monto)

        }

      }
      if (d.filter(e=>e.tipo==6)[0]) {
        let var_setVuelto = d.filter(e=>e.tipo==6)[0].monto
        if (var_setVuelto=="0.00") {
          setVuelto("")

        }else{
          setVuelto(d.filter(e=>e.tipo==6)[0].monto)

        }

      }
    }else{
      alert("Sin pagos registrados")
    }
    if (callback) { callback() }

  })
}
const addCarrito = (e,callback=null) => {
  let index, loteid;
  if (e.currentTarget) {
    let attr = e.currentTarget.attributes 
    index = attr["data-index"].value
    
    if (attr["data-loteid"]) {
      loteid = attr["data-loteid"].value
    }
    
  }else{
    index = e
  }

  setLoteIdCarrito(loteid)

  
  if (index != counterListProductos && productos[index].lotes.length) {
    setCounterListProductos(index)
  }else{
    if (pedidoList[0]) {
      setNumero_factura(pedidoList[0].id)
    }else{
      setNumero_factura("nuevo")
    }
    setSelectItem(index)
    if (callback) {callback()}

  }
}
const addCarritoRequest = e =>{
  try{
    setLoading(true)
    let type
    if (e.currentTarget) {
      type = e.currentTarget.attributes["data-type"].value
      e.preventDefault()
    }else{
      type = e
    }
    const id = productos[selectItem].id

    db.setCarrito({ id, type, cantidad, numero_factura, loteIdCarrito}).then(res=>{
      getPedidosList()
      getProductos()
      notificar(res)

      switch(res.data.type){
        case "agregar":
          setSelectItem(null)
        break;
        case "agregar_procesar":
          getPedido(res.data.num_pedido,()=>{
            setView("pagar")
            setSelectItem(null)
          })
        break;
      }
      setCantidad("")
      inputbusquedaProductosref.current.value = ""
      setLoading(false)
    })

  }catch(err){
    console.log(err)
  }
}
const onClickEditPedido = e =>{
  const id = e.currentTarget.attributes["data-id"].value
  getPedido(id,()=>{
    setView("pagar")
  })
}
const onCLickDelPedido = e => {
  if (confirm("¿Seguro de eliminar?")) {
    const current = e.currentTarget.attributes
    const id = current["data-id"].value
    db.delpedido({id}).then(res=>{
      notificar(res)
      
      
      switch(current["data-type"].value){
        case 'getDeudor':
          getDeudor()

        break;

        case 'getPedidos':
          getPedidos()
          getPedidosList()

        break;
      }
    })
  }
}
const delItemPedido = (e) => {
  setLoading(true)
  const index = e.currentTarget.attributes["data-index"].value
  db.delItemPedido({index}).then(res=>{
    getPedido()
    setLoading(false)
    notificar(res)
  })
}
const setDescuentoTotal = (e) => {
  // setLoading(true)

  let descuento = window.prompt("Descuento Total *0 para eliminar*")
  let index = e.currentTarget.attributes["data-index"].value
  if (descuento=="0") {
    db.setDescuentoTotal({index,descuento:0}).then(res=>{
      getPedido()
      setLoading(false)
      notificar(res)

    })
  }else{
    if (typeof parseFloat(descuento) == "number" && pedidoData.clean_subtotal) {

      let total = parseFloat(pedidoData.clean_subtotal)

      descuento = (100-((parseFloat(descuento)*100)/total).toFixed(3))


      db.setDescuentoTotal({index,descuento}).then(res=>{
        getPedido()
        setLoading(false)
        notificar(res)

      })
    }

  }

}
const setDescuentoUnitario = (e) => {
  setLoading(true)
  const descuento = window.prompt("Descuento unitario")
  if (descuento) {
    const index = e.currentTarget.attributes["data-index"].value
    db.setDescuentoUnitario({index,descuento}).then(res=>{
      getPedido()
      setLoading(false)
      notificar(res)
    })
  }
}
const setCantidadCarrito = (e) => {
  const cantidad = window.prompt("Cantidad")
  if (cantidad) {
    const index = e.currentTarget.attributes["data-index"].value
    setLoading(true)
    db.setCantidad({index,cantidad}).then(res=>{
      getPedido()
      setLoading(false)
      notificar(res)
    })
  }
} 
const setProductoCarritoInterno = (e) => {
  const cantidad = window.prompt("Cantidad")
  if (cantidad&&pedidoData.id) {
    setLoading(true)
    let id;
    if (e.currentTarget) {
      id = e.currentTarget.attributes["data-index"].value

    }else{
      id = e
    }
    const type = "agregar"
    db.setCarrito({id,type,cantidad,numero_factura:pedidoData.id}).then(res=>{
      getPedido()
      setModaladdproductocarritoToggle(false)
      setLoading(false)

    })
  }
}
const setPersonas = (e) => {
    setLoading(true)
    let id_cliente;

    if (e.currentTarget) {

      id_cliente = e.currentTarget.attributes["data-index"].value
    }else{
      id_cliente = e

    }
    if (pedidoData.id) {
      db.setpersonacarrito({numero_factura:pedidoData.id,id_cliente}).then(res=>{
        getPedido()
        setToggleAddPersona(false)
        setLoading(false)
        notificar(res)
      })

    }
}
const facturar_pedido = () => {
  if (refinputaddcarritofast.current !== document.activeElement) {
    setLoading(true)
    if (pedidoData.id) {
      db.setPagoPedido({
        id:pedidoData.id,
        debito,
        efectivo,
        transferencia,
        credito,
        vuelto,
      }).then(res=>{
        notificar(res)
        setLoading(false)
        
        if (res.data.estado) {
          setView("seleccionar")
          getPedidos()
          getPedidosList()
          getProductos()

          setSelectItem(null)

        }
      })

    }
  }

}
const del_pedido = () =>{
  if (confirm("¿Seguro de eliminar?")) {
    if (pedidoData.id) {
      db.delpedido({id:pedidoData.id}).then(res=>{
        notificar(res)
        getPedidosList()
        setView("seleccionar")
      })

    }else{
      alert("No hay pedido seleccionado")
    }
  }
}
const guardar_cierre = (e,callback=null) => {
  let type = e.currentTarget.attributes["data-type"].value
  setLoading(true)
  db.guardarCierre({
    fechaCierre,
    
    total_caja_neto,

    dejar_usd,
    dejar_cop,
    dejar_bs,

    total_dejar_caja_neto,
    total_punto,

    guardar_usd,
    guardar_cop,
    guardar_bs,
    
    efectivo: cierre["total_caja"],
    transferencia: cierre[1],
    entregadomenospend: cierre["entregadomenospend"],
    caja_inicial:cierre["caja_inicial"],

    notaCierre,
  }).then(res=>{
    
    setLoading(false)
    notificar(res,false)
    
    if (res.data.estado) {
      if (type=="ver") {
        db.openVerCierre({type,fechaCierre})
      }else{
        setLoading(true)
        db.sendCierre({type,fecha:fechaCierre}).then(res=>{
          notificar(res,false)
          setLoading(false)
        })
      }

    }     

  })
}
const setPagoCredito = e =>{
  e.preventDefault()

  if (deudoresList[selectDeudor]) {
    let id_cliente = deudoresList[selectDeudor].id
    setLoading(true)
    db.setPagoCredito({
      id_cliente,
      tipo_pago_deudor,
      monto_pago_deudor,
    }).then(res=>{
      notificar(res)
      setLoading(false)
      getDeudor(id_cliente)
    })
  }
}
const getDeudores = e =>{
  setLoading(true)
  db.getDeudores({qDeudores,view}).then(res=>{
    setDeudoresList(res.data)
    setLoading(false)
  })
}
const clickSetOrderColumn = e => {
  let valor = e.currentTarget.attributes["data-valor"].value

  if (valor==orderColumn) {
    if (orderBy=="desc") {
      setOrderBy("asc")
    }else{
      setOrderBy("desc")

    }
  }else{
    setOrderColumn(valor)
  }

}
const onchangeinputmain = e => {
  let val = e.currentTarget.value
  setQProductosMain(val)

}
const delMovCaja = e =>{
  if (confirm("¿Seguro de eliminar?")) {
    setLoading(true)
    const id = e.currentTarget.attributes["data-id"].value


    db.delMovCaja({id}).then(res=>{
      setLoading(false)
      getMovimientosCaja()
      notificar(res)
    })

  }
}
const delMov = e =>{
  if (confirm("¿Seguro de eliminar?")) {
    setLoading(true)
    const id = e.currentTarget.attributes["data-id"].value


    db.delMov({id}).then(res=>{
      setLoading(false)
      notificar(res)
      getMovimientos()
    })

  }
}
const setDevolucion = e => {
  setLoading(true)
  let id = e.currentTarget.attributes["data-id"].value

  let cantidad = window.prompt("Cantidad")

  if (cantidad) {
    db.setDevolucion({
      id,
      idMovSelect,
      cantidad,
      tipoMovMovimientos,
      tipoCatMovimientos,
      fechaMovimientos,
    }).then(res=>{
      setLoading(false)
      getMovimientos()
      setBuscarDevolucion("")
      notificar(res)
    })

  }
}
const buscarInventario = e => {
  setLoading(true)
  db.getinventario({
    num:Invnum,
    itemCero:true,
    qProductosMain:qBuscarInventario,
    orderColumn:InvorderColumn,
    orderBy:InvorderBy
  }).then(res=>{
    setProductosInventario(res.data)
    setLoading(false)
    setIndexSelectInventario(null)
    if (res.data.length===1) {
      setIndexSelectInventario(0)
    }else if(res.data.length==0){
      setinpInvbarras(qBuscarInventario)
    }
  })
}
const getProveedores = e => {
  setLoading(true)
  db.getProveedores({
    q:qBuscarProveedor
  }).then(res=>{
    setProveedoresList(res.data)
    setLoading(false)
    if (res.data.length===1) {
      setIndexSelectProveedores(0)
    }
  })

  db.getMarcas({
    q:qBuscarProveedor
  }).then(res=>{
    setmarcasList(res.data)
  })

  db.getDepositos({
    q:qBuscarProveedor
  }).then(res=>{
    setdepositosList(res.data)
  })


}
const setInputsInventario = () =>{
  if (productosInventario[indexSelectInventario]) {
    let obj = productosInventario[indexSelectInventario]
    setinpInvbarras(obj.codigo_barras?obj.codigo_barras:"")
    setinpInvcantidad(obj.cantidad?obj.cantidad:"")
    setinpInvalterno(obj.codigo_proveedor?obj.codigo_proveedor:"")
    setinpInvunidad(obj.unidad?obj.unidad:"")
    setinpInvdescripcion(obj.descripcion?obj.descripcion:"")
    setinpInvbase(obj.precio_base?obj.precio_base:"")
    setinpInvventa(obj.precio?obj.precio:"")
    setinpInviva(obj.iva?obj.iva:"")

    setinpInvcategoria(obj.id_categoria?obj.id_categoria:"")
    setinpInvid_proveedor(obj.id_proveedor?obj.id_proveedor:"")
    setinpInvid_marca(obj.id_marca?obj.id_marca:"")
    setinpInvid_deposito(obj.id_deposito?obj.id_deposito:"")

    setinpInvLotes(obj.lotes ? obj.lotes : [])

  }
}
const setNewProducto = () => {
  setIndexSelectInventario(null)
  setinpInvbarras("")
  setinpInvcantidad("")
  setinpInvalterno("")
  setinpInvunidad("UND")
  setinpInvdescripcion("")
  setinpInvbase("")
  setinpInvventa("")
  setinpInviva("0")

  setinpInvLotes([])

  if (facturas[factSelectIndex]) {
    setinpInvid_proveedor(facturas[factSelectIndex].proveedor.id)
  }
  

  setinpInvid_marca("GENÉRICO")
  setinpInvid_deposito(1)
}
const setInputsProveedores = () =>{
  if (proveedoresList[indexSelectProveedores]) {
    let obj = proveedoresList[indexSelectProveedores]

    setproveedordescripcion(obj.descripcion)
    setproveedorrif(obj.rif)
    setproveedordireccion(obj.direccion)
    setproveedortelefono(obj.telefono)
  

  }
}
const guardarNuevoProducto = e => {
  e.preventDefault()
  setLoading(true)

  let id = null

  if (indexSelectInventario!=null) {
    if (productosInventario[indexSelectInventario]) {
      id = productosInventario[indexSelectInventario].id
    }
  }

  let id_factura = null

  if (factSelectIndex!=null) {
    if (facturas[factSelectIndex]) {
      id_factura = facturas[factSelectIndex].id
    }
  }

  db.guardarNuevoProducto({
    id,
    inpInvbarras,
    inpInvcantidad,
    inpInvalterno,
    inpInvunidad,
    inpInvcategoria,
    inpInvdescripcion,
    inpInvbase,
    inpInvventa,
    inpInviva,
    inpInvid_proveedor,
    inpInvid_marca,
    inpInvid_deposito,
    inpInvporcentaje_ganancia,
    id_factura,

    inpInvLotes,

  }).then(res=>{
    notificar(res)

    setLoading(false)

    if (res.data.estado) {
      buscarInventario()
      getFacturas(null)

      setinpInvbarras("")
      setinpInvcantidad("")
      setinpInvalterno("")
      setinpInvunidad("UND")
      setinpInvcategoria("24")
      setinpInvdescripcion("")
      setinpInvbase("")
      setinpInvventa("")
      setinpInviva("0")
      setinpInvid_marca("")
    }
  })
}
const getPedidosFast = () => {

  db.getPedidosFast({vendedor,fecha1pedido}).then(res=>{
    setpedidosFast(res.data)
    
  })
}
const setProveedor = e =>{
  setLoading(true)
  e.preventDefault()

  let id = null

  if (indexSelectProveedores!=null) {
    if (proveedoresList[indexSelectProveedores]) {
      id = proveedoresList[indexSelectProveedores].id
    }
  }
  db.setProveedor({
    proveedordescripcion,
    proveedorrif,
    proveedordireccion,
    proveedortelefono,
    id
  }).then(res=>{
    notificar(res)
    getProveedores()
    setLoading(false)

  })
} 
const delProveedor = e => {
  let id;
  if (indexSelectProveedores!=null) {
    if (proveedoresList[indexSelectProveedores]) {
      id = proveedoresList[indexSelectProveedores].id
    }
  }
  if (confirm("¿Desea Eliminar?")) {
    setLoading(true)
    db.delProveedor({id}).then(res=>{
      setLoading(false)
      getProveedores()
      notificar(res)

      if (res.data.estado) {
        setIndexSelectProveedores(null)
      }
    })

  }

}
const delProducto = e => {
  let id;
  if (indexSelectInventario!=null) {
    if (productosInventario[indexSelectInventario]) {
      id = productosInventario[indexSelectInventario].id
    }
  }
  if (confirm("¿Desea Eliminar?")) {
    setLoading(true)
    db.delProducto({id}).then(res=>{
      setLoading(false)
      buscarInventario()
      notificar(res)
      if (res.data.estado) {
        setIndexSelectInventario(null)
      }
    })
    
  }
}
const getFacturas = (clean = true) =>{
  setLoading(true)
  db.getFacturas({
    factqBuscar,
    factqBuscarDate,
    factOrderBy,
    factOrderDescAsc
  }).then(res=>{
    setLoading(false)
    setfacturas(res.data)

    if (clean) {
      setfactSelectIndex(null)

    }
  })
}
const setFactura = e => {
  e.preventDefault()
  setLoading(true)

  let id = null

  if (factSelectIndex!=null) {
    if (facturas[factSelectIndex]) {
      id = facturas[factSelectIndex].id
    }
  }
  db.setFactura({
    factInpid_proveedor,
    factInpnumfact,
    factInpdescripcion,
    factInpmonto,
    factInpfechavencimiento,
    factInpestatus,
    id
  }).then(res=>{
    notificar(res)
    getFacturas()
    setLoading(false)
    if (res.data.estado) {
      setfactsubView("buscar")
      setfactSelectIndex(null)
    }

  })
}
const delFactura = e => {
  let id = null

  if (factSelectIndex!=null) {
    if (facturas[factSelectIndex]) {
      id = facturas[factSelectIndex].id
    }
  }
  if (confirm("¿Desea Eliminar?")) {
    setLoading(true)
    db.delFactura({id}).then(res=>{
      setLoading(false)
      getFacturas()
      notificar(res)
      if (res.data.estado) {
        setfactsubView("buscar")
        setfactSelectIndex(null)
      }
    })
    
  }
}
const delItemFact = e =>{
  let id = e.currentTarget.attributes["data-id"].value

  if (confirm("¿Desea Eliminar?")) {
    setLoading(true)
    db.delItemFact({id}).then(res=>{
      setLoading(false)
      notificar(res)
      if (res.data.estado) {
        getFacturas(false)
        buscarInventario()
      }
    })
  }
}
const setClienteCrud = e => {
  e.preventDefault()
  setLoading(true)
  let id = null

  if (indexSelectCliente!=null) {
    if (clientesCrud[indexSelectCliente]) {
      id = clientesCrud[indexSelectCliente].id
    }
  }

  db.setClienteCrud({
    id,
    clienteInpidentificacion,
    clienteInpnombre,
    clienteInpcorreo,
    clienteInpdireccion,
    clienteInptelefono,
    clienteInpestado,
    clienteInpciudad
  }).then(res=>{
    notificar(res)
    getClienteCrud()
    setLoading(false)
  })
}
const getClienteCrud = () => {
  setLoading(true)
  db.getClienteCrud({q:qBuscarCliente,num:numclientesCrud}).then(res=>{
    setLoading(false)
    setclientesCrud(res.data)
    setindexSelectCliente(null)
  })
}
const delCliente = () => {
  let id = null

  if (indexSelectCliente!=null) {
    if (clientesCrud[indexSelectCliente]) {
      id = clientesCrud[indexSelectCliente].id
    }
  }
  if (confirm("¿Desea Eliminar?")) {
    setLoading(true)
    db.delCliente({id}).then(res=>{
      setLoading(false)
      getClienteCrud()
      notificar(res)
      if (res.data.estado) {
        setindexSelectCliente(null)
      }
    })
    
  }
}
const sumPedidos = e => {
  let tipo = e.currentTarget.attributes["data-tipo"].value
  let id = e.currentTarget.attributes["data-id"].value
  if (tipo=="add") {
    if (sumPedidosArr.indexOf(id)<0) {
      setsumPedidosArr(sumPedidosArr.concat(id))
    }
  }else{
      setsumPedidosArr(sumPedidosArr.filter(e=>e!=id))

  }
}
const addCarritoFast = () => {
  if (pedidoData.id) {
    if (time!=0) {
      clearTimeout(typingTimeout)
    }

    let time = window.setTimeout(()=>{
      

    db.getinventario({exacto:"si",num:1,itemCero:true,qProductosMain:inputaddCarritoFast,orderColumn:"id",orderBy:"desc"}).then(res=>{
      if(res.data.length==1){
        let id = res.data[0].id
       db.setCarrito({id,type:null,cantidad:1,numero_factura:pedidoData.id}).then(res=>{
        setinputaddCarritoFast("")
        getPedido()
       })

      }
    })


    },100)
    setTypingTimeout(time)

    


  }
  
} 
const getFallas = () => {
  setLoading(true)
  db.getFallas({qFallas,orderCatFallas,orderSubCatFallas,ascdescFallas}).then(res=>{
    setfallas(res.data)
    setLoading(false)
  })
}
const setFalla = e => {
  let id_producto = e.currentTarget.attributes["data-id"].value 
  db.setFalla({id:null,id_producto}).then(res=>{
    notificar(res)
    setSelectItem(null)

  })
}
const delFalla = e => {
  if (confirm("¿Desea Eliminar?")) {
    let id = e.currentTarget.attributes["data-id"].value 
    db.delFalla({id}).then(res=>{
      notificar(res)
      getFallas()
    })
  }
}
const viewReportPedido = () =>{
  db.openNotaentregapedido({ id: pedidoData.id})
  
}
const getPedidosCentral = () => {
  setLoading(true)
  db.getPedidosCentral({}).then(res=>{
    setLoading(false)
    if (res.data) {
      if (res.data.length) {
        setpedidoCentral(res.data)
      }
      if (res.data.msj) {
        notificar(res)
      }
    }
  })
}
const procesarImportPedidoCentral = () => {
  // console.log(valbodypedidocentral)
  // Id pedido 4
  // Count items pedido 4
  // sucursal code *


  // console.log(valheaderpedidocentral)
  //id_pedido 4 (0)
  //id_producto 4 (0)
  //base 6 (2)
  //venta 6 (2)
  //cantidad 5 (1)

  try{

    // Header...
    let id_pedido_header = valheaderpedidocentral.substring(0,4).replace(/\b0*/g, '')
    let count = valheaderpedidocentral.substring(4,8).replace(/\b0*/g, '')
    let sucursal_code = valheaderpedidocentral.substring(8)

    let import_pedido = {}

    if (id_pedido_header&&count&&sucursal_code) {

      db.getSucursal({}).then(res=>{
        try{
          if (res.data) {
            if (res.data.codigo) {
              if (res.data.codigo!=sucursal_code) {
                throw("Error: Pedido no pertenece a esta sucursal!")
              }else{
                import_pedido.created_at = today
                import_pedido.sucursal = sucursal_code
                import_pedido.id = id_pedido_header
                import_pedido.base = 0
                import_pedido.venta = 0
                import_pedido.items = []

                let body = valbodypedidocentral.toString().replace(/[^0-9]/g,"")
                if (!body) {
                  
                  throw("Error: Cuerpo incorrecto!")
                }else{
                  
                  let ids_productos = body.match(/.{1,25}/g).map((e,i)=>{

                    if (e.length!=25) {
                      throw("Error: Líneas no tienen la longitud!")

                    }
                    let id_pedido = e.substring(0,4).replace(/\b0*/g, '')
                    let id_producto = e.substring(4,8).replace(/\b0*/g, '')

                    let base = e.substring(8,12).replace(/\b0*/g, '')+"."+e.substring(12,14)
                    let venta = e.substring(14,18).replace(/\b0*/g, '')+"."+e.substring(18,20)
                    
                    let cantidad = e.substring(20,24).replace(/\b0*/g, '')+"."+e.substring(24,25)

                    // if (id_pedido_header!=id_pedido) {
                    //   
                    //   throw("Error: Producto #"+(i+1)+" no pertenece a este pedido!")
                    // }


                    
                    return {id_producto,
                      id_pedido,
                      base,
                      venta,
                      cantidad}
                  })
                  db.getProductosSerial({count,ids_productos:ids_productos.map(e=>e.id_producto)})
                  .then(res=>{
                    try{

                      let obj = res.data

                      if (obj.estado) {
                        if (obj.msj) {
                          let pro = obj.msj.map((e,i)=>{
                            let filter = ids_productos.filter(ee=>ee.id_producto==e.id)[0];

                            let cantidad = filter.cantidad
                            let base = filter.base
                            let venta = filter.venta
                            let monto = cantidad*venta

                            import_pedido.items.push({
                              cantidad: cantidad,
                              producto: {
                                precio_base: base,
                                precio: venta,
                                codigo_barras: e.codigo_barras,
                                codigo_proveedor: e.codigo_proveedor,
                                descripcion: e.descripcion,
                                id: e.id,
                              },
                              id:i,
                              monto,
                            })

                            import_pedido.base += parseFloat(cantidad*base)
                            import_pedido.venta += parseFloat(monto)


                          })
                          // console.log("import_pedido",import_pedido)
                          setpedidoCentral(pedidosCentral.concat(import_pedido))
                          setshowaddpedidocentral(false)

                        }
                      }else{
                        alert(obj.msj)
                      } 

                    }catch(err){
                      alert(err)
                    }

                  })
                  
                }

              }
            }
          }
        }catch(err){
          alert(err)
        }
      })

    }else{
      throw("Error: Cabezera incorrecta!")
    }
  }catch(err){
    alert(err)
  }
}
const selectPedidosCentral = e => {

  try{
    let index = e.currentTarget.attributes["data-index"].value
    let tipo = e.currentTarget.attributes["data-tipo"].value

    let pedidosCentral_copy = cloneDeep(pedidosCentral)

    if (tipo=="select") {
      if (pedidosCentral_copy[indexPedidoCentral].items[index].aprobado===true) {
        
        pedidosCentral_copy[indexPedidoCentral].items[index].aprobado = false
        pedidosCentral_copy[indexPedidoCentral].items[index].ct_real = ""

      }else if (pedidosCentral_copy[indexPedidoCentral].items[index].aprobado===false) {

        delete pedidosCentral_copy[indexPedidoCentral].items[index].aprobado
        delete pedidosCentral_copy[indexPedidoCentral].items[index].ct_real
      
      }else if (typeof(pedidosCentral_copy[indexPedidoCentral].items[index].aprobado) === "undefined") {
        pedidosCentral_copy[indexPedidoCentral].items[index].aprobado = true

      }

    }else if(tipo=="changect_real"){
      pedidosCentral_copy[indexPedidoCentral].items[index].ct_real = number(e.currentTarget.value,4)
    }
    
    setpedidoCentral(pedidosCentral_copy)



    // console.log(pedidosCentral_copy)

  }catch(err){
    console.log(err)
  }
}
const checkPedidosCentral = () => {
  if (indexPedidoCentral!==null&&pedidosCentral) {
    if (pedidosCentral[indexPedidoCentral]) {
      setLoading(true)
      db.checkPedidosCentral({pedido:pedidosCentral[indexPedidoCentral]}).then(res=>{
        setLoading(false)
        
        notificar(res)
        if (res.data.estado) {
          getPedidosCentral()
        }
      })
    }
  }
}
const verDetallesFactura = (e=null) => {
  let id = facturas[factSelectIndex]
  if (e) {
    id = e
  } 
  if (id) {
    db.openVerFactura({ id: facturas[factSelectIndex].id})
  }
  
}
const getVentas = () => {
  setLoading(true)
  db.getVentas({fechaventas}).then(res=>{
    setventasData(res.data)
    setLoading(false)
  })
}
const getVentasClick = () => {
  getVentas()
}
const setBilletes = () => {

  let total = 0
  total = (parseInt(!billete1?0:billete1)*1) + (parseInt(!billete5?0:billete5)*5) + (parseInt(!billete10?0:billete10)*10) + (parseInt(!billete20?0:billete20)*20) + (parseInt(!billete50?0:billete50)*50) + (parseInt(!billete100?0:billete100)*100)
  setCaja_usd(total)
}
const addNewUsuario = e => {

  let id = null
  let tipo = e.currentTarget.attributes["data-tipo"].value

  let role = window.prompt("Role 1,2,3")
  let nombres = window.prompt("Nombres")
  let usuario = window.prompt("Usuario")
  let clave = window.prompt("Clave")

  if(tipo=="update"){
    id = e.currentTarget.attributes["data-id"].value
  }

  if (role&&nombres&&usuario&&clave) {
    setLoading(true)
    db.setUsuario({id,role,nombres,usuario,clave}).then(res=>{
      notificar(res)
      setLoading(false)
      getUsuarios()
    })
  }
}
const getUsuarios = () => {
  setLoading(true)
  db.getUsuarios({}).then(res=>{
    setLoading(false)
    setusuariosData(res.data)
  })
}
const delUsuario = () => {
  setLoading(true)
  let id = e.currentTarget.attributes["data-id"].value
  db.delUsuario({id}).then(res=>{
    setLoading(false)
    notificar(res)
  })
}
const selectProductoFast = e => {
  let id = e.currentTarget.attributes["data-id"].value
  let val = e.currentTarget.attributes["data-val"].value

  setQBuscarInventario(val)
  setfactSelectIndex("ninguna")
  setView("inventario")
  setsubViewInventario("inventario")
}
const addNewLote = e => {
  let addObj = {
    lote: "",
    creacion: "",
    vence: "",
    cantidad: "",
    type: "new",
    id: null,
  }
  setinpInvLotes(inpInvLotes.concat(addObj))
}
const changeModLote = (val, i, id, type, name = null) => {
  
    let lote = cloneDeep(inpInvLotes)

    switch (type) {
      case "update":
        if (lote[i].type != "new") {
          lote[i].type = "update"
        }
        break;
      case "delModeUpdateDelete":
        delete lote[i].type
        break;
      case "delNew":
        lote = lote.filter((e, ii) => ii !== i)
        break;
      case "changeInput":
        lote[i][name] = val
        break;

      case "delMode":
        lote[i].type = "delete"
        let id_replace = 0
        lote[i].id_replace = id_replace
        break;
    }
    setinpInvLotes(lote)
}
const reporteInventario = () => {
  db.openReporteInventario()
}
const guardarNuevoProductoLote = () => {
  setLoading(true)
  let id_factura = null

  if (factSelectIndex != null) {
    if (facturas[factSelectIndex]) {
      id_factura = facturas[factSelectIndex].id
    }
  }
  let lotesFil = productosInventario.filter(e => e.type)

  if (lotesFil.length) {
    
    db.guardarNuevoProductoLote({ lotes: lotesFil, id_factura}).then(res=>{
      notificar(res)
      setLoading(false)
      try{
        if (res.data.estado) {
          getFacturas(null)

          buscarInventario()
          
        }
      }catch(err){}
    })
  }else{
    alert("Sin Datos")
  }

}
const changeInventario = (val, i, id, type, name = null) => {
  let obj = cloneDeep(productosInventario)

  switch (type) {
    case "update":
      if (obj[i].type != "new") {
        obj[i].type = "update"
      }
      break;
    case "delModeUpdateDelete":
      delete obj[i].type
      break;
    case "delNew":
      obj = obj.filter((e, ii) => ii !== i)
      break;
    case "changeInput":
      obj[i][name] = val
      break;
    case "add":
      let pro = ""

      if (facturas[factSelectIndex]) {
        pro = facturas[factSelectIndex].proveedor.id
      }
      let newObj = [{
        id:null,
        codigo_proveedor: "",
        codigo_barras: "",
        descripcion: "",
        id_categoria: "1",
        id_marca: "",
        unidad: "UND",
        id_proveedor: pro,
        cantidad: "",
        precio_base: "",
        precio: "",
        iva: "0",
        type: "new",

      }] 

      obj = newObj.concat(obj)
    break;

    case "delMode":
      obj[i].type = "delete"
      let id_replace = 0
      obj[i].id_replace = id_replace
      break;
  }
  setProductosInventario(obj)
}
const logout = () => {
  db.logout().then(e=>{
    window.location.href = "/";
  })
}
const auth = permiso => {
  let nivel = user.nivel
  if(permiso==1){
    if (nivel == 1) {
      return true
    }
  }
  if (permiso == 2) {
    //if (nivel == 1 || nivel == 2) {
      return true
    //}
  }
  if (permiso == 3) {
    //if (nivel == 1 || nivel == 3) {
      return true
    //}
  }
  return false
}

  return (
    <>
      
        <Header 
        auth={auth}
        logout={logout}
        user={user}
        dolar={dolar}
        peso={peso} 
        setMoneda={setMoneda}
        view={view}
        getPedidos={getPedidos}
        setViewCaja={setViewCaja}
        viewCaja={viewCaja}
        setShowModalMovimientos={setShowModalMovimientos}
        showModalMovimientos={showModalMovimientos}
        getVentasClick={getVentasClick}
        toggleClientesBtn={toggleClientesBtn}
        settoggleClientesBtn={settoggleClientesBtn}
        setView={setView}/>
        {
        view=="seleccionar"?
        <div className="container p-0">
          
            {selectItem!==null?productos[selectItem]?<ModalAddCarrito 
              producto={productos[selectItem]} 
              setSelectItem={setSelectItem}
              cantidad={cantidad}
              setCantidad={setCantidad}
              numero_factura={numero_factura}
              setNumero_factura={setNumero_factura}
              pedidoList={pedidoList}
              setFalla={setFalla}
              number={number}
              inputCantidadCarritoref={inputCantidadCarritoref}
              addCarritoRequest={addCarritoRequest}/>:null:null}

            {showModalMovimientos&&<ModalMovimientos 
              setShowModalMovimientos={setShowModalMovimientos}
              showModalMovimientos={showModalMovimientos}

              setBuscarDevolucion={setBuscarDevolucion}
              buscarDevolucion={buscarDevolucion}
              setTipoMovMovimientos={setTipoMovMovimientos}
              tipoMovMovimientos={tipoMovMovimientos}
              setTipoCatMovimientos={setTipoCatMovimientos}
              tipoCatMovimientos={tipoCatMovimientos}
              productosDevulucionSelect={productosDevulucionSelect}
              setDevolucion={setDevolucion}
              idMovSelect={idMovSelect}
              setIdMovSelect={setIdMovSelect}
              movimientos={movimientos}
              delMov={delMov}
              setFechaMovimientos={setFechaMovimientos}
              fechaMovimientos={fechaMovimientos}


              
            />}
            <div className="input-group mb-3">
                <input type="text" 
                className="form-control" 
                ref={inputbusquedaProductosref}
                placeholder="Buscar... Presiona (ESC)" 
                onChange={onchangeinputmain}/>
              <div className="input-group-append">
                <span className="input-group-text pointer" onClick={()=>{
                  let num = window.prompt("Número de resultados a mostrar")
                  if (num) {setNum(num)}
                }}>Num.({num})</span>
              </div>
              <span className="input-group-text pointer" onClick={()=>setItemCero(!itemCero)}>En cero: {itemCero?"Sí":"No"}</span>
            </div>
            <ProductosList 
              productos={productos} 
              addCarrito={addCarrito}

              clickSetOrderColumn={clickSetOrderColumn}

              orderColumn={orderColumn}
              orderBy={orderBy}

              counterListProductos={counterListProductos}
              setCounterListProductos={setCounterListProductos}

              tbodyproductosref={tbodyproductosref}
              focusCtMain={focusCtMain}

              selectProductoFast={selectProductoFast}


            />
            {productos.length==0?<div className="text-center p-2"><small className="mr-2">Nada para mostrar...</small></div>:null}
            
          {viewCaja?
            <Cajagastos 
              setMovimientoCaja={setMovimientoCaja}
              movCajadescripcion={movCajadescripcion}
              setMovCajadescripcion={setMovCajadescripcion}
              movCajamonto={movCajamonto}
              setMovCajamonto={setMovCajamonto}
              number={number}
              setMovCajacategoria={setMovCajacategoria}
              movCajacategoria={movCajacategoria}
              setMovCajatipo={setMovCajatipo}
              movimientosCaja={movimientosCaja}
              delMovCaja={delMovCaja}
              movCajatipo={movCajatipo}

              movCajaFecha={movCajaFecha}
              viewCaja={viewCaja}
              setViewCaja={setViewCaja}
              setMovCajaFecha={setMovCajaFecha}
            />
          :null}
        </div>
        :null
        }
        {view=="ventas"?<Ventas
          ventasData={ventasData}
          getVentasClick={getVentasClick}
          setfechaventas={setfechaventas}
          fechaventas={fechaventas}
          moneda={moneda}
        />:null}

        {view == "vueltos" ? <Vueltos
          onchangecaja={onchangecaja}
          qDeudores={qDeudores}
          deudoresList={deudoresList}
          selectDeudor={selectDeudor}
          setSelectDeudor={setSelectDeudor}
          tipo_pago_deudor={tipo_pago_deudor}
          monto_pago_deudor={monto_pago_deudor}
          setPagoCredito={setPagoCredito}
          onClickEditPedido={onClickEditPedido}
          onCLickDelPedido={onCLickDelPedido}
          detallesDeudor={detallesDeudor}
          onlyVueltos={onlyVueltos}
          setOnlyVueltos={setOnlyVueltos}
        
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
          sumPedidos={sumPedidos}
        />:null}

        {view=="clientes_crud"?
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

        {view=="cierres"?<Cierres
          number={number}
          guardar_usd={guardar_usd}
          setguardar_usd={setguardar_usd}
          guardar_cop={guardar_cop}
          setguardar_cop={setguardar_cop}
          guardar_bs={guardar_bs}
          setguardar_bs={setguardar_bs}
          caja_usd={caja_usd}
          caja_cop={caja_cop}
          caja_bs={caja_bs}
          caja_punto={caja_punto}

          dejar_usd={dejar_usd}
          dejar_cop={dejar_cop}
          dejar_bs={dejar_bs}

          setDejar_usd={setDejar_usd}
          setDejar_cop={setDejar_cop}
          setDejar_bs={setDejar_bs}
          
          cierre={cierre}
          cerrar_dia={cerrar_dia}
          total_caja_neto={total_caja_neto}
          total_punto={total_punto}

          total_dejar_caja_neto={total_dejar_caja_neto}

          viewCierre={viewCierre}
          setViewCierre={setViewCierre}
          toggleDetallesCierre={toggleDetallesCierre}
          setToggleDetallesCierre={setToggleDetallesCierre}

          onchangecaja={onchangecaja}
          fechaCierre={fechaCierre}
          setFechaCierre={setFechaCierre}
          guardar_cierre={guardar_cierre}
          notaCierre={notaCierre}

          billete1={billete1}
          setbillete1={setbillete1}
          billete5={billete5}
          setbillete5={setbillete5}
          billete10={billete10}
          setbillete10={setbillete10}
          billete20={billete20}
          setbillete20={setbillete20}
          billete50={billete50}
          setbillete50={setbillete50}
          billete100={billete100}
          setbillete100={setbillete100}
        />:null}
        {view=="pedidos"?<Pedidos
          tipobusquedapedido={tipobusquedapedido}
          
          setTipoBusqueda={setTipoBusqueda}
          busquedaPedido={busquedaPedido}
          fecha1pedido={fecha1pedido}
          fecha2pedido={fecha2pedido}
          onChangePedidos={onChangePedidos}

          onClickEditPedido={onClickEditPedido}
          onCLickDelPedido={onCLickDelPedido}

          pedidos={pedidos}
          getPedidos={getPedidos}

          filterMetodoPago={filterMetodoPago}
          filterMetodoPagoToggle={filterMetodoPagoToggle}
          tipoestadopedido={tipoestadopedido}
          setTipoestadopedido={setTipoestadopedido}
        />:null}

        {view=="usuarios"?<Usuarios
          usuariosData={usuariosData}
          addNewUsuario={addNewUsuario}
          delUsuario={delUsuario}
          getUsuarios={getUsuarios}
        />:null}
        {view=="inventario"?<Inventario
          setporcenganancia={setporcenganancia}
          refsInpInvList={refsInpInvList}
          guardarNuevoProductoLote={guardarNuevoProductoLote}
          changeInventario={changeInventario}
          reporteInventario={reporteInventario}
          addNewLote={addNewLote}
          changeModLote={changeModLote}
          
          modViewInventario={modViewInventario}
          setmodViewInventario={setmodViewInventario}
          setNewProducto={setNewProducto}
          verDetallesFactura={verDetallesFactura}
          showaddpedidocentral={showaddpedidocentral}
          setshowaddpedidocentral={setshowaddpedidocentral}
          valheaderpedidocentral={valheaderpedidocentral}
          setvalheaderpedidocentral={setvalheaderpedidocentral}
          valbodypedidocentral={valbodypedidocentral}
          setvalbodypedidocentral={setvalbodypedidocentral}
          procesarImportPedidoCentral={procesarImportPedidoCentral}
          moneda={moneda}
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

          depositosList={depositosList}
          marcasList={marcasList}
          
          setshowModalFacturas={setshowModalFacturas}
          showModalFacturas={showModalFacturas}

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

          factInpestatus={factInpestatus}
          setfactInpestatus={setfactInpestatus}

          setFactura={setFactura}
          delFactura={delFactura}

          Invnum={Invnum}
          setInvnum={setInvnum}
          InvorderColumn={InvorderColumn}
          setInvorderColumn={setInvorderColumn}
          InvorderBy={InvorderBy}
          setInvorderBy={setInvorderBy}
          delItemFact={delItemFact}

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

          getPedidosCentral={getPedidosCentral}
          selectPedidosCentral={selectPedidosCentral}
          checkPedidosCentral={checkPedidosCentral}
          pedidosCentral={pedidosCentral}
          setIndexPedidoCentral={setIndexPedidoCentral}
          indexPedidoCentral={indexPedidoCentral}

        />:null}
        {view =="ViewPedidoVendedor"?<ViewPedidoVendedor
        
        />:null}
        {view=="pagar"?<Pagar 
          pedidosFast={pedidosFast}
          onClickEditPedido={onClickEditPedido}
          tipobusquedapedido={tipobusquedapedido}
          pedidos={pedidos}
          pedidoData={pedidoData} 
          getPedido={getPedido} 
          debito={debito}
          setDebito={setDebito}
          efectivo={efectivo}
          setEfectivo={setEfectivo}
          transferencia={transferencia}
          setTransferencia={setTransferencia}
          vuelto={vuelto}
          setVuelto={setVuelto}
          number={number}
          credito={credito}
          inputmodaladdpersonacarritoref={inputmodaladdpersonacarritoref}
          inputaddcarritointernoref={inputaddcarritointernoref}

          viewReportPedido={viewReportPedido}

          delItemPedido={delItemPedido}
          setDescuento={setDescuento}
          setDescuentoUnitario={setDescuentoUnitario}
          setDescuentoTotal={setDescuentoTotal}
          setCantidadCarrito={setCantidadCarrito}

          ModaladdproductocarritoToggle={ModaladdproductocarritoToggle}
          setModaladdproductocarritoToggle={setModaladdproductocarritoToggle}

          toggleModalProductos={toggleModalProductos}

          toggleAddPersona={toggleAddPersona}
          setToggleAddPersona={setToggleAddPersona}
          personas={personas}
          getPersona={getPersona}
          setPersonas={setPersonas}

          setProductoCarritoInterno={setProductoCarritoInterno}

          del_pedido={del_pedido}

          toggleImprimirTicket={toggleImprimirTicket}

          productos={productos}
          getProductos={getProductos}
          facturar_pedido={facturar_pedido}

          setCredito={setCredito}

          tbodyproducInterref={tbodyproducInterref}
          tbodypersoInterref={tbodypersoInterref}
          
          countListInter={countListInter}
          countListPersoInter={countListPersoInter}

          onchangeinputmain={onchangeinputmain}

          clickSetOrderColumn={clickSetOrderColumn}
          orderColumn={orderColumn}
          orderBy={orderBy}
          entregarVuelto={entregarVuelto}

          setPersonaFast={setPersonaFast}
          clienteInpidentificacion={clienteInpidentificacion}
          setclienteInpidentificacion={setclienteInpidentificacion}
          clienteInpnombre={clienteInpnombre}
          setclienteInpnombre={setclienteInpnombre}
          clienteInptelefono={clienteInptelefono}
          setclienteInptelefono={setclienteInptelefono}
          clienteInpdireccion={clienteInpdireccion}
          setclienteInpdireccion={setclienteInpdireccion}
          
          inputaddCarritoFast={inputaddCarritoFast}
          setinputaddCarritoFast={setinputaddCarritoFast}
          addCarritoFast={addCarritoFast}
          refinputaddcarritofast={refinputaddcarritofast}

          autoCorrector={autoCorrector}
          setautoCorrector={setautoCorrector}

          getDebito={getDebito}
          getCredito={getCredito}
          getTransferencia={getTransferencia}
          getEfectivo={getEfectivo}
          />
        :null}
        {view=="credito"?<Credito
          printCreditos={printCreditos}
          onchangecaja={onchangecaja}
          qDeudores={qDeudores}
          deudoresList={deudoresList}
          tipo_pago_deudor={tipo_pago_deudor}
          monto_pago_deudor={monto_pago_deudor}

          selectDeudor={selectDeudor}
          setSelectDeudor={setSelectDeudor}
          setPagoCredito={setPagoCredito}
          detallesDeudor={detallesDeudor}
          onClickEditPedido={onClickEditPedido}
          onCLickDelPedido={onCLickDelPedido}
          onlyVueltos={onlyVueltos}
          setOnlyVueltos={setOnlyVueltos}

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

          sumPedidos={sumPedidos}
          sumPedidosArr={sumPedidosArr}
          setsumPedidosArr={setsumPedidosArr}
        />
        :null}
      
    </>
  );
}

