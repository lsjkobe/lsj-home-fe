import './App.less';
import {BrowserRouter} from "react-router-dom";
import {RouteAuthEach} from "./route/route-auth";
import AxiosHttp from "./common/axios-http";
import {BaseRouter} from "@/route/root-route";

AxiosHttp.init();

function App() {
    return (
        <div className="App">
            <div>
                <BrowserRouter>
                    <RouteAuthEach></RouteAuthEach>
                    <BaseRouter></BaseRouter>
                </BrowserRouter>
            </div>
        </div>
    );
}

export default App;
