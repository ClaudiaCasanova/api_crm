import { useState, useEffect } from 'react'
import Cliente from '../components/Cliente'


const Inicio = () => {

    const [clientes, setClientes] = useState([])

    useEffect(() => { //Para consultar una API una vez que el componente esté listo
        const obtenerClientesAPI = async () => {
            try {
                const url = 'http://localhost:4000/clientes'
                const respuesta = await fetch(url)
                const resultado = await respuesta.json()

                setClientes(resultado)

            } catch (error) {
                console.log(error)
            }
        }

        obtenerClientesAPI()
    }, [])


    const handleEliminar = async id => {
        const confirmar = confirm('¿Eliminar este cliente?')
        if (confirmar) {
            try {
                const url = `http://localhost:4000/clientes/${id}`;
                const respuesta = await fetch(url, {
                    method: 'DELETE'
                })
                await respuesta.json()

                const arrayClientes = clientes.filter(cliente => cliente.id !== id) //Filtra por todos los clientes excepto el que he eliminado
                setClientes(arrayClientes)

            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <>
            <h1 className='font-black text-4xl text-gray-900'>Clientes</h1>
            <p className='mt-3'>Administra tus clientes</p>

            <table className='w-full mt-5 table-auto shadow bg-white rounded-md'>
                <thead className='uppercase border-b border-gray-200 text-left'>
                    <tr>
                        <th className='p-2'>Nombre</th>
                        <th className='p-2'>Contacto</th>
                        <th className='p-2'>Empresa</th>
                        <th className='p-2'>Email</th>
                        <th className='p-2'>Teléfono</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map(cliente => (
                        <Cliente
                            key={cliente.id}
                            cliente={cliente}
                            handleEliminar={handleEliminar}
                        />
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Inicio