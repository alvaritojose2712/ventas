export default function Usuarios({usuariosData,addNewUsuario,delUsuario,getUsuarios}) {
	return (
	<div className="container">
		<button className="btn btn-success" data-tipo="add" onClick={addNewUsuario}>Agregar Nuevo</button>
		<button className="btn btn-sinapsis" onClick={getUsuarios}><i className="fa fa-search"></i></button>

		<table className="table">
			<thead>
				<tr>
					<th>ID</th>
					<th>Nombres</th>
					<th>Usuario</th>
					<th>Role</th>
				</tr>
			</thead>
			<tbody>
				{usuariosData.map(e=>
				<tr key={e.id} className="pointer" data-tipo="update" data-id={e.id} onClick={addNewUsuario} >
					<td>{e.id}</td>
					<td>{e.nombre}</td>
					<td>{e.usuario}</td>
					<td>{e.tipo_usuario}</td>
					<td><i className="fa fa-times text-danger" data-id={e.id} onClick={delUsuario}></i></td>
				</tr>)}
			</tbody>
		</table>
	</div>
	)
}