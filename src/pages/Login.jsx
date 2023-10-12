import { Link, useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from '../api/axios';
import loginimg from '../img/nfl.jpg';
import { InputGroup } from 'react-bootstrap';


const LOGIN_URL = '/api/user/login'; //URL API DB



function Login() {
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    const userRef = useRef();
    const errRef = useRef();
    const googleButton = useRef(null);

    const [username, setUser] = useState('');
    const [password, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);
    const [showPass, setShowPass] = useState(false);

    const modalClose = () => setShow(false);
    const modalShow = () => setShow(true);


    const handleGoogle = async (event) => {
        const provider_id = event.data?.id;
        const provider = event.provider;
        const username = event.data?.given_name;
        const picture = event.data?.picture;
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ provider, provider_id }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: false
                }
            );
            const accessToken = response?.data?.token;
            const refreshToken = response?.data?.refreshToken;
            const roles = ['User'];
            const login = 'User';
            setAuth({ username, roles, accessToken, refreshToken, login });
            navigate('/userdashboard', { state: { title: 'PANEL DE INICIO', img: picture } });
        } catch (err) {
            const ErrMsg = err?.response?.data?.message;
            if (!err?.response) {
                setErrMsg(ErrMsg);
            } else {
                setErrMsg('Error de inicio de sesión');
            }
            modalShow();
        }

    };

    const handleFB = async (event) => {
        const provider_id = event.data?.userID;
        const provider = event.provider;
        const username = event.data?.first_name;
        const picture = event.data?.picture.data.url;
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ provider, provider_id }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: false
                }
            );
            const accessToken = response?.data?.token;
            const refreshToken = response?.data?.refreshToken;
            const roles = ['User'];
            const login = 'User';
            setAuth({ username, roles, accessToken, refreshToken, login });
            navigate('/userdashboard', { state: { title: 'PANEL DE INICIO', img: picture } });
        } catch (err) {
            const ErrMsg = err?.response?.data?.message;
            if (!err?.response) {
                setErrMsg(ErrMsg);
            } else {
                setErrMsg('Error de inicio de sesión');
            }
            modalShow();
        }


    };


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

    useEffect(() => {

        userRef.current.focus();

    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [username, password])

    const Submit = async (e) => {


        if (e) {
            e.preventDefault();
        }
        try {
            const response = await axios.post('/api/quinielas/login',
                JSON.stringify({ username, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: false
                }
            );

            console.log("response=", response);

            const accessToken = response?.data?.token;
            const refreshToken = response?.data?.refreshToken;
            const rol = response?.data?.rol;
            const roles = [rol];
            const login = 'User';
            setAuth({ username, password, roles, accessToken, refreshToken, login });
            setUser('');
            setPwd('');
            if (rol === 'User') {
                navigate('/quiniela', { state: { title: 'QUINIELA' } });
            } else {
                navigate('/admin', { state: { title: 'PANEL DE ADMINISTRACIÓN' } });
            }
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
                setErrMsg('Error de inicio de sesión');
            }
            modalShow();
        }

    }

    return (
        <>
            <section className='bodylogin'>

                <div className="login" >
                    <div >
                        <h6>Quiniela</h6>
                        <div className='subtitulo'>Ingresa tus datos de acceso</div>
                    </div>
                    <div >
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Form.Group  >
                                <Form.Label>Usuario</Form.Label>
                                <Form.Control type="text"
                                    placeholder="Escribe tu usuario"
                                    id="username"
                                    ref={userRef}
                                    autoComplete="off"
                                    onChange={(e) => setUser(e.target.value)}
                                    value={username}
                                    required />
                                <Form.Control.Feedback type="invalid">
                                    Ingresar usuario.
                                </Form.Control.Feedback>
                            </Form.Group>


                            <Form.Label>Contraseña</Form.Label>
                            <InputGroup>
                                <Form.Control type={!showPass ? "password" : "text"}
                                    id="password"
                                    placeholder="* * * * * * * *"
                                    autoComplete="off"
                                    onChange={(e) => setPwd(e.target.value)}
                                    value={password}
                                    required /><div className="input-group-append">
                                    <Button className="buttonpass"
                                        onClick={() => setShowPass(!showPass)}>
                                        {!showPass ? <i style={{ color: "#505050" }} className="bi bi-eye-fill"></i> : <i style={{ color: "#505050" }} className="bi bi-eye-slash-fill"></i>}
                                    </Button></div>

                                <Form.Control.Feedback type="invalid">
                                    ingresar contraseña.
                                </Form.Control.Feedback>
                            </InputGroup>

                            <br />
                            <Button style={{ width: "100%" }} className="btn btn-orange" type="submit" >INGRESAR</Button>
                            <br />
                        </Form>
                        <br />
                    </div>

                    <div style={{ color: "black", backgroundColor: "white", borderRadius: "5px" }}>
                        ¿Aún no tienes cuenta?&nbsp;&nbsp;
                        <Link className='aorge' to="/register" state={{ title: "Bienvenido a NEXUS" }}>Registrarse</Link>

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

                </div>





            </section >
        </>
    )
}

export default Login
