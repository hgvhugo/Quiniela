import { useRef, useState, useEffect } from "react";
import React from 'react';
import axios from '../api/axios';
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Menu from '../components/Menu';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import useAuth from '../hooks/useAuth';
import Modal from 'react-bootstrap/Modal';
import loginimg from '../img/nfl.jpg';
import { InputGroup } from 'react-bootstrap';

const Plazo_URL = '/api/user/plazos';
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%*]).{5,24}$/;
const EMAIL_REGEX = /\S+@\S+\.\S+/;
const URL = '/api/user/register';
const Register = () => {
    const userRef = useRef();
    const errRef = useRef();
    const [Username, setUser] = useState('');
    const [Password, setPwd] = useState('');
    const [Nombre, setNombre] = useState('');
    const [Apellido, setApellido] = useState('');
    const [validUser, setValidUser] = useState(false);
    const [validPsw, setValidPwd] = useState(false);
    const [validated, setValidated] = useState(false);
    const [counter, setCounter] = useState(0);
    const [show, setShow] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const [showPass, setShowPass] = useState(false);

    const modalClose = () => {
        setShow(false);

        navigate('/login');

    }
    const modalShow = () => setShow(true);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidUser(USER_REGEX.test(Username));
    }, [Username])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(Password));
    }, [Password])

    useEffect(() => {
        setErrMsg('');
    }, [Username, Password])


    const handleuserChange = (e) => {
        const inputValue = e.target.value;
        setUser(inputValue);
    }


    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        if (form.checkValidity() === true) {
            Submit(event);
        }
    };

    const Submit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/quinielas/usuarios',
                JSON.stringify({
                    Username, Password, Nombre, Apellido

                }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: false
                }
            );
            const message = response?.data?.message;
            setSuccess(true);
            setErrMsg(message);
            modalShow();
        } catch (err) {
            const ErrMsg = err?.response?.data?.message;
            setErrMsg(ErrMsg);
            modalShow();
        }
    }



    if (counter === 0) {
        setCounter(counter + 1);
    }


    return (

        <>
            <section className='bodylogin'>
                <div className='register' >
                    <div >
                        <h6>Crear cuenta</h6>
                        <div className='subtitulo'>Llenar el formulario para crear tu cuenta</div>

                    </div>

                    <div>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Form.Group  >
                                <Form.Label>Usuario</Form.Label>
                                <Form.Control type="text"
                                    placeholder="Escribe tu usuario"
                                    id="Username"
                                    ref={userRef}
                                    autoComplete="off"
                                    onChange={handleuserChange}
                                    value={Username || ''}
                                    aria-describedby="uidnote"
                                    aria-invalid={validUser ? "false" : "true"}
                                    required />
                                <Form.Control.Feedback type="invalid">
                                    Ingresar usuario.
                                </Form.Control.Feedback>
                            </Form.Group>


                            <Form.Label>Contraseña</Form.Label>
                            <InputGroup>
                                <Form.Control type={!showPass ? "Password" : "text"}
                                    id="Password"
                                    placeholder="* * * * * * * *"
                                    autoComplete="off"
                                    onChange={(e) => setPwd(e.target.value)}
                                    value={Password || ''}
                                    aria-invalid={validPsw ? "false" : "true"}
                                    aria-describedby="pwdnote"
                                    required /><div className="input-group-append">
                                    <Button className="buttonpass"
                                        onClick={() => setShowPass(!showPass)}>
                                        {!showPass ? <i className="bi bi-eye-fill"></i> : <i className="bi bi-eye-slash-fill"></i>}
                                    </Button></div>

                                <Form.Control.Feedback type="invalid">
                                    ingresar contraseña.
                                </Form.Control.Feedback>
                            </InputGroup>

                            <div className="row" >
                                <div className='col'>
                                    <Form.Group >
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control type="text"
                                            id="nombre"
                                            placeholder="Nombres"
                                            onChange={(e) => setNombre(e.target.value)}
                                            value={Nombre || ''}
                                            required />
                                        <Form.Control.Feedback type="invalid">
                                            ingresar nombre completo.
                                        </Form.Control.Feedback>
                                    </Form.Group>


                                </div>
                                <div className='col' >
                                    <Form.Group >
                                        <Form.Label>Apellido</Form.Label>
                                        <Form.Control type="text"
                                            id="apellido"
                                            placeholder="Apellidos"
                                            onChange={(e) => setApellido(e.target.value)}
                                            value={Apellido || ''}
                                            required />
                                        <Form.Control.Feedback type="invalid">
                                            ingresar nombre completo.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </div>

                            </div>
                            <br />
                            <Button style={{ width: "100%" }} className="btn btn-orange" type="submit" >REGISTRAR</Button>
                        </Form>
                        <br />
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
                                <Button className='buttonmodal' onClick={modalClose}>
                                    Cerrar
                                </Button>
                            </Modal.Footer>
                        </Modal>

                    </div>


                    <div style={{ color: "black", backgroundColor: "white", borderRadius: "5px" }}>
                        ¿Ya tienes cuenta?&nbsp;&nbsp;
                        <Link className='aorge' to="/login" >Iniciar Sesión</Link>

                    </div>

                </div>


            </section >
        </>
    )
}

export default Register
