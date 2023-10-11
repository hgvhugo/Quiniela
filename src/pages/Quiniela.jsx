import Header from "../components/Header";
import Menu from '../components/Menu';
import AdmTransactions from "../components/AdmTransactions";
import { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import UsrTransactions from "../components/UsrTransactions";

const Quiniela = () => {



    return (
        <>
            <section className='layout'>
                <div className='header' >
                    <Header />
                </div>
                <div id="menu" className="menu d-none d-lg-block">
                    <Menu />
                </div>
                <div id="content" className="body col-md-9 col-12">
                    <div style={{ background: "#1a1a1a" }}>

                    </div>
                </div>
            </section>

        </>
    )
}

export default Quiniela
