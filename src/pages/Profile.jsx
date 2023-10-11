import { useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Header from "../components/Header";
import Menu from '../components/Menu';
import Changepassword from '../components/Changepassword';
import useAuth from '../hooks/useAuth';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from "react-router-dom";
import axios from '../api/axios';

const Profile = () => {
    const [counter, setCounter] = useState(0);
    const { auth } = useAuth();
    const [tbl, setTbl] = useState('');
    const [home, setHome] = useState('');
    const [book, setBook] = useState('');
    const [profile, setProfile] = useState('');
    const [pswChange, setpswChange] = useState(false);
    const token = auth?.accessToken;

    const [username, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [nombre, setNombre] = useState('');
    const [plazo, setPlazo] = useState('');
    const [tiempor, setTiempoR] = useState('');
    const [balance, setBalance] = useState('');

    const Format =(e)=>{
        const numericValue = parseFloat(e.toString().replace(/[^0-9.-]/g, ''));            
       return '$' + numericValue.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      }
    
      
    useEffect(() => {
        if(auth?.login === "User")
         {

            setHome('/');
            setBook('/register');
        }
         else
         {
            setHome('/admin');
            setBook('/admin'); 
        }
    }, [tbl,home,book])

    
  useEffect(() => {
    if(counter===0)
    {
      const getProfile = async () => {
        try{
        axios.get('/api/user/profile',{
            headers: { 'Content-Type': 'application/json',
                       'Authorization': 'Bearer '+token },
            withCredentials: true
        })
          .then(res => {
            setProfile(res.data); 
            setUser(res.data?.perfil?.username);
            setEmail(res.data?.perfil?.email);
            setNombre(res.data?.perfil?.nombre);            
            setPlazo(res.data?.perfil?.plazo);
            setTiempoR(res.data?.perfil.tiempoRestante?.años +' años ' +
            res.data?.perfil.tiempoRestante?.meses +' meses ' +
            res.data?.perfil.tiempoRestante?.dias +' días');   
            setBalance(Format(res.data?.perfil?.balance));
          })      
        }
        catch(err)
        {
    
        }
    
    
      }
         getProfile();
        setCounter(counter+1);    
    }
}, [counter])

const toggleHide = () => {
    setpswChange(!pswChange);
};  
    return (
    <>
        <section className='layout'>
        <div className='header' >
        <Header /> 
        </div>
          <div id="menu" className="menu d-none d-lg-block">
        <Menu/>
        </div>
        <div className="body">

        <div className="row">
        <div className="col-sm-6 col-8" style={{display:"flex",  paddingBottom:"25px"}} >
        <button  className="btnlink" > <Link to={book} state={{title:"EDICIÓN DE USUARIOS"}}><u>Actualizar datos  </u></Link></button>
        <div style={{paddingLeft:"20px"}} ><button className="btnlink" onClick={toggleHide}><u>Cambiar contraseña</u></button></div></div>                  
            </div>

        <div className="row"> 

            <div className="col-md-12 col-0">
     
                <div className="row"> 
                    <div className='col'>
                        Username: {username}<br/><br/>
                        Nombre: {nombre}<br/><br/>
                        Correo: {email}<br/><br/>                    
                        Plazo: {plazo}<br/><br/>
                        Tiempo restante: {tiempor}<br/><br/>
                        Balance: {balance}<br/>
                    </div>
                    <div className='col'>
                    {pswChange ?(
               <div id='divuser'>
                  <Changepassword/>
                </div>):(<div></div>)}
                    </div>

                </div>
               
            </div>


        </div>

        </div>
        </section>
    </>
    );
};
export default Profile;
