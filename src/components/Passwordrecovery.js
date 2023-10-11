import React from 'react';
import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from '../api/axios';
import { Modal } from 'react-bootstrap';

function Passwordrecovery() {
    const [URL, setURL] = useState('');
    const { auth } = useAuth();
    const userRef = useRef();
    const errRef = useRef();
    const token = auth?.accessToken;
    const [username, setUser] = useState('');
    const [password, setPwd] = useState('');
    const [newpassword , setPwdnew] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);
    const modalClose = () => setShow(false);
    const modalShow = () => setShow(true);

    useEffect(() => {
        if(auth?.login === "User")
         {
        setURL('/api/user/changepassword');
        }
         else
         {
        setURL('/api/admin/changepassword');    
        }
    }, [URL, auth])

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
    }, [username, password, newpassword ])

    const Submit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(URL,
                JSON.stringify({ username, password, newpassword  }),
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
                setErrMsg('Contraseña incorrecta');
            } else if (err.response?.status === 403) {
                setErrMsg('Unauthorized');
            } else if (err.response?.status === 500) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Error al actualizar la contraseña');
            }

            modalShow();
            
        }
    }

    return (
        <>
<div className="col-sm-5 col-12">                   
                    <h5>Recuperar contraseña</h5>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group  >
                    <Form.Label>Usuario:</Form.Label>
                    <Form.Control type="text" 
                            placeholder="Usuario" 
                            id="username"
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
                    <Form.Label>Contraseña seguridad administrador:</Form.Label>
                    <Form.Control type="password"
                            id="password"
                            autoComplete="off"
                            onChange={(e) => setPwd(e.target.value)}
                            value={password}
                            required/>
                    <Form.Control.Feedback type="invalid">
                      ingresar palabra clave de seguridad.
                    </Form.Control.Feedback>
                    </Form.Group>  
                    <Form.Group >
                    <Form.Label>Nueva contraseña:</Form.Label>
                    <Form.Control type="password"
                            id="passwordnew"
                            autoComplete="off"
                            onChange={(e) => setPwdnew(e.target.value)}
                            value={newpassword }
                            required/>
                    <Form.Control.Feedback type="invalid">
                      ingresar nueva contraseña.
                    </Form.Control.Feedback>
                    </Form.Group>  
                    <br></br>
                        <Button type="submit" className="btn btn-orange" >Actualizar</Button>
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

export default Passwordrecovery