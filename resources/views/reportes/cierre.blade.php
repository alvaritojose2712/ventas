<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Reporte de Cierre</title>
	<style type="text/css">

		body{
		}
		.long-text{
			width: 400px;
		}
		table, td, th {  
		  border: 1px solid #ddd;
		  text-align: center;
		}
		th{
			font-size:15px;
		}

		table {
		  border-collapse: collapse;
		  width: 70%;
		}

		th, td {
		  padding: 15px;
		}
		.right{
			text-align: right;
		}

		.left{
			text-align: left;
		}
		
		.margin-bottom{
			margin-bottom:5px;
		}
		.amarillo{
			background-color:#FFFF84;
		}
		.verde{
			background-color:#84FF8D;
		}
		.rojo{
			background-color:#FF8484;
		}
		.sin-borde{
			border:none;
		}
		.text-warning{
			background: yellow;
		}
		.text-success{
			background: green;
			color: white;
		}
		.text-success-only{
			color: green;
		}
		.fs-3{
			font-size: xx-large;
			font-weight: bold;
		}

		.table-dark{
			background-color: #f2f2f2;
		}
		.container{
			display: flex;
			justify-content: center;
		}
		h1{
			font-size:3em;
		}
		.d-flex div{
			display: inline-block;
		}
		.img{
			filter: sepia(100%);
		}
		.bold{
			font-weight: bold;
		}
		

	</style>
</head>
<body>
	<div class="container">
		<table class="table">
			<tbody>
				<tr>
					<td colspan="6">
						<h1>{{$sucursal->sucursal}}</h1>
					</td>
				</tr>
				<tr>
					<td>
						@if (isset($message))
							<img src="{{$message->embed('images/logo.png')}}" width="200px" class="img">
						@else
							<img src="{{asset('images/logo.png')}}" width="200px" class="img">
						@endif
						

						<h5>{{$sucursal->nombre_registro}}</h5>
						
						<b>RIF. {{$sucursal->rif}}</b>
						<hr>
						<span>
							Domicilio Fiscal: {{$sucursal->direccion_registro}}
						</span>

					</td>
					<td colspan="2">
						<h2>CAJA</h2>
						$ = <b>{{($cierre->dejar_dolar)}}</b>
						<br/>
						<br/>
						P = <b>{{($cierre->dejar_peso)}}</b>
						<br/>
						<br/>
						BSS = <b>{{($cierre->dejar_bss)}}</b>
					</td>
					<td>
						<h2>TASA</h2>
						{{($cierre->tasa)}}
					</td>
					<td>
						<h2>{{$cierre->fecha}}</h2>
						<h4>CAJERO: {{$cierre->id_usuario}}</h4>
					</td>
				</tr>
				<tr class="">
					<th class="right">
						VENTAS DEL DÍA
					</th>
					<td class=""><span class="text-success-only fs-3">{{($facturado["numventas"])}}</span></td>
					<th class="right">
						INVENTARIO
					</th>
					<td class="">{{(number_format($total_inventario,2,",","."))}}</td>
					<td>
						<b>VUELTOS TOTALES</b> <hr>
						{{($vueltos_totales)}}
					</td>
				</tr>
				<tr>
				
				<tr>
					<th>DÉBITO</th>
					<th>EFECTIVO</th>
					<th>TRANSFERENCIA</th>
					<th>CRÉDITO</th>
					<th>ENTREG / PEND</th>

				</tr>
				<tr>
					<td>{{($facturado[2])}}</td>
					<td>{{($facturado[3])}}</td>
					<td>{{($facturado[1])}}</td>
					<td>{{($facturado[4])}}</td>
					<td>{{($facturado["entregado"])}} - {{($facturado["pendiente"])}} = {{($facturado["entregadomenospend"])}}</td>
				</tr>
				<tr>
					<th colspan="3">
						<h3>TOTAL FACTURADO:</h3>
						<h1 class="text-success">{{($facturado[2]+$facturado[3]+$facturado[1])}}</h1>
					</th>
					<td colspan="1" class="text-left">

						<h3>EFECTIVO GUARDADO:</h3>
						<span class="">$: </span> 
						<span class="fs-5 bold">{{($cierre->efectivo_guardado)}}</span>
						<br>
						<span class="">COP: </span> 
						<span class="fs-5 bold">{{($cierre->efectivo_guardado_cop)}}</span>
						<br>
						<span class="">BS: </span> 
						<span class="fs-5 bold">{{($cierre->efectivo_guardado_bs)}}</span>
						<br>
					</td>
					<th class="right d-flex">
						<table>
							<tr>
								<td>
									BASE:
									<hr/>
									% Gan.
									<hr/>
									VENTA:
									<hr/>
									con DESC.
									<hr/>
									GANANCIA:
									
								</td>
								<td>
									{{($precio_base)}}
									<hr/>
									{{($porcentaje)}}
									<hr/>
									{{($precio)}}
									<hr/>
									{{($desc_total)}}
									<hr/>
									{{($ganancia)}}
									
								</td>
							</tr>
						</table>
						<div>
							
						</div>
						<div>
						</div>
					</th>
				</tr>

				
					<th class="right sin-borde">DÉBITO</th>
					<td class="sin-borde">{{($cierre->debito)}}</td>
					<td rowspan="4" colspan="3">
						<h2>
							NOTA
						</h2>
						{{ ($cierre->nota) }}
					</td>
					
				</tr>
				<tr>
					<th class="right sin-borde">EFECTIVO</th>
					<td class="sin-borde">{{($cierre->efectivo)}}</td>
					

				</tr>
				<tr>
					<th class="right sin-borde">TRANSFERENCIA</th>
					<td class="sin-borde">{{($cierre->transferencia)}}</td>
					

				</tr>
				<tr>
					<th class="right sin-borde">TOTAL REAL</th>
					<td class="sin-borde text-success"><h1>{{($cierre->debito+$cierre->efectivo+$cierre->transferencia)}}</h1></td>
					
					
				</tr>
				<tr>
					<th colspan="5">MOVIMIENTOS DE CAJA</th>
				
				</tr>
				<tr>
					<th colspan="2">ENTREGADO</th>
					<th colspan="3">PENDIENTE</th>
				</tr>
				@foreach($facturado["entre_pend_get"] as $fila)
				

					@if($fila["tipo"]==1)
						<tr>
							<td>{{$fila["monto"]}} <b></b></td>
							<th>{{$fila["descripcion"]}} <br>{{$fila["created_at"]}}</th>
							<th colspan='3'></th>
						</tr>
					@else
						<tr>
							<th></th>
							<th></th>
							<td>{{ $fila["monto"] }} <b></b></td>
							<th colspan='1'>{{ $fila["descripcion"] }}</th>
							<th>{{ $fila["created_at"] }}</th>
						</tr>
					@endif
				@endforeach

				@foreach($vueltos_des as $val)

					<tr>
						<th></th>
						<th></th>
						<td>{{ $val["monto"] }} <b></b></td>
						<th colspan='2'>Ped.{{ $val["id_pedido"] }} Cliente: {{$val->cliente->cliente->identificacion}}
							<br/>
							{{ $val["updated_at"] }}
						</th>
					</tr>
				@endforeach
				
			</tbody>
		</table>
		
	</div>
	
</body>
</html>