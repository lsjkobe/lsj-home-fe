import './App.less';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {RouteAuthEach} from "./route/route-auth";
import AxiosHttp from "./common/axios-http";
import LsjLayout from "@/component/layout/lsj-layout";
import Login from "@/page/Login";
import {BaseRouter} from "@/route/root-route";

AxiosHttp.init();

function App() {
    return (
        <div className="App">
            <div>
                <BrowserRouter>
                    <RouteAuthEach></RouteAuthEach>
                    {/*<Routes>*/}
                    {/*    <Route path="/*" element=<LsjLayout /> />*/}
                    {/*    <Route path="/login" element=<Login /> />*/}
                    {/*</Routes>*/}
                    <BaseRouter></BaseRouter>
                </BrowserRouter>
                {/*<BrowserRouter>*/}
                {/*    <LsjLayout>*/}
                {/*        <RouteAuthEach></RouteAuthEach>*/}
                {/*    </LsjLayout>*/}
                {/*</BrowserRouter>*/}
            </div>
        </div>
    );
}

export default App;
