import React from 'react';
import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from '../api/axios';
import { Modal } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

function Altajuegos() {
    const URL = '/api/admin/addgame';
    const { auth } = useAuth();
    const userRef = useRef();
    const errRef = useRef();
    const token = auth?.accessToken;
    const [local, setLocal] = useState('');
    const [visitante, setVisitante] = useState('');
    const [locald, setLocald] = useState('');
    const [visitanted, setVisitanted] = useState('');

    const [imglocal, setImglocal] = useState('');
    const [imgvisitante, setImgvisitante] = useState('');
    const [rlocal, setChklocal] = useState(false);
    const [rvisitante, setChkvisitante] = useState(false);
    const [semana, setSemana] = useState(0);
    const [semanaactiva, setSemanaActiva] = useState(0);
    const [show, setShow] = useState(false);
    const modalClose = () => setShow(false);
    const modalShow = () => setShow(true);
    const [equipos, setEquipos] = useState('');
    const [counter, setCounter] = useState(0);
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [activa, setActiva] = useState(false);
    const [partidos, setPartidos] = useState('');
    const [semanas, setSemanas] = useState('');

    const handleLocalChange = (e) => {
        const locald = e.target.value;
        const local = e.target.value.split('|')[0];;
        const localimg = e.target.value.split('|')[1];
        setLocald(locald);
        setLocal(local);
        setImglocal(localimg);
    }

    const handleVisitanteChange = (e) => {
        const visitanted = e.target.value;
        const visitante = e.target.value.split('|')[0];;
        const visitanteimg = e.target.value.split('|')[1];
        setVisitanted(visitanted);
        setVisitante(visitante);
        setImgvisitante(visitanteimg);
    }

    const handleSemanaChange = (e) => {
        const seman = e.target.value;
        setSemanaActiva(seman);
    }

    const getPartidos = async (e) => {
        axios.get('/api/quinielas/partidos/' + e)
            .then(res => {
                setPartidos(res.data.partidos);
            }).catch((error) => {/*Error*/ })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/quinielas/partidos',
                JSON.stringify({
                    semana, imglocal, local, rlocal, imgvisitante, visitante, rvisitante

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
            getPartidos(6);
        } catch (err) {
            const ErrMsg = err?.response?.data?.message;
            setErrMsg(ErrMsg);
            modalShow();
        }
    }



    const handleSubmitSA = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/quinielas/partidosSA',
                JSON.stringify({
                    semanaactiva, activa

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

    useEffect(() => {
        if (counter === 0) {

            setCounter(counter + 1);

            const getEquipos = async () => {
                axios.get('/api/quinielas/equipos')
                    .then(res => {
                        setEquipos(res.data);
                    }).catch((error) => {/*Error*/ })
            }
            getEquipos();

            const getSemanas = async () => {
                axios.get('/api/quinielas/partidosSA')
                    .then(res => {
                        setSemanas(res.data);
                    }).catch((error) => {/*Error*/ })
            }
            getSemanas();

        }
    }, [])


    return (
        <>
            <div >
                <div > Semana Activa:<br /></div>
                <div className='divinline'>
                    <div >

                        {/* <input className='textareaf' type='text'
                        value={semanaactiva} onChange={(e) => setSemanaActiva(e.target.value)}
                        id="semana" placeholder='Semana'></input> */}

                        {semanas?.length
                            ? (
                                <select style={{ height: "52.92px", width: "80px", borderRadius: ".5rem" }}
                                    className="form-selectM"
                                    onChange={handleSemanaChange}
                                    value={semanaactiva}>
                                    {semanas.map((semana, i) => {
                                        return <option style={{ color: "black", border: "none" }} key={semana?._id} value={semana?._id}>{semana?.semanaactiva}</option>;
                                    })}
                                </select>

                            ) : <p>No equipos</p>
                        }
                    </div>
                    <div><Button onClick={handleSubmitSA} className="btn btn-orange" >Guardar</Button></div>
                </div>
                <div > Agregar partido:<br /></div>

                <div className='divinline'>

                    <div ><input className='textareaf' type='text'
                        value={semana} onChange={(e) => setSemana(e.target.value)}
                        id="semana" placeholder='Semana' ></input></div>
                    <div > {equipos?.length
                        ? (
                            <select style={{ height: "52.92px", borderRadius: ".5rem" }}
                                onChange={handleLocalChange}
                                value={locald}>
                                {equipos.map((equipo, i) => {
                                    return <option style={{ background: "#1a1a1a", color: "#fff", border: "none" }} key={equipo?._id} value={equipo?.equipo + '|' + equipo?.imagen}>{equipo?.equipo}</option>;
                                })}
                            </select>

                        ) : <p>No Partidos</p>
                    }</div>
                    <div></div>
                    <div>VS</div>
                    <div > {equipos?.length
                        ? (
                            <select style={{ height: "52.92px", borderRadius: ".5rem" }}
                                onChange={handleVisitanteChange}
                                value={visitanted}>
                                {equipos.map((equipo, i) => {
                                    return <option style={{ background: "#1a1a1a", color: "#fff", border: "none" }} key={equipo?._id} value={equipo?.equipo + '|' + equipo?.imagen}>{equipo?.equipo}</option>;
                                })}
                            </select>

                        ) : <p>No equipos</p>
                    }</div>
                    <div ></div>
                    <div ><Button onClick={handleSubmit} className="btn btn-orange" >Agregar</Button></div>

                </div>

            </div>
            <div className='divinline'>
                <Table className="tables">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Semana</th>
                            <th></th>
                            <th>Local</th>

                            <th></th>
                            <th>Visitante</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            partidos?.length
                                ? (
                                    partidos?.map((item, index) => {
                                        return (

                                            <tr key={index}>
                                                <td style={{ color: '#5d5d5d' }}> {index + 1} </td>
                                                <td style={{ color: '#5d5d5d' }}> {item.semana}</td>
                                                <td style={{ color: '#0A84F4', textAlign: "center" }}> {['checkbox'].map((type) => (
                                                    <div key={type}>
                                                        <Form.Check type={type} id="chksesion">
                                                            <Form.Check.Input defaultChecked={item?.rlocal} value={item._id} disabled={item?.rlocal} type={type} style={{ border: "1px solid #3d3d3d", color: "blue" }} />
                                                        </Form.Check>


                                                    </div>
                                                ))}</td>
                                                <td style={{ color: '#5d5d5d' }}> <img src={item?.imglocal}
                                                    style={{ width: '40px', height: '40px', paddingBottom: '10px' }}
                                                    alt="logo"
                                                /> {item.local} </td>
                                                <td style={{ color: '#5d5d5d' }}>VS</td>
                                                <td style={{ color: '#5d5d5d' }}> <img src={item?.imgvisitante}
                                                    style={{ width: '40px', height: '40px', paddingBottom: '10px' }}
                                                    alt="logo"
                                                />{item.visitante} </td>
                                                <td style={{ color: '#0A84F4', textAlign: "center" }}> {['checkbox'].map((type) => (
                                                    <div key={type}>
                                                        <Form.Check type={type} id="chksesion">
                                                            <Form.Check.Input defaultChecked={item?.rvisitante} value={item._id} disabled={item?.rvisitante} type={type} style={{ border: "1px solid #3d3d3d", color: "blue" }} />
                                                        </Form.Check>


                                                    </div>
                                                ))}</td>


                                            </tr>
                                        )
                                    })) : <tr>
                                    <td> -- </td>
                                    <td> -- </td>
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
            <div className='modal'>
                <Modal show={show} onHide={modalClose} >
                    <Modal.Header closeButton>
                        <Modal.Title>Nexus</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>{errMsg}</p>
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