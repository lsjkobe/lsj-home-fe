class UserHandler {
    constructor() {
    }

    static saveUserAuth = (userData, token) => {
        localStorage.setItem(process.env.REACT_APP_PARAM_USER, JSON.stringify(userData));
        this.saveToken(token);
    }

    static delUserAuth = () => {
        localStorage.removeItem(process.env.REACT_APP_PARAM_USER);
        this.delToken();
    }

    static getUserData = () => {
        let userJson = localStorage.getItem(process.env.REACT_APP_PARAM_USER);
        return userJson ? JSON.parse(userJson) : null;
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
