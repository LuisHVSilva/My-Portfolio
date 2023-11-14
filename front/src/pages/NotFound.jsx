import React from 'react'

const NotFound = () => {
    return (
        <section id="not-found">
            <p className="not-found-title mb-5">404</p>
            <img src="/svg/404.svg" alt="Not Found Image" className='not-found-image mb-2' />
            <p className="not-found-subtitle h1">Página não encontrada</p>
        </section>
    )
}

export default NotFound