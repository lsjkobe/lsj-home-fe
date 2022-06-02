import {useRoutes} from "react-router-dom"
import {Suspense} from "react";
// const main = lazy(() => import("../page/main"));
import CONTENT_ROUTE from "@/route/content-route";
import BASE_ROUTE from "@/route/base-route";

const CONTENT_ROUTE_LIST = CONTENT_ROUTE;

const BASE_ROUTE_LIST = BASE_ROUTE;

// 路由处理方式
const generateRouter = (routers: any) => {
    return routers.map((item: any) => {
        if (item.children) {
            item.children = generateRouter(item.children)
        }
        item.element = <Suspense fallback={<div>加载中...</div>}>
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
    return getRouteCommon(CONTENT_ROUTE_LIST, path);
}

const ContentRouter = () => useRoutes(generateRouter(CONTENT_ROUTE_LIST))
const BaseRouter = () => useRoutes(BASE_ROUTE_LIST)

export {BaseRouter, ContentRouter, getRouteByPath}