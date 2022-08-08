import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'

const VerCliente = () => {
    const { id } = useParams()

    const [cliente, setCliente] = useState({})
    const [cargando, setCargando] = useState(true)

    useEffect(() => {
        const obtenerClienteAPI = async () => {
            try {
                const url = `http://localhost:4000/clientes/${id}`;
                const respuesta = await fetch(url);
                const resultado = await respuesta.json()
                setCliente(resultado);
            } catch (error) {
                console.log(error)
            }
            setTimeout(() => {
                setCargando(!cargando)  //Añade el valor contrario al del state
            }, 3000);
        }

        obtenerClienteAPI()
    }, [])

    return (
        cargando ? <Spinner /> : Object.keys(cliente).length === 0 ? <p>No hay resultados</p> : (
            <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
                <h1 className='font-black text-4xl text-gray-900'>Información de cliente</h1>
                <p className='text-2xl mt-10'>
                    {cliente.nombre}
                </p>
                <p className='mt-4'>
                    {cliente.email}
                </p>
                {cliente.telefono ? (
                    <p className='mt-4'>
                        {cliente.telefono}
                    </p>
                ) : <p className='mt-4'>Sin teléfono</p>}
                <p className='mt-4'>
                    {cliente.empresa}
                </p>
                {cliente.notas ? (
                    <p className='mt-4'>
                        {cliente.notas}
                    </p>
                ) : <p className='mt-4'>Sin notas</p>}
            </div>
        )
    )
}

export default VerCliente