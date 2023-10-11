import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Menu from '../components/Menu';
import Altajuegos from "../components/Altajuegos";

const Admin = () => {
    const navigate = useNavigate();

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
                    <div style={{ justifyContent: "space-between" }}>

                        <div className="col-9">
                            <Altajuegos />
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}

export default Admin
