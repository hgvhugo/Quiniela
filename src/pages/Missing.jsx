import { Link } from "react-router-dom"
import Header from "../components/Header";
import Menu from '../components/Menu';

const Missing = () => {
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
            <h1>Oops!</h1>
            <p>Página no reconocida</p>
            <div className="flexGrow">
                <Link to="/">Ir a página de inicio</Link>
            </div>
            </div>
       </div>
       </section> 
        </>
    )
}

export default Missing
