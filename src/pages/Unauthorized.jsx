import { useNavigate } from "react-router-dom"
import Header from "../components/Header";
import Menu from '../components/Menu';

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <>
        <section className='layout'>
        <div className='header' >
        <Header /> 
        </div>
          <div id="menu" className="menu d-none d-lg-block">
        <Menu/>
        </div>
        <div className="body col-9">
        <div className="row">  
            <h1 style={{color:"#FF9D0A"}}>Acceso no autorizado</h1>
            <br />
            <p >Necesita permiso para acceder a esta página.</p>
            <div className="flexGrow">
                <button className="btnlink" onClick={goBack}>Regresar</button>
            </div>
            </div>
       </div>
       </section> 
        </>
    )
}

export default Unauthorized
