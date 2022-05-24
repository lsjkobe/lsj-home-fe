class UserHandler {
    constructor() {
    }

    static saveToken = (token: string) => {
        localStorage.setItem(process.env.REACT_APP_PARAM_TOKEN, token);
    }

    static delToken = () => {
        localStorage.removeItem(process.env.REACT_APP_PARAM_TOKEN);
    }

    static getToken = () => {
        return localStorage.getItem(process.env.REACT_APP_PARAM_TOKEN);
    }
}

export default UserHandler;
