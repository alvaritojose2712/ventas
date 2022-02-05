<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Créditos</title>
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
		

	</style>
</head>
<body>
	<div class="container">
		<table class="table">
			<tbody>
				<tr>
					<td colspan="2">
						@if (isset($message))
							<img src="{{$message->embed('images/logo.png')}}" width="200px" class="img">
						@else
							<img src="{{asset('images/logo.png')}}" width="200px" class="img">
						@endif
						

						
                        
					</td>
                    <td>
                        <h5>{{$sucursal->nombre_registro}}</h5>
                        
                        <b>RIF. {{$sucursal->rif}}</b>
                        <br/>
						<span>
							Domicilio Fiscal: {{$sucursal->direccion_registro}}
						</span>
                    </td>
				</tr>
                <tr>
                    <td colSpan="3">
                        <h2>Créditos</h2>
                    </td>
                </tr>
                <tr>
                    <th>Nombres y Apellidos (Identificación)</th>
                    <th>Contacto</th>
                    <th>Balance</th>
                </tr>
                @foreach ($data as $e)
                    <tr>
                        <td>
                            {{$e->nombre}}
                            {{$e->apellido}}
                            ({{$e->identificacion}})
                        </td>
                        <td>{{$e->telefono}}</td>
                        <td>
                            {{$e->saldo}}

                        </td>
                    </tr>
                @endforeach
                <tr></tr>
			</tbody>
		</table>
		
	</div>
	
</body>
</html>