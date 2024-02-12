


export default function TableAkses(props){
    const {datas,user} = props
    return(
        <table>
            {console.log("datatabel "+datas)}
            <thead>
                <tr>
                    {user?.map(dataUser=>(
                        <th key={dataUser.id}>{dataUser.nama}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {datas.actions?.map(data=>{
                    <tr key={data.id}>
                        <td>{data.nama}</td>
                        <td>{data.access.petani}</td>
                        <td>{data.access.penyuluh}</td>
                        <td>{data.access.oprPoktan}</td>
                        <td>{data.access.adm}</td>
                        <td>{data.access.sAdm}</td>
                    </tr>
                })}
            </tbody>
        </table>
    )
}