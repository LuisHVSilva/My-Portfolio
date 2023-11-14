import React, { useEffect, useState } from 'react'
import { format, parseISO } from 'date-fns';

// Hooks
import useDatabaseInfo from '../hooks/useDatabaseInfo';

const Logs = () => {
    const [logs, setLogs] = useState([]);
    // Hooks
    const { getLogs } = useDatabaseInfo();

    // Effects
    useEffect(() => {
        const fetchData = async () => {
            const logs = await getLogs();
            setLogs(logs)
        };

        fetchData();
    }, []);
    
    return (
        <section id="logs">
            <table className='logs-table' border={1}>
                <tr>
                    <th>Modificação</th>
                    <th>Autor</th>
                    <th>Data</th>
                </tr>
                {logs.map((log, index) => (
                    <tr key={index}>
                        <td>{log.text}</td>
                        <td>{log.createdBy}</td>
                        <td>{format(parseISO(log.updatedAt), "HH:mm dd/MM/yyyy")}</td>
                    </tr>
                ))}
            </table>
        </section >
    )
}

export default Logs