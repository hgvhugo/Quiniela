import { useState, useEffect, useRef } from 'react';
import React from 'react';
import useAuth from '../hooks/useAuth';
import Table from 'react-bootstrap/Table';
import axios from '../api/axios';
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
const URL = '/api/usuarios/clientes';

function Listusers() {
    const errRef = useRef();
    const { auth } = useAuth();
    const token = auth?.accessToken;
    const [users, setUsers] = useState();
    const [show, setShow] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [btnaceptar, setBtnaceptar] = useState(false);
    const [refresdata, setRefreshData] = useState(true);
    const [deluserid, setDeluserId] = useState('');
    const [deluser, setDeluser] = useState('');

    const modalClose = () => setShow(false);
    const modalShow = () => setShow(true);

    const Format =(e)=>{
      const numericValue = parseFloat(e.toString().replace(/[^0-9.-]/g, ''));            
     return '$' + numericValue.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

    
  const EditUser =(e)=>{
    setRefreshData(true);
    }

    const DeleteUser =(e)=>{
        const idUser = e.currentTarget.value.split(',');
        setDeluser(idUser[0]);
        setDeluserId(idUser[1]);
        setErrMsg('¿Esta seguro que desea borrar el usuario '+idUser[1]+'?');  
        setBtnaceptar(true);
        modalShow();
    }

    const AceptDelete = ()=>{
      try{
           axios.delete('/api/brokers/'+deluserid,{
               headers: { 'Content-Type': 'application/json',
                          'Authorization': 'Bearer '+token },
               withCredentials: true
           })
             .then(res => {
                  })      
           }
           catch(err)
           {
               const ErrMsg = err?.response?.data?.message;
               setErrMsg(ErrMsg);
           }
           setBtnaceptar(false);
           setRefreshData(true);   
           setErrMsg('!Usuario '+deluser+' eliminado exitosamente¡');  
     }

  useEffect(() => {
    if(refresdata)
    {
        setRefreshData(false);
        const getUsers = async () => {
          try{
          axios.get(URL,{
              headers: { 'Content-Type': 'application/json',
                         'Authorization': 'Bearer '+token },
              withCredentials: true
          })
            .then(res => {
              setUsers(res.data);   
            })      
          }
          catch(err)
          {
      
          }
        };
         getUsers();
    }
}, [ refresdata,token])



  return (
    <>          <div id="lista" className='row'>  
    <div className='col-md-9 col-12'>  
    <Table size="sm">
      <thead>
        <tr>
          <th>No</th>
          <th>Usuario</th>
          <th>Fecha</th>
          <th>Plazo</th>
          <th>Monto</th>
          <th style={{textAlign:"center"}}>Acciones</th>

        </tr>
      </thead>
      <tbody>
        {users?.length
          ? (
            users?.map((item, index) => {
              return (

                <tr key={index}>
                  <td style={{ color: '#5d5d5d' }}> {index + 1} </td>
                  <td style={{ color: '#5d5d5d' }}> {item.username} </td>
                  <td style={{ color: '#5d5d5d' }}> {item.fechaCreacion.substring(0, 10)} </td>
                  <td style={{ color: '#5d5d5d' }}> {item.plazo?.nombre} </td>
                  <td style={{ color: '#FF9D0A' }}> {Format(item.monto)} </td>
                  <td style={{ color: '#0A84F4' }}> <div style={{display:"flex"}}><button className='buttonlink'
                    value={item._id + ',' + item.username} onClick={DeleteUser}>
                      <i className="bi bi-trash3" style={{ fontSize: "1rem" }}></i>
                    </button> </div></td>
                </tr>
              );
            })) : <tr>
            <td> -- </td>
            <td> -- </td>
            <td> -- </td>
            <td> -- </td>
            <td> -- </td>
            <td> Editar / Eliminar </td>
          </tr>}
      </tbody>
    </Table>
    </div>
    <div  >
        <Modal show={show} onHide={modalClose}>          
          <Modal.Header style={{border:"2px solid red"}} closeButton>
            <Modal.Title>Nexus</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p ref={errRef}>{errMsg}</p>
          </Modal.Body>
          <Modal.Footer>{btnaceptar &&
            <Button className="btn btn-orange" onClick={AceptDelete}>
              Aceptar
            </Button>}
            <Button onClick={modalClose}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      </div>
      </>

  );
}

export default Listusers;