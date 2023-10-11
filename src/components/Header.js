import React from 'react';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import logo from '../img/logonfl.png'
import icon from '../img/logo.svg'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';
import { Link } from "react-router-dom";

function Header() {
    const [URL, setURL] = useState('');
    const { setAuth } = useContext(AuthContext);
    const { auth } = useAuth();
    const token = auth?.accessToken;
    const username = auth?.username;
    const [hide, setHide] = useState(false);
    const [counter, setCounter] = useState(0);
    const { state } = useLocation();
    const { title } = state || ''; // Read values passed on state
    const [tbl, setTbl] = useState('');

    const toggleHide = () => {
        setHide(!hide);
    };



    if (username && counter === 0) {
        toggleHide();
        setCounter(counter + 1);
    };

    useEffect(() => {
        if (auth?.login === "User") {
            setTbl('/login');
            setURL('/api/user/logout');
        }
        else {
            setTbl('/loginadmin');
            setURL('/api/admin/logout');
        }
    }, [auth])

    const logout = async () => {
        setCounter(0);
        setAuth({});
        try {
            const response = await axios.post(URL, JSON.stringify({ username }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    withCredentials: true
                }
            );

        } catch (err) {
            console.error(err.response);
        }
    }

    return (

        <>
            <div>
                <Navbar expand="lg">
                    <div className='container-fluid'>
                        <Navbar.Brand href="#home"><img src={logo} style={{ width: "50px" }} alt="logo" /></Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />

                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav >
                                <div>{title}</div>
                            </Nav>
                        </Navbar.Collapse>

                        <Navbar.Collapse style={{ flexGrow: 0 }} id="basic-navbar-nav">
                            <Nav >
                                <div className='row'>
                                    <div className='col-1'>
                                        {username ? (
                                            <Link className='juju' to="/profile" state={{ title: "PERFIL DE USUARIOS" }}>
                                                <img src={icon} alt="User" style={{ width: "45px", paddingTop: "10px" }}></img>
                                            </Link>) : (
                                            <i className="bi bi-person-circle" style={{ fontSize: "2rem", color: "white", paddingRight: "10px" }}></i>)
                                        }
                                    </div>

                                    <div className='col-9' style={{ paddingLeft: "40px" }}>
                                        <Link className='juju' to="/profile" state={{ title: "PERFIL DE USUARIOS" }}>{username}</Link>
                                        <div id='divses' className="firstdiv" style={{ display: hide ? "block" : "none" }}>
                                            <Link to={tbl} onClick={logout}>Cerrar sesión</Link>
                                        </div>
                                    </div>



                                </div>
                            </Nav>
                        </Navbar.Collapse>
                    </div>
                </Navbar>

            </div>
        </>
    )
}

export default Header