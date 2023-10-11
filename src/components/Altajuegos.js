import React from 'react';
import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from '../api/axios';
import { Modal } from 'react-bootstrap';

function Altajuegos() {
    const URL = '/api/admin/addgame';
    const { auth } = useAuth();
    const userRef = useRef();
    const errRef = useRef();
    const token = auth?.accessToken;
    const [local, setLocal] = useState('');
    const [visitante, setVisitante] = useState('');
    const [chklocal, setChklocal] = useState(false);
    const [chkvisitante, setChkvisitante] = useState(false);
    const [semana, setSemana] = useState(0);
    const [show, setShow] = useState(false);
    const modalClose = () => setShow(false);
    const modalShow = () => setShow(true);
    const [equipos, setEquipos] = useState('');
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        if (counter === 0) {

            setCounter(counter + 1);

            const getEquipos = async () => {
                axios.get('/api/quinielas/equipos')
                    .then(res => {
                        setEquipos(res.data);
                        console.log(res.data);
                    }).catch((error) => {/*Error*/ })
            }
            getEquipos();
        }
    }, [])

    const handleLocalChange = (e) => {
        const local = e.target.value;
        setLocal(local);
    }

    const handleVisitanteChange = (e) => {
        const visitante = e.target.value;
        setVisitante(visitante);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            // const response = await axios.post(URL,
        }
        catch (err) {

        }
    }

    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between" }}>

                <div className='col'><input className='textareaf' type='text' id="semana" placeholder='Semana'></input></div>
                <div className='col'> {equipos?.length
                    ? (
                        <select style={{ height: "52.92px", borderRadius: ".5rem" }}
                            className="form-selectM"
                            onChange={handleLocalChange}
                            value={local}>
                            {equipos.map((equipo, i) => {
                                return <option style={{ background: "#1a1a1a", color: "#fff", border: "none" }} key={equipo?._id} value={equipo?._id}>{equipo?.Equipo}</option>;
                            })}
                        </select>

                    ) : <p>No plazos</p>
                }</div>
                <div className='col'></div>
                <div className='col'>VS</div>
                <div className='col'> {equipos?.length
                    ? (
                        <select style={{ height: "52.92px", borderRadius: ".5rem" }}
                            className="form-selectM"
                            onChange={handleVisitanteChange}
                            value={visitante}>
                            {equipos.map((equipo, i) => {
                                return <option style={{ background: "#1a1a1a", color: "#fff", border: "none" }} key={equipo?._id} value={equipo?._id}>{equipo?.Equipo}</option>;
                            })}
                        </select>

                    ) : <p>No plazos</p>
                }</div>
                <div className='col'></div>
                <div className='col'><Button className="btn btn-orange" >Agregar</Button></div>

            </div>


            <div className='modal'>
                <Modal show={show} onHide={modalClose} >
                    <Modal.Header closeButton>
                        <Modal.Title>Nexus</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

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

export default Altajuegos