// React Modules
import React from 'react'
import { useContext } from 'react';
import { Link, Routes, Route } from 'react-router-dom'

// Components
import AdminDashboard from '../components/AdminDashboard';
import Logs from '../components/Logs';
import PreviewBlog from '../components/PreviewBlog';
import Login from '../components/Login';
import ActiveUser from '../components/ActiveUser';
import NotFound from '../../pages/NotFound';

// Register Components
import RegisterUser from '../components/RegisterUser';
import RegisterTag from '../components/RegisterTag';
import RegisterCategorys from '../components/RegisterCategorys';
import RegisterBlog from '../components/RegisterBlog';

// Edits Components
import EditUser from '../components/EditUser';
import EditTags from '../components/EditTags';
import EditCategory from '../components/EditCategory';
import EditBlog from '../components/EditBlog';

// Context
import { AuthContext } from '../context/AuthContext';

// Sensitive Data
import { ROUTES } from '../sensitiveData/config';

function Admin() {
  const { authenticated, logout } = useContext(AuthContext)

  let routes;
  if (authenticated) {
    routes = (
      <Routes>
        {/* Geral */}
        <Route path={'/'} element={<AdminDashboard />} />
        <Route path={ROUTES.LOG} element={<Logs />} />
        <Route path={ROUTES.PREVIEW} element={<PreviewBlog />} />

        {/* Register */}
        <Route path={ROUTES.USER} element={<RegisterUser />} />
        <Route path={ROUTES.TAG} element={<RegisterTag />} />
        <Route path={ROUTES.CATEGORY} element={<RegisterCategorys />} />
        <Route path={ROUTES.BLOG} element={<RegisterBlog />} />

        {/* Edit */}
        <Route path={`${ROUTES.USER}/edit/:id`} element={<EditUser />} />
        <Route path={`${ROUTES.TAG}/edit/`} element={<EditTags />} />
        <Route path={`${ROUTES.CATEGORY}/edit/`} element={<EditCategory />} />
        <Route path={`${ROUTES.BLOG}/edit/`} element={<EditBlog />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>        
        <Route path={'/'} element={<Login />} />;
        <Route path={ROUTES.USER} element={<RegisterUser />} />
        <Route path={`${ROUTES.USER}/${ROUTES.ACTIVE_USER}/:id/:username`} element={<ActiveUser />} />
        <Route path={'/*'} element={<NotFound />} />;
      </Routes>
    )
  };

  return (
    <>
      <main id="l-main">
        <section id="admin">
          {authenticated &&
            <div className="admin-top mb-5">
              <Link to={`/${ROUTES.ADMIN}`} className='h1'>Painel</Link>
              <p className='h1 logout' onClick={logout}>Sair</p>
            </div>
          }
          {routes}
        </section>
      </main>
    </>
  );
};

export default Admin;