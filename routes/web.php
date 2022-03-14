<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\InventarioController;
use App\Http\Controllers\PedidosController;
use App\Http\Controllers\MonedaController;
use App\Http\Controllers\ItemsPedidosController;
use App\Http\Controllers\ClientesController;
use App\Http\Controllers\MovimientosCajaController;

use App\Http\Controllers\PagoPedidosController;
use App\Http\Controllers\MovimientosController;
use App\Http\Controllers\ProveedoresController;
use App\Http\Controllers\CategoriasController;


use App\Http\Controllers\MarcasController;
use App\Http\Controllers\DepositosController;
use App\Http\Controllers\FacturaController;
use App\Http\Controllers\ItemsFacturaController;
use App\Http\Controllers\SucursalController;
use App\Http\Controllers\tickera;
use App\Http\Controllers\sendCentral;
use App\Http\Controllers\UsuariosController;
use App\Http\Controllers\LotesController;



Route::get('error', function (){
	return view("layouts.error");
})->name("error");

Route::get('', [HomeController::class,"index"]);
Route::post('login', [HomeController::class,"login"]);
Route::get('logout', [HomeController::class,"logout"]);
Route::post('verificarLogin', [HomeController::class,"verificarLogin"]);

Route::get('sucursal', [SucursalController::class,"index"]);
Route::get('setSucursal', [SucursalController::class,"setSucursal"])->name("setSucursal");
Route::get('getSucursal', [SucursalController::class,"getSucursal"]);

