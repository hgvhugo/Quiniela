import React from 'react';
import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from '../api/axios';
import { Modal } from 'react-bootstrap';

const URL = '/api/admin/register';

function Admins() {
    const { auth } = useAuth();
    const userRef = useRef();
    const errRef = useRef();
    const token = auth?.accessToken;
    const [username, setUser] = useState('');
    const [password, setPwd] = useState('');
    const [rol, setRol] = useState('admin');
    const [errMsg, setErrMsg] = useState('');
    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);

    const modalClose = () => setShow(false);
    const modalShow = () => setShow(true);
  
    const handleRolChange = (e) => {
        setRol(e.target.value);
      };

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        }
        setValidated(true);
        if (form.checkValidity() === true){
        Submit(event);
        }
    };
    useEffect(() => {
        setErrMsg('');
    }, [username, password, rol])

    const Submit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(URL,
                JSON.stringify({ username, password, rol }),
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
            if (!err?.response) {
                setErrMsg('Error de conexión');
            } else if (err.response?.status === 401) {
                setErrMsg('Error de conexión');
            } else if (err.response?.status === 403) {
                setErrMsg('Unauthorized');
            } else if (err.response?.status === 500) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Error al registrar usuario');
            }
            modalShow();
        }
    }

    return (
        <>
         <div className="col-sm-5 col-12">    
            <h5>Alta de usuarios</h5>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group >
                    <Form.Label>Usuario:</Form.Label>
                    <Form.Control type="text" 
                            placeholder="Usuario" 
                            id="user"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={username}
                            required/>
                            <Form.Control.Feedback type="invalid">
                      Ingresar usuario.
                    </Form.Control.Feedback>
                    </Form.Group>
        
                    <Form.Group >
                    <Form.Label>Contraseña:</Form.Label>
                    <Form.Control type="password"
                            id="pass"
                            autoComplete="off"
                            onChange={(e) => setPwd(e.target.value)}
                            value={password}
                            required/>
                    <Form.Control.Feedback type="invalid">
                      ingresar contraseña.
                    </Form.Control.Feedback>
                    </Form.Group>  
                     <Form.Group >
                    <Form.Label>Rol:</Form.Label>
                     <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={handleRolChange}
                    value={rol}>
                    <option value="admin">Administrador</option>
                    <option value="super_admin">Super Administrador</option>
                    <option value="soporte">Soporte</option>
                    </select>
                    </Form.Group>    
                    <br></br>
                        <Button type="submit" className="btn btn-orange"  >Registrar</Button>
                    </Form>
     
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

export default Admins