import React from 'react'

const About = () => {
    return (
        <section id="about">
            <p className="h1">Olá, seja bem vindo!</p>
            <div className="about-container">
                <div className="about-text">
                    <p className='greetings'>Sou o Luis Henrique, <span className='emphasis'>desenvolvedor Full Stack!</span></p>
                    <br />
                    <p>Formado em Engenharia Mecânica, pós graduando em Engenharia de Software e Desenvolvimento Web e hoje trilho meu caminho no universo da programação.</p>
                    <p>Minha introdução à programação ocorreu durante minha graduação em 2019, na disciplina de Cálculo Numérico, utilizando o <span className="italic">software</span> Matlab. Desde então, minha trajetória se transformou completamente.</p>
                    <p>Estou inserido no mercado de desenvolvimento de software desde 2019, onde começei como estagiário e percorri os estágios de trainee até alcançar a posição de Analista de Sistemas Júnior, com foco em back-end. Além disso, atuo como freelancer tanto em <span className="italic">front-end</span> quanto em <span className="italic">back-end</span> para o mercado nacional e internacional.</p>                    
                    <p>As habilidades em programação são fundamentais para o sucesso em minha carreira como desenvolvedor <span className="italic">Full Stack</span>. Possuo proficiência em Python e Java, o que me permite criar soluções robustas e escaláveis para diversos tipos de projetos. No front-end, sou especializado em React, proporcionando interfaces intuitivas e dinâmicas que aprimoram a experiência do usuário.</p>
                </div>
                <div className="about-photo">
                    <img src="/foto-minha.jpg" className="about-image mb-10" alt="Foto Luis Henirque" />
                    <div>
                        <ul className="icons">
                            <li>
                                <a href="https://github.com/LuisHVSilva" target='blank'><i className="fa-brands fa-github fa-2xl"></i></a>
                            </li>
                            <li>
                                <a href="https://www.linkedin.com/in/luishenriquevsilva/" target='blank'><i className="fa-brands fa-linkedin fa-2xl"></i></a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com/luisdevsoft/" target='blank'><i className="fa-brands fa-instagram fa-2xl"></i></a>
                            </li>
                            <li>
                                <a href="#"><i className="fa-brands fa-whatsapp fa-2xl"></i></a>
                            </li>
                            <li>
                                <a href="mailto:coderluissilva@gmail.com" target='blank'><i className="fa-regular fa-envelope fa-2xl"></i></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About