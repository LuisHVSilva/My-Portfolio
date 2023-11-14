import React from 'react'
import { useParams } from 'react-router-dom'

const DataBaseEdit = () => {
  const { databaseName } = useParams();


  return (
    <h1>{databaseName}</h1>   
  )
}

export default DataBaseEdit