import {useRoutes} from "react-router-dom"
import {Suspense, lazy} from "react";
import Login from "../page/Login";

const Home = lazy(() => import("../page/Home"));

const ROUTE_LIST = [
    {
        path: "/",
        auth: false,
        element: <Home/>,
    },
    {
        path: "/group",
        auth: true,
        element: <Home/>,
    },
    {
        path: "/login",
        auth: false,
        element: <Login/>,
    },
]

// 路由处理方式
const generateRouter = (routers: any) => {
    return routers.map((item: any) => {
        if (item.children) {
            item.children = generateRouter(item.children)
        }
        item.element = <Suspense fallback={
            <div>加载中...</div>
        }>
            {/* 把懒加载的异步路由变成组件装载进去 */}
            {item.element}
        </Suspense>
        return item
    })
}

const getRouteCommon = (routeList: Array, path: string) => {
    for (const data of routeList) {
        if (data.path === path) return data
        if (data.children) {
            const res: any = getRouteCommon(data.children, path)
            if (res) return res
        }
    }
    return null
}

const getRouteByPath = (path: string) => {
    return getRouteCommon(ROUTE_LIST, path);
}

const BaseRouter = () => useRoutes(generateRouter(ROUTE_LIST))

export {BaseRouter, getRouteByPath}