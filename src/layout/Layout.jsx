import { Outlet, Link, useLocation } from 'react-router-dom'

const Layout = () => {
    const location = useLocation()
    const urlActual = location.pathname;

    return (
        <div className='md:flex md:min-h-screen'>
            <div className='md:w-1/4 bg-gray-800 px-5 py-10'>
                <h2 className='text-4xl font-black text-center text-white'>CRM - Clientes</h2>
                <nav className='mt-10'>
                    <Link
                        className={`${urlActual === '/clientes' ? 'border-b white`}' : 'border-none'}  text-white text-2xl block mt-2 hover:border-b`}
                        to="/clientes">Clientes</Link>
                    <Link
                        className={`${urlActual === '/clientes/nuevo' ? 'border-b white`}' : 'border-none'} text-white text-2xl block mt-2 hover:border-b`}
                        to="/clientes/nuevo">Nuevo Cliente</Link>
                </nav>
            </div>
            <div className='md:w-3/4 p-10 bg-slate-50 md:h-screen overflow-scroll'>
                <Outlet />
            </div>
        </div>
    )
}

export default Layout