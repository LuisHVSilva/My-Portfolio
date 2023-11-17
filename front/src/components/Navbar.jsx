//Dependecys
import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'


const Navbar = () => {
    const location = useLocation();
    const path = location.pathname;
    const links = document.querySelectorAll(".nav-link")
    const { pathname } = window.location;

    useEffect(() => {
        for (const link of links) {
            link.classList.remove("link-active")
            if (link.id === path) {
                link.classList.add("link-active")
            }
        }

    }, [location.pathname, links])


    return (
        <nav>
            <ul>
                <li className="about-link">
                    <Link to="/" className="nav-link" id="/">Sobre</Link>
                </li>
                <li className="project-link">
                    <Link to="/projects" className="nav-link" id="/projects">Projetos</Link>
                </li>
                <li className="blog-link">
                    <Link to="/blog" className="nav-link" id="/blog">Blog</Link>
                </li>
                <li className="github-link">
                    <a href="https://github.com/LuisHVSilva" className="nav-link" id="github">GitHub <i className="fa-solid fa-arrow-up-right-from-square"></i></a>
                </li>
            </ul>
            {pathname == '/blog' &&
                <div className="search">
                    <input type="search" autoComplete="off" required />
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-20 -20 1000 150">
                        <path className="path" fill="none"
                            d="M924.4 85.2c-19.5 19.5-50.8 19.7-70.3 0-19.3-19.4-19.3-51 .3-70.6 19.5-19.5 51-19.4 70.6 0 19.3 19.7 19.3 50.8-.5 70.6l35.4 35.3H0" />
                    </svg>
                </div>
            }
        </nav>
    )
}

export default Navbar