import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Menu from '../components/Menu';
import Altajuegos from "../components/Altajuegos";
import AltaEquipos from "../components/AltaEquipos";
import { Navbar, Nav, NavLink } from 'react-bootstrap';
import { useRef, useState, useEffect } from 'react';

const Admin = () => {
    const navigate = useNavigate();
    const [partidos, setPartidos] = useState(true);

    const handlebutton = (e) => {
        if (e === "A") {
            navigate('/brokers', { state: { title: 'PANEL BROKERS' } });
        }
        else if (e === "B") {
            navigate('/transactions', { state: { title: 'HISTORIAL DE MOVIMIENTOS' } });
        }
        else if (e === "C") {
            navigate('/users', { state: { title: 'USUARIOS REGISTRADOS' } });
        }

    }

    return (
        <>
            <section className='layout'>
                <div className='header' >
                    <Header />
                </div>
                <div id="menu" className="menu d-none d-lg-block">
                    <Menu />
                </div>
                <div id="content" className="body">

                    <div >
                        <Navbar>
                            <Nav className="me-auto">
                                <NavLink className='amenu' onClick={() => { setPartidos(true); }}><u>Partidos</u></NavLink>
                                <NavLink className='amenu' onClick={() => { setPartidos(false); }}><u>Equipos</u></NavLink>

                            </Nav>

                        </Navbar>
                    </div>
                    <div >
                        <div >
                            {partidos ? (
                                <div >
                                    <Altajuegos />
                                </div>
                            ) : (
                                <div >
                                    <AltaEquipos />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Admin
