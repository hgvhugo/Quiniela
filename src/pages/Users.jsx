import { useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Header from "../components/Header";
import Menu from '../components/Menu';
import Admins from '../components/Admins';
import Passwordrecovery from '../components/Passwordrecovery';
import Listusers from '../components/Listusers';
import ListAdmins from '../components/ListAdmins';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-bootstrap';
import useAuth from '../hooks/useAuth';

const Users = () => {
    const [hide, setHide] = useState(false);
    const [lstUsers, setLstUsers] = useState(true);
    const [lstAdmin, setLstAdmin] = useState(false);
    const [addAdmin, setAddAdmin] = useState(false);
    const [pswRecovery, setPswRecovery] = useState(false);
    const [isSAdmin, setsSAdmin] = useState(false);
    const { auth } = useAuth();

    useEffect(() => {

        const rol = auth?.roles;
        if(rol){
            console.log("El rol=",rol[0]);
            console.log("El isSAdmin=",isSAdmin);
            if( rol[0] === "super_admin")
            {
                
                setsSAdmin(true);
            }
        }
    },[])

    const toggleHide = (e) => {        
        if(e==="A"){
            setLstUsers(true);setLstAdmin(false);setAddAdmin(false);setPswRecovery(false);}
        else if(e==="B"){
            setLstUsers(false);setLstAdmin(true);setAddAdmin(false);setPswRecovery(false);}
        else if(e==="C"){
            setLstUsers(false);setLstAdmin(false);setAddAdmin(true);setPswRecovery(false);}
        else if(e==="D"){
            setLstUsers(false);setLstAdmin(false);setAddAdmin(false);setPswRecovery(true);}
        else{setLstUsers(true);};
        }

    return (
    <>
     <section className='layout'>
        <div className='header' >
        <Header /> 
        </div>
          <div id="menu" className="menu d-none d-lg-block">
        <Menu/>
        </div>
        <div id="content" className="body">            

            <div className="row">
                    <Navbar>                       
                        <Nav className="me-auto">
                        <NavLink onClick={()=>{toggleHide('A')}}><u>Clientes registrados</u></NavLink>
                        <NavLink onClick={()=>{toggleHide('B')}}><u>Administradores registrados</u></NavLink>
                        <NavLink onClick={()=>{toggleHide('C')}}><u>Alta de administradores</u></NavLink>
                        <NavLink onClick={()=>{toggleHide('D')}}><u>Recuperación de contraseña</u></NavLink>
                        </Nav>
               
                    </Navbar>
            </div>

            <div className="row" style={{paddingTop:"20px"}}>
                {lstUsers?(
                <div>
                <Listusers/>
                </div>):(<div></div>)}
                {(lstAdmin && isSAdmin )?(
                <div>
                <ListAdmins/>
                </div>):(<div></div>)}
                {addAdmin && isSAdmin?(
                <div >
                    <Admins/>
                </div>):(<div></div>)}
                {pswRecovery?(
                 <div >
                    <Passwordrecovery/>
                </div>):(<div></div>)}  
            </div>
 
            </div>
        </section>
    </>
    );
};
export default Users;
