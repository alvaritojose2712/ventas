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

use App\Http\Controllers\MarcasController;
use App\Http\Controllers\DepositosController;
use App\Http\Controllers\FacturaController;
use App\Http\Controllers\ItemsFacturaController;
use App\Http\Controllers\SucursalController;
use App\Http\Controllers\tickera;
use App\Http\Controllers\sendCentral;





/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/



Route::get('sucursal', [SucursalController::class,"index"]);
Route::get('setSucursal', [SucursalController::class,"setSucursal"])->name("setSucursal");
Route::get('getSucursal', [SucursalController::class,"getSucursal"]);



Route::get('', [HomeController::class,"index"]);
Route::post('login', [HomeController::class,"login"]);
Route::get('logout', [HomeController::class,"logout"]);
Route::post('verificarLogin', [HomeController::class,"verificarLogin"]);

// if (session()->has("id_usuario")) {
	// code...
	Route::get('notaentregapedido', [PedidosController::class,"notaentregapedido"]);
	Route::post('getinventario', [InventarioController::class,"index"]);
	Route::post('setCarrito', [InventarioController::class,"setCarrito"]);
	Route::post('getPedidosList', [PedidosController::class,"getPedidosUser"]);
	Route::post('getPedido', [PedidosController::class,"getPedido"]);
	Route::post('getMoneda', [MonedaController::class,"getMoneda"]);
	Route::post('setMoneda', [MonedaController::class,"setMoneda"]);
	Route::post('delItemPedido', [ItemsPedidosController::class,"delItemPedido"]);
	Route::post('setDescuentoUnitario', [ItemsPedidosController::class,"setDescuentoUnitario"]);


	Route::post('setDescuentoTotal', [ItemsPedidosController::class,"setDescuentoTotal"]);

	
	Route::post('setCantidad', [ItemsPedidosController::class,"setCantidad"]);

	Route::post('getpersona', [ClientesController::class,"getpersona"]);
	Route::post('setpersonacarrito', [PedidosController::class,"setpersonacarrito"]);

	Route::post('getVentas', [PedidosController::class,"getVentas"]);
	
	Route::post('setPagoPedido', [PagoPedidosController::class,"setPagoPedido"]);
	Route::post('delpedido', [PedidosController::class,"delpedido"]);
	
	Route::post('getPedidos', [PedidosController::class,"getPedidos"]);

	Route::post('cerrar', [PedidosController::class,"cerrar"]);

	Route::post('today', [PedidosController::class,"today"]);

	Route::post('guardarCierre', [PedidosController::class,"guardarCierre"]);
	
	Route::get('verCierre', [PedidosController::class,"verCierre"]);


	Route::post('setPagoCredito', [PagoPedidosController::class,"setPagoCredito"]);

	Route::post('getDeudores', [PagoPedidosController::class,"getDeudores"]);
	Route::post('getDeudor', [PagoPedidosController::class,"getDeudor"]);

	Route::post('entregarVuelto', [PagoPedidosController::class,"entregarVuelto"]);
	
	Route::post('getMovimientosCaja', [MovimientosCajaController::class,"getMovimientosCaja"]);
	Route::post('setMovimientoCaja', [MovimientosCajaController::class,"setMovimientoCaja"]);

	Route::post('delMovCaja', [MovimientosCajaController::class,"delMovCaja"]);
	
	Route::post('getMovimientos', [MovimientosController::class,"getMovimientos"]);
	Route::post('getBuscarDevolucion', [InventarioController::class,"index"]);
	Route::post('setDevolucion', [MovimientosController::class,"setDevolucion"]);
	Route::post('delMov', [MovimientosController::class,"delMov"]);
	
	Route::post('setProveedor', [ProveedoresController::class,"setProveedor"]);
	Route::post('guardarNuevoProducto', [InventarioController::class,"guardarNuevoProducto"]);

	Route::post('getProveedores', [ProveedoresController::class,"getProveedores"]);

	Route::post('delProveedor', [ProveedoresController::class,"delProveedor"]);
	Route::post('delProducto', [InventarioController::class,"delProducto"]);

	Route::post('getDepositos', [DepositosController::class,"getDepositos"]);
	Route::post('getMarcas', [MarcasController::class,"getMarcas"]);

	Route::post('getFacturas', [FacturaController::class,"getFacturas"]);
	Route::post('setFactura', [FacturaController::class,"setFactura"]);
	Route::post('delFactura', [FacturaController::class,"delFactura"]);

	Route::post('delItemFact', [ItemsFacturaController::class,"delItemFact"]);

	Route::post('setClienteCrud', [ClientesController::class,"setClienteCrud"]);
	Route::post('getClienteCrud', [ClientesController::class,"getpersona"]);
	Route::post('delCliente', [ClientesController::class,"delCliente"]);
	Route::get('sumpedidos', [PedidosController::class,"sumpedidos"]);

	Route::post('getFallas', [InventarioController::class,"getFallas"]);
	Route::post('setFalla', [InventarioController::class,"setFalla"]);
	Route::post('delFalla', [InventarioController::class,"delFalla"]);

	Route::post('imprimirTicked', [tickera::class,"imprimir"]);


	Route::get('getProductosSerial', [InventarioController::class,"getProductosSerial"]);
	Route::post('checkPedidosCentral', [InventarioController::class,"checkPedidosCentral"]);
	Route::get('verFactura', [FacturaController::class,"verFactura"]);



	
	//Update App
	Route::get('update', [sendCentral::class,"updateApp"]);


	//Central
	Route::get('setVentas', [sendCentral::class,"setVentas"]);
	Route::get('setGastos', [sendCentral::class,"setGastos"]);
	Route::get('setCentralData', [sendCentral::class,"setCentralData"]);
	Route::get('central', [sendCentral::class,"index"]);
	Route::get('getMonedaCentral', [sendCentral::class,"getMonedaCentral"]);
	Route::post('getPedidosCentral', [sendCentral::class,"getPedidosCentral"]);
	Route::get('setFacturasCentral', [sendCentral::class,"setFacturasCentral"]);
	
	










// }

Route::group(['middleware' => ['admin']], function () {});

