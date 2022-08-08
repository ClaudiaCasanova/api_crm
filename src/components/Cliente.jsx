import { useNavigate } from 'react-router-dom'

const Cliente = ({ cliente, handleEliminar }) => {
    const { nombre, empresa, email, telefono, notas, id } = cliente;

    const nav = useNavigate();

    return (
        <tr className='border-b hover:bg-gray-50 cursor-pointer'>
            <td className='p-3' onClick={() => nav(`/clientes/${id}`)} >{nombre}</td>
            <td className='p-3'>{telefono}</td>
            <td className='p-3'>{empresa}</td>
            <td className='p-3'>{email}</td>
            <td className='p-3'>
                <div className='flex flex-row'>
                    <button type="button"
                        onClick={() => nav(`/clientes/editar/${id}`)}
                        className='border-solid border-2 border-gray-800 rounded-md uppercase font-bold hover:bg-gray-800 hover:text-white block p-2 text-xs w-full'>
                        Editar
                    </button>
                    <button type="button"
                        onClick={() => handleEliminar(id)}
                        className='ml-2 border-solid border-2 border-red-500 text-red-500 rounded-md uppercase font-bold hover:bg-red-500 hover:text-white block w-full p-2 text-xs'>
                        Eliminar
                    </button>
                </div>
            </td>
        </tr >
    )
}

export default Cliente