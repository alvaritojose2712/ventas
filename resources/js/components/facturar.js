import '../../css/modal.css'

import { useHotkeys } from 'react-hotkeys-hook';


import {useState,useEffect, useRef,StrictMode} from 'react';
import {cloneDeep} from 'lodash';
import ReactDOM, {render} from 'react-dom';
import db from '../database/database';



import ProductosList from '../components/productoslist';
import ModalAddCarrito from '../components/modaladdcarrito';
import ModalMovimientos from '../components/ModalMovimientos';

import Login from '../components/login';
import Pagar from '../components/pagar';
import Header from '../components/header';

import Notificacion from '../components/notificacion';
import Cargando from '../components/cargando';

import Pedidos from '../components/pedidos';

import Credito from '../components/credito';

import Cierres from '../components/cierre';
import Inventario from '../components/inventario';

import Cajagastos from '../components/cajagastos';
import Ventas from '../components/ventas';



function Facturar() {
  const [msj,setMsj] = useState("")
  const [loginActive,setLoginActive] = useState(false)
  const [loading,setLoading] = useState(false)

  const [num,setNum] = useState(100)
  const [itemCero,setItemCero] = useState(false)
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
  const [inpInvporcentaje_ganancia,setinpInvporcentaje_ganancia] = useState("0")


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

  const [crediSubview,setcrediSubview] = useState("credito")
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
  



  const [valheaderpedidocentral, setvalheaderpedidocentral] = useState("12340005ARAMCAL")
  const [valbodypedidocentral, setvalbodypedidocentral] = useState("12341238123456123456123451234123712345612345612345123412361234561234561234512341235123456123456123451234123412345612345612345")

// 1234123812345612345612345
// 1234123712345612345612345
// 1234123612345612345612345
// 1234123512345612345612345
// 1234123412345612345612345
// 12341234ARAMCAL

  const moneda = (value, decimals=2, separators=['.',".",',']) => {
    decimals = decimals >= 0 ? parseInt(decimals, 0) : 2;
    separators = separators || ['.', "'", ','];
    var number = (parseFloat(value) || 0).toFixed(decimals);
    if (number.length <= (4 + decimals))
        return number.replace('.', separators[separators.length - 1]);
    var parts = number.split(/[-.]/);
    value = parts[parts.length > 1 ? parts.length - 2 : 0];
    var result = value.substr(value.length - 3, 3) + (parts.length > 1 ?
        separators[separators.length - 1] + parts[parts.length - 1] : '');
    var start = value.length - 6;
    var idx = 0;
    while (start > -3) {
        result = (start > 0 ? value.substr(start, 3) : value.substr(0, 3 + start))
            + separators[idx] + result;
        idx = (++idx) % 2;
        start -= 3;
    }
    return (parts.length == 3 ? '-' : '') + result;
  }

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
        refinputaddcarritofast.current.focus()
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
  useHotkeys('down', () => {
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

    }
  },{
    enableOnTags:["INPUT", "SELECT"],

  },[view,counterListProductos,countListInter,countListPersoInter]);
  useHotkeys('up', () => {
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
    }
  },{
    enableOnTags:["INPUT", "SELECT"],

  },[view,counterListProductos,countListInter,countListPersoInter]);
  useHotkeys('enter', () => {
    if(selectItem===null&&view=="seleccionar"){
      try{
        if (tbodyproductosref.current) {
          let tr = tbodyproductosref.current.rows[counterListProductos]
          let index = tr.attributes["data-index"].value
          if (permisoExecuteEnter) {

            addCarrito(index)
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
    }
  },{
    filterPreventDefault:false,
    enableOnTags:["INPUT", "SELECT"],
  },[view,counterListProductos,selectItem]);




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
    if (view=="credito") {
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
  

  let total_caja_calc = ( parseFloat(caja_usd?caja_usd:0) + (parseFloat(caja_cop?caja_cop:0)/parseFloat(peso)) + (parseFloat(caja_bs?caja_bs:0)/parseFloat(dolar)) ).toFixed(2)
  let total_caja_neto = !total_caja_calc||total_caja_calc=="NaN"?0:total_caja_calc

  let total_dejar_caja_calc = ( parseFloat(dejar_usd?dejar_usd:0) + (parseFloat(dejar_cop?dejar_cop:0)/parseFloat(peso)) + (parseFloat(dejar_bs?dejar_bs:0)/parseFloat(dolar)) ).toFixed(2)
  let total_dejar_caja_neto = !total_dejar_caja_calc||total_dejar_caja_calc=="NaN"?0:total_dejar_caja_calc


  let total_punto = dolar&&caja_punto?(caja_punto/dolar).toFixed(2):0

  const cerrar_dia = (e) => {
    e.preventDefault()
    setLoading(true)
    db.cerrar({total_caja_neto,total_punto,fechaCierre}).then(res=>{
      setCierre(res.data)
      console.log(res.data)
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
    console.log("entregarVuelto")
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
  const number = (val) =>{
    if (val=="") return ""
    return val.replace(/[^\d|\.]+/g,'')
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
  const filter = e => {
    if ( e.descripcion.toString().toLowerCase().indexOf(q.toLowerCase())>=0
      || e.codigo_proveedor.toString().toLowerCase().indexOf(q.toLowerCase())>=0) {
      return true
    }
    return false 
  }
  const notificar = (msj,fixed=true) => {
    if (fixed) {
      setTimeout(()=>{
        setMsj("")
      },3000)
    }
    if (msj=="") {
      setMsj("")
    }else{
      if (msj.data) {
        if (msj.data.msj) {
          setMsj(msj.data.msj)

        }else{

          setMsj(JSON.stringify(msj.data))
        }
      }

    }
  }
  const loginRes = res => {
    notificar(res)
    if (res.data) {
      setLoginActive(res.data.estado)
      getProductos()
      getPedidosList()
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
      setPeso(res.data.peso.valor)
      setDolar(res.data.dolar.valor)
      setLoading(false)
    })
  }
  const toggleModalProductos = (prop,callback=null) => {
    setModaladdproductocarritoToggle(prop)
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
          console.log("toggleImprimirTicket")
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
      db.getinventario({num,itemCero,qProductosMain,orderColumn,orderBy}).then(res=>{
        setProductos(res.data)
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

      getPedidos()
      setTipoestadopedido("todos")

      if (res.data.pagos) {
        let d = res.data.pagos
        if (d.filter(e=>e.tipo==1)[0]) {
          setTransferencia(d.filter(e=>e.tipo==1)[0].monto)
        }
        if (d.filter(e=>e.tipo==2)[0]) {
          setDebito(d.filter(e=>e.tipo==2)[0].monto)
        }
        if (d.filter(e=>e.tipo==3)[0]) {
          setEfectivo(d.filter(e=>e.tipo==3)[0].monto)
        }
        if (d.filter(e=>e.tipo==4)[0]) {
          setCredito(d.filter(e=>e.tipo==4)[0].monto)
        }
        if (d.filter(e=>e.tipo==6)[0]) {
          setVuelto(d.filter(e=>e.tipo==6)[0].monto)
        }
      }else{
        alert("Sin pagos registrados")
      }
      if (callback) { callback() }

    })
  }
  const addCarrito = (e,callback=null) => {
    let index;
    if (e.currentTarget) {
      index = e.currentTarget.attributes["data-index"].value

    }else{
      index = e
    }

    if (pedidoList[0]) {
      setNumero_factura(pedidoList[0].id)
    }else{
      setNumero_factura("nuevo")
    }
    setSelectItem(index)
    if (callback) {callback()}
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

      db.setCarrito({id,type,cantidad,numero_factura}).then(res=>{
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
      if (typeof parseFloat(descuento) == "number" && pedidoData.clean_total) {

        let total = parseFloat(pedidoData.clean_total)

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
    setLoading(true)
    const cantidad = window.prompt("Cantidad")
    if (cantidad) {
      const index = e.currentTarget.attributes["data-index"].value
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
          window.open("verCierre?type="+type+"&fecha="+fechaCierre,"targed=blank")
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
    db.getDeudores({qDeudores}).then(res=>{
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
      setinpInvbarras(obj.codigo_barras)
      setinpInvcantidad(obj.cantidad)
      setinpInvalterno(obj.codigo_proveedor)
      setinpInvunidad(obj.unidad)
      setinpInvdescripcion(obj.descripcion)
      setinpInvbase(obj.precio_base)
      setinpInvventa(obj.precio)
      setinpInviva(obj.iva)

      setinpInvcategoria(obj.id_categoria)
      setinpInvid_proveedor(obj.id_proveedor)
      setinpInvid_marca(obj.id_marca)
      setinpInvid_deposito(obj.id_deposito)

    }
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

    }).then(res=>{
      notificar(res)
      buscarInventario()
      getFacturas(null)

      setLoading(false)

      if (res.data.estado) {

        setinpInvbarras("")
        setinpInvcantidad("")
        setinpInvalterno("")
        setinpInvunidad("UND")
        setinpInvcategoria("24")
        setinpInvdescripcion("")
        setinpInvbase("")
        setinpInvventa("")
        setinpInviva("")
        setinpInvid_marca("")
      }
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
  window.open("/notaentregapedido?id="+pedidoData.id,"_blank")
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
    window.open("verFactura?id="+facturas[factSelectIndex].id,"targed=blank")
  }
  
}

const getVentas = () => {
  setLoading(true)
  db.getVentas({fechaventas}).then(res=>{
    setventasData(res.data)
    setLoading(false)
    console.log(res.data)
  })
}

const getVentasClick = () => {
  getVentas()
}
  




  

  return (
    <StrictMode>
      {msj!=""?<Notificacion msj={msj} notificar={notificar}/>:null}
      <Cargando active={loading}/>
      {!loginActive?<Login loginRes={loginRes}/>:
        <>
        <Header 
        dolar={dolar} 
        peso={peso} 
        setMoneda={setMoneda}
        view={view}
        getPedidos={getPedidos}
        setViewCaja={setViewCaja}
        viewCaja={viewCaja}
        setShowModalMovimientos={setShowModalMovimientos}
        showModalMovimientos={showModalMovimientos}
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
                <div className="input-group-prepend">
                  <span className="input-group-text pointer" onClick={()=>{
                    let num = window.prompt("Número de resultados a mostrar")
                    if (num) {setNum(num)}
                  }}>Resultados({num})</span>
                </div>
                  <span className="input-group-text pointer" onClick={()=>setItemCero(!itemCero)}>En cero: {itemCero?"Sí":"No"}</span>
                <input type="text" 
                className="form-control" 
                ref={inputbusquedaProductosref}
                placeholder="Buscar... Presiona (ESC)" 
                onChange={onchangeinputmain}/>
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
          />:null}

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
          {view=="inventario"?<Inventario
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
          {view=="pagar"?<Pagar 
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

            crediSubview={crediSubview}
            setcrediSubview={setcrediSubview}
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
            
          />
          :null}
        </>
      }
    </StrictMode>
  );
}
render(<Facturar/>,document.getElementById('app'));

