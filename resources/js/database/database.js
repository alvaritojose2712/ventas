import {useState} from 'react';
import axios from 'axios';

// import '../css/loading.css';




const host = ""
// const host = "http://localhost/arabitoapp"

const db = {
  getinventario: data=>axios.get(host+"/getinventario",{params:data}),
  setCarrito: data=>axios.get(host+"/setCarrito",{params:data}),
  getPedido: data=>axios.get(host+"/getPedido",{params:data}),
  getPedidosList: ()=>axios.get(host+"/getPedidosList"),
  verificarLogin: ()=>axios.post(host+"/verificarLogin"),

  getMoneda: ()=>axios.get(host+"/getMoneda"),
  setMoneda: data=>axios.get(host+"/setMoneda",{params:data}),
  delItemPedido: data=>axios.get(host+"/delItemPedido",{params:data}),

  setDescuentoUnitario: data=>axios.get(host+"/setDescuentoUnitario",{params:data}),
  setDescuentoTotal: data=>axios.get(host+"/setDescuentoTotal",{params:data}),

  setCantidad: data=>axios.get(host+"/setCantidad",{params:data}),
  
  getpersona: data=>axios.get(host+"/getpersona",{params:data}),
  setpersonacarrito: data=>axios.get(host+"/setpersonacarrito",{params:data}),

  setPagoPedido: data=>axios.get(host+"/setPagoPedido",{params:data}),
  
  delpedido: data=>axios.get(host+"/delpedido",{params:data}),

  getPedidos: data=>axios.get(host+"/getPedidos",{params:data}),

  cerrar: data=>axios.get(host+"/cerrar",{params:data}),

  today: data=>axios.get(host+"/today",{params:data}),

  guardarCierre: data=>axios.post(host+"/guardarCierre",data),
  
  setPagoCredito: data=>axios.get(host+"/setPagoCredito",{params:data}),

  getDeudores: data=>axios.get(host+"/getDeudores",{params:data}),
  getDeudor: data=>axios.get(host+"/getDeudor",{params:data}),
  
  entregarVuelto: data=>axios.get(host+"/entregarVuelto",{params:data}),

  getMovimientosCaja: data=>axios.get(host+"/getMovimientosCaja",{params:data}),

  setMovimientoCaja: data=>axios.get(host+"/setMovimientoCaja",{params:data}),
  
  delMovCaja: data=>axios.get(host+"/delMovCaja",{params:data}),

  getMovimientos: data=>axios.get(host+"/getMovimientos",{params:data}),
  
  getBuscarDevolucion: data=>axios.get(host+"/getBuscarDevolucion",{params:data}),

  setDevolucion: data=>axios.get(host+"/setDevolucion",{params:data}),
  delMov: data=>axios.get(host+"/delMov",{params:data}),

  
  setProveedor: data=>axios.get(host+"/setProveedor",{params:data}),
  guardarNuevoProducto: data=>axios.get(host+"/guardarNuevoProducto",{params:data}),
  getProveedores: data=>axios.get(host+"/getProveedores",{params:data}),
  
  delProveedor: data=>axios.get(host+"/delProveedor",{params:data}),
  delProducto: data=>axios.get(host+"/delProducto",{params:data}),
  
  getMarcas: data=>axios.get(host+"/getMarcas",{params:data}),
  getDepositos: data=>axios.get(host+"/getDepositos",{params:data}),
  
  getFacturas: data=>axios.get(host+"/getFacturas",{params:data}),
  setFactura: data=>axios.get(host+"/setFactura",{params:data}),
  delFactura: data=>axios.get(host+"/delFactura",{params:data}),

  delItemFact: data=>axios.get(host+"/delItemFact",{params:data}),

  setClienteCrud: data=>axios.get(host+"/setClienteCrud",{params:data}),
  getClienteCrud: data=>axios.get(host+"/getClienteCrud",{params:data}),
  delCliente: data=>axios.get(host+"/delCliente",{params:data}),


  // getProveedores: ()=>axios.get(host+"/getProveedores.php"),
  // getusuarios: ()=>axios.get(host+"/getusuarios.php"),
  // setPedidos: (data)=>{
  //   return axios.post(host+"/setpedidos.php", data,)
  // },
  // setProducto: (data)=>{
  //   return axios.post(host+"/setproducto.php", data,)
  // },
  // resolverPedido: (data)=>{
  //   return axios.post(host+"/resolverPedido.php", data,)
  // },
  // setVerificarProducto: (data)=>{
  //   return axios.post(host+"/setVerificarProducto.php", data,)
  // },
  // setDeletepedido: (data)=>{
  //   return axios.post(host+"/setDeletepedido.php", data,)
  // },
  
  
  

}

export default db