import React from 'react'

const Alerta = ({ children }) => {
    return (
        <div className='text-right text-red-500 '>
            {children}
        </div>
    )
}

export default Alerta