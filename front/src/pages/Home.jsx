import React from 'react'

//Components
import About from '../components/About'
import Experience from '../components/Experience'
import Skills from '../components/Skills'

const Home = () => {  
  return (
    <>
      <main id='l-main'>
        <About />
        <Experience />
        <Skills />        
      </main>
    </>
  )
}

export default Home