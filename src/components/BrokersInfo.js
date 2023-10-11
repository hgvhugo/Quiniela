import React from 'react';
import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from '../api/axios';
import { Modal } from 'react-bootstrap';
import {  useLocation } from 'react-router-dom';

function BrokersInfo() {

    const { auth } = useAuth();
    const errRef = useRef();
    const token = auth?.accessToken;
    const [errMsg, setErrMsg] = useState('');
    const [profit, setRendimiento] = useState('');
    const [comision, setComision] = useState('');
    const [show, setShow] = useState(false);
    const [refresdata, setRefreshData] = useState(false);
    const [imgpreview, setImgPreview] = useState(null);
    const [lastdata, setLastData] = useState(null);
    const [balance , setBalance] = useState('');
    const {state} = useLocation();
    const { idbro } = state||''; // Read values passed on state

    const modalClose = () => setShow(false);
    const modalShow = () => setShow(true);

    const Format =(e)=>{
        const numericValue = parseFloat(e.toString().replace(/[^0-9.-]/g, ''));            
       return '$' + numericValue.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

  

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        }
        if (form.checkValidity() === true){
        Submit(event);
        }
    };
    useEffect(() => {
        if(idbro)
        {setRefreshData(true);}
        setErrMsg('');
    }, [balance,comision,idbro])



    const Submit = async (e) => {
        setRefreshData(true);
        e.preventDefault();
        try {
            const response = await axios.post('/api/brokers/data/'+idbro,
                JSON.stringify({ profit,comision}),
                {
                    headers: { 'Content-Type': 'application/json',
                               'Authorization': 'Bearer '+token },
                    withCredentials: true
                }
            );
            const message = response?.data?.message;
            setErrMsg(message);
            modalShow();

        } catch (err) {
            
            const message = err?.data?.message;
            if (!err?.response) {
                setErrMsg(message);
            } else if (err.response?.status === 401) {
                setErrMsg("Sin autorización");
            } else if (err.response?.status === 403) {
                setErrMsg(message);
            } else if (err.response?.status === 500) {
                setErrMsg(message);
            } else {
                setErrMsg('Error al actualizar la contraseña');
            }

            modalShow();
            
        }
    }


    useEffect(() => {
        if(refresdata){ setRefreshData(false);  

            const GetImage = async (namefile) => {
                try{
                    axios.get('/api/brokers/files/'+namefile,{
                        headers: { 'Content-Type': 'application/json',
                                'Authorization': 'Bearer '+token },
                        withCredentials: true
                    })
                    .then(res => {
                        setImgPreview(res.data?.imgdata);
          
                    })      
                }
                catch(err)
                {  
                }    
              }

            const getBroker = () => {
                const idBroker = idbro;
                try{
                    axios.get('/api/brokers/'+idBroker,{
                        headers: { 'Content-Type': 'application/json',
                                   'Authorization': 'Bearer '+token },
                        withCredentials: true
                    })
                      .then(res => {                
                        if(res.data?.balance){
                        setBalance(Format(res.data?.balance));}
                        if(res.data.imagen?.nombre){
                        GetImage(res.data.imagen?.nombre);
                        }
                      })      
                    }
                    catch(err)
                    {
                       
                    }
              };
        
              const getBrokerlastdate = () => {
                const idBroker = idbro;
                try{
                    axios.get('/api/brokers/latest_data/'+idBroker,{
                        headers: { 'Content-Type': 'application/json',
                                   'Authorization': 'Bearer '+token },
                        withCredentials: true
                    })
                      .then(res => {      
                        if(res.data?.fecha){
                            setLastData(res.data?.fecha);}                        
                      })      
                    }
                    catch(err)
                    {
                       
                    }
              };

        getBroker();
        getBrokerlastdate();
        }
    }, [refresdata, token,idbro]);

   

    return (
        <>
            <div className="container-fluid">   
                <div className='row'>                
                    <h5>Datos Generales</h5>
                    <div className="cards">
                        <div className="card">
                            <div>
                            <img src={imgpreview} style={{ width: "130px", paddingBottom: "10px" }} alt="logo" />
                            <div className="totales">
                                <h5>{Format(balance)}</h5>
                            </div>
                            </div>
                        </div>
                    </div>
                    {lastdata ? (<div className="subtituloOrg" style={{paddingTop:"10px",paddingBottom:"15px"}}>Ultima actualización {lastdata}</div>):(<div></div>)}
                </div>
                <div className='row'> 
                <div className='col-6'>       
                    <h5>Actualizar datos</h5>
                    <Form onSubmit={handleSubmit}>
                    <Form.Group  >
                    <Form.Label>Rendimiento semanal</Form.Label>
                    <Form.Control type="text" 
                            placeholder="Escribe el porcentaje" 
                            id="rendimiento"
                            autoComplete="off"
                            onChange={(e) => setRendimiento(e.target.value)}
                            value={profit}
                            required/>
                            <Form.Control.Feedback type="invalid">
                      Ingresar rendimiento.
                    </Form.Control.Feedback>
                    </Form.Group> 

                    <Form.Group >
                    <Form.Label>Comisión por lotaje</Form.Label>
                    <Form.Control type="text"
                            placeholder="Escribe el monto de la comisión" 
                            id="comisión"
                            autoComplete="off"
                            onChange={(e) => setComision(e.target.value)}
                            value={comision}
                            />
                    <Form.Control.Feedback type="invalid">
                      Ingresar el monto de la comisión.
                    </Form.Control.Feedback>
                    </Form.Group>  
                   
                    <br></br>
                        <Button type="submit" className="btn btn-blue" >Guardar</Button>
                    </Form>
                    </div>
                </div>
            </div>

  
            <div className='modal'>
    <Modal show={show} onHide={modalClose} >
        <Modal.Header closeButton>
          <Modal.Title>Nexus</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p ref={errRef}>{errMsg}</p>
        </Modal.Body>
        <Modal.Footer>
        <Button onClick={modalClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      </div>

        </>
    )
}

export default BrokersInfo