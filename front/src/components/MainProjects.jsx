import React from 'react'

const MainProjects = () => {
    return (
        <section id="main-projects">
            <p className="h1 teste">Principais projetos</p>
            <div className="main-projects-container">
                <div className="main-projects-item">
                    <a href="https://nassifsatoadv.web.app/"><img src="/Nassif&Sato.jpg" alt="Nassif&Sato site screenshot" className='mb-5' /></a>
                    <p className="card-title mb-2">Nassif & Sato Advogados <small>(Trabalho concluído)</small></p>
                    <p>Projeto Full Stack institucional desenvolvido para o cliente Nassif & Sato Advogados.</p>
                    <p>Front-end em HTML5, CSS3 e JavaScript.</p>
                    <p>Back-end em Javascript e deploy em Firebase.</p>
                    <p className='mb-5'>UX/UI feito por mim.</p>
                    <div className="project-icons">
                        <a href="https://github.com/LuisHVSilva/Nassif-Sato" target='blank'><i className="fa-brands fa-github fa-xl"></i></a>
                        <a href="https://nassifsatoadv.web.app/"><i className="fa-solid fa-arrow-up-right-from-square fa-xl"></i></a>
                    </div>
                </div>
                <div className="main-projects-item">
                    <a href="https://palazzo-watches-teste.web.app/"><img src="/PalazzoWatches.jpg" alt="PalazzoWatches site screenshot" className='mb-5' /></a>
                    <p className="card-title mb-2">Palazzo Watches <small>(Projeto em fase de testes)</small></p>
                    <p>Projeto Full Stack institucional desenvolvido para o cliente Palazzo Watches.</p>
                    <p>Front-end em HTML5, CSS3 e JavaScript.</p>
                    <p>Back-end em Javascript e deploy em Firebase.</p>
                    <p className='mb-5'>UX/UI feito por mim.</p>
                    <div className="project-icons">
                        <a href="https://github.com/LuisHVSilva/Palazzo-Watches" target='blank'><i className="fa-brands fa-github fa-xl"></i></a>
                        <a href="https://palazzo-watches-teste.web.app/"><i className="fa-solid fa-arrow-up-right-from-square fa-xl"></i></a>
                    </div>
                </div>

                <div className="main-projects-item">
                    <a href="https://github.com/LuisHVSilva/LivroBook"><img src="/LivroBook.jpg" alt="LivroBook site screenshot" className='mb-5' /></a>
                    <p className="card-title mb-2">LivroBook <small>(Projeto em desenvolvimento)</small></p>
                    <p>Projeto pessoal Full Stack em desenvolvimento com o intuito de biblioteca digital de livros.</p>
                    <p>Front-end em HTML5, CSS3 e JavaScript.</p>
                    <p>Back-end em Django e MySQL.</p>
                    <p className='mb-5'>UX/UI feito por mim.</p>
                    <div className="project-icons">
                        <a href="https://github.com/LuisHVSilva/LivroBook" target='blank'><i className="fa-brands fa-github fa-xl"></i></a>
                        <a href="#" className='display-none'><i className="fa-solid fa-arrow-up-right-from-square fa-xl"></i></a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MainProjects