import { useState, useEffect } from 'react';
import React from 'react';
import useAuth from '../hooks/useAuth';
import Table from 'react-bootstrap/Table';
import axios from '../api/axios';
const URL = '/api/user/movimientos';

function UsrTransactions() {

    const { auth } = useAuth();
    const [counter, setCounter] = useState(0);
    const token = auth?.accessToken;
    const [Movimientos, setMovimientos] = useState();

    const Format =(e)=>{
      const numericValue = parseFloat(e.toString().replace(/[^0-9.-]/g, ''));            
     return '$' + numericValue.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    

  useEffect(() => {
    if(counter===0)
    {
      const getMovimientos = async () => {
        try{
        axios.get(URL,{
            headers: { 'Content-Type': 'application/json',
                       'Authorization': 'Bearer '+token },
            withCredentials: true
        })
          .then(res => {
                 setMovimientos(res.data?.movimientos);   
          })      
        }
        catch(err)
        {
    
        }
    
    
      }
        getMovimientos();
        setCounter(counter+1);
    
    }
}, [counter,token])



  return (
    <Table size="sm" className="tables">
      <thead>
        <tr>
          <th>No</th>
          <th>Fecha</th>
          <th>Tipo</th>
          <th>Monto</th>
          
        </tr>
      </thead>
      <tbody>
{
    Movimientos?.length
    ? (
          Movimientos?.map((item, index) => {
           return (

                <tr key={index}>
                <td style={{color:'#5d5d5d'}}> {index + 1} </td>
                <td style={{color:'#5d5d5d'}}> {item.fecha.substring(0, 10)} </td>
                <td style={{color:'#5d5d5d'}}> {item.tipo} </td>
                <td style={{color:'#FF9D0A'}}> {Format(item.monto)} </td>
                
                </tr>
                    )
            })):<tr>
            <td> -- </td>
            <td> -- </td>
            <td> -- </td>
            <td> -- </td>
            </tr>
}  
      </tbody>
    </Table>
  );
}

export default UsrTransactions;