import Header from "../components/Header";
import Menu from '../components/Menu';
import { useState, useEffect } from 'react';
import axios from '../api/axios';
import { Table, Modal, Button, Form } from 'react-bootstrap';




const Quiniela = () => {
    const [partidos, setPartidos] = useState([]);
    const [semanas, setSemanas] = useState([]);
    const [counter, setCounter] = useState(0);
    const [show, setShow] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    const modalClose = () => setShow(false);
    const modalShow = () => setShow(true);


    const getPartidos = async (e) => {
        axios.get('/api/quinielas/partidos/' + e)
            .then(res => {
                setPartidos(res.data.partidos);
            }).catch((error) => {/*Error*/ })
    }


    useEffect(() => {
        if (counter === 0) {

            setCounter(counter + 1);
            getPartidos(6);

        }
    }, [])

    return (
        <>
            <section className='layout'>
                <div className='header' >
                    <Header />
                </div>
                <div id="menu" className="menu d-none d-lg-block">
                    <Menu />
                </div>
                <div id="content" className="body col-md-11 col-12">
                    <div className='divinline'>
                        <Table className="tables">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Semana</th>
                                    <th></th>
                                    <th style={{ textAlign: "center" }}>Local</th>

                                    <th></th>
                                    <th style={{ textAlign: "center" }}>Visitante</th>
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
                                                        <td style={{ color: '#5d5d5d', textAlign: "center" }}> {item.semana}</td>
                                                        <td style={{ color: '#0A84F4', textAlign: "center" }}> {['checkbox'].map((type) => (
                                                            <div key={type}>
                                                                <Form.Check type={type} id="chksesion">
                                                                    <Form.Check.Input defaultChecked={item?.rlocal} value={item._id}
                                                                        disabled={item?.rlocal} type={type} style={{ border: "1px solid #3d3d3d", color: "blue" }} />
                                                                </Form.Check>


                                                            </div>
                                                        ))}</td>
                                                        <td style={{ color: '#D50A0A' }}> <img src={item?.imglocal}
                                                            style={{ width: '40px', height: '40px', paddingBottom: '10px' }}
                                                            alt="logo"
                                                        /> {item.local} </td>
                                                        <td style={{ color: '#5d5d5d' }}>VS</td>
                                                        <td style={{ color: '#013369' }}> <img src={item?.imgvisitante}
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

                </div>
            </section>

        </>
    )
}

export default Quiniela
