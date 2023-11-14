// Modules
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';

// Hooks
import useDatabaseInfo from '../hooks/useDatabaseInfo';
import useUser from '../hooks/useUser';

// Sensitive Datas
import { URL } from '../sensitiveData/config';

const AdminDashboard = () => {
  // Hooks
  const { getTables, getLogs, deleteVerifyToken } = useDatabaseInfo();

  // Context
  const { getAllUser, deleteUser } = useUser();

  // States
  const [allUsers, setAllUsers] = useState({});
  const [allTables, setAllTables] = useState([]);
  const [logs, setLogs] = useState([]);

  // Effects
  useEffect(() => {
    const fetchData = async () => {
      const users = await getAllUser();
      const tables = await getTables();
      const logs = await getLogs();
      setAllUsers(users);
      setAllTables(tables);
      setLogs(logs.slice(0, 8))
    };

    fetchData();
  }, []);

  /**
   * Get the list of users.
   * @param {Object} users - User Object.
   * @returns {JSX.Element} - React component representing the list of users.
   */
  const usersList = (users) => {
    return (
      <>
        {users.map((user, index) => (
          <div className='dashboard-item mb-2' key={index}>
            <p>{user.name}</p>
            <div className='dashboard-options'>
              <Link to={`${URL.USER}/edit/${user.id}`}><i className="fa-solid fa-pencil"></i> Editar</Link>
              <Link onClick={() => deleteUser(user.id)}><i className="fa-solid fa-x"></i> Excluir</Link>
            </div>
          </div>
        ))};
      </>
    )
  };

  /**
   * Get the list of tables in database.
   * @param {Object} tables - Databse table Object.
   * @returns {JSX.Element} - React component representing the list of database tables.
   */
  const tablesList = (tables) => {
    tables = tables.filter(elemento => elemento !== 'User');
    tables = tables.filter(item => !item.includes("_"));

    return (
      <>
        {tables.map((table, index) => (
          <div className='dashboard-item mb-2' key={index}>
            <p>{table}</p>
            <div className='dashboard-options'>
              <Link to={`${table}/edit/`}><i className="fa-solid fa-pencil"></i> Editar</Link>
              <Link to={`${table}/`}><i className="fa-solid fa-plus"></i> Adicionar</Link>
            </div>
          </div>
        ))};
      </>
    );
  };

  /**
   * Get the list of database logs.
   * @param {Object} logs - Databse Log Object.
   * @returns {JSX.Element} - React component representing the list of database logs.
   */
  const logsList = (logs) => {
    return (
      <>
        {logs.map((log, index) => (
          <div className='dashboard-item mb-2' key={index}>
            <p>{log.text}</p>
            <p className='updates-timestamp'>{format(parseISO(log.updatedAt), "HH:mm dd/MM/yyyy")} | {log.createdBy}</p>
          </div>
        ))};
      </>
    );
  }

  return (
    <>
      <section className='dashboard mb-5' >
        <section className='dashboard-section'>
          <p className="h1 mb-5">Usuários e Autorizações</p>
          {Object.keys(allUsers).length > 0 ? usersList(Object.values(allUsers)) : null}
          <Link to={URL.USER} className='add-user mt-5'>Adicionar usuário</Link>
        </section>

        <section className="dashboard-section table">
          <p className="h1 mb-5">Banco de dados</p>
          {Object.keys(allTables).length > 0 ? tablesList(Object.values(allTables)) : null}
          <div className='dashboard-item mb-2'>
            <p>Código de verificação de usuário</p>
            <div className='dashboard-options'>
              <button className='table-p-link' onClick={deleteVerifyToken}>Deletar</button>
            </div>
          </div>
        </section>

        <section className="dashboard-section database-log">
          <p className="h1 mb-5">Atualizações</p>
          {Object.keys(logs).length > 0 ? logsList(Object.values(logs)) : null}
          <Link to={URL.LOG} className='add-user mt-5'>Ver todos os logs</Link>
        </section>

      </section >
    </>
  );
};

export default AdminDashboard;