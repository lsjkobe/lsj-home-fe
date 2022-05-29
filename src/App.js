import './App.less';
import {BrowserRouter} from "react-router-dom";
import {BaseRouter} from "./route/root-route";
import {RouteAuthEach} from "./route/route-auth";
import AxiosHttp from "./common/axios-http";
import Main from "./page/main";

AxiosHttp.init();

function App() {
    return (
        <div className="App">
            <div>
                <BrowserRouter>
                    <Main>
                        <RouteAuthEach></RouteAuthEach>
                    </Main>
                </BrowserRouter>
            </div>
        </div>
    );
}

export default App;
