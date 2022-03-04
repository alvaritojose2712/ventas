export default function InventarioForzado({
    setporcenganancia,
    productosInventario,
    qBuscarInventario,
    setQBuscarInventario,
    type,

    changeInventario,

    Invnum,
    setInvnum,
    InvorderColumn,
    setInvorderColumn,
    InvorderBy,
    setInvorderBy,
    inputBuscarInventario, 
    guardarNuevoProductoLote,

    proveedoresList,
    number,
    refsInpInvList,
    categorias,
}){
    return (
        <div className="container-fluid">
            <div className="input-group">
                <input type="text" ref={inputBuscarInventario} className="form-control" placeholder="Buscar...(esc)" onChange={e => setQBuscarInventario(e.target.value)} value={qBuscarInventario} />

                <select value={Invnum} onChange={e => setInvnum(e.target.value)}>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="500">500</option>
                    <option value="2000">2000</option>
                </select>
                <select value={InvorderBy} onChange={e => setInvorderBy(e.target.value)}>
                    <option value="asc">Asc</option>
                    <option value="desc">Desc</option>
                </select>
                <button className="btn btn-success text-light" onClick={guardarNuevoProductoLote}><i className="fa fa-send"></i> (f1)</button>
            </div>
            
            <form ref={refsInpInvList} onSubmit={e=>e.preventDefault()}>
                <table className="table">
                    <thead>
                        <tr>
                            <th className="pointer" onClick={() => setInvorderColumn("id")}>ID</th>
                            <th className="pointer" onClick={() => setInvorderColumn("codigo_proveedor")}>C. Alterno</th>
                            <th className="pointer" onClick={() => setInvorderColumn("codigo_barras")}>C. Barras</th>
                            <th className="pointer" onClick={() => setInvorderColumn("unidad")}>Unidad</th>
                            <th className="pointer" onClick={() => setInvorderColumn("descripcion")}>Descripción</th>
                            <th className="pointer" onClick={() => setInvorderColumn("cantidad")}>Ct.</th>
                            <th className="pointer" onClick={() => setInvorderColumn("precio_base")}>Base</th>
                            <th className="pointer" onClick={() => setInvorderColumn("precio")}>Venta</th>
                            <th className="pointer" onClick={() => setInvorderColumn("id_categoria")}>Categoría</th>
                            <th className="pointer" onClick={() => setInvorderColumn("id_proveedor")}>Preveedor</th>
                            <th className="pointer" onClick={() => setInvorderColumn("iva")}>IVA</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productosInventario.length?productosInventario.map((e,i)=>
                            <tr key={i} className="pointer" onDoubleClick={() => changeInventario(null, i, e.id, "update")}>
                                <td>
                                    {e.id}
                                </td>
                                {type(e.type)?
                                <>
                                    <td>{e.codigo_proveedor}</td>
                                    <td>{e.codigo_barras}</td>
                                    <td>{e.unidad}</td>
                                    <td>{e.descripcion}</td>
                                    <th>{e.cantidad}</th>
                                    <td>{e.precio_base}</td>
                                    <td>{e.precio}</td>
                                    <td>{e.id_categoria}</td>
                                    <td>{e.id_proveedor}</td>
                                    <td>{e.iva}</td>
                                </>

                                :
                                <>
                                    <td>
                                        <input type="text"
                                            disabled={type(e.type)} className="form-control form-control-sm"
                                            value={e.codigo_proveedor}
                                            onChange={e => changeInventario((e.target.value), i, e.id, "changeInput", "codigo_proveedor")}
                                            placeholder="codigo_proveedor..." />

                                    </td>
                                    <td>
                                        <input type="text"
                                            disabled={type(e.type)} className="form-control form-control-sm"
                                            value={e.codigo_barras}
                                            onChange={e => changeInventario((e.target.value), i, e.id, "changeInput", "codigo_barras")}
                                            placeholder="codigo_barras..." />

                                    </td>
                                    <td>
                                        <select
                                            disabled={type(e.type)}
                                            className="form-control form-control-sm"
                                            value={e.unidad}
                                            onChange={e => changeInventario((e.target.value), i, e.id, "changeInput", "unidad")}
                                        >
                                            <option value="">--Select--</option>
                                            <option value="UND">UND</option>
                                            <option value="PAR">PAR</option>
                                            <option value="JUEGO">JUEGO</option>
                                            <option value="PQT">PQT</option>
                                            <option value="MTR">MTR</option>
                                            <option value="KG">KG</option>
                                            <option value="GRS">GRS</option>
                                            <option value="LTR">LTR</option>
                                            <option value="ML">ML</option>
                                        </select>
                                    </td>
                                    <td>
                                        <input type="text"
                                            disabled={type(e.type)} className="form-control form-control-sm"
                                            value={e.descripcion}
                                            onChange={e => changeInventario((e.target.value), i, e.id, "changeInput", "descripcion")}
                                            placeholder="descripcion..." />

                                    </td>
                                    <td>
                                        <input type="text"
                                            disabled={type(e.type)} className="form-control form-control-sm"
                                            value={e.cantidad}
                                            onChange={e => changeInventario(number(e.target.value), i, e.id, "changeInput", "cantidad")}
                                            placeholder="cantidad..." />

                                    </td>
                                    <td>
                                        <input type="text"
                                            disabled={type(e.type)} className="form-control form-control-sm"
                                            value={e.precio_base}
                                            onChange={e => changeInventario(number(e.target.value), i, e.id, "changeInput", "precio_base")}
                                            placeholder="precio_base..." />

                                    </td>
                                    <td>
                                        <div className="input-group">
                                            <span className="btn" onClick={()=>setporcenganancia("list",e.precio_base,(precio)=>{
                                                    changeInventario(precio, i, e.id, "changeInput", "precio")
                                                })}>%</span>
                                            <input type="text"
                                                disabled={type(e.type)} className="form-control form-control-sm"
                                                value={e.precio}
                                                onChange={e => changeInventario(number(e.target.value), i, e.id, "changeInput", "precio")}
                                                placeholder="Precio... % DoubeClick" />
                                        </div>

                                    </td>
                                    <td>
                                        <select
                                            disabled={type(e.type)} 
                                            className="form-control form-control-sm"
                                            value={e.id_categoria}
                                            onChange={e => changeInventario((e.target.value), i, e.id, "changeInput", "id_categoria")}
                                        >
                                            <option value="">--Select--</option>
                                            {categorias.map(e => <option value={e.id} key={e.id}>{e.descripcion}</option>)}
                                            
                                        </select>
                                    </td>
                                    <td>
                                        <select
                                            required={true}
                                            disabled={type(e.type)}
                                            className="form-control form-control-sm"
                                            value={e.id_proveedor}
                                            onChange={e => changeInventario((e.target.value), i, e.id, "changeInput", "id_proveedor")}
                                        >
                                            <option value="">--Select--</option>
                                            {proveedoresList.map(e => <option value={e.id} key={e.id}>{e.descripcion}</option>)}

                                        </select>
                                    </td>
                                    
                                    <td>
                                        <input type="text"
                                            disabled={type(e.type)} className="form-control form-control-sm"
                                            value={e.iva}
                                            onChange={e => changeInventario(number(e.target.value,2), i, e.id, "changeInput", "iva")}
                                            placeholder="iva..." />

                                    </td>
                                </>
                                }
                                    <td>
                                        <div className='d-flex justify-content-between'>
                                            {!e.type ?
                                                <>
                                                    <span className="btn-sm btn btn-danger" onClick={() => changeInventario(null, i, e.id, "delMode")}><i className="fa fa-trash"></i></span>
                                                    <span className="btn-sm btn btn-warning" onClick={() => changeInventario(null, i, e.id, "update")}><i className="fa fa-pencil"></i></span>
                                                </>
                                                : null}
                                            {e.type === "new" ?
                                                <span className="btn-sm btn btn-danger" onClick={() => changeInventario(null, i, e.id, "delNew")}><i className="fa fa-times"></i></span>
                                                : null}
                                            {e.type === "update" ?
                                                <span className="btn-sm btn btn-warning" onClick={() => changeInventario(null, i, e.id, "delModeUpdateDelete")}><i className="fa fa-times"></i></span>
                                                : null}
                                            {e.type === "delete" ?
                                                <span className="btn-sm btn btn-danger" onClick={() => changeInventario(null, i, e.id, "delModeUpdateDelete")}><i className="fa fa-arrow-left"></i></span>
                                                : null}
                                        </div>
                                    </td>
                                
                            </tr>
                        ):<tr>
                            <td>Sin resultados</td>
                        </tr>}
                    </tbody>
                </table>
            </form>
        </div>    
    )
}