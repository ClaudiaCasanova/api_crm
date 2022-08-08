import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Formulario from '../components/Formulario'

const EditarCliente = () => {
    const { id } = useParams()

    const [cliente, setCliente] = useState({})
    const [cargando, setCargando] = useState(true)

    useEffect(() => {
        const obtenerClienteAPI = async () => {
            try {
                const url = `${import.meta.env.VITE_API_URL}/${id}`;
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
        <>
            <h1 className='font-black text-4xl text-gray-800'>Editar Cliente</h1>
            <p className='mt-3'>Utiliza este formulario para editar los datos del cliente</p>

            {cliente?.nombre ? (
                <Formulario cliente={cliente} cargando={cargando} />
            ) : <p>Cliente ID no válido</p>}
        </>
    )
}

export default EditarCliente