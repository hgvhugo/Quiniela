import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import Header from "../components/Header";
import Menu from '../components/Menu';
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';

const URL = '/api/user/logout';

const Home = () => {
    const { setAuth } = useContext(AuthContext);
    const { auth } = useAuth();
    const navigate = useNavigate();
    const token = auth?.accessToken;

    const logout = async () => {
        setAuth({});
        try {
            const response = await axios.post(URL,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    withCredentials: true
                }
            );
        } catch (err) {
            console.error(err);
        }
        navigate('/login');
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
                    <div className="row">



                    </div>
                    <br />
                    <div className="row">




                    </div>


                </div>
            </section>
        </>
    )
}

export default Home
