export default function InventarioForzado({
    productosInventario,
    qBuscarInventario,
    setQBuscarInventario,
    inpInvbarras,
    setinpInvbarras,
    inpInvcantidad,
    setinpInvcantidad,
    inpInvalterno,
    setinpInvalterno,
    inpInvunidad,
    setinpInvunidad,
    inpInvcategoria,
    setinpInvcategoria,
    inpInvdescripcion,
    setinpInvdescripcion,
    inpInvbase,
    setinpInvbase,
    inpInvventa,
    setinpInvventa,
    inpInviva,
    setinpInviva,
}){
    return (
        <div className="container-fluid">
            <div className="form-group">
                <input type="text" className="form-control" onChange={e=>setQBuscarInventario(e.target.value)} value={qBuscarInventario} />
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Código alterno</th>
                        <th>Código de Barras</th>
                    </tr>
                </thead>
                <tbody>
                    {productosInventario.lenght?productosInventario.map(e=><tr key={e.id}>
                        <td>{e.id}</td>
                        <td>{e.codigo_proveedor}</td>
                        <td>{e.codigo_barras}</td>
                    </tr>):<tr>
                        
                    </tr>}
                </tbody>
            </table>
        </div>    
    )
}