Route::group(['middleware' => ['login']], function () {
	


	Route::group(['middleware' => ['caja']], function () {
		Route::post('getPedidos', [PedidosController::class,"getPedidos"]);
		
		Route::get('notaentregapedido', [PedidosController::class,"notaentregapedido"]);
		
		Route::post('setDescuentoUnitario', [ItemsPedidosController::class,"setDescuentoUnitario"]);
		Route::post('setDescuentoTotal', [ItemsPedidosController::class,"setDescuentoTotal"]);
	
		Route::post('getpersona', [ClientesController::class,"getpersona"]);
		
		Route::post('setPagoPedido', [PagoPedidosController::class,"setPagoPedido"]);
		
		Route::post('setMoneda', [MonedaController::class,"setMoneda"]);
		
		Route::post('setPagoCredito', [PagoPedidosController::class,"setPagoCredito"]);
		
		Route::post('getDeudores', [PagoPedidosController::class,"getDeudores"]);
		Route::post('getDeudor', [PagoPedidosController::class,"getDeudor"]);
		
		Route::post('entregarVuelto', [PagoPedidosController::class,"entregarVuelto"]);
		
		Route::post('getMovimientosCaja', [MovimientosCajaController::class,"getMovimientosCaja"]);
		Route::post('setMovimientoCaja', [MovimientosCajaController::class,"setMovimientoCaja"]);
		
		Route::post('getMovimientos', [MovimientosController::class,"getMovimientos"]);
		Route::post('getBuscarDevolucion', [InventarioController::class,"index"]);
		Route::post('setDevolucion', [MovimientosController::class,"setDevolucion"]);
		
		Route::post('setClienteCrud', [ClientesController::class,"setClienteCrud"]);
		Route::post('getClienteCrud', [ClientesController::class,"getpersona"]);
		Route::post('delCliente', [ClientesController::class,"delCliente"]);
		Route::get('sumpedidos', [PedidosController::class,"sumpedidos"]);
		
		Route::post('imprimirTicked', [tickera::class,"imprimir"]);
		Route::get('getProductosSerial', [InventarioController::class,"getProductosSerial"]);

		Route::post('guardarCierre', [PedidosController::class,"guardarCierre"]);
		Route::get('verCierre', [PedidosController::class,"verCierre"]);
		Route::post('cerrar', [PedidosController::class,"cerrar"]);
		Route::get('getCierres', [PedidosController::class,"getCierres"]);

		
	});
	Route::group(['middleware' => ['vendedor']], function () {
		Route::post('getinventario', [InventarioController::class,"index"]);
		Route::post('setCarrito', [InventarioController::class,"setCarrito"]);
		Route::post('getPedidosList', [PedidosController::class,"getPedidosUser"]);
	});
	
	Route::group(['middleware' => ['admin']], function () {
		Route::post('getVentas', [PedidosController::class,"getVentas"]);
		
		
		
		Route::post('setProveedor', [ProveedoresController::class,"setProveedor"]);
		Route::post('guardarNuevoProducto', [InventarioController::class,"guardarNuevoProducto"]);
		Route::post('guardarNuevoProductoLote', [InventarioController::class,"guardarNuevoProductoLote"]);
		
		Route::post('getProveedores', [ProveedoresController::class,"getProveedores"]);
		Route::get('getCategorias', [CategoriasController::class,"getCategorias"]);

	
		Route::post('delProveedor', [ProveedoresController::class,"delProveedor"]);
		Route::post('delProducto', [InventarioController::class,"delProducto"]);
	
		Route::post('getDepositos', [DepositosController::class,"getDepositos"]);
		Route::post('getMarcas', [MarcasController::class,"getMarcas"]);
		
		Route::post('getFacturas', [FacturaController::class,"getFacturas"]);
		Route::post('setFactura', [FacturaController::class,"setFactura"]);
		Route::post('delFactura', [FacturaController::class,"delFactura"]);
	
		Route::post('delItemFact', [ItemsFacturaController::class,"delItemFact"]);
		
		Route::post('getFallas', [InventarioController::class,"getFallas"]);
		Route::post('setFalla', [InventarioController::class,"setFalla"]);
		Route::post('delFalla', [InventarioController::class,"delFalla"]);
		
		Route::post('removeLote', [LotesController::class,"removeLote"]);
		
		Route::get('verFactura', [FacturaController::class,"verFactura"]);
		Route::post('setUsuario', [UsuariosController::class,"setUsuario"]);
		Route::post('delUsuario', [UsuariosController::class,"delUsuario"]);
		Route::get('getUsuarios', [UsuariosController::class,"getUsuarios"]);
		Route::get('verCreditos', [PagoPedidosController::class,"verCreditos"]);
		Route::get('reporteInventario', [InventarioController::class,"reporteInventario"]);
		Route::post('getEstaInventario', [InventarioController::class,"getEstaInventario"]);

		Route::post('saveMontoFactura', [FacturaController::class,"saveMontoFactura"]);


	});


	Route::post('getMoneda', [MonedaController::class,"getMoneda"]);
	Route::post('today', [PedidosController::class,"today"]);
	
	Route::post('getPedido', [PedidosController::class,"getPedido"]);
	Route::post('getPedidosFast', [PedidosController::class,"getPedidosFast"]);
	Route::post('delItemPedido', [ItemsPedidosController::class,"delItemPedido"]);
	Route::post('delpedido', [PedidosController::class,"delpedido"]);
	Route::post('setCantidad', [ItemsPedidosController::class,"setCantidad"]);
	Route::post('setpersonacarrito', [PedidosController::class,"setpersonacarrito"]);

	Route::post('delMovCaja', [MovimientosCajaController::class,"delMovCaja"]);
	Route::post('delMov', [MovimientosController::class,"delMov"]);
	
	
	
	
	
	
	
	//Update App
	Route::get('update', [sendCentral::class,"updateApp"]);
	
	
	//Central
		Route::post('checkPedidosCentral', [InventarioController::class,"checkPedidosCentral"]);
		
		Route::get('setVentas', [sendCentral::class,"setVentas"]);
		Route::get('setGastos', [sendCentral::class,"setGastos"]);
		Route::get('setCentralData', [sendCentral::class,"setCentralData"]);
		Route::get('central', [sendCentral::class,"index"]);
		Route::get('getMonedaCentral', [sendCentral::class,"getMonedaCentral"]);
		Route::post('getPedidosCentral', [sendCentral::class,"getPedidosCentral"]);
		Route::get('setFacturasCentral', [sendCentral::class,"setFacturasCentral"]);
	
});

	
	
	










// }


