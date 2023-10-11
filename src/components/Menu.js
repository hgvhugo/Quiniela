import { React, useState, useEffect } from 'react';
import {  Link } from "react-router-dom";
import useAuth from '../hooks/useAuth';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Menu() {
    const { auth } = useAuth();
    const [tbl, setTbl] = useState('');
    const [home, setHome] = useState('');
    const [book, setBook] = useState('');
    const [titleT, setTitleT] = useState('');
    const [titleH, setTitleH] = useState('');
    const [titleB, setTitleB] = useState('');

    useEffect(() => {

        const rol = auth?.roles;
        if(rol){
            if( rol[0] === "User")
            {
                setTbl('/userdashboard');
                setHome('/');
                setBook('/transactions');
                setTitleT('PANEL DE INICIO');
                setTitleH('RENDIMIENTOS');
                setTitleB('HISTORIAL DE MOVIMIENTOS');
            }
            else if(rol[0] === "admin")
            {
            setTbl('/dashboard');
            setHome('/users');
            setBook('/transactions');
            setTitleT('PANEL DE ADMINISTRACIÓN');
            setTitleH('USUARIOS REGISTRADOS');
            setTitleB('HISTORIAL DE MOVIMIENTOS');
        }
        else if(rol[0] === "super_admin")
            {
            setTbl('/dashboard');
            setHome('/admin');
            setBook('');
            setTitleT('PANEL DE ADMINISTRACIÓN');
            setTitleH('PANEL SUPER ADMINISTRADOR');
            setTitleB('PANEL SUPER ADMINISTRADOR');
        }
            else
            {
                setTbl('');
                setHome('');
                setBook('');
            }
        }
    }, [tbl,home,book, auth])

  return (
    <>
        <div className="container" >
            <div className="row">
                <div className="col">            
                <div className="row align-items-center" style={{height:"150px"}}>
                    <div className="col"><Link to={tbl} state={{title:titleT}} >
                    <i className="bi bi-grid-fill" style={{fontSize:"2rem", color: "#646262"}}></i></Link>
                    </div>
                </div>
                <div className="row align-items-center" style={{height:"150px"}}>
                    <div className="col-5"><Link to={home} state={{title:titleH}} >
                    <i className="bi bi-house-door" style={{fontSize:"2rem", color: "#646262"}}></i></Link>
                    </div>
                </div>
              
                <div className="row align-items-center" style={{height:"150px"}}>
                    <div className="col"><Link to={book} state={{title:titleB}} >
                    <i className="bi bi-book" style={{fontSize:"2rem", color: "#646262"}}></i></Link>
                    </div>
                </div>   
                </div>   
            </div>
        </div>
    </>
  )
}

export default Menu