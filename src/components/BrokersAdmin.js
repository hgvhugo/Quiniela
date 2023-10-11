import React from 'react';
import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from '../api/axios';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Table from 'react-bootstrap/Table';
import {  useLocation } from 'react-router-dom';
import { NavLink } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';

function BrokersAdmin() {
    
    const { auth } = useAuth();
    const userRef = useRef();
    const errRef = useRef();
    const token = auth?.accessToken;
    const [nombre, setNombre] = useState('');
    const [filename, setFileName] = useState('');
    const [image, setImage] = useState(null);
    const [imgpreview, setImgPreview] = useState(null);
    const [balance , setBalance] = useState('');
    const [balancedb , setBalancedb] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [btnMsg, setBtnmsg] = useState('Guardar');
    const [btnClass, setBtnClass] = useState('btn btn-blue');
    const [delbroker, setIdBroker] = useState('');
    const [delname, setDelBroker] = useState('');
    const [btnaceptar, setBtnaceptar] = useState(false);
    const [show, setShow] = useState(false);
    const [showAlta, setShowAlta] = useState(false);
    const [showimg, setShowImg] = useState(false);
    const [brokers, setBrokers] = useState();
    const [editando, setEditando] = useState(false);
    const [imgChange, setImgChange] = useState(false);
    const [refresdata, setRefreshData] = useState(true);
    const {state} = useLocation();
    const { alta } = state||''; // Read values passed on state

    const modalClose = () => setShow(false);
    const modalShow = () => setShow(true);

    useEffect(() => {
        if(alta){setShowAlta(true);
        
        }
    }, [])

    const Format =(e)=>{
        const numericValue = parseFloat(e.toString().replace(/[^0-9.-]/g, ''));            
       return '$' + numericValue.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }


    const handleFileChange = (e) => {
        try{
        const selectedImage = e.target.files[0];   
        const names = e.target.files[0].name.split('.');
        setFileName(e.target.files[0].name);    
        if(!editando)     
        {setImgChange(true);setNombre(names[0]);}
        setShowImg(true); 
        if (selectedImage) {
        const reader = new FileReader();

        reader.onload = (e) => {
            setImgPreview(e.target.result);
            setImage(selectedImage);
        };

        reader.readAsDataURL(selectedImage);
        }
        }
        catch{}
      };

      const handleBalanceChange =(e) => {
        const inputValue = e.target.value;    
        const numericValue = parseFloat(inputValue.replace(/[^0-9.-]/g, ''));
                
        if (!isNaN(numericValue)) {
            setBalancedb(numericValue);
            setBalance(Format(numericValue));
        } 

      }

    const clean =() => {
        setNombre('');
        setImage(null);
        setBalance('');
        setBalancedb('');
        setShowImg(false);
        setEditando(false);
        setIdBroker('');
        setBtnmsg('Guardar');
        setBtnClass('btn btn-blue');
    }

    const handleSubmit = (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        }
        if (form.checkValidity() === true){
            if(!editando){Submit(e);}
            else{SubmitEdit(e);}        
        }
    };

    useEffect(() => {
        setErrMsg('');
    }, [nombre, balance,balancedb, image ])

    const Submit = async (e) => {
        const formData = new FormData();        
        formData.append('nombre', nombre); //NombreBroker
        formData.append('balance', balancedb); //BalanceInicial
        if(image)
        {formData.append('imagen', image, filename);}

        e.preventDefault();
        try {
            const response = await axios.post('/api/brokers',
            formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data',
                               'Authorization': 'Bearer '+token },
                    withCredentials: true
                }
            );
            const message = response?.data?.message;
            setErrMsg(message);
            modalShow();

        } catch (err) {
            const ErrMsg = err?.response?.data?.message;
            if (!err?.response) {
                setErrMsg(ErrMsg);                
            } else if (err.response?.status === 400) {
                setErrMsg(ErrMsg);
            } else if (err.response?.status === 403) {
                setErrMsg(ErrMsg);
            } else if (err.response?.status === 500) {
                setErrMsg(ErrMsg);
            } else {
                setErrMsg('Error al guardar broker');
            }
            modalShow();
            
        }        
    }

    const SubmitEdit = async (e) => {
        const formData = new FormData();
        formData.append('nombre', nombre); //NombreBroker
        formData.append('balance', balancedb); //BalanceInicial
        if(imgChange)
        {formData.append('imagen', image, filename);}
        e.preventDefault();
        try {
            const response = await axios.put('/api/brokers/'+delbroker,
            formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data',
                               'Authorization': 'Bearer '+token },
                    withCredentials: true
                }
            );
            const message = response?.data?.message;
            setErrMsg(message);
            modalShow();

        } catch (err) {
            const ErrMsg = err?.response?.data?.message;
            if (!err?.response) {
                setErrMsg(ErrMsg);                
            } else if (err.response?.status === 400) {
                setErrMsg(ErrMsg);
            } else if (err.response?.status === 403) {
                setErrMsg(ErrMsg);
            } else if (err.response?.status === 500) {
                setErrMsg(ErrMsg);
            } else {
                setErrMsg('Error al guardar broker');
            }
            modalShow();            
        } 
        setRefreshData(true);        
    }

    const EditBroker = (e) => {
        setBtnmsg('Actualizar');
        setBtnClass('btn btn-orange');
        const idBroker = e.currentTarget.value.split(',');
        setIdBroker(idBroker[0]);
        setNombre(idBroker[1]);
        setEditando(true);
        try{
            axios.get('/api/brokers/'+idBroker[0],{
                headers: { 'Content-Type': 'application/json',
                           'Authorization': 'Bearer '+token },
                withCredentials: true
            })
              .then(res => {                                
                if(res.data?.balance){
                    setBalancedb(res.data?.balance);    
                setBalance(Format(res.data?.balance));}
                if(res.data.imagen?.nombre){  
                setFileName(res.data.imagen?.nombre);             
                GetImage(res.data.imagen?.nombre);
                }
              })      
            }
            catch(err)
            {
               
            }

            setShowAlta(true);
      };

      const GetImage = async (namefile) => {
        try{
            axios.get('/api/brokers/files/'+namefile,{
                headers: { 'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+token },
                withCredentials: true
            })
            .then(res => {
                setShowImg(true);
                setImage(res.data?.imgdata);
                setImgPreview(res.data?.imgdata);
            })      
        }
        catch(err)
        {  
        }            
      }

      const DeleteBroker = (e) => {        
        const idBroker = e.currentTarget.value.split(',');
        setIdBroker(idBroker[0]);
        setDelBroker(idBroker[1]);
        setErrMsg('¿Esta seguro que desea borrar el broker '+idBroker[1]+'?');  
        setBtnaceptar(true);
        modalShow();
      };

      const AceptDelete = ()=>{
       try{
            axios.delete('/api/brokers/'+delbroker,{
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
            setErrMsg('!Broker '+delname+' eliminado exitosamente¡');  
      }


      useEffect(() => {
        if(refresdata){ setRefreshData(false);  
            const getBrokers = async () => {
                try{
                    
                    axios.get('/api/brokers/all/balance',{
                        headers: { 'Content-Type': 'application/json',
                                'Authorization': 'Bearer '+token },
                        withCredentials: true
                    })
                    .then(res => {
                        setBrokers(res.data);   
                    })      
                }
                catch(err)
                {  
                }    
              }
        getBrokers();
        }
    }, [refresdata, token])


    return (
        <>        
        <div className="container-fluid">  
            <div className="row">
                    <Navbar>                       
                        <Nav className="me-auto">
                        <NavLink onClick={() =>{ setShowAlta(false); clean(); setRefreshData(true);}}><u>Brokers registrados</u></NavLink>
                            <NavLink onClick={() => {setShowAlta(true); clean();}}><u>Nuevo Broker</u></NavLink>
                            
                        </Nav>
               
                    </Navbar>
            </div>
    {/* Alta brokers         */}
    
    {showAlta ? (
            <div id="Alta" className='row'>   
                    <div className='col-md-5 col-12'> 
                    <div style={{paddingBottom:"15px",paddingTop:"15px"}}>{!editando?('Alta nuevo broker'):('Actualizar broker')}</div>              
                        <Form onSubmit={handleSubmit}>
                        <Form.Group >
                        <Form.Label>Imagen:</Form.Label>
                        <Form.Control type="file"
                                id="image"
                                accept="image/png, image/jpg, image/jpeg"                            
                                onChange={handleFileChange}
                                />
                        </Form.Group>  
    
                        <Form.Group  >
                        <Form.Label>Nombre Broker:</Form.Label>
                        <Form.Control type="text" 
                                placeholder="Ingresar Broker" 
                                id="nombre"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setNombre(e.target.value)}
                                value={nombre}
                                required/>
                                <Form.Control.Feedback type="invalid">
                          Ingresar broker.
                        </Form.Control.Feedback>
                        </Form.Group>    
    
                        <Form.Group >
                        <Form.Label>Balance:</Form.Label>
                        <Form.Control type="text"
                                id="capital"
                                placeholder="$00,000.00" 
                                onChange={handleBalanceChange}
                                value={balance }
                                autoComplete="off"
                                required/>
                        <Form.Control.Feedback type="invalid">
                          Ingresar capital.
                        </Form.Control.Feedback>
                        </Form.Group>  
                        <br></br>
                            <Button  type="submit" className={btnClass}>{btnMsg}</Button>
                        </Form>
                    </div>   
                    <div  className='col-7 d-none d-lg-block'
                    style={{textAlign:"center"}}>   
                    <br/>
                    {showimg ?(
                        <div className='border-grad'>
                        {imgpreview && <img src={imgpreview} alt="Preview" 
                        
                        style={{ maxWidth: '400px', maxHeight: '300px'}} />}
                        </div>):(<div></div>)
                    }
                    </div>  
            </div>    
    ) :
    (
    
            <div id="lista" className='row'>  
    <div className='col-md-9 col-12' style={{paddingTop:"20px"}}>  
    <Table size="sm" className="tables">
          <thead>
            <tr>
              <th>No</th>
              <th>Fecha</th>
              <th>Nombre</th>
              <th>Balance</th>
              <th style={{textAlign:"center"}}>Acción</th>          
            </tr>
          </thead>
          <tbody>
    {
        brokers?.length
        ? (
            brokers?.map((item, index) => {
               return (
    
                    <tr key={index}>
                    <td style={{color:'#5d5d5d'}}> {index + 1}</td>
                    <td style={{color:'#5d5d5d'}}> {item?.fecha} </td>
                    <td style={{color:'#5d5d5d'}}> {item?.nombre} </td>
                    <td style={{color:'#FF9D0A'}}> {Format(item?.balance)} </td>
                    <td style={{color:'#0A84F4'}}> 
                     <div style={{display:"flex"}}>
                    <button className='buttonlink' 
                    value={item._id+','+item.nombre} onClick={EditBroker}>
                     <i className="bi bi-pencil-square" style={{fontSize:"1rem"}}></i>
                    </button><button className='buttonlink' 
                    value={item._id+','+item.nombre} onClick={DeleteBroker}>
                     <i className="bi bi-trash3" style={{fontSize:"1rem"}}></i>
                    </button> </div>
                    </td>
                
                    </tr>
                        )
                })):<tr>
                <td> -- </td>
                <td> -- </td>
                <td> -- </td>
                <td> -- </td>
                <td> -- </td>
                </tr>
    }  
          </tbody>
        </Table>
    </div>
            </div>     
    )}
        </div>
    
      
        <div className='modal'>
                    <Modal show={show} onHide={modalClose} >
                <Modal.Header closeButton>
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
    
        </>
        )
    }
    
    export default BrokersAdmin