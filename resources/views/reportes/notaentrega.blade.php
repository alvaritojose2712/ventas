<!doctype html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <meta name="csrf-token" content="{{ csrf_token() }}">

    <link rel="icon" type="image/png" href="{{ asset('images/favicon.ico') }}">
    <title>Reporte</title>

    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
   
</head>
<body>
    <section class="container-fluid">
			<table class="table">
				<thead>
					<tr class="text-center">
						<td colspan="6">
							<img src="{{ asset('images/logo.png') }}" width="200px">
						</td>
					</tr>
				</thead>
				<tbody>
					<tr class="text-center">
						<td colspan="2">
							<h6>OMAR EL HENAOUI SALAH</h6>
							<h5>COMERCIALIZADORA Y DISTRIBUIDORA</h5>
							<h5>EL ARABITO 222, F.P.</h5>
						</td>
						<td colspan="4">
							<b>RIF. V-21628222-8</b>
							<hr>
							<span>
								Domicilio Fiscal: {{ env('DIRECCION_REGISTRO') }}
							</span>
						</td>
					</tr>
					<tr>
						<th colspan="2" class=""><h5>SUCURSAL</h5> {{env("SUCURSAL_DIRECCION")}}</th>
						<th colspan="4" class="text-right"><h5>Fecha y hora de emisión</h5> {{$pedido->created_at}}</th>
					</tr>
					<tr>
						<th colspan="2" class="">NOTA ENTREGA</th>
						<th colspan="4" class="text-right text-danger"><h5>N° {{sprintf("%08d", $pedido->id)}}</h5></th>
					</tr>
					<tr>
						<th colspan="" class="text-right">Nombre y Apellido o Razón Social del Comprador</th>
						<td colspan="" class="text-left">{{ $pedido->cliente->nombre }}</td>
						<th colspan="" class="text-right">N° de RIF./CED N° o Pasaporte N°</th>
						<td colspan="3" class="text-left">{{ $pedido->cliente->identificacion }}</td>
					</tr>
					<tr>
						<th colspan="" class="text-right">Domicilio Fiscal</th>
						<td colspan="" class="text-left">{{ $pedido->cliente->direccion }}</td>
						<th colspan="" class="text-right">Método de Pago</th>
						<td colspan="3" class="text-left"></td>
					</tr>

					<tr class="tr-secondary">
						<th>
							Código
						</th>
						<th>
							Descripción
						</th>
						<th>
							Cantidad
						</th>
						<th>
							P/U
						</th>
						<th>
							Descuento
						</th>
						<th class="text-right">
							Monto
						</th>
					</tr>
					@foreach ($pedido->items as $val)
						<tr class="tr-secondary">
							<td>
								{{$val->producto->codigo_proveedor}}
							</td>
							<td>
								{{$val->producto->descripcion}}
							</td>
							<td>
								{{$val->cantidad}}
							</td>
							<td>
								{{$val->producto->precio}}
							</td>
							<td>
								{{$val->total_des}} ({{$val->descuento}}%)
							</td>
							<td class="text-right">
								{{$val->total}}
							</td>
						</tr>
					@endforeach

					<tr>
						<td class="text-right" colspan="5">Sub-total</td>
						<th class="text-right" colspan="">{{$pedido->subtotal}}</th>
					</tr>
					<tr>
						<td class="text-right" colspan="5">Descuento ({{$pedido->total_porciento}}%)</td>
						<th class="text-right" colspan="">{{$pedido->total_des}}</th>
					</tr>
					<tr>
						<td class="text-right" colspan="5">Total:</td>
						<th class="text-right" colspan="">{{$pedido->total}}</th>
					</tr>
				</tbody>

			</table>
        
    </section> 
    
    
</body>
</html>
