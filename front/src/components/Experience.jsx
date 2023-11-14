import React, { useState } from 'react'

const experiences = {
    one: {
        id: "experience-one",
        company: "Tata Consultancy Service",
        position: "Estagiário | Treinee | Analista Junior",
        time: "2021 - ATUAL",
        description: [
            'Durante meu estágio na Tata Consultancy Services, concentrei-me no desenvolvimento técnico utilizando Java para sistemas robustos no back-end. Também aprofundei minha expertise no front-end, utilizando HTML, CSS3 e Javascript para criar interfaces intuitivas. Além disso, integrei eficazmente o MongoDB, um banco de dados NoSQL, para gerenciar grandes volumes de dados de forma eficiente.',
            'Na ACI Worldwide, como trainee e júnior, fui responsável pela criação de conectores bancários internacionais, aplicando um conhecimento especializado e profundo em Java. Essa experiência abrangeu desde a concepção e arquitetura até a implementação e otimização de soluções, assegurando a eficácia e confiabilidade dos conectores. Assumi também um papel consultivo, orientando a equipe em desafios técnicos e estratégias de desenvolvimento'
        ]
    },
    two: {
        id: "experience-two",
        company: "Della Foods",
        position: "Estagiário",
        time: "03/2021 - 11/2021",
        description: [
            'Durante meu período como estagiário na empresa Della Foods, setor alimentício, tive a oportunidade de atuar no setor de planejamento de projetos. ', 
            'Nesse contexto, minha contribuição foi focada na otimização de processos por meio da aplicação do sistema SAP. Utilizando a plataforma SAP, concentrei meus esforços na geração de relatórios estratégicos. Esses relatórios desempenharam um papel crucial no aprimoramento tanto da logística quanto na redução de gastos da empresa. Através da análise detalhada de dados e tendências, pude identificar áreas de melhoria e oportunidades de eficiência operacional. Ao fornecer informações precisas e acionáveis, contribuí para a tomada de decisões embasadas e para o desenvolvimento contínuo da Della Foods',
        ]
    },
    three: {
        id: "experience-three",
        company: "Freelancer",
        time: "ATUAL",
        position: "Free Job",
        description: [
            'Desde 2019, embarquei em uma jornada como freelancer, dedicando-me ao desenvolvimento de sites e softwares personalizados. Minha abordagem abraça a versatilidade de linguagens como Java e Python no back-end, combinadas com o poderoso framework React no front-end. Esta sinergia de tecnologias permite criar soluções robustas e inovadoras, adaptadas às necessidades específicas dos projetos em que me envolvo. Ao longo desse percurso, tenho tido o privilégio de colaborar com uma variedade de clientes, ampliando não apenas minhas habilidades técnicas, mas também a compreensão das nuances do desenvolvimento de software sob demanda. Este caminho autônomo tem sido uma fonte constante de aprendizado e satisfação, e estou entusiasmado para continuar a impulsionar a inovação e a excelência técnica em futuros empreendimentos.'

        ]
    },
}


function Experience() {

    const [description, setDescription] = useState(experiences.one.description)
    const [position, setPosition] = useState(experiences.one.position)
    const [time, setTime] = useState(experiences.one.time)

    const handleExperience = (id) => {
        for (let key in experiences) {
            var experienceObject = experiences[key]
            var removeClass = document.getElementById(experienceObject.id);
            removeClass.classList.remove('experience-choice-active')

            if (id === experienceObject.id) {
                var addClass = document.getElementById(experienceObject.id);
                addClass.classList.add('experience-choice-active')
                setDescription(experienceObject.description)
                setPosition(experienceObject.position)
                setTime(experienceObject.time)
            }

        }
    }

    const descriptionParagraphs = description.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
    ));

    return (
        <section id="experience">
            <p className="h1">Experiências</p>
            <div className="experience-container">
                <div className="experience-choices">
                    <p className="experience-choice-active mb-5" id="experience-one" onClick={() => handleExperience("experience-one")}>{experiences.one.company}</p>
                    <p className="mb-5" id="experience-two" onClick={() => handleExperience("experience-two")}>{experiences.two.company}</p>
                    <p id="experience-three" onClick={() => handleExperience("experience-three")}>{experiences.three.company}</p>
                </div>

                <div className="experience-text">
                    <div className="experience-text-title mb-5">
                        <p className="experinece-title">{position}</p>
                        <p className="experience-time">{time}</p>
                    </div>
                    <div className="experience-text-text">
                        {descriptionParagraphs}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Experience