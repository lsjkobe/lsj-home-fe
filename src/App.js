import './App.less';
import {BrowserRouter} from "react-router-dom";
import {RouteAuthEach} from "./route/route-auth";
import AxiosHttp from "./common/axios-http";
import LsjLayout from "@/component/layout/lsj-layout";

AxiosHttp.init();

function App() {
    return (
        <div className="App">
            <div>
                <BrowserRouter>
                    <LsjLayout>
                        <RouteAuthEach></RouteAuthEach>
                    </LsjLayout>
                </BrowserRouter>
            </div>
        </div>
    );
}

export default App;
