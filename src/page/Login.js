import axios from "axios";
import {useEffect, useState} from "react";
import UserHandler from "@/common/user-handler";
import UserData from "@/data/user-data";
import {useNavigate} from 'react-router-dom'

const Login = () => {

    const [isLogging, setIsLogging] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const url = new URL(window.location.href);
        const ticket = url.searchParams.get("ticket");
        if (!isLogging && ticket && !UserHandler.getToken()) {
            setIsLogging(true);
            axios.get(process.env.REACT_APP_SERVER_URL + "?ticket=" + ticket)
                .then(r => {
                    console.info('登录返回' + JSON.stringify(r));
                    if (r && r.data && r.data[process.env.REACT_APP_PARAM_TOKEN]) {
                        afterLoginSuccess(r);
                    }
                })
                .finally(() => {
                    setIsLogging(false);
                });
        }
    }, []);

    const afterLoginSuccess = (res) => {
        const token = res.data[process.env.REACT_APP_PARAM_TOKEN];
        const userData = res.data[process.env.REACT_APP_PARAM_USER];
        UserHandler.saveUserAuth(userData, token);
        doAfterLogin().then(res => {
            navigate('/');
        });
    }

    const doAfterLogin = async () => {
        const permList = await UserData.getPermList();
        UserHandler.savePermList(permList);
    }

    return (
        <div>{isLogging ? '登录中' : ''}</div>
    );
}

export default Login;