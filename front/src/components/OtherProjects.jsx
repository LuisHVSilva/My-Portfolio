import React from 'react'

const OtherProjects = () => {
    return (
        <section id="other-projects">
            <p class="h1 teste">Outros projetos</p>
            <div class="other-projects-container">
                <div class="other-projects-card">
                    <div className='other-project-card-top mb-5'>
                        <p>Freelancer</p>
                        <p>2022</p>
                    </div>
                    <p className='card-title mb-2'>Dayane Camillo</p>
                    <p className='card-subtitle mb-5'>Trabalho político de web. HTML5, CSS3 e JavaScript.</p>
                    <a href="https://dayanecamillo.com.br/" className="other-project-card-link">Visitar<i className="fa-solid fa-arrow-up-right-from-square"></i></a>
                </div>

                <div class="other-projects-card">
                    <div className='other-project-card-top mb-5'>
                        <p>Freelancer</p>
                        <p>2022</p>
                    </div>
                    <p className='card-title mb-2'>Smaragda</p>
                    <p className='card-subtitle mb-5'>Trabalho político de web. HTML5, CSS3 e JavaScript.</p>
                    <a href="https://smaragdadolitoral.com.br/" className="other-project-card-link">Visitar<i className="fa-solid fa-arrow-up-right-from-square"></i></a>
                </div>

                <div class="other-projects-card">
                    <div className='other-project-card-top mb-5'>
                        <p>Suporte Freelancer</p>
                        <p>2023</p>
                    </div>
                    <p className='card-title mb-2'>Femani Brands</p>
                    <p className='card-subtitle mb-5'>Trabalho loja virtual desenvolvido no Tray. </p>
                    <a href="https://www.femanibrands.com.br/" className="other-project-card-link">Visitar<i className="fa-solid fa-arrow-up-right-from-square"></i></a>
                </div>

                <div class="other-projects-card">
                    <div className='other-project-card-top mb-5'>
                        <p>Projeto</p>
                        <p>2022</p>
                    </div>
                    <p className='card-title mb-2'>Medidor Wifi</p>
                    <p className='card-subtitle mb-5'>Projeto pessoal em Java.</p>
                    <a href="https://github.com/LuisHVSilva/MedidorWifi" className="other-project-card-link">Código<i className="fa-brands fa-github"></i></a>
                </div>

                <div class="other-projects-card">
                    <div className='other-project-card-top mb-5'>
                        <p>Projeto pessoal</p>
                        <p>Andamento</p>
                    </div>
                    <p className='card-title mb-2'>JogoSom</p>
                    <p className='card-subtitle mb-5'>Jogo de notas musicais em Python para treinar ouvido. </p>
                    <a href="https://github.com/LuisHVSilva/JogoSom" className="other-project-card-link">Código<i className="fa-brands fa-github"></i></a>
                </div>

                <div class="other-projects-card">
                    <div className='other-project-card-top mb-5'>
                        <p>...</p>
                        <p>Andamento</p>
                    </div>
                    <p className='card-title mb-2'>Em breve</p>
                    <p className='card-subtitle mb-5'>Mais projetos em andamento. Em breve mais</p>
                    <a href="https://github.com/LuisHVSilva/JogoSom" className="other-project-card-link">Código<i className="fa-brands fa-github"></i></a>
                </div>
            </div>
        </section>
    )
}

export default OtherProjects