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



Route::post('/login', [HomeController::class,"login"]);
Route::get('/logout', [HomeController::class,"logout"]);
Route::post('/verificarLogin', [HomeController::class,"verificarLogin"]);
Route::get('/facturar', [HomeController::class,"index"]);

// if (session()->has("id_usuario")) {
	// code...
	Route::get('/getinventario', [InventarioController::class,"index"]);
	Route::get('/setCarrito', [InventarioController::class,"setCarrito"]);
	Route::get('/getPedidosList', [PedidosController::class,"getPedidosUser"]);
	Route::get('/getPedido', [PedidosController::class,"getPedido"]);
	Route::get('/getMoneda', [MonedaController::class,"getMoneda"]);
	Route::get('/setMoneda', [MonedaController::class,"setMoneda"]);
	Route::get('/delItemPedido', [ItemsPedidosController::class,"delItemPedido"]);
	Route::get('/setDescuentoUnitario', [ItemsPedidosController::class,"setDescuentoUnitario"]);


	Route::get('/setDescuentoTotal', [ItemsPedidosController::class,"setDescuentoTotal"]);

	
	Route::get('/setCantidad', [ItemsPedidosController::class,"setCantidad"]);

	Route::get('/getpersona', [ClientesController::class,"getpersona"]);
	Route::get('/setpersonacarrito', [PedidosController::class,"setpersonacarrito"]);

	Route::get('/notaentregapedido', [PedidosController::class,"notaentregapedido"]);

	Route::get('/setPagoPedido', [PagoPedidosController::class,"setPagoPedido"]);
	Route::get('/delpedido', [PedidosController::class,"delpedido"]);
	
	Route::get('/getPedidos', [PedidosController::class,"getPedidos"]);

	Route::get('/cerrar', [PedidosController::class,"cerrar"]);

	Route::get('/today', [PedidosController::class,"today"]);

	Route::post('/guardarCierre', [PedidosController::class,"guardarCierre"]);
	
	Route::get('/verCierre', [PedidosController::class,"verCierre"]);


	Route::get('/setPagoCredito', [PagoPedidosController::class,"setPagoCredito"]);

	Route::get('/getDeudores', [PagoPedidosController::class,"getDeudores"]);
	Route::get('/getDeudor', [PagoPedidosController::class,"getDeudor"]);

	Route::get('/entregarVuelto', [PagoPedidosController::class,"entregarVuelto"]);
	
	Route::get('/getMovimientosCaja', [MovimientosCajaController::class,"getMovimientosCaja"]);
	Route::get('/setMovimientoCaja', [MovimientosCajaController::class,"setMovimientoCaja"]);

	Route::get('/delMovCaja', [MovimientosCajaController::class,"delMovCaja"]);
	
	Route::get('/getMovimientos', [MovimientosController::class,"getMovimientos"]);
	Route::get('/getBuscarDevolucion', [InventarioController::class,"index"]);
	Route::get('/setDevolucion', [MovimientosController::class,"setDevolucion"]);
	Route::get('/delMov', [MovimientosController::class,"delMov"]);
	
	Route::get('/setProveedor', [ProveedoresController::class,"setProveedor"]);
	Route::get('/guardarNuevoProducto', [InventarioController::class,"guardarNuevoProducto"]);

	Route::get('/getProveedores', [ProveedoresController::class,"getProveedores"]);

	Route::get('/delProveedor', [ProveedoresController::class,"delProveedor"]);
	Route::get('/delProducto', [InventarioController::class,"delProducto"]);

	Route::get('/getDepositos', [DepositosController::class,"getDepositos"]);
	Route::get('/getMarcas', [MarcasController::class,"getMarcas"]);

	Route::get('/getFacturas', [FacturaController::class,"getFacturas"]);
	Route::get('/setFactura', [FacturaController::class,"setFactura"]);
	Route::get('/delFactura', [FacturaController::class,"delFactura"]);

	Route::get('/delItemFact', [ItemsFacturaController::class,"delItemFact"]);

	Route::get('/setClienteCrud', [ClientesController::class,"setClienteCrud"]);
	Route::get('/getClienteCrud', [ClientesController::class,"getpersona"]);
	Route::get('/delCliente', [ClientesController::class,"delCliente"]);
	Route::get('/sumpedidos', [PedidosController::class,"sumpedidos"]);







// }

Route::group(['middleware' => ['admin']], function () {});

