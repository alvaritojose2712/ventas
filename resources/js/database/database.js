import {useState} from 'react';
import axios from 'axios';

// import '../css/loading.css';




const host = ""
// const host = "http://localhost/arabitoapp"

const db = {
  // setCentralData: data=>axios.get(host+"setCentralData",{params:data}),
  getMoneda: ()=>axios.post(host+"getMoneda"),
  getinventario: data=>axios.post(host+"getinventario",data),
  setCarrito: data=>axios.post(host+"setCarrito",data),
  getPedido: data=>axios.post(host+"getPedido",data),
  getPedidosList: ()=>axios.post(host+"getPedidosList"),
  verificarLogin: ()=>axios.post(host+"verificarLogin"),
  guardarCierre: data=>axios.post(host+"guardarCierre",data),

  setMoneda: data=>axios.post(host+"setMoneda",data),
  delItemPedido: data=>axios.post(host+"delItemPedido",data),

  setDescuentoUnitario: data=>axios.post(host+"setDescuentoUnitario",data),
  setDescuentoTotal: data=>axios.post(host+"setDescuentoTotal",data),

  setCantidad: data=>axios.post(host+"setCantidad",data),
  
  getpersona: data=>axios.post(host+"getpersona",data),
  setpersonacarrito: data=>axios.post(host+"setpersonacarrito",data),

  setPagoPedido: data=>axios.post(host+"setPagoPedido",data),
  
  delpedido: data=>axios.post(host+"delpedido",data),

  getPedidos: data=>axios.post(host+"getPedidos",data),

  cerrar: data=>axios.post(host+"cerrar",data),

  today: data=>axios.post(host+"today",data),

  
  setPagoCredito: data=>axios.post(host+"setPagoCredito",data),

  getDeudores: data=>axios.post(host+"getDeudores",data),
  getDeudor: data=>axios.post(host+"getDeudor",data),
  
  entregarVuelto: data=>axios.post(host+"entregarVuelto",data),

  getMovimientosCaja: data=>axios.post(host+"getMovimientosCaja",data),

  setMovimientoCaja: data=>axios.post(host+"setMovimientoCaja",data),
  
  delMovCaja: data=>axios.post(host+"delMovCaja",data),

  getMovimientos: data=>axios.post(host+"getMovimientos",data),
  
  getBuscarDevolucion: data=>axios.post(host+"getBuscarDevolucion",data),

  setDevolucion: data=>axios.post(host+"setDevolucion",data),
  delMov: data=>axios.post(host+"delMov",data),

  
  setProveedor: data=>axios.post(host+"setProveedor",data),
  guardarNuevoProducto: data=>axios.post(host+"guardarNuevoProducto",data),
  getProveedores: data=>axios.post(host+"getProveedores",data),
  
  delProveedor: data=>axios.post(host+"delProveedor",data),
  delProducto: data=>axios.post(host+"delProducto",data),
  
  getMarcas: data=>axios.post(host+"getMarcas",data),
  getDepositos: data=>axios.post(host+"getDepositos",data),
  
  getFacturas: data=>axios.post(host+"getFacturas",data),
  setFactura: data=>axios.post(host+"setFactura",data),
  delFactura: data=>axios.post(host+"delFactura",data),

  delItemFact: data=>axios.post(host+"delItemFact",data),

  setClienteCrud: data=>axios.post(host+"setClienteCrud",data),
  getClienteCrud: data=>axios.post(host+"getClienteCrud",data),
  delCliente: data=>axios.post(host+"delCliente",data),

  getFallas: data=>axios.post(host+"getFallas",data),
  setFalla: data=>axios.post(host+"setFalla",data),
  delFalla: data=>axios.post(host+"delFalla",data),
  imprimirTicked: data=>axios.post(host+"imprimirTicked",data),
  sendCierre: data=>axios.get(host+"verCierre",{params:data}),


  getPedidosCentral: data=>axios.post(host+"getPedidosCentral",data),

  getSucursal: data=>axios.get(host+"getSucursal",{params:data}),

  getProductosSerial: data=>axios.get(host+"getProductosSerial",{params:data}),
  checkPedidosCentral: data=>axios.post(host+"checkPedidosCentral",data),
  



  
  
  

  // getProveedores: ()=>axios.post(host+"getProveedores.php"),
  // getusuarios: ()=>axios.post(host+"getusuarios.php"),
  // setPedidos: (data)=>{
  //   return axios.post(host+"setpedidos.php", data,)
  // },
  // setProducto: (data)=>{
  //   return axios.post(host+"setproducto.php", data,)
  // },
  // resolverPedido: (data)=>{
  //   return axios.post(host+"resolverPedido.php", data,)
  // },
  // setVerificarProducto: (data)=>{
  //   return axios.post(host+"setVerificarProducto.php", data,)
  // },
  // setDeletepedido: (data)=>{
  //   return axios.post(host+"setDeletepedido.php", data,)
  // },
  
  
  

}

export default db