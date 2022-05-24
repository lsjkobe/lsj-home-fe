import {BrowserRouter} from "react-router-dom";
import {BaseRouter} from "./route/root-route";
import {RouteAuthEach} from "./route/route-auth";
import AxiosHttp from "./common/axios-http";

AxiosHttp.init();

function App() {
    return (
        <div style={{textAlign: "center"}}>
            <BrowserRouter>
                <BaseRouter></BaseRouter>
                <RouteAuthEach></RouteAuthEach>
            </BrowserRouter>
        </div>
    );
}

export default App;
