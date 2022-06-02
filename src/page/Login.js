import axios from "axios";
import {Component} from "react";
import UserHandler from "@/common/user-handler";

export default class Login extends Component {
    state = {
        data: [],
        isLogging: false,
    }

    componentDidMount() {
        const url = new URL(window.location.href);
        const ticket = url.searchParams.get("ticket");
        if (!this.state.isLogging && ticket && !UserHandler.getToken()) {
            this.state.isLogging = true;
            axios.get(process.env.REACT_APP_SERVER_URL + "?ticket=" + ticket)
                .then(r => {
                    console.info('登录返回' + JSON.stringify(r));
                    if (r && r.data && r.data[process.env.REACT_APP_PARAM_TOKEN]) {
                        const token = r.data[process.env.REACT_APP_PARAM_TOKEN];
                        const userData = r.data[process.env.REACT_APP_PARAM_USER];
                        UserHandler.saveUserAuth(userData, token);
                    }
                }).finally(() => {
                this.state.isLogging = false;
            });
        }
    }

    // ...
    render() {
        return <div>nihao</div>;
    }
}