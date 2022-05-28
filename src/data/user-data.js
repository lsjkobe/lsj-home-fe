import axios from 'axios';
import userHandler from "../common/user-handler";
import ApiRes from "../model/ApiRes";
import UserInfo from "../model/UserInfo";

export default class UserData {
    static urls = {
        getUserByToken: '',
    }

    constructor() {
    }
e
    static getUserData = ():Promise<UserInfo> => {
        return new Promise(resolve => {
            let userData = userHandler.getUserData();
            let token = userHandler.getToken();
            if (!userData && token) {
                axios.get(this.urls.getUserByToken)
                    .then((res: ApiRes) => {
                        if (res.success) {
                            userData = res.obj;
                        }
                    })
                    .catch(e => {
                        resolve(userData);
                    })
            }
            resolve(userData);
        })
    }
}