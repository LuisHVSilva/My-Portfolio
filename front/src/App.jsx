// Dependencys
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Sensitive data
import { URL } from './admin/sensitiveData/config'

// Styles 
import './sass/main.sass'

// Pages
import Home from './pages/Home'
import Projects from './pages/Projects'
import Blog from './pages/Blog'
import NotFound from './pages/NotFound'
import Post from './pages/Post'

import Admin from './admin/pages/Admin'

// Components
import Navbar from './components/Navbar'

// Context
import { AuthProvider } from './admin/context/AuthContext'

function App() {

  return (
    <>
      <header id="l-header">
        <div className="header-apresentation">
          <img src="/svg/pc-header.svg" alt="Pc Icon" />
          <h3>Luis Henrique de Vasconcelos Silva</h3>
        </div>
      </header>

      <BrowserRouter>
        <Navbar />
        <AuthProvider>

          <Routes>
            {/* Public URLS */}
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<Post />} />

            {/* Admin URL */}
            <Route path={`/${URL.ADMIN}/*`} element={
              <AuthProvider>
                <Admin />
              </AuthProvider>
            } />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>

        </AuthProvider>
      </BrowserRouter>

      <footer id="l-footer">
        <p>Criado e desenvolvido por Luis Henrique</p>
        <a href="https://github.com/LuisHVSilva/Portifolio/" target='blank'>GitHub</a>
      </footer>
    </>
  )
}

export default App
