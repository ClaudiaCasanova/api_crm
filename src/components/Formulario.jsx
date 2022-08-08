import React from 'react'
import { Formik, Form, Field } from 'formik'
import { Navigate, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import Alerta from './Alerta'
import Spinner from './Spinner'

const Formulario = ({ cliente, cargando }) => {

    const nav = useNavigate();

    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string()
            .min(3, 'El nombre es muy corto')
            .max(20, 'El nombre es muy largo')
            .required('El nombre del cliente es obligatorio'),
        empresa: Yup.string()
            .required('El nombre de la empresa es obligatorio'),
        email: Yup.string()
            .email('Email no válido')
            .required('El email es obligatorio'),
        telefono: Yup.number()
            .integer("El número no válido")
            .positive("El número no es válido")
            .typeError('El número no es válido'),
    })

    const handleSubmit = async (valores) => {
        try {
            let respuesta;

            if (cliente.id) { //Editar registro
                const url = `http://localhost:4000/clientes/${cliente.id}`

                respuesta = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            } else { //Nuevo registro
                const url = 'http://localhost:4000/clientes'

                respuesta = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }
            await respuesta.json()
            nav('/clientes')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        cargando ? <Spinner /> : (
            <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto' >
                <h1 className='text-gray-800 font-bold text-xl uppercase text-center'>{cliente?.nombre ? 'Editar cliente' : 'Agregar cliente'}</h1>

                <Formik initialValues={
                    {
                        nombre: cliente?.nombre ?? "", //Es igual que una ternaria, si no está cliente.nombre pone una cadena vacia
                        empresa: cliente?.empresa ?? "", //Se llama nullish coalescing operator -> ??
                        email: cliente?.email ?? "",
                        telefono: cliente?.telefono ?? "",
                        notas: cliente?.notas ?? ""
                    }}
                    enableReinitialize={true}
                    onSubmit={async (values, { resetForm }) => {
                        await handleSubmit(values)
                        resetForm()
                    }}
                    validationSchema={nuevoClienteSchema}
                >
                    {({ errors, touched }) => {
                        return (
                            <Form className='mt-10'>
                                <div className='mb-4'>
                                    <label className='text-gray-800 font-bold' htmlFor='nombre'>Nombre <span className='text-red-500'>*</span></label>
                                    <Field
                                        id="nombre"
                                        type="text"
                                        name="nombre"
                                        className="mt-2 block w-full p-3 border-solid border-2 border-gray-800 rounded-md"
                                        placeholder="Nombre del cliente"
                                    />
                                    {errors.nombre && touched.nombre ? (
                                        <Alerta>{errors.nombre}</Alerta>
                                    ) : null}
                                </div>
                                <div className='mb-4'>
                                    <label className='text-gray-800 font-bold' htmlFor='empresa'>Empresa <span className='text-red-500'>*</span></label>
                                    <Field
                                        id="empresa"
                                        type="text"
                                        name="empresa"
                                        className="mt-2 block w-full p-3 border-solid border-2 border-gray-800 rounded-md"
                                        placeholder="Empresa del cliente"
                                    />
                                    {errors.empresa && touched.empresa ? (
                                        <Alerta>{errors.empresa}</Alerta>
                                    ) : null}
                                </div>
                                <div className='mb-4'>
                                    <label className='text-gray-800 font-bold' htmlFor='email'>Email <span className='text-red-500'>*</span></label>
                                    <Field
                                        id="email"
                                        type="email"
                                        name="email"
                                        className="mt-2 block w-full p-3 border-solid border-2 border-gray-800 rounded-md"
                                        placeholder="Correo del cliente"
                                    />
                                    {errors.email && touched.email ? (
                                        <Alerta>{errors.email}</Alerta>
                                    ) : null}
                                </div>
                                <div className='mb-4'>
                                    <label className='text-gray-800 font-bold' htmlFor='telefono'>Telefono</label>
                                    <Field
                                        id="telefono"
                                        type="tel"
                                        name="telefono"
                                        className="mt-2 block w-full p-3 border-solid border-2 border-gray-800 rounded-md"
                                        placeholder="Telefono del cliente"
                                    />
                                    {errors.telefono && touched.telefono ? (
                                        <Alerta>{errors.telefono}</Alerta>
                                    ) : null}
                                </div>
                                <div className='mb-4'>
                                    <label className='text-gray-800 font-bold' htmlFor='notas'>Notas</label>
                                    <Field
                                        as="textarea"
                                        id="notas"
                                        name="notas"
                                        type="textarea"
                                        className="mt-2 block w-full p-3 border-solid border-2 h-40 border-gray-800 rounded-md"
                                        placeholder="Notas del cliente"
                                    />
                                </div>
                                <p><span className='text-red-500'>* </span>Campos obligatorios</p>
                                <div className='flex items-center justify-center'>
                                    <input type="submit" value="Guardar" className="mt-5 p-3 border-solid border-2 border-gray-800 rounded-md uppercase font-bold text-lg  hover:bg-gray-800 hover:text-white " name="" id="" />
                                </div>
                            </Form>
                        )
                    }}
                </Formik>
            </div>
        )
    )
}

Formulario.defaultProps = {
    cliente: {},
    cargando: false
}

export default Formulario