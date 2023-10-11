import axios from '../api/axios';
import useAuth from './useAuth';
const Refresh_URL = '/api/admin/refreshToken';

const useRefreshToken = () => {
    const { setAuth } = useAuth();
    const { auth } = useAuth();
    
    const username = auth?.username;
    const password = auth?.password;

    const refresh = async () => {
        const response = await axios.post(Refresh_URL,
            JSON.stringify({ username, password }),
            {
                headers: { 'Content-Type': 'application/json'},
                withCredentials: true
            }
        );
        setAuth(prev => {
            //console.log(JSON.stringify(prev));
            //console.log(response.data.accessToken);
            return { ...prev, accessToken: response.data.accessToken }
        });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;
