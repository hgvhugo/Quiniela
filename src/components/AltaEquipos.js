import React from 'react';
import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from '../api/axios';
import { Modal } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { getElementAtEvent } from 'react-chartjs-2';

function AltaEquipos() {

    const [id, SetId] = useState(0);
    const [equipo, setEquipo] = useState('');
    const [imagen, setImagen] = useState('');
    const [show, setShow] = useState(false);
    const modalClose = () => setShow(false);
    const modalShow = () => setShow(true);
    const [counter, setCounter] = useState(0);
    const [errMsg, setErrMsg] = useState('');
    const [equipos, setEquipos] = useState('');
    const [success, setSuccess] = useState(false);
    const [editando, setEditando] = useState(false);
    const [imgpreview, setImgPreview] = useState('');
    const [image, setImage] = useState('');
    const [imgChange, setImgChange] = useState(false);
    const [fileName, setFileName] = useState('');
    const [showimg, setShowImg] = useState(false);



    const handleFileChange = (e) => {
        try {
            const selectedImage = e.target.files[0];
            const names = e.target.files[0].name.split('.');
            setFileName(e.target.files[0].name);
            if (editando) { setImgChange(true); }
            setShowImg(true);
            if (selectedImage) {
                const reader = new FileReader();

                reader.onload = (e) => {
                    setImgPreview(e.target.result);
                    setImage(selectedImage);
                    setImagen(e.target.result);
                };

                reader.readAsDataURL(selectedImage);
            }
        }
        catch { }
    };

    const getEquipos = async () => {
        axios.get('/api/quinielas/equipos')
            .then(res => {
                setEquipos(res.data);
            }).catch((error) => {/*Error*/ })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/quinielas/equipos',
                JSON.stringify({
                    id, equipo, imagen
                }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: false
                }
            );
            const message = response?.data?.message;
            getEquipos();
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
            getEquipos();
        }
    }, [])


    return (
        <>
            <div className='divinline'>
                <div ><input className='textareaf' type='text'
                    value={id} onChange={(e) => SetId(e.target.value)}
                    id="id" placeholder='Número'></input></div>
                <div ><input className='textareaf' type='text'
                    value={equipo} onChange={(e) => setEquipo(e.target.value)}
                    id="equipo" placeholder='Equipo'></input></div>
                <div >
                    <Form.Control type="file"
                        id="image"
                        accept="image/png, image/jpg, image/jpeg"
                        onChange={handleFileChange}
                    />
                </div>
                <div
                    style={{ textAlign: "center" }}>
                    {showimg ? (
                        <div >
                            {imgpreview && <img src={imgpreview} alt="Preview"

                                style={{ maxWidth: '40px', maxHeight: '30px' }} />}
                        </div>) : (<div></div>)
                    }
                </div>
                <div ><Button onClick={handleSubmit} className="btn btn-orange" >Agregar</Button></div>

            </div>


            <Table className="tables">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Equipo</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        equipos?.length
                            ? (
                                equipos?.map((item, index) => {
                                    return (

                                        <tr key={index}>
                                            <td style={{ color: '#5d5d5d' }}> {index + 1} </td>
                                            <td style={{ color: '#5d5d5d' }}> {item.equipo}</td>

                                            <td style={{ color: '#5d5d5d' }}> <img src={item?.imagen}
                                                style={{ width: '40px', height: '40px', paddingBottom: '10px' }}
                                                alt="logo"
                                            /></td>
                                        </tr>
                                    )
                                })) : <tr>
                                <td> -- </td>
                                <td> -- </td>
                                <td> -- </td>
                            </tr>
                    }
                </tbody>
            </Table>

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

export default AltaEquipos