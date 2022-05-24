//
// const Home = () => {
//     return <div>这是home</div>;
// };
//
// export default Home

import axios from "axios";
import {Component} from "react";

export default class Home extends Component {
    state = {
        data: []
    }

    componentDidMount() {
        axios.get(process.env.REACT_APP_SERVER_URL + '/home/page/space/list').then(res => {

        });
    }

    // ...
    render() {
        return <div>home</div>;
    }
}