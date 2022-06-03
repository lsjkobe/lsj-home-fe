class UserHandler {

    static CONST = {
        KEY_PERM_LIST: 'KEY_PERM_LIST',
    }

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

    static savePermList = (permList = []) => {
        localStorage.setItem(this.CONST.KEY_PERM_LIST, JSON.stringify(permList));
    }

    static getPermList = () => {
        let permListStr = localStorage.getItem(this.CONST.KEY_PERM_LIST);
        if (permListStr) {
            return JSON.parse(permListStr);
        }
        return [];
    }

    static delPermList = () => {
        localStorage.removeItem(this.CONST.KEY_PERM_LIST);
    }
}

export default UserHandler;